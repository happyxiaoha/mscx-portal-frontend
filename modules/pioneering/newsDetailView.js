'use strict';

var template = '<div class="noticeListCons grid960 bgWhite animate-content opacity0"></div>';

require('./pioneering.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    initialize: function() {
        this.$el.empty();
        this.$el.append(template);

        this.$wrap = this.$('.noticeListCons');
        var me = this;

        this.$wrap.load(this.model.url + '?time=' + +(new Date()), function() {
            me.$wrap.removeClass('opacity0');
        });

        return this;
    }
});

module.exports = view;