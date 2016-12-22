'use strict';

var template = require('html!./resultTemplate.html');
require('./pay.css');


var view = Backbone.View.extend({
    el: mscxPage.domEl.payEl,
    template: _.template(template),
    initialize: function() {
        this.$el.removeClass().addClass('pay-content').html(this.template());
    }
});

module.exports = view;