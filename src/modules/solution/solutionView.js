'use strict';

var Resource = require('./resource.js');
var template = require('./solution.html');

var cmsUrl = Resource.cmsHost + '/static_html/datainfo/gz_solution/index.html';

var view = Backbone.View.extend({
    el: mscxPage.domEl.solutionEl,
    events: {
        'click #go': 'jumpToInputPage'
    },
    initialize: function () {
        this.$el.addClass('grid1000 mt30');
        this.$el.empty().append(template);

        this.$layLeft = this.$('.news-list-left-wrapper');
        var me = this;

        window.frameUrl = '?';
        window.listUrl = '#solution/list';
        window.portalUrl = Resource.cmsHost;
        window.jumpToPage = function (url) {
            me.$layLeft.load(url + '?time=' + +(new Date()));
        };

        this.$layLeft.load(cmsUrl + '?time=' + +(new Date()), function () {
            me.$layLeft.removeClass('opacity0');
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