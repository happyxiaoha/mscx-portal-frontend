'use strict';

var template = '<div class="ns-contentComponent animate-content opacity0"></div>';

var developCheck = Backbone.Model.extend({
    url: mscxPage.host+'/developer/portal.do'
});
var ethinkCheck = Backbone.Model.extend({
    url: mscxPage.host+'/ethink/redirectToEthink.do'
});

var resource = {
    // apiEnv: {
    //     url: '/static_html/datainfo/gy_apiEnv/index.html'
    // },
    bigData: {
        param: 2,
        url: '/static_html/datainfo/gy_bigData/index.html'
    },
    dataVisiual: {
        param: 1,
        url: '/static_html/datainfo/gy_dataVisiual/index.html'
    },
    serverEnv: {
        url: '/static_html/datainfo/gy_serverEnv/index.html'
    }
}

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    events: {
        'click .toDevelop': 'jumpDevelop',
        'click .toEthink': 'jumpEThink'
    },
    initialize: function() {
        this.$el.html(template);
        this.$wrap = this.$('.ns-contentComponent');
        var me = this;

        this.$wrap.load(resource[this.id].url + '?time=' + +(new Date()), function() {
            me.$wrap.removeClass('opacity0');
        });

        return this;
    },
    jumpDevelop: function() {
        new developCheck().fetch({
            async: false,
            success: function(model) {
                var res = model.toJSON();
                if(res.status == 'OK') {
                    // location.href = res.result;
                    window.open(res.result);
                }
            }
        });
    },
    jumpEThink: function() {
        new ethinkCheck().fetch({
            data: {
                action: resource[this.id].param
            },
            async: false,
            success: function(model) {
                var res = model.toJSON();
                if(res.status == 'OK') {
                    // location.href = res.result;
                    window.open(res.result);
                }
            }
        });
    }
});

module.exports = view;