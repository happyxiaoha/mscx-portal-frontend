'use strict';

var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var Resource = require('./resource.js');
var template = '<div class="layLeft common clearfix fl bgBoxShodow animate-content opacity0"></div>';

var cmsUrl = Resource.cmsHost + 'datainfo/latestnews/index.html';

require('./pioneering.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    initialize: function() {
        this.leftMenuView = new leftMenuView({
            model: {
                className: 'pioneer',
                id: 'news',
                sideBars: Resource.maps
            }
        });

        this.$el.empty().append(this.leftMenuView.$el).append(template);

        this.$layLeft = this.$('.layLeft');
        var me = this;

        window.frameUrl = '#news/detail/';
        window.listUrl = '#news/list';

        this.$layLeft.load(cmsUrl + '?time=' + +(new Date()), function() {
            me.$layLeft.removeClass('opacity0');
        });

        return this;
    }
});

module.exports = view;