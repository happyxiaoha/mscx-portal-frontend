'use strict';

var template = require('./errorTemplate.html');

require('./pay.less');


var view = Backbone.View.extend({
    el: mscxPage.domEl.payEl,
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.removeClass().addClass('pay-content');

        this.$el.html(this.template(this.model));
    }
});

module.exports = view;