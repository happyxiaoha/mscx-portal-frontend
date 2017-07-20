/**
 * Created by Kevin on 2016/12/6.
 */
var commonTemplate = require('./demandCommon.html');
var template = require('./demandServersApi.html');
require('./demand.css');
require('util');


var closeServerDemandModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'closeService.do'
});

var demandServersListModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryServiceListOfMe.do'
});
var deleteServerDemandModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'deleteService.do'
});

var serOrderModel = Backbone.Model.extend({   //查看服务需求接单列表
    url: mscxPage.request.demand + 'queryServiceOrder.do'
});

var serOrderPlanModel = Backbone.Model.extend({   //查看服务需求接单方案
    url: mscxPage.request.demand + 'getServiceOrder.do'
});

var addPlanModel = Backbone.Model.extend({   //确认接单
    idAttribute: 'serviceId',
    url: mscxPage.request.demand + 'confirmServiceOrder.do'
});

var refusePlanModel = Backbone.Model.extend({   //拒绝接单
    idAttribute: 'serviceId',
    url: mscxPage.request.demand + 'refuseServiceOrder.do'
});

var publishServiceModel = Backbone.Model.extend({
    idAttribute: 'serviceId',
    url: mscxPage.request.demand + 'publishService.do'
});

var guaranteeDetailModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getRequirementGuaranteeByReqId.do'
});

var serversDemandListView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 5,
        pageNum: 1,
        totalPage: 0
    },
    events: {
        'click .deleteServers': 'deleteServers',
        'click .closeServers': 'closeServers',
        'click .servicePublish': 'publishDemand',
        'click .showSerOrderInfo':　'showSerOrderList',
        'click .showSerPlanInfo': 'showPlanInfo',
        'click .ensureSerPlanInfo': 'ensureSerPlanInfo',
        'click .refuseSerPlanInfo': 'refuseSerPlanInfo'
    },
    initialize: function() {
        this.$el.html(_.template(commonTemplate)({name:'serversDemand'}));
        var that = this;

        this.model = new demandServersListModel();
        this.publishServiceModel = new publishServiceModel();

        this.serOrderModel = new serOrderModel();
        this.serOrderPlanModel = new serOrderPlanModel();
        this.addPlanModel = new addPlanModel();
        this.refusePlanModel = new refusePlanModel();
        this.guaranteeDetailModel = new guaranteeDetailModel();

        this.listenTo(this.serOrderPlanModel, 'sync', this.handleSerOrderPlan);
        this.listenTo(this.serOrderModel, 'sync', this.handleSerOrder);
        this.listenTo(this.publishServiceModel, 'sync', this.handlePublish);
        this.listenTo(this.guaranteeDetailModel, 'sync', this.renderGuaranteeDetail);
        this.model.on('change',function () {
            that.render();
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
        var res = this.model.get('result'),
            that = this,
            serverDemandList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        var temps = _.template($('#serversDemandList').html());
        this.payTipTemplate = _.template($('#payTipTemplate').html(), {variable: 'data'});
        this.$el.find('tbody').html(temps({serverDemandList:serverDemandList}));
        laypage({
            cont: 'serverPage',
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
    initRender: function () {
        this.$el.find('#demandInfo').html(template);
    },
    deleteServers: function (e) {
        var that = this;
        var deleteLay = layer.confirm('确认删除这条服务需求吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var sId = $(e.target).closest('tr').attr('attrid');
            new deleteServerDemandModel().save({id: sId},{
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
    closeServers: function (e) {
        var that = this;
        var closeLay = layer.confirm('确认关闭这条服务需求吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var sId = $(e.target).closest('tr').attr('attrid');
            new closeServerDemandModel().save({id: sId},{
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
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    publishDemand: function(event) {
        var id = this.$(event.currentTarget).data('id');

        this.publishServiceModel.set('id', +id);
        this.publishServiceModel.save();
    },
    handlePublish: function() {
        var model = this.publishServiceModel.toJSON();
        if(model.status == 'OK') {
            layer.msg('发布成功，请耐心等待审核');
            this.pagObj.pageNum = 1;
            this.reloadPage();
        }
    },
    showSerOrderList: function (e){
        var that = this;
        that.serOrderattrid = $(e.target).closest('tr').attr('attrId');
        this.serOrderModel.fetch({
            data: {
                reqId: +that.serOrderattrid,
                pageSize: 5
            }
        });
        this.guaranteeDetailModel.fetch({
            data: {
                reqId: this.serOrderattrid
            }
        })
        this.$el.find('#serNameList tbody').html('');
        var dialog = layer.open({
            type: 1,
            btn: ['关闭'],
            title: '接单人列表',
            shade: 0.6,
            shadeClose: false,
            area: ['600px', '500px'],
            content: $('#serNameList'), //捕获的元素
            btn1: function () {          //通过
                layer.close(dialog);
            }
        })
    },
    handleSerOrder: function(res){
        res = res.toJSON().result;
        var that = this;
        var temps = _.template($('#serOrderNameList').html());
        this.$el.find('#serNameList tbody').html(temps({serOrderList: res.list}));
        laypage({
            cont: 'serOrderPage',
            skip: true,
            pages: res.page.totalPage,
            curr: res.page.currentPage || 1,
            jump: function(obj, first){
                if(!first){
                    that.reloadSerOrderPage(obj.curr, res.page.pageSize);
                }
            }
        });
    },
    reloadSerOrderPage: function (curr) {
        this.serOrderModel.fetch({
            data: {
                page: curr,
                reqId: +this.serOrderattrid,
                pageSize: 5
            }
        });
        this.guaranteeDetailModel.fetch({
            data: {
                reqId: this.serOrderattrid
            }
        })
    },
    renderGuaranteeDetail: function() {
        var model = this.guaranteeDetailModel.toJSON();

        if(model.status == 'OK') {
            model = model.result;
            model.reqId = this.serOrderattrid;

            this.$('#payTip').html(this.payTipTemplate(model)).show();
        }
    },
    showPlanInfo: function(e){
        var that = this,
            planId = $(e.target).closest('td').data('id');
        this.serOrderPlanModel.fetch({
            data: {
                id: +planId
            }
        });
        this.$el.find('#serOrderPlanDiv').html('');
        var dialog = layer.open({
            type: 1,
            btn: ['关闭'],
            title: '方案详情',
            shade: 0.6,
            shadeClose: false,
            area: ['500px', '320px'],
            content: $('#serOrderPlanDiv'), //捕获的元素
            btn1: function () {          //通过
                layer.close(dialog);
            }
        })
    },
    handleSerOrderPlan: function(res){
        res = res.toJSON().result;
        var that = this;
        var temps = _.template($('#serPlanInfo').html());
        this.$el.find('#serOrderPlanDiv').html(temps({palnList: res}));
    },
    ensureSerPlanInfo: function(e){
        var planId = $(e.target).closest('td').data('id'),
            that = this;

        layer.confirm('平台只允许确认一个接单人项目，确认后其他将自动关闭，是否确认？', function() {
            that.addPlanModel.save({
                id: +planId
            },{
                success: function(res){
                    res = res.toJSON();
                    if(res.result == 1){
                        layer.msg('确认接单成功');
                        that.reloadSerOrderPage('1')
                    }
                    else {
                        layer.alert('拒绝接单失败');
                    }
                }
            })
        })
        
    },
    refuseSerPlanInfo: function(e){
        var planId = $(e.target).closest('td').data('id'),
            that = this;
        that.refusePlanModel.save({
                id: +planId
            },{
            success: function(res){
                res = res.toJSON();
                if(res.result == 1){
                    layer.msg('拒绝接单成功');
                    that.reloadSerOrderPage('1')
                }
                else {
                    layer.alert('拒绝接单失败');
                }
            }
        })
    }
});
module.exports = serversDemandListView;