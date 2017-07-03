'use strict';

var template = require('./apiItem.html');

require('./apiItem.css');

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