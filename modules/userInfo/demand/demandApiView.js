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
var apiDemandListView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 3,
        pageNum: 1,
        totalPage: 1
    },
    events: {
        'click .deleteApi': 'delteApi',
        'click .closeApi': 'closeApi',
        'click .apiPublish': 'publishDemand',
        'click .showApiInfo': 'showOrderList'
    },
    initialize: function() {
        this.$el.html(_.template(commonTemplate)({name:'apiDemand'}));

        var that = this;

        this.model = new demandApiListModel();
        this.publishApiModel = new publishApiModel();
        this.apiOrderModel = new apiOrderModel();

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
        var attrid = $(e.target).closest('tr').attr('attrId');
        this.apiOrderModel.fetch({
            data: {
                id: +attrid
            }
        });
        var dialog = layer.open({
            type: 1,
            btn: ['关闭'],
            title: '接单人列表',
            shade: 0.6,
            shadeClose: true,
            area: ['600px', '500px'],
            content: $('#orderNameList'), //捕获的元素
            btn1: function () {          //通过
                layer.close(dialog);
            }
        })
    },
    handleApiOrder: function(res){
        res = res.toJSON().result;
        var temps = _.template($('#apiOrderNameList').html());
        this.$el.find('#orderNameList').html(temps({apiOrderList: res}));
    }
});
module.exports = apiDemandListView;