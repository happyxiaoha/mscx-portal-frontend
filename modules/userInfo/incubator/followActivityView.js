/**
 * Created by Kevin on 2016/12/6.
 */

var commonTemplate = require('html!./incubatorCommon.html');
var template = require('html!./followActivity.html');
require('./incubator.css');
require('util');

var followActivityModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/getAttentionActivityByUserId.do'
});
var cacelActivityFollowModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/deleteUserAttention.do'
});


var followActivityView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
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
        this.$el.html(_.template(commonTemplate)({name:'followActivity'}));
        this.model = new followActivityModel();
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
    initRender: function () {
        this.$el.addClass('user-center-tap');
        this.$el.find('#incubatorInfo').html(template);
    },
    render: function () {
        var that = this;
        var res = this.model.get('result');
        var followActivityList = [], page = {};
        if(res){
            followActivityList = res.list;
            var page = res.page || {totalPage:0,currentPage:0,totalPage:0};
            this.pagObj.totalPage = page.totalPage;
            this.pagObj.pageNum = page.currentPage;
        }
        var temps = _.template($('#followActivityList').html());
        this.$el.find('tbody').html(temps({followActivityList:followActivityList}));
        laypage({
            cont: 'followActivity',
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
        var $this = $(e.target);
        var sid = parseInt($this.data('id'));
        var deleteLayer = layer.confirm('确认要取消关注吗？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            new cacelActivityFollowModel().fetch({
                data:{'activityId': sid},
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

module.exports = followActivityView;