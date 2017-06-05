'use strict'

var commonTemplate = require('html!./saasCommon.html');
var template = require('html!./follow.html');
require('./saas.css');
require('util');

var followListModel = Backbone.Model.extend({
    url: mscxPage.request.saas + 'attention/list.do'
});
var unfollowModel = Backbone.Model.extend({
    url: mscxPage.request.saas + 'attention/delete.do'
});

// 关注的服务
var myFollowListView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: _.template(template),
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        'click .unfollow': 'unFollowService'
    },
    initialize: function() {
        this.$el.html(this.commonTemplate({name:'follow'}));

        this.$content = this.$('#saasInfo');

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
    },
    render: function () {
        var res = this.model.get('result'),
            me = this,
            followList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        this.$content.html(this.template({followList: followList}));
        
        laypage({
            cont: 'saasPage',
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
    // initRender: function () {
    //     this.$el.html(this.templete({followList:[]}));
    // },
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
        var me = this;

        var unfollowLay = layer.confirm('确认取消关注这条服务吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            me.pagObj.pageNum = 1;
            me.unfollowModel.fetch({
                data: {
                    id: parseInt(id)
                }
            })
            layer.close(unfollowLay);
        }, function(){
            layer.close(unfollowLay);
        });
    }
});

module.exports = myFollowListView;