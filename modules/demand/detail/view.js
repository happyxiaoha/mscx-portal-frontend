'use strict';

var template = require('html!./template.html');
require('../demand.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.addClass('grid960 bgWhite boxShadiow').html()
    }
});

module.exports = view;