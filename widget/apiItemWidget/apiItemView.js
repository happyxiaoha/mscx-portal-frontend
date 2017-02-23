'use strict';

var template = require('html!./apiItem.html');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'ns-gridPanelComponent',
    events: {
        'click .sl-e-more': 'toggleMore'
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template(this.model));
        return this;
    }
});

module.exports = view;