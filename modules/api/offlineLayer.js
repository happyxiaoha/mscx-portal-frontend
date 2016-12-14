'use strict';

var template = require('html!./offlineTemplate.html');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'offline-box hide',
    template: _.template(template, {variable: 'data'}),
    events: {
    },
    initialize: function() {
        this.$el.html(this.template());
    },
    render: function() {
        
    }
});

module.exports = view;