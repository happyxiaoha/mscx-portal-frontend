'use strict';

// var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var Resource = require('./resource.js');
var template = '<div class="api-env rightMenuWrap grid1190 fl boxShadiow boxSizing common animate-content opacity0"></div>';

var cmsUrl = Resource.cmsHost + 'static_html/datainfo/apiinfo/index.html';

var cmsTemplate = require('html!./server.html');

require('./pioneering.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    initialize: function() {
        // this.leftMenuView = new leftMenuView({
        //     model: {
        //         className: 'pioneer',
        //         id: 'apiEnv',
        //         sideBars: Resource.maps
        //     }
        // });

        this.$el.append(template);

        this.$wrap = this.$('.rightMenuWrap');
        var me = this;
        
        // this.$wrap.load(cmsUrl + '?time=' + +(new Date()), function() {
        //     me.$wrap.removeClass('opacity0');
        // });

        this.$wrap.html(cmsTemplate).removeClass('opacity0');;

        return this;
    }
});

module.exports = view;