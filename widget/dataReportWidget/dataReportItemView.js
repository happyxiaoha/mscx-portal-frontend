'use strict';

var template = require('html!./dataReportItem.html');

require('./dataReportItem.css');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'ns-list-item data-report-list',
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template(this.model));
        return this;
    }
});

module.exports = view;