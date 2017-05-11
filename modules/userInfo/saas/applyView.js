'use strict'

var commonTemplate = require('html!./saasCommon.html');
var template = require('html!./apply.html');
require('./saas.css');
require('util');

var applyListModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'saas/getSaaSList.do'
});

// 申请的服务
var myApplyListView = Backbone.View.extend({
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
        this.$el.html(this.commonTemplate({name:'apply'}));

        this.$content = this.$('#saasInfo');

        this.model = new applyListModel();
        
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
    }
});

module.exports = myApplyListView;