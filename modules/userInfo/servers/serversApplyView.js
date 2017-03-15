/**
 * Created by Kevin on 2016/12/6.
 */

var commonTemplate = require('html!./common.html');
var template = require('html!./apply.html');
require('./servers.css');
require('util');

var applyListModel = Backbone.Model.extend({
    url:  'order/getSelfWeiAppListWithCallback.do'
});

var addCallBackUrlModel = Backbone.Model.extend({
    url:  mscxPage.request.app +'callbackurl/add.do'
});
var deleteCallBackUrlModel = Backbone.Model.extend({
    url:  mscxPage.request.app +'callbackurl/delete.do'
});
var updateCallBackUrlModel = Backbone.Model.extend({
    url:  mscxPage.request.app +'callbackurl/modify.do'
});
// 申请的服务
var myApplyListView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: _.template(template),
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        'click .add-call-back-url': 'addUCallBackUrl',
        'click .update-call-back-url': 'addUCallBackUrl',
        'click .delete-call-back-url': 'deleteCallBackUrl'
    },
    initialize: function() {
        this.$el.html(this.commonTemplate({name:'apply'}));

        this.$content = this.$('#serverInfo');

        this.model = new applyListModel();
        
        this.listenTo(this.model, 'sync', this.render);

        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    render: function () {
        var res = this.model.get('result'),
            me = this,
            serverList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        this.$content.html(this.template({serverList:serverList}));
        laypage({
            cont: 'serverPage',
            skip: true,
            pages: this.pagObj.totalPage,
            curr: this.pagObj.pageNum || 1,
            jump: function(obj, first){
                if(!first){
                    me.pagObj.pageNum = obj.curr;
                    me.reloadPage();
                }
            }
        });
    },
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    saveCallBackUrl: function (sId,sVal) {
        var that = this;
        new addCallBackUrlModel().fetch({
            data: {
                appId: sId,
                callbackUrl: sVal
            },
            success: function () {
                layer.msg('添加成功!');
                that.reloadPage();
            }
        });
    },
    updateCallBackUrl: function (sId,sVal) {
        var that = this;
        new updateCallBackUrlModel().fetch({
            data: {
                id: sId,
                callbackUrl: sVal
            },
            success: function () {
                layer.msg('修改成功!');
                that.reloadPage();
            }
        });
    },
    addUCallBackUrl: function (e) {
        var $this = $(e.target),
            sId = $this.data('id'),
            sUrl = $this.data('url') || '',
            sTitle = sUrl ? '修改回调URL':'添加回调URL';
        var that = this;
        layer.open({
            content: '<label for="callBack">回调URL<i class="need">*</i></label><div><input type="text" id="callBack" value="'+sUrl+'" /></div><label class="call-back-error">请输入要添加的回调URL</label>',
            shade: 0.6,
            title: sTitle,
            shadeClose: true,
            closeBtn:'1',
            area: ['300px', '210px'],
            btn: ['保存','取消'],
            btn1: function (index) {
                var sVal = $.trim($('#callBack').val());
                if(sVal){
                    var strRegex = '^((https|http|ftp|rtsp|mms)://)'
                        + '(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
                        + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
                        + '|' // 允许IP和DOMAIN（域名）
                        + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
                        + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
                        + '[a-z]{2,6})' // first level domain- .com or .museum
                        + '(:[0-9]{1,4})?' // 端口- :80
                        + '((/?)|' // a slash isn't required if there is no file name
                        + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
                    var urlReg = new RegExp(strRegex);
                    if(urlReg.test(sVal)){
                        sUrl ? that.updateCallBackUrl(sId,sVal) : that.saveCallBackUrl(sId,sVal);
                        layer.close(index);
                    }
                    else {
                        $('.call-back-error').html('请输入正确的回调URL').show();
                    }
                }
                else {
                    $('.call-back-error').show();
                }

            },
            btn2: function (index) {
                layer.close(index);
            }
        });
        return false;
    },
    deleteCallBackUrl: function (e) {
        var $this = $(e.target),
            sId = $this.data('id'),
            that = this;
        layer.confirm('确认删除回调URL吗？', {
            btn: ['确定','取消'] //按钮
        }, function(index){
            new deleteCallBackUrlModel().fetch({
                data: {
                    id: sId
                },
                success: function () {
                    layer.msg('删除成功!');
                    that.reloadPage();
                }
            });
            layer.close(index);
        }, function(index){
            layer.close(index);
        });
    }
});

module.exports = myApplyListView;