/**
 * Created by Kevin on 2016/12/6.
 */
var commonTemplate = require('html!./demandCommon.html');
var template = require('html!./demandAccept.html');
require('./demand.css');
require('util');



var acceptServersModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryServiceOrderOfMe.do'
});
var acceptApiModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryMyApiOrder.do'
});


var acceptView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'click .accept-list span': 'changeTab'
    },
    initialize: function() {
        this.$el.html(_.template(commonTemplate)({name:'acceptDemand'}));
        this.childView = [acceptServersView,acceptApiView];
        this.$el.find('#demandInfo').html(template);
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
module.exports = acceptView;