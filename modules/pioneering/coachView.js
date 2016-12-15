'use strict';

var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var Resource = require('./resource.js');
var template = '<div class="rightMenuWrap fl boxShadiow boxSizing bgWhite common"><div class="common posRE animate-content opacity0" id="topPart"></div><div id="downPart" class="common posRE animate-content opacity0"></div></div>';

var cmsUrl = Resource.cmsHost + 'datainfo/pioneercoach/index.html';
var cmsPolicyUrl = Resource.cmsHost + 'datainfo/policyread/index.html';
require('./pioneering.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    events: {
        'click #go': 'jumpToInputPage'
    },
    initialize: function() {
        this.leftMenuView = new leftMenuView({
            model: {
                className: 'pioneer',
                id: 'coach',
                sideBars: Resource.maps
            }
        });

        this.$el.empty().append(this.leftMenuView.$el).append(template);
        this.$downPart = this.$('#downPart');
        this.$topPart = this.$('#topPart');

        var me = this;

        window.frameUrl = '#news/detail/';
        window.jumpToPage = function(url) {
            me.$downPart.load(url);
        }

        this.$topPart.load(cmsUrl + '?time=' + +(new Date()), function() {
            me.$topPart.removeClass('opacity0');
        });
        this.$downPart.load(cmsPolicyUrl + '?time=' + +(new Date()), function() {
            me.$downPart.removeClass('opacity0');
        });

        return this;
    },
    jumpToInputPage: function() {
        var inputPage = this.$('#indexNum').val();

        this.$('.page').each(function(index, item) {
            var $item = $(item);
            $item.data('pageindex') == inputPage && $item.click();
        })
    }
});

module.exports = view;