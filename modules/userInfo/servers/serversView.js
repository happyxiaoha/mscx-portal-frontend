/**
 * Created by Kevin on 2016/12/6.
 */

var commonTemplate = require('html!./common.html');
var template = require('html!./servers.html');
require('./servers.css');
require('util');


var publishListModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'publish/list.do'
});
var unshelveModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'unshelve.do'
});
var deleteModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'delete.do'
});

// 发布的服务
var myPublishListView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: _.template(template),
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        'click .unshelve': 'unshelveService',
        'click .delete': 'deleteService',
        'click .reason': 'showReason'
    },
    initialize: function() {
        this.$el.html(this.commonTemplate({name:'publish'}));

        this.$content = this.$('#serverInfo');

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
    },
    render: function () {
        var res = this.model.get('result'),
            me = this,
            serverList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        this.$content.html(this.template({serverList:serverList}));
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
    // initRender: function () {
    //     this.$el.html(this.templete({serverList:[]}));
    // },
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
        var me = this;

        var confirmLay = layer.confirm('确认下架这条服务吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            me.unshelveModel.fetch({
                data: {
                    id: id
                }
            })
            layer.close(confirmLay);
        }, function(){
            layer.close(confirmLay);
        });   
    },
    deleteService: function() {
        var id = this.$(event.currentTarget).data('id');
        var me = this;

        var deleteLay = layer.confirm('确认删除这条服务吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            me.deleteModel.fetch({
                data: {
                    id: id
                }
            })
            layer.close(deleteLay);
        }, function(){
            layer.close(deleteLay);
        });  
    },
    handleOperation: function() {
        this.pagObj.pageNum = 1;
        this.reloadPage();
    },
    showReason: function(event) {
        var comment = this.$(event.currentTarget).data('comment');
        layer.open({
            title: '拒绝原因',
            content: comment
        });
    }
});

module.exports = myPublishListView;