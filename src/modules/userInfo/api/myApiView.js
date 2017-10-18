/**
 * Created by Kevin on 2016/12/6.
 */

var commonTemplate = require('./apiCommon.html');
var template = require('./myApi.html');
require('./api.css');
require('util');

var applyApiListModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'api/getSelfApiList.do'
});

var smsDetailModel = Backbone.Model.extend({
    url: mscxPage.request.sms + 'userNotice/getNotice.do'
});

var sendMessageModel = Backbone.Model.extend({
    url: mscxPage.request.mes + 'msg/addMessageInfos.do'
});


var myApiView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        'click .sms-detail': 'getSmsDetail'
    },
    initialize: function() {
        var that = this;
        this.$el.addClass('user-center-tap');
        this.$el.html(_.template(commonTemplate)({name:'myApi'}));

        this.model = new applyApiListModel();
        this.smsDetailModel = new smsDetailModel();
        this.sendMessageModel = new sendMessageModel();

        this.listenTo(this.smsDetailModel, 'sync', this.showSmsDetail)
        this.model.on('change',function () {
            that.render()
        });
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
        this.initRender();
    },
    render: function () {
        var that = this,
            res = this.model.get('result') || {},
            applyApiList = res.list|| [],
            page = res.page || {currentPage:1,totalSize:1,totalPage:1};
        var temps = _.template($('#apiApplyList').html());
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.pageTotal = page.totalSize;
        this.$el.find('tbody').html(temps({applyApiList:applyApiList}));
        this.smsTemplate = _.template($('#smsDetail').html());
        laypage({
            cont: 'applyApiPages',
            pages: page.totalPage,
            skip: true,
            curr: this.pagObj.pageNum || 1,
            jump: function(obj, first){
                if(!first){
                    that.pagObj.pageNum = obj.curr;
                    that.reloadPage();
                }
            }
        });
    },
    initRender: function () {
        this.$el.find('#apiInfo').html(template);
    },
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    getSmsDetail: function () {
        this.smsDetailModel.fetch();
    },
    showSmsDetail: function () {
        var model = this.smsDetailModel.toJSON();

        model.result.attachmentUri = '/ro/mscx-sms-api' + model.result.attachmentUri

        this.sendMessageModel.save({
            msgTitle: '请求使用详情',
            msgContent: model.result.msg + '<br/><% attachment=' + model.result.attachmentUri + '%>',
            userIds: mscxPage.userInfo.userId,
            resType: 'SMS'
        })

        layer.msg('请到站内信中查看！')
        // var dialog = layer.open({
        //     type: 1,
        //     btn: ['关闭'],
        //     title: '请求使用详情',
        //     shade: 0.6,
        //     shadeClose: true,
        //     area: ['500px', '300px'],
        //     content: this.smsTemplate({data: model.result}),
        //     btn1: function () {
        //         layer.close(dialog);
        //     }
        // });
    }
});
module.exports = myApiView;