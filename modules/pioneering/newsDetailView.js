'use strict';

require('./pioneering.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    initialize: function() {
        this.$el.empty().addClass('opacity0');

        var me = this;

        this.$el.load(this.model.url + '?time=' + +(new Date()), function() {
            me.$el.removeClass('opacity0');
        });

        return this;
    }
});

module.exports = view;