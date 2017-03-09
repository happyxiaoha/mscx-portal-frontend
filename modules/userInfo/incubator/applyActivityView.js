/**
 * Created by Kevin on 2016/12/6.
 */

var commonTemplate = require('html!./incubatorCommon.html');
var template = require('html!./applyActivity.html');
require('./incubator.css');
require('util');

var signActivityModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/getSignActivityByUserId.do'
});
var cacelSingModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/deleteUserSign.do'
});


var signView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 10,
        pageNum: 1,
        totalPage: 0
    },
    events: {
        'click .cancelSign': 'cancelSign'
    },
    initialize: function() {
        var that = this;
        this.$el.html(_.template(commonTemplate)({name:'callActivity'}));
        this.model = new signActivityModel();
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
        var signActivityList = [], page = {};
        if(res){
            signActivityList = res.list;
            var page = res.page || {totalPage:0,currentPage:0,totalPage:0};
            this.pagObj.totalPage = page.totalPage;
            this.pagObj.pageNum = page.currentPage;
        }
        var temps = _.template($('#signAListTemps').html());
        this.$el.find('tbody').html(temps({signActivityList:signActivityList}));
        laypage({
            cont: 'signActivity',
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
    cancelSign: function (e) {
        var that = this;
        var $this = $(e.target);
        var sid = parseInt($this.data('id'));
        var deleteLayer = layer.confirm('确认要取消报名吗？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            new cacelSingModel().fetch({
                data:{'activityId': sid},
                success: function () {
                    layer.msg('取消报名成功!');
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

module.exports = signView;