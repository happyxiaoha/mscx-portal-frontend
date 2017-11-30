'use strict';

var template = '<div class="noticeList grid960 animate-content opacity0"></div>';
var Resource = require('./resource.js');
var cmsUrl = Resource.cmsHost + '/static_html/datainfo/businessinfo/index.html';

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    events: {
        'click #go': 'jumpToInputPage'
    },
    initialize: function() {
        this.$el.empty();
        this.$el.append(template);

        this.$list = this.$('.noticeList');

        var me = this;

        window.portalUrl = Resource.cmsHost;
        window.frameUrl = '?';
        window.jumpToPage = function(url) {
            me.$list.load(url + '?time=' + +(new Date()));
        };

        this.$list.load(cmsUrl + '?time=' + +(new Date()), function() {
            me.$list.removeClass('opacity0');
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