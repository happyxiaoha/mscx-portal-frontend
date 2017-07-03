/**
 * Created by Kevin on 2016/12/6.
 */

var commonTemplate = require('./apiCommon.html');
var template = require('./followApi.html');
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
        this.$el.html(_.template(commonTemplate)({name:'follow'}));
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
    initRender: function () {
        this.$el.addClass('user-center-tap');
        this.$el.find('#apiInfo').html(template);
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
        var temps = _.template($('#followApiList').html());
        this.$el.find('tbody').html(temps({followApiList:followApiList}));
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
                        data: {
                            pageSize: this.pagObj.pageSize,
                            page: this.pagObj.pageNum
                        }
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