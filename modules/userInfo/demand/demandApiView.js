/**
 * Created by Kevin on 2016/12/6.
 */
var commonTemplate = require('html!./demandCommon.html');
var template = require('html!./demandApi.html');
require('./demand.css');
require('util');



var demandApiListModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryApi.do'
});
var deleteApiDemandModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'deleteApi.do'
});
var closeApiDemandModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'closeApi.do'
});
var publishApiModel = Backbone.Model.extend({
    idAttribute: 'apiId',
    url: mscxPage.request.demand + 'publishApi.do'
});
var apiOrderModel = Backbone.Model.extend({   //查看api需求接单列表
    url: mscxPage.request.demand + 'queryApiOrder.do'
});
var apiOrderPlanModel = Backbone.Model.extend({   //查看api需求接单方案
    url: mscxPage.request.demand + 'apiOrderDetail.do'
});

var addApiPlanModel = Backbone.Model.extend({   //确认接单
    idAttribute: 'apiId',
    url: mscxPage.request.demand + 'confirmApiOrder.do'
});

var refuseApiPlanModel = Backbone.Model.extend({   //拒绝接单
    idAttribute: 'apiId',
    url: mscxPage.request.demand + 'refuseApiOrder.do'
});
var apiDemandListView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 5,
        pageNum: 1,
        totalPage: 1
    },
    events: {
        'click .deleteApi': 'delteApi',
        'click .closeApi': 'closeApi',
        'click .apiPublish': 'publishDemand',
        'click .showApiInfo': 'showOrderList',
        'click .showApiPlanInfo': 'showApiPlanInfo',
        'click .ensureApiPlanInfo': 'ensureApiPlanInfo',
        'click .refuseApiPlanInfo': 'refuseApiPlanInfo'
    },
    initialize: function() {
        this.$el.html(_.template(commonTemplate)({name:'apiDemand'}));

        var that = this;

        this.model = new demandApiListModel();
        this.publishApiModel = new publishApiModel();
        this.apiOrderModel = new apiOrderModel();
        this.apiOrderPlanModel = new apiOrderPlanModel();
        this.addApiPlanModel = new addApiPlanModel();
        this.refuseApiPlanModel = new refuseApiPlanModel();

        this.listenTo(this.apiOrderPlanModel, 'sync', this.handleApiOrderPlan);
        this.listenTo(this.apiOrderModel, 'sync', this.handleApiOrder);
        this.listenTo(this.publishApiModel, 'sync', this.handlePublish);
        this.model.on('change',function () {
            that.render();
        });
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
        this.renderInitPage();
    },
    render: function () {
        var res = this.model.get('result'),
            that = this,
            apiDemandList = res.list,
            page = res.page;
        var temps = _.template($('#apiDemandList').html());
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        this.$el.find('tbody').html(temps({apiDemandList:apiDemandList}));
        laypage({
            cont: 'apiPage',
            skip: true,
            pages: this.pagObj.totalPage,
            curr: this.pagObj.pageNum || 1,
            jump: function(obj, first){
                if(!first){
                    that.pagObj.pageNum = obj.curr;
                    that.reloadPage();
                }
            }
        });
    },
    renderInitPage: function () {
        this.$el.find('#demandInfo').html(template);
    },
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    delteApi: function (e) {
        var that = this;
        var deleteLay = layer.confirm('确认删除这条API需求吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var sId = $(e.target).closest('tr').attr('attrid');
            new deleteApiDemandModel().save({id: sId},{
                type: 'POST',
                success: function () {
                    layer.msg('删除成功!');
                    if(that.model.get('result') && that.model.get('result').list && that.model.get('result').list.length == 1 && that.pagObj.pageNum != 1){
                        that.pagObj.pageNum--;
                    }
                    that.reloadPage();
                }
            });
            layer.close(deleteLay);
        }, function(){
            layer.close(deleteLay);
        });
    },
    closeApi: function (e) {
        var that = this;
        var closeLay = layer.confirm('确认关闭这条API需求吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var sId = $(e.target).closest('tr').attr('attrid');
            new closeApiDemandModel().save({id: sId},{
                type: 'POST',
                success: function () {
                    layer.msg('关闭成功!');
                    that.reloadPage();
                }
            });
            layer.close(closeLay);
        }, function(){
            layer.close(closeLay);
        });
    },
    publishDemand: function(event) {
        var id = this.$(event.currentTarget).data('id');

        this.publishApiModel.set('id', +id);
        this.publishApiModel.save();
    },
    handlePublish: function() {
        var model = this.publishApiModel.toJSON();
        if(model.status == 'OK') {
            layer.msg('发布成功！');
            this.pagObj.pageNum = 1;
            this.reloadPage();
        }
    },
    showOrderList: function(e) {
        this.apiOrderattrid = $(e.target).closest('tr').attr('attrId');
        this.apiOrderModel.fetch({
            data: {
                id: +this.apiOrderattrid,
                pageSize: 5
            }
        });
        this.$el.find('#demandApiOrderNameList tbody').html('');
        var dialog = layer.open({
            type: 1,
            btn: ['关闭'],
            title: '接单人列表',
            shade: 0.6,
            shadeClose: false,
            area: ['600px', '500px'],
            content: $('#demandApiOrderNameList'), //捕获的元素
            btn1: function () {          //通过
                layer.close(dialog);
            }
        })
    },
    handleApiOrder: function(res){
        res = res.toJSON().result;
        var that = this;
        var temps = _.template($('#demondApiOrderNameList').html());
        this.$el.find('#demandApiOrderNameList tbody').html(temps({apiOrderList: res.list}));
        laypage({
            cont: 'apiOrderPage',
            skip: true,
            pages: res.page.totalPage,
            curr: res.page.currentPage || 1,
            jump: function(obj, first){
                if(!first){
                    that.reloadApiOrderPage(obj.curr, res.page.pageSize);
                }
            }
        });
    },
    reloadApiOrderPage: function (curr) {
        this.apiOrderModel.fetch({
            data: {
                page: curr,
                id: +this.apiOrderattrid,
                pageSize: 5
            }
        });
    },
    showApiPlanInfo: function(e){
        var that = this,
            planId= $(e.target).closest('td').data('id');
        this.apiOrderPlanModel.fetch({
            data: {
                id: +planId
            }
        });
        this.$el.find('#apiOrderPlanDiv').html('');
        var dialog = layer.open({
            type: 1,
            btn: ['关闭'],
            title: '方案详情',
            shade: 0.6,
            shadeClose: false,
            area: ['500px', '320px'],
            content: $('#apiOrderPlanDiv'), //捕获的元素
            btn1: function () {          //通过
                layer.close(dialog);
            }
        })
    },
    handleApiOrderPlan: function(res){
        res = res.toJSON().result;
        var that = this;
        var temps = _.template($('#apiPlanInfo').html());
        this.$el.find('#apiOrderPlanDiv').html(temps({palnList: res}));
    },
    ensureApiPlanInfo: function(e){
        var planId = $(e.target).closest('td').data('id'),
            reqid = $(e.target).closest('td').data('reqid'),
            that = this;
        that.addApiPlanModel.save({
                id: +planId,
                reqId: +reqid
            },
            {success: function(res){
                res = res.toJSON();
                if(res.result == 1){
                    layer.msg('确认接单成功');
                    that.reloadApiOrderPage('1')
                }
                else {
                    layer.alert('确认接单失败');
                }
            }
            }
        )
    },
    refuseApiPlanInfo: function(e){
        var planId = $(e.target).closest('td').data('id'),
            reqid = $(e.target).closest('td').data('reqid'),
            that = this;
        that.refuseApiPlanModel.save({
            id: +planId,
            reqId: +reqid
        },{
            success: function(res){
                res = res.toJSON();
                if(res.result == 1){
                    layer.msg('拒绝接单成功');
                    that.reloadApiOrderPage('1')
                }
                else {
                    layer.alert('拒绝接单失败');
                }
            }
        })
    }
});
module.exports = apiDemandListView;