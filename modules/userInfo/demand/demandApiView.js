/**
 * Created by Kevin on 2016/12/6.
 */
var commonTemplate = require('html!./demandCommon.html');
var template = require('html!./demandApi.html');
require('./demand.css');
require('util');


var demandListModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryData.do'
});

var deleteSourceDemandModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'deleteData.do'
});

var demandApiListModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryApi.do'
});
var deleteApiDemandModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'deleteApi.do'
});
var closeApiDemandModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'closeApi.do'
});
var deleteServerDemandModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'deleteService.do'
});
var closeServerDemandModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'closeService.do'
});
var closeApiDemandModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'closeApi.do'
});
var deleteServerDemandModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'deleteService.do'
});
var closeServerDemandModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'closeService.do'
});

var demandServersListModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryServiceListOfMe.do'
});
var deleteServerDemandModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'deleteService.do'
});


var followServersListModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryServiceFocus.do'
});
var reduceFocusServerModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'cancelServiceFocus.do'
});
var reduceFocusServerModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'cancelServiceFocus.do'
});

var followApiListModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryApiFocus.do'
});
var reduceFocusApiModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'reduceApiFocus.do'
});
var followSourcesListModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryFocus.do'
});
var reduceFocusSourcesModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'reduceFocus.do'
});
var reduceFocusSourcesModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'reduceFocus.do'
});

var acceptServersModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryServiceOrderOfMe.do'
});
var acceptApiModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryMyApiOrder.do'
});
var acceptApiModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryMyApiOrder.do'
});

var publishDataModel = Backbone.Model.extend({
    idAttribute: 'dataId',
    url: mscxPage.request.demand + 'publishData.do'
});
var publishApiModel = Backbone.Model.extend({
    idAttribute: 'apiId',
    url: mscxPage.request.demand + 'publishApi.do'
});
var publishServiceModel = Backbone.Model.extend({
    idAttribute: 'serviceId',
    url: mscxPage.request.demand + 'publishService.do'
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
        'click .apiPublish': 'publishDemand'
    },
    initialize: function() {
        this.$el.html(_.template(commonTemplate)({name:'apiDemand'}));

        var that = this;

        this.model = new demandApiListModel();
        this.publishApiModel = new publishApiModel();

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
    }
});
module.exports = apiDemandListView;