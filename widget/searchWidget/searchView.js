'use strict';

var template = require('html!./search.html');
require('./search.css');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'common',
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template({
            id: this.id
        }));
        return this;
    }
});

module.exports = view;