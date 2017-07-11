/**
 * Created by Kevin on 2016/12/6.
 */

var commonTemplate = require('./incubatorCommon.html');
var template = require('./followRoadShow.html');
require('./incubator.css');
require('util');

var followRoadShowModel = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/getAttentionRoadByUserId.do'
});
var cacelRoadShowFollowModel = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/deleteUserAttention.do'
});


var followListView = Backbone.View.extend({
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
        this.$el.html(_.template(commonTemplate)({name:'followIncubator'}));
        this.model = new followRoadShowModel();
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
        var followRoadList = [], page = {};
        if(res){
            followRoadList = res.list;
            var page = res.page || {totalPage:0,currentPage:0,totalPage:0};
            this.pagObj.totalPage = page.totalPage;
            this.pagObj.pageNum = page.currentPage;
        }
        var temps = _.template($('#followRoadList').html());
        this.$el.find('tbody').html(temps({followRoadList:followRoadList}));
        laypage({
            cont: 'followRoad',
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
            new cacelRoadShowFollowModel().fetch({
                data:{'roadId': sid},
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

module.exports = followListView;