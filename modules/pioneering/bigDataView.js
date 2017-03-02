'use strict';

var template = require('html!./bigDataTemplate.html');
// var template = '<div class="api-env rightMenuWrap fl boxShadiow boxSizing bgWhite common animate-content opacity0"></div>';

// var cmsUrl = Resource.cmsHost + 'static_html/datainfo/apiinfo/index.html'

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