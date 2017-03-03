'use strict';

var template = require('html!./activityDetailTemplate.html');

var view = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template());
        return this;
    }
});

module.exports = view;