'use strict';

var template = require('html!./weixinPayTemplate.html');
require('./pay.css');


var view = Backbone.View.extend({
    el: mscxPage.domEl.payEl,
    initialize: function() {
        this.$el.removeClass().addClass('pay-content').html(template);
    }
});

module.exports = view;