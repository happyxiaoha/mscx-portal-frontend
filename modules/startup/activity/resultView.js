'use strict';

var resultTemplate = require('html!./resultTemplate.html');
var itemView = require('./itemView.js');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'ns-contentComponent',
    events: {
        'click .ns-list-item-more': 'loadNextPage',
        'click #goPublish': 'goPublish'
    },
    template: _.template(resultTemplate, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template());

        this.$dataList = this.$('.data-list');
        this.$loadMore = this.$('.ns-list-item-more');

        return this;
    },
    render: function(model) {
        this.$el.removeClass('opacity0');

        var result = model.toJSON().result || {};
        var serviceList = result.list || [];
        var pageInfo = result.page || {};

        this.currentPage = pageInfo.currentPage;

        _.each(serviceList, function(item) {
            var view = new itemView({
                model: item
            });
            this.$dataList.append(view.$el);
        }.bind(this));

        if(pageInfo.currentPage < pageInfo.totalPage) {
            this.$loadMore.removeClass('hide');
        }
    },
    loadNextPage: function() {
        this.$loadMore.addClass('hide');
        this.currentPage = this.currentPage + 1;
        this.trigger('page', {
            page: this.currentPage,
            pageSize: 10
        })
    },
    goPublish: function() {
        mscxPage.isLogin() && mscxPage.isRealName() && (location.href = '#createActivity');
    }
});

module.exports = view;