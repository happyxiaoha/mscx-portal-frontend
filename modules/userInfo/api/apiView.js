/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./api.html');
require('./api.css');

var apiApi = '/ro/mscx-api-api/';
var myPublicModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/getMyPublishedApi.do'
});
var demandApiListModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'queryApi.do'
});
var demandServersListModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'queryServiceListOfMe.do'
});
var deleteServerDemandModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'deleteService.do'
});


var apiView = Backbone.View.extend({
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
    initialize: function() {
        this.childView = [myApiListView,apiDemandListView,serversDemandListView,followListView,acceptView];
        this.$el.html(template);
        new myApiListView({el: '#apiInfo'});
    }
});

var myApiListView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        
    },
    initialize: function() {
        var that = this;
        this.templete = _.template($('#myApiList').html());

        this.model = new myPublicModel();
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

    },
    initRender: function () {
        this.$el.html(this.templete({demandList:[]}));
    }
});
var apiDemandListView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
    },
    initialize: function() {
        this.templete = _.template($('#apiDemandList').html());

        this.model = new demandApiListModel();
        this.model.on('change',this.render);
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
        this.render();
    },
    render: function () {
        this.$el.html(this.templete({apiDemandList:[]}));
    }
});
var serversDemandListView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1,
        totalPage: 0
    },
    events: {
        'click .editS': 'updateServers',
        'click .deleteS': 'deleteServers',
        'click .closeS': 'closeServers',
        'click .downS': 'downServers'
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
        this.render();
    },
    render: function () {
        var res = this.model.get('result');
        var serverDemandList = [];
        if(res){
            serverDemandList = res.list;
            var page = res.page || {totalPage:0,currentPage:0};
            this.pagObj.totalPage = page.totalPage;
            this.pagObj.pageNum = page.currentPage;
        }
        this.$el.html(this.templete({serverDemandList:serverDemandList}));
    },
    deleteServers: function (e) {
        var that = this;
        var $this = $(e.target).is('tr') ? $(e.target) : $(e.target).parent();
        var sid = $this.attr('attrId');
        var deleteLayer = layer.confirm('确认要删除吗？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            new deleteServerDemandModel().fetch({
                data: {
                    id: sid
                },
                success: function () {
                    layer.msg('删除成功!');
                    that.model.fetch({
                        pageSize: this.pagObj.pageSize,
                        page: this.pagObj.pageNum
                    });
                }
            });
            layer.close(deleteLayer);
        }, function(){
            layer.close(deleteLayer);
        });
    },
    closeServers: function () {
        var that = this;
        var $this = $(e.target).is('tr') ? $(e.target) : $(e.target).parent();
        var sid = $this.attr('attrId');
        var deleteLayer = layer.confirm('确认要关闭吗？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            new deleteServerDemandModel().fetch({
                data: {
                    id: sid
                },
                success: function () {
                    layer.msg('关闭成功!');
                    that.model.fetch({
                        pageSize: this.pagObj.pageSize,
                        page: this.pagObj.pageNum
                    });
                }
            });
            layer.close(deleteLayer);
        }, function(){
            layer.close(deleteLayer);
        });
    },
    downServers: function () {
        var that = this;
        var $this = $(e.target).is('tr') ? $(e.target) : $(e.target).parent();
        var sid = $this.attr('attrId');
        var deleteLayer = layer.confirm('确认要下架吗？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            new deleteServerDemandModel().fetch({
                data: {
                    id: sid
                },
                success: function () {
                    layer.msg('下架成功!');
                    that.model.fetch({
                        pageSize: this.pagObj.pageSize,
                        page: this.pagObj.pageNum
                    });
                }
            });
            layer.close(deleteLayer);
        }, function(){
            layer.close(deleteLayer);
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
        this.render();
    },
    render: function () {
        this.$el.html(this.templete({demandList:[]}));
    }
});
var followApiListView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {

    },
    initialize: function() {
        this.templete = _.template($('#followApiList').html());
        /*
        this.model = new demandListModel();
        this.model.on('change',this.render);
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
        */
        this.render();
    },
    render: function () {
        this.$el.html(this.templete({demandList:[]}));
    }
});
var followSourcesListView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {

    },
    initialize: function() {
        this.templete = _.template($('#followSourcesList').html());
        /*
        this.model = new demandListModel();
        this.model.on('change',this.render);
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
        */
        this.render();
    },
    render: function () {
        this.$el.html(this.templete({demandList:[]}));
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
var acceptServersView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {

    },
    initialize: function() {
        this.templete = _.template($('#myServerAccept').html());
        /*
         this.model = new demandListModel();
         this.model.on('change',this.render);
         this.model.fetch({
         data: {
         pageSize: this.pagObj.pageSize,
         page: this.pagObj.pageNum
         }
         });*/
        this.render();
    },
    render: function () {
        this.$el.html(this.templete({demandList:[]}));
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
        this.templete = _.template($('#myApiAccept').html());
        /*
         this.model = new demandListModel();
         this.model.on('change',this.render);
         this.model.fetch({
         data: {
         pageSize: this.pagObj.pageSize,
         page: this.pagObj.pageNum
         }
         });
         */
        this.render();
    },
    render: function () {
        this.$el.html(this.templete({demandList:[]}));
    }
});
module.exports = apiView;