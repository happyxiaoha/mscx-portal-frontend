/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./api.html');
require('./api.css');
require('util');

var myPublicModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/getMyPublishedApi.do'
});
var applyApiListModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'api/getSelfApiList.do'
});
var followApiListModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/getMyAttentionApi.do'
});
var cacelApiListModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'userAttention/remove.do'
});
var deleteServerDemandModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'deleteService.do'
});


var apiView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'click #apiTabs span': 'changeTab'
    },
    changeTab: function (e) {
        var $this = $(e.target),
            isActive = $this.hasClass('active'),
            index = $this.index();
        if(!isActive){
            $this.parent().find('.active').removeClass('active');
            $this.addClass('active');
            new this.childView[index]({el: '#apiInfo'});
        }
    },
    initialize: function() {
        this.childView = [myApiListView,myApplyListView,serversDemandListView];
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
var myApplyListView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        // 'click .applyApi': 'applyApiAgain'
    },
    initialize: function() {
        var that = this;
        this.templete = _.template($('#apiApplyList').html());

        this.model = new applyApiListModel();
        this.model.on('change',function () {
            that.render()
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
        var that = this,
            res = this.model.get('result') || {},
            applyApiList = res.list|| [],
            page = res.page || {currentPage:1,totalSize:1,totalPage:1};

        this.pagObj.pageNum = page.currentPage;
        this.pagObj.pageTotal = page.totalSize;
        this.$el.html(this.templete({applyApiList:applyApiList}));
        laypage({
            cont: 'applyApiPages',
            pages: page.totalPage,
            skip: true,
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
    }
    // ,
    // applyApiAgain: function (e) {
    //     var $this = $(e.target).closest('tr'),
    //         sourceId = $this.attr('attrId'),
    //         sourcePakcageId = $this.attr('attrPackageId');

    //     //do apply again，跳转至API详情页面
    //     location.href = 'api.html#detail/' + sourceId;
    // }
});
var serversDemandListView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1,
        totalPage: 0
    },
    events: {
        'click .cancelFollow': 'cancelFocus'
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
        this.render();
    },
    render: function () {
        var that = this;
        var res = this.model.get('result');
        var followApiList = [], page = {};
        if(res){
            followApiList = res.list;
            var page = res.page || {totalPage:0,currentPage:0,totalPage:0};
            this.pagObj.totalPage = page.totalPage;
            this.pagObj.pageNum = page.currentPage;
        }
        this.$el.html(this.templete({followApiList:followApiList}));
        laypage({
            cont: 'followApi',
            pages: page.totalPage,
            skip: true,
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
        var $this = $(e.target).closest('tr');
        var sid = parseInt($this.attr('attrId'));
        var deleteLayer = layer.confirm('确认要取消关注吗？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            new cacelApiListModel().fetch({
                data:{'apiServiceId': sid},
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
            layer.close(deleteLayer);
        }, function(){
            layer.close(deleteLayer);
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
module.exports = apiView;