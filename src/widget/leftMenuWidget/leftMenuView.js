'use strict';

var template = require('./leftMenu.html');
require('./leftMenu.css');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'fl leftMenuWrap',
    template: _.template(template, {variable: 'data'}),
    initialize: function() {

        this.$el.addClass(this.model.className).html(this.template(this.model));

        return this;
    }
});

module.exports = view;