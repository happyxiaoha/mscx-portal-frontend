'use strict';

var template = require('html!./servicesItem.html');

require('./servicesItem.css');

var view = Backbone.View.extend({
    tagName: 'li',
    className: 'services-item',
    events: { },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template(this.model));
        return this;
    }
});

module.exports = view;