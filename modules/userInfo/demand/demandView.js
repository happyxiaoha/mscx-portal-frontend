/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./demand.html');
require('./demand.css');
require('util');


var demandApi = '/ro/mscx-requirement-api/';
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
    url: mscxPage.host+''+demandApi+'closeApi.do'
});
var deleteServerDemandModel = Backbone.Model.extend({
    url: mscxPage.host+''+demandApi+'deleteService.do'
});
var closeServerDemandModel = Backbone.Model.extend({
    url: mscxPage.host+''+demandApi+'closeService.do'
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
    url: mscxPage.host+''+demandApi+'cancelServiceFocus.do'
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
    url: mscxPage.host+''+demandApi+'reduceFocus.do'
});

var acceptServersModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryServiceOrderOfMe.do'
});
var acceptApiModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryMyApiOrder.do'
});
var acceptApiModel = Backbone.Model.extend({
    url: mscxPage.host+''+demandApi+'queryMyApiOrder.do'
});

var demandView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'click #demandTabs span': 'changeTab'
    },
    changeTab: function (e) {
        var $this = $(e.target),
            isActive = $this.hasClass('active'),
            index = $this.index();
        if(!isActive){
            $this.parent().find('.active').removeClass('active');
            $this.addClass('active');
            new this.childView[index]({el: '#demandInfo'});
        }
    },
    initialize: function(id) {
        if(id){
            this.id = id;
        }
        var index = 0;
        this.childView = [resourcesDemandListView,apiDemandListView,serversDemandListView,followListView,acceptView];
        this.$el.html(template);
        switch (this.id){
            case 'api':
                index = 1;
                $($('#demandTabs').find('span')[1]).addClass('active');
                break;
            case 'server':
                index = 2;
                $($('#demandTabs').find('span')[2]).addClass('active');
                break;
            default:
                $($('#demandTabs').find('span')[0]).addClass('active');
                break;
        }
        window.history.pushState({},0,'#demand');
        new this.childView[index]({el: '#demandInfo'});
    }
});
var resourcesDemandListView = Backbone.View.extend({
    pagObj: {
        pageSize: 3,
        pageNum: 1,
        totalPage: 1
    },
    events: {
        'click .deleteSource': 'deleteSource'
    },
    initialize: function() {

        var that = this;
        this.templete = _.template($('#resourcesDemandList').html());

        this.model = new demandListModel();
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
            sourcesList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        this.$el.html(this.templete({demandList:sourcesList}));
        laypage({
            cont: 'sourcesPage',
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
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    renderInitPage: function () {
        this.$el.html(this.templete({demandList:[]}));
    },
    deleteSource: function (e) {
        var that = this;
        var deleteLay = layer.confirm('确认删除这条数据需求吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var sId = $(e.target).closest('tr').attr('attrid');
            new deleteSourceDemandModel().save({id: sId},{
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
    }
});
var apiDemandListView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        'click .deleteApi': 'delteApi',
        'click .closeApi': 'closeApi'
    },
    initialize: function() {
        var that = this;
        this.templete = _.template($('#apiDemandList').html());
        this.model = new demandApiListModel();
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
            apiList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        this.$el.html(this.templete({apiDemandList:apiList}));
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
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    initRender: function () {
        this.$el.html(this.templete({apiDemandList:[]}));
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
    }
});
var serversDemandListView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1,
        totalPage: 0
    },
    events: {
        'click .deleteServers': 'deleteServers',
        'click .closeServers': 'closeServers'
    },
    initialize: function() {
        var that = this;
        this.templete = _.template($('#serversDemandList').html());

        this.model = new demandServersListModel();
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
        this.$el.html(this.templete({serverDemandList:serverDemandList}));
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
        this.$el.html(this.templete({serverDemandList:[]}));
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
    }
});
var followListView = Backbone.View.extend({
    events: {
        'click .follow-list span': 'changeTab'
    },
    initialize: function() {
        this.childView = [followServersListView,followApiListView,followSourcesListView];
        this.$el.html($('#followList').html());
        new this.childView[0]({
            el: '#followArea'
        });
    },
    changeTab: function (e) {
        var $this = $(e.target),
            isActive = $this.hasClass('active'),
            index = $this.index();
        if(!$this.is('span')){
            return;
        }
        if(!isActive){
            $this.parent().find('.active').removeClass('active');
            $this.addClass('active');
            new this.childView[index]({
                el: '#followArea'
            });
        }
        e.stopPropagation();
        e.preventDefault();
    }
});
var followServersListView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        'click .cancelFocus': 'cancelFocus'
    },
    initialize: function() {
        var that = this;
        this.templete = _.template($('#followServersList').html());
        this.model = new followServersListModel();
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
            focusServerList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        this.$el.html(this.templete({focusServerList: focusServerList}));
        laypage({
            cont: 'followAreaPage',
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
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    initRender: function () {
        this.$el.html(this.templete({focusServerList:[]}));
    },
    cancelFocus: function (e) {
        var that = this;
        var sId = parseInt($(e.target).closest('tr').attr('attrid'));
        var cancelLayer = layer.confirm('确认要取消关注吗？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            new reduceFocusServerModel().save({serviceId: sId},{
                type: 'POST',
                success: function () {
                    layer.msg('取消关注成功!');
                    if(that.model.get('result') && that.model.get('result').list && that.model.get('result').list.length == 1 && that.pagObj.pageNum != 1){
                        that.pagObj.pageNum--;
                    }
                    that.model.fetch({
                        pageSize: that.pagObj.pageSize,
                        page: that.pagObj.pageNum
                    });
                }
            });
            layer.close(cancelLayer);
        }, function(){
            layer.close(cancelLayer);
        });
    }
});
var followApiListView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        'click .cancelApiFocus': 'cancelFocus'
    },
    initialize: function() {
        var that = this;
        this.templete = _.template($('#followApiList').html());

        this.model = new followApiListModel();
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
            focusApiList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        this.$el.html(this.templete({focusApiList:focusApiList}));
        laypage({
            cont: 'followAreaPage',
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
    cancelFocus: function (e) {
        var that = this;
        var sId = $(e.target).closest('tr').attr('attrid');
        var cancelLayer = layer.confirm('确认要取消关注吗？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            new reduceFocusApiModel().save({id: sId},{
                type: 'POST',
                success: function () {
                    layer.msg('取消关注成功!');
                    if(that.model.get('result') && that.model.get('result').list && that.model.get('result').list.length == 1 && that.pagObj.pageNum != 1){
                        that.pagObj.pageNum--;
                    }
                    that.model.fetch({
                        pageSize: that.pagObj.pageSize,
                        page: that.pagObj.pageNum
                    });
                }
            });
            layer.close(cancelLayer);
        }, function(){
            layer.close(cancelLayer);
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
    initRender: function () {
        this.$el.html(this.templete({focusApiList:[]}));
    }
});
var followSourcesListView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        'click .cancelSourceslFocus': 'cancelFocus'
    },
    initialize: function() {
        var that = this;
        this.templete = _.template($('#followSourcesList').html());
        this.model = new followSourcesListModel();
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
    cancelFocus: function (e) {
        var that = this;
        var sId = parseInt($(e.target).closest('tr').attr('attrid'));
        var cancelLayer = layer.confirm('确认要取消关注吗？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            new reduceFocusSourcesModel().save({id: sId},{
                type: 'POST',
                success: function () {
                    layer.msg('取消关注成功!');
                    if(that.model.get('result') && that.model.get('result').list && that.model.get('result').list.length == 1 && that.pagObj.pageNum != 1){
                        that.pagObj.pageNum--;
                    }
                    that.model.fetch({
                        pageSize: that.pagObj.pageSize,
                        page: that.pagObj.pageNum
                    });
                }
            });
            layer.close(cancelLayer);
        }, function(){
            layer.close(cancelLayer);
        });
    },
    render: function () {
        var res = this.model.get('result'),
            that = this,
            followSourceList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        this.$el.html(this.templete({followSourceList:followSourceList}));
        laypage({
            cont: 'followAreaPage',
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
        this.$el.html(this.templete({followSourceList:[]}));
    }
});
var acceptView = Backbone.View.extend({
    events: {
        'click .accept-list span': 'changeTab'
    },
    initialize: function() {
        this.childView = [acceptServersView,acceptApiView];
        this.$el.html($('#myAccept').html());
        new this.childView[0]({
            el: '#acceptArea'
        });
    },
    changeTab: function (e) {
        var $this = $(e.target),
            isActive = $this.hasClass('active'),
            index = $this.index();
        if(!$this.is('span')){
            return;
        }
        if(!isActive){
            $this.parent().find('.active').removeClass('active');
            $this.addClass('active');
            new this.childView[index]({
                el: '#acceptArea'
            });
        }
        e.stopPropagation();
        e.preventDefault();
    }
});
var acceptApiView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        
    },
    initialize: function() {
         var that = this;
         this.templete = _.template($('#myApiAccept').html());
         this.model = new acceptApiModel();
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
            acceptApiList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        this.$el.html(this.templete({acceptApiList: acceptApiList}));
        laypage({
            cont: 'acceptPages',
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
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    initRender: function () {
        this.$el.html(this.templete({acceptApiList:[]}));
    }
});
var acceptServersView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {

    },
    initialize: function() {
        var that = this;
        this.templete = _.template($('#myServerAccept').html());
        this.model = new acceptServersModel();
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
            acceptServersList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        this.$el.html(this.templete({acceptServersList: acceptServersList}));
        laypage({
            cont: 'acceptPages',
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
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    initRender: function () {
        this.$el.html(this.templete({acceptServersList:[]}));
    }
});
module.exports = demandView;