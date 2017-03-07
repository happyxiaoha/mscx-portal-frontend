'use strict';

var resultTemplate = require('html!./resultTemplate.html');
var itemView = require('./itemView.js');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'ns-contentComponent',
    events: {
        'click .sort a': 'sort'
    },
    template: _.template(resultTemplate, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template());

        this.$dataList = this.$('.data-list');

        return this;
    },
    render: function(model) {
        this.$el.removeClass('opacity0');
        this.$dataList.empty().addClass('opacity0');

        var result = model.toJSON().result || {};
        var serviceList = result.list || [];
        var pageInfo = result.page || {};
        var me = this; 

        _.each(serviceList, function(item) {
            var view = new itemView({
                model: item
            });
            this.$dataList.append(view.$el);
        }.bind(this));

        this.$dataList.removeClass('opacity0');

        // laypage({
        //     cont: 'page',
        //     skip: true,
        //     curr: pageInfo.currentPage || 1,
        //     pages: pageInfo.totalPage,
        //     jump: function(obj, first) {
        //         if(!first) {
        //             me.trigger('page', {
        //                 page: obj.curr,
        //                 pageSize: '10'
        //             })
        //         }
        //     }
        // })
    }
});

module.exports = view;