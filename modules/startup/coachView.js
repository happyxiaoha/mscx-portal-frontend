'use strict';

var template = require('html!./coachTemplate.html');

var policyUrl = '/static_html/datainfo/gy_enter_policy/index.html';
var classUrl = '/static_html/datainfo/gy_enter_class/index.html';
var articleUrl = '/static_html/datainfo/gy_enter_article/index.html';
var fundUrl = '/static_html/datainfo/gy_enter_fund/index.html';
var invertHotUrl = '/static_html/datainfo/gy_invertHot/index.html';

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

        this.$rightPart.load(invertHotUrl + '?time=' + +(new Date()));
        this.$policy.load(policyUrl + '?time=' + +(new Date()));
        this.$class.load(classUrl + '?time=' + +(new Date()));
        this.$article.load(articleUrl + '?time=' + +(new Date()));
        this.$fund.load(fundUrl + '?time=' + +(new Date()));

        return this;
    }
});

module.exports = view;