'use strict';

var template = '<div class="noticeList grid1190 animate-content opacity0"></div>';
var resource = {
    policy: {
        listUrl: '/static_html/datainfo/gy_listPolicy/index.html',
    },
    class: {
        listUrl: '/static_html/datainfo/gy_listClass/index.html',
    },
    article: {
        listUrl: '/static_html/datainfo/gy_listArticle/index.html',
    },
    fund: {
        listUrl: '/static_html/datainfo/gy_listFund/index.html',
    }
};

require('./startup.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    events: {
        'click #go': 'jumpToInputPage'
    },
    initialize: function() {
        this.$el.empty();
        this.$el.append(template);

        this.$list = this.$('.noticeList');

        var me = this;

        window.classUrl = '#news/class/list';
        window.articleUrl = '#news/article/list';
        window.policyUrl = '#news/policy/list';
        window.fundUrl = '#news/fund/list';
        window.rootNewsUrl = 'startup.html';

        window.portalUrl = mscxPage.cmsHost;
        window.frameUrl = '?';
        window.jumpToPage = function(url) {
            me.$list.load(url + '?time=' + +(new Date()));
        }

        this.$list.load(resource[this.model.section].listUrl + '?time=' + +(new Date()), function() {
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