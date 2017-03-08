'use strict';

var template = require('html!./coachTemplate.html');

var policyCmsUrl = '/static_html/datainfo/gy_enter_policy/index.html';
var classCmsUrl = '/static_html/datainfo/gy_enter_class/index.html';
var articleCmsUrl = '/static_html/datainfo/gy_enter_article/index.html';
var fundCmsUrl = '/static_html/datainfo/gy_enter_fund/index.html';
var invertHotCmsUrl = '/static_html/datainfo/gy_invertHot/index.html';

var view = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    initialize: function() {
        this.$el.html(template);

        this.$rightPart = this.$('.pull-right');
        this.$policy = this.$('#policy');
        this.$class = this.$('#class');
        this.$article = this.$('#article');
        this.$fund = this.$('#fund');

        window.portalUrl = mscxPage.cmsHost;
        window.frameUrl = '?';
        window.classUrl = '#news/class/list';
        window.articleUrl = '#news/article/list';
        window.policyUrl = '#news/policy/list';
        window.fundUrl = '#news/fund/list';
        window.rootNewsUrl = 'startup.html';

        this.$rightPart.load(invertHotCmsUrl + '?time=' + +(new Date()));
        this.$policy.load(policyCmsUrl + '?time=' + +(new Date()));
        this.$class.load(classCmsUrl + '?time=' + +(new Date()));
        this.$article.load(articleCmsUrl + '?time=' + +(new Date()));
        this.$fund.load(fundCmsUrl + '?time=' + +(new Date()));

        return this;
    }
});

module.exports = view;