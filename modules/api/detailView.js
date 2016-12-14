'use strict';

var template = require('html!./detailTemplate.html')
require('./api.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    template: _.template(template),
    initialize: function() {
        this.$el.addClass('grid960');

        this.$el.html(this.template());

        return this;
    }
});

module.exports = view;