'use strict';

// var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var Resource = require('./resource.js');
var template = '<div class="server-env grid1190 rightMenuWrap fl boxShadiow boxSizing common animate-content opacity0"></div>';

var cmsUrl = Resource.cmsHost + 'static_html/datainfo/quanguo_serverdev/index.html';

require('./pioneering.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    initialize: function() {
        // this.leftMenuView = new leftMenuView({
        //     model: {
        //         className: 'pioneer',
        //         id: 'serverEnv',
        //         sideBars: Resource.maps
        //     }
        // });

        this.$el.append(template);
        this.$wrap = this.$('.rightMenuWrap');
        var me = this;

        this.$wrap.load(cmsUrl + '?time=' + +(new Date()), function() {
            me.$wrap.removeClass('opacity0');
        });

        return this;
    }
});

module.exports = view;