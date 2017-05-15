/**
 * Created by Kevin on 2016/12/6.
 */
var commonTemplate = require('html!./demandCommon.html');
var template = require('html!./demandFollow.html');
require('./demand.css');
require('util');


var followServersListModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryServiceFocus.do'
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


var followListView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'click .follow-list span': 'changeTab',
        'click .cancelFocus': 'cancelFocus'
    },
    initialize: function() {
        this.$el.html(_.template(commonTemplate)({name:'followDemand'}));

        this.childView = [followServersListView,followSourcesListView];
        this.$el.find('#demandInfo').html(template);
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
module.exports = followListView;