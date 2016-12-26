/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./servers.html');
require('./servers.css');
require('util');


var publishListModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'publish/list.do'
});
var followListModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'attention/list.do'
});
var unfollowModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'attention/delete.do'
});
var unshelveModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'unshelve.do'
});
var deleteModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'delete.do'
});


var serversView = Backbone.View.extend({
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
            new this.childView[index]({el: '#serverInfo'});
        }
    },
    initialize: function() {
        this.childView = [myPublishListView, myFollowListView];
        this.$el.html(template);
        new myPublishListView({el: '#serverInfo'});
    }
});

// 发布的服务
var myPublishListView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        'click .unshelve': 'unshelveService',
        'click .delete': 'deleteService'
    },
    initialize: function() {
        this.templete = _.template($('#serverPublishList').html());

        this.model = new publishListModel();
        this.unshelveModel = new unshelveModel();
        this.deleteModel = new deleteModel();

        this.listenTo(this.deleteModel, 'sync', this.handleOperation);
        this.listenTo(this.unshelveModel, 'sync', this.handleOperation);
        this.listenTo(this.model, 'sync', this.render);

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
            me = this,
            serverList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        this.$el.html(this.templete({serverList:serverList}));
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
    initRender: function () {
        this.$el.html(this.templete({serverList:[]}));
    },
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
        this.unshelveModel.fetch({
            data: {
                id: id
            }
        })
    },
    deleteService: function() {
        var id = this.$(event.currentTarget).data('id');
        this.deleteModel.fetch({
            data: {
                id: id
            }
        })
    },
    handleOperation: function() {
        this.pagObj.pageNum = 1;
        this.reloadPage();
    }
});

// 关注的服务
var myFollowListView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        'click .unfollow': 'unFollowService'
    },
    initialize: function() {
        this.templete = _.template($('#serverFollowList').html());

        this.model = new followListModel();
        this.unfollowModel = new unfollowModel();
        this.listenTo(this.model, 'sync', this.render);
        this.listenTo(this.unfollowModel, 'sync', this.reloadPage);

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
            me = this,
            followList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        this.$el.html(this.templete({followList: followList}));
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
    initRender: function () {
        this.$el.html(this.templete({followList:[]}));
    },
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    unFollowService: function(event) {
        var id = this.$(event.currentTarget).data('id');

        this.pagObj.pageNum = 1;
        this.unfollowModel.fetch({
            data: {
                id: parseInt(id)
            }
        })
    }
});

module.exports = serversView;