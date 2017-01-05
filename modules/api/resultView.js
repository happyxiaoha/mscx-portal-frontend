'use strict';

var resultTemplate = require('html!./resultTemplate.html');
var apiItemView = require('apiItemWidget/apiItemView.js');

var followModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'userAttention/add.do'
})

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'animate-content posRE opacity0',
    events: {
        'click .sort a': 'sort'
    },
    template: _.template(resultTemplate, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template({
            id: this.id
        }));

        this.$dataList = this.$('.data-list');
        this.$page = this.$('.page');
        this.$count = this.$('#count');
        this.$sort = this.$('.sort');

        this.pageSize = 12;

        this.followModel = new followModel();

        return this;
    },
    render: function(model) {
        this.$el.removeClass('opacity0');
        this.$dataList.empty().addClass('opacity0');

        var result = model.toJSON().result || {};
        var apiServiceList = result.list || [];
        var pageInfo = result.page || {};
        var me = this; 

        if(apiServiceList.length < 1) {
            this.$sort.hide();
            this.$dataList.addClass('data-empty').html('没有符合查询条件的数据');
        }else {
            this.$dataList.removeClass('data-empty');
            this.$sort.show();
        }
        this.$count.html(pageInfo.totalSize || 0);

        _.each(apiServiceList, function(item) {
            var view = new apiItemView({
                model: item
            })
            this.$dataList.append(view.$el);
        }.bind(this));

        this.$dataList.removeClass('opacity0');

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
    }
});

module.exports = view;