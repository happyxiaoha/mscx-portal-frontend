'use strict';

var resultTemplate = require('html!./resultTemplate.html');
var apiItemView = require('apiItemWidget/apiItemView.js');

var followModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'userAttention/add.do'
})

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'ns-contentComponent',
    events: {
        'click .sort a': 'sort',
        'click .search-btn': 'handleQueryStr',
        'keydown .search-input': 'pressEnterSearch'
    },
    template: _.template(resultTemplate, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template());

        this.$dataList = this.$('.data-list');
        this.$page = this.$('.page');
        this.$count = this.$('#count');
        this.$sort = this.$('.sort');

        this.pageSize = 12;

        this.followModel = new followModel();

        return this;
    },
    render: function(model) {
        this.$el.removeClass('fade');
        this.$dataList.empty().addClass('fade');

        var result = model.toJSON().result || {};
        var apiServiceList = result.list || [];
        var pageInfo = result.page || {};
        var me = this; 

        if(apiServiceList.length < 1) {
            this.$sort.hide();
            // this.$dataList.html('没有符合查询条件的数据');
        }else {
            this.$sort.show();
        }
        this.$count.html(pageInfo.totalSize || 0);

        _.each(apiServiceList, function(item) {
            var view = new apiItemView({
                model: item
            })
            this.$dataList.append(view.$el);
        }.bind(this));

        this.$dataList.removeClass('fade');

        laypage({
            cont: 'page',
            skip: true,
            curr: pageInfo.currentPage || 1,
            pages: pageInfo.totalPage,
            jump: function(obj, first) {
                if(!first) {
                    me.trigger('page', {
                        page: obj.curr,
                        pageSize: me.pageSize
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
    },
    handleQueryStr: function() {
        var searchText = $.trim(this.$('.search-input').val());

        this.trigger('search', {
            keyword: searchText
        })
    },
    pressEnterSearch: function(event) {
        if(event.keyCode == 13) {
            this.handleQueryStr();
        }
    }
});

module.exports = view;