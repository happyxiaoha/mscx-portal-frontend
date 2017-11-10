/**
 * Created by Kevin on 2016/12/6.
 */


var commonTemplate = require('./saasCommon.html');
var followTemplate = require('./followSaas.html');
require('./saas.css');
require('util');
var saasFollowListModel = Backbone.Model.extend({
    url: mscxPage.request.saas + 'attention/list.do'
});
var unFollowModel = Backbone.Model.extend({
    url: mscxPage.request.saas + 'attention/delete.do'
});

var followSaasView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 10,
        pageNum: 1,
        totalPage: 1
    },
    events: {
        'click .cancelFollow': 'cancelFollow'
    },
    initialize: function() {
        var that = this;
        this.$el.addClass('user-center-tap');
        this.$el.html(_.template(commonTemplate)({name:'followSaas'}));
        this.model = new saasFollowListModel();
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
            followList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        var temps = _.template($('#SaaSFollowList').html());
        this.$el.find('tbody').html(temps({followSaaSList: followList}));
        laypage({
            cont: 'SaaSFollowPages',
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
        this.$el.find('#saasInfo').html(followTemplate);
    },
    cancelFollow: function (e) {
        var that = this;
        var $this = $(e.target).closest('tr');
        var sid = parseInt($this.data('id'));
        var deleteLayer = layer.confirm('确认要取消关注吗？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            new unFollowModel().fetch({
                data:{'id': sid},
                success: function () {
                    layer.msg('取消关注成功!');
                    if(that.model.get('result') && that.model.get('result').list && that.model.get('result').list.length == 1 && that.pagObj.pageNum != 1){
                        that.pagObj.pageNum--;
                    }
                    that.model.fetch({
                        data: {
                            pageSize: that.pagObj.pageSize,
                            page: that.pagObj.pageNum
                        }
                    });
                }
            });
            layer.close(deleteLayer);
        }, function(){
            layer.close(deleteLayer);
        });
    }
});

module.exports = followSaasView;