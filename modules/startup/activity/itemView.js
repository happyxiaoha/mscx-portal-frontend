'use strict';

var template = require('html!./itemTemplate.html');

require('util');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'ns-list-item',
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template(this.model));
        return this;
    }
});

module.exports = view;