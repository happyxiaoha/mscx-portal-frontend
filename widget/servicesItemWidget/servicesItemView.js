'use strict';

var template = require('html!./servicesItem.html');

require('./servicesItem.css');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'ns-gridPanelComponent',
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template(this.model));
        return this;
    }
});

module.exports = view;