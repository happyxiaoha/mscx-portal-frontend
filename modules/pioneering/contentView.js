'use strict';

var template = '<div class="ns-contentComponent animate-content opacity0"></div>';

var resource = {
    apiEnv: {
        url: '/static_html/datainfo/gy_apiEnv/index.html'
    },
    bigData: {
        url: '/static_html/datainfo/gy_bigData/index.html'
    },
    dataVisiual: {
        url: '/static_html/datainfo/gy_dataVisiual/index.html'
    },
    serverEnv: {
        url: '/static_html/datainfo/gy_serverEnv/index.html'
    }
}

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    initialize: function() {
        this.$el.html(template);
        this.$wrap = this.$('.ns-contentComponent');
        var me = this;

        this.$wrap.load(resource[this.id].url + '?time=' + +(new Date()), function() {
            me.$wrap.removeClass('opacity0');
        });

        return this;
    }
});

module.exports = view;