'use strict';

var template = '<div class="ns-contentComponent"></div>';

var cmsUrl = '/static_html/datainfo/gy_serverEnv/index.html';

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    initialize: function() {
        this.$el.html(template);
        this.$wrap = this.$('.ns-contentComponent');
        var me = this;

        this.$wrap.load(cmsUrl + '?time=' + +(new Date()), function() {
            me.$wrap.removeClass('opacity0');
        });

        return this;
    }
});

module.exports = view;