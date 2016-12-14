'use strict';

var wrapTemplate = require('html!./openDataReleaseContent.html');
var listTemplate = require('html!./openDataSearchResult.html');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'animate-content posRE opacity0',
    wrapTemplate: _.template(wrapTemplate),
    listTemplate: _.template(listTemplate, {variable: 'data'}),
    events: {
        'click .sort a': 'sort'
    },
    initialize: function() {
        this.$el.html(this.wrapTemplate());

        this.$dataList = this.$('#searchResult');
        this.$page = this.$('.page');
        this.$count = this.$('#count');
        this.$sort = this.$('.sort');
    },
    render: function(model) {
        this.$el.removeClass('opacity0');
        var result = model.toJSON().result || {};

        var list = result.list || [];
        var pageInfo = result.page || {};
        var me = this;

        if(list.length < 1) {
            this.$sort.hide();
            this.$dataList.html('暂无数据');
        }else {
            this.$sort.show();
        }
        this.$count.html(list.length || 0);

        this.$dataList.html(this.listTemplate(list));

        laypage({
            cont: 'page',
            skip: true,
            curr: pageInfo.currentPage || 1,
            pages: pageInfo.totalPage,
            jump: function(obj, first) {
                if(!first) {
                    me.trigger('page', {
                        page: obj.curr,
                        pageSize: pageInfo.pageSize
                    })
                }
            }
        })
    },
    sort: function(event) {
        // 排序方式
        var $target = this.$(event.currentTarget);
        var type = $target.data('type') || '';

        $target.parent().find('.active').removeClass('active');
        $target.addClass('active');


        this.trigger('sort', {
            orderBy: type
        })
    }
});

module.exports = view;