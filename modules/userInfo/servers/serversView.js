/**
 * Created by Kevin on 2016/12/6.
 */

var commonTemplate = require('html!./common.html');
var packageTabletemplate = require('html!./packageTableTemplate.html');
var template = require('html!./servers.html');
require('./servers.css');
require('util');
var packageWidgetView = require('packageWidget/packageItemView.js');

var publishListModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'publish/list.do'
});
var unshelveModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'unshelve.do'
});
var deleteModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'delete.do'
});
// 获取套餐信息
var detailChargeModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'publish/chargeRule/get.do'
});
var savePackageModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'chargeRule/modify.do'
});

// 发布的服务
var myPublishListView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: _.template(template),
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        'click .unshelve': 'unshelveService',
        'click .delete': 'deleteService',
        'click .reason': 'showReason',
        'click .changeServerPrice': 'changeServerChargePrice',
        'click .editServerCharge': 'editCharge',
        'click .removeServerCharge': 'removeCharge',
        'click .editServerChargeOth': 'editChargeOth',
        'click .addServerPrice': 'addCharge'
    },
    initialize: function() {
        this.$el.addClass('user-center-tap');
        this.$el.html(this.commonTemplate({name:'publish'}));

        this.$content = this.$('#serverInfo');

        this.model = new publishListModel();
        this.unshelveModel = new unshelveModel();
        this.deleteModel = new deleteModel();
        this.detailChargeModel = new detailChargeModel();

        this.listenTo(this.deleteModel, 'sync', this.handleOperation);
        this.listenTo(this.unshelveModel, 'sync', this.handleOperation);
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
    // initRender: function () {
    //     this.$el.html(this.templete({serverList:[]}));
    // },
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    unshelveService: function(event) {
        var id = this.$(event.currentTarget).data('id');
        var me = this;

        var confirmLay = layer.confirm('确认下架这条服务吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            me.unshelveModel.fetch({
                data: {
                    id: id
                }
            });
            layer.close(confirmLay);
        }, function(){
            layer.close(confirmLay);
        });   
    },
    deleteService: function(event) {
        var id = this.$(event.currentTarget).data('id');
        var me = this;

        var deleteLay = layer.confirm('确认删除这条服务吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            me.deleteModel.fetch({
                data: {
                    id: id
                }
            });
            layer.close(deleteLay);
        }, function(){
            layer.close(deleteLay);
        });  
    },
    handleOperation: function() {
        this.pagObj.pageNum = 1;
        this.reloadPage();
    },
    showReason: function(event) {
        var comment = this.$(event.currentTarget).data('comment');
        layer.open({
            title: '拒绝原因',
            content: comment
        });
    },
    buildPackageTable: function () {
        var res = this.chargeRule || this.detailChargeModel.get('result');
        if(!this.chargeRule){
            this.chargeRule = res;
        }
        var packageTemps = _.template(packageTabletemplate);
        $('.package-area').html(packageTemps({chargeSetJson:res}));
    },
    changeServerChargePrice: function (e) {
        var that = this,
            $this = $(e.target).closest('tr'),
            sId = this.$(e.currentTarget).data('id'),
            sName = $($this.find('td')[0]).html();
        this.serviceId = sId;
        this.detailChargeModel.fetch({
            data: {appId: sId},
            success: function () {
                that.chargeRule = null;
                that.buildPackageTable();
                buildLay();
            }
        });
        function buildLay() {
            var dialog = layer.open({
                type: 1,
                btn: ['保存修改','关闭'],
                title: sName+'调价',
                shade: 0.6,
                shadeClose: true,
                closeBtn:'1',
                area: ['600px', '450px'],
                content: $('.package-area'), //捕获的元素
                success: function () {
                },
                btn1: function () {          //通过
                    var conf = layer.confirm('将重新审核，请确认！', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        that.doSaveCharge();
                    }, function(){
                        layer.close(conf);
                    });
                },
                btn2: function () {          //通过
                    layer.close(dialog);
                }
            });
        }
    },
    doSaveCharge: function () {
        var that = this;
        new savePackageModel().save({params:this.chargeRule},{
            success: function () {
                layer.msg('保存成功,已提交审核!');
                setTimeout(function () {
                    layer.closeAll();
                    that.reloadPage();
                },2000);
            }
        });
    },
    editCharge: function (e) {
        var that = this;
        var chargeSetJson = that.chargeRule;
        var index = $(e.target).closest('tr').index();
        this.updateIndex = index;
        new packageWidgetView({
            el: '.server-package-area',
            attributes : {callbackFun:function(){that.saveCharge()}},
            model: chargeSetJson[index]
        });
        var dialog = this.dig = layer.open({
            type: 1,
            btn: ['保存','取消'],
            title: '修改收费规则',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['500px', '550px'],
            content: $('.server-package-area'), //捕获的元素
            btn1: function () {          //通过
                $('#serverChargePackage').submit();
            },
            btn2: function () {         // 不通过
                layer.close(dialog);
            }
        });
        return false;
    },
    removeCharge: function (e) {
        var that = this;
        var chargeRule = this.chargeRule || [];
        var deleteLay = layer.confirm('确认删除这条套餐吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var index = $(e.target).closest('tr').index();
            if(chargeRule[index].flag == 'C') {
                if(chargeRule.length == 1 && index == 0){
                    chargeRule = [];
                }
                else {
                    chargeRule.splice(index,1);
                }
            }
            else {
                chargeRule[index].flag = 'D';
            }
            that.chargeRule = chargeRule;
            that.buildPackageTable();
            layer.close(deleteLay);
        }, function(){
            layer.close(deleteLay);
        });
        return false;
    },
    editChargeOth: function (e) {
        var that = this;
        var chargeSetJson = that.chargeRule;
        var index = $(e.target).closest('tr').index();
        var obj = chargeSetJson[index];
        obj.isOth = true;
        this.updateIndex = index;
        new packageWidgetView({
            el: '.server-package-area',
            model: obj
        });
        var dialog = this.dig = layer.open({
            type: 1,
            btn: ['保存','取消'],
            title: '修改收费规则',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['500px', '550px'],
            content: $('.server-package-area'), //捕获的元素
            btn1: function () {          //通过
                //$('#serverChargePackage').submit();
                var chargeRule = that.chargeRule || [],
                    nowPackageObj = chargeRule[that.updateIndex];
                nowPackageObj.flag = nowPackageObj.flag == 'C' ? 'C': 'U';
                nowPackageObj.expiryDate = $('#expiryDate').val();
                chargeRule[that.updateIndex] = nowPackageObj;
                that.updateIndex = -1;
                that.chargeRule = chargeRule;
                that.buildPackageTable();
                layer.close(dialog);
            },
            btn2: function () {         // 不通过
                layer.close(dialog);
            }
        });
        return false;
    },
    updateIndex: -1,
    saveCharge: function () {
        layer.close(this.dig);
        var chargeRule = this.chargeRule || [],
            obj = $('#serverChargePackage').serializeObject();
        if(this.updateIndex < 0){
            obj.flag = 'C';
            obj.appId = this.serviceId;
            chargeRule.push(obj);
        }
        else {
            var prev = chargeRule[this.updateIndex];
            obj.flag = prev.flag || 'U';
            obj.appId = this.serviceId;
            chargeRule[this.updateIndex] = obj;
            this.updateIndex = -1;
        }
        this.chargeRule = chargeRule;
        this.buildPackageTable();
    },
    addCharge: function () {
        var that = this;
        new packageWidgetView({
            el: '.server-package-area',
            attributes : {callbackFun:function(){that.saveCharge()}},
            model: {}
        });
        var dialog = this.dig = layer.open({
            type: 1,
            btn: ['保存','取消'],
            title: '新增收费规则',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['500px', '550px'],
            content: $('.server-package-area'), //捕获的元素
            btn1: function () {          //通过
                $('#serverChargePackage').submit();
            },
            btn2: function () {         // 不通过
                layer.close(dialog);
            }
        });
        return false;
    }
});

module.exports = myPublishListView;