'use strict';

var template = require('html!./serverEnvTemplate.html');

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    initialize: function() {
        this.$el.html(template);
        // this.$wrap = this.$('.rightMenuWrap');
        // var me = this;

        // this.$wrap.load(cmsUrl + '?time=' + +(new Date()), function() {
        //     me.$wrap.removeClass('opacity0');
        // });

        return this;
    }
});

module.exports = view;