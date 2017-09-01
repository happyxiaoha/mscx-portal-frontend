'use strict';

var template = require('./apiHelpTemplate.html');

var view = Backbone.View.extend({
    el: '.help-area',
    events: {
        'click .api-help-menu a' : 'toCon'
    },
    initialize: function() {
        this.$el.html(template);
    },
    toCon: function (e) {
        var $this = $(e.target),
            src = $this.data('src');
        if(src) {
            var sTop = $('#'+src).offset().top;
            $('body').animate({'scrollTop': sTop},700);
        }
        return false;
    }
});

module.exports = view;