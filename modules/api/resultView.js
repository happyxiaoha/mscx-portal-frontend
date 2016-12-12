'use strict';

var resultTemplate = require('html!./resultTemplate.html');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'common posRE',
    template: _.template(resultTemplate, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template());
        return this;
    }
});

module.exports = view;