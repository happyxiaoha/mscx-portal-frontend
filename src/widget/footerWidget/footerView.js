/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('./footer.html');
var float = require('../floatWidget/floatView.js');
require('./footer.css');
var menuList = [
    {
        name: '首页',
        url: mscxPage.urlConfig.indexPage
    },
    {
        name: '数据包',
        url: mscxPage.urlConfig.sourcesPage
    },
    {
        name: 'API',
        url: mscxPage.urlConfig.sourcesPage + '#api/data'
    },
    {
        name: '微服务',
        url: mscxPage.urlConfig.sourcesPage + '#service'
    },
    {
        name: '需求定制',
        url: mscxPage.urlConfig.demandPage
    },
    {
        name: '新闻资讯',
        url: mscxPage.urlConfig.newsPage
    }
];

var footerView = Backbone.View.extend({
    template: _.template(template, {variable: 'data'}),
    el: mscxPage.domEl.footerEl,
    events: {
        'blur .info-line input':'changeAttribute'
    },
    initialize: function() {
        this.$el.html(this.template({
            menuList: menuList
        }));
        new float();
    }
});

module.exports = footerView;