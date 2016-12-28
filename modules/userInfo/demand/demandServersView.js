/**
 * Created by Kevin on 2016/12/6.
 */
var commonTemplate = require('html!./demandCommon.html');
var template = require('html!./demandServersApi.html');
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
var publishServiceModel = Backbone.Model.extend({
    idAttribute: 'serviceId',
    url: mscxPage.request.demand + 'publishService.do'
});

var serversDemandListView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 10,
        pageNum: 1,
        totalPage: 0
    },
    events: {
        'click .deleteServers': 'deleteServers',
        'click .closeServers': 'closeServers',
        'click .servicePublish': 'publishDemand'
    },
    initialize: function() {
        this.$el.html(_.template(commonTemplate)({name:'serversDemand'}));
        var that = this;

        this.model = new demandServersListModel();
        this.publishServiceModel = new publishServiceModel();

        this.listenTo(this.publishServiceModel, 'sync', this.handlePublish);
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
    closeServers: function () {
        var that = this;
        var closeLay = layer.confirm('确认关闭这条数据需求吗？', {
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
            layer.msg('发布成功！');
            this.pagObj.pageNum = 1;
            this.reloadPage();
        }
    }
});
module.exports = serversDemandListView;