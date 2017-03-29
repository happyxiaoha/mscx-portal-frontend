/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./footer.html');
var float = require('../floatWidget/floatView.js');
require('./footer.css');
var menuList = [
    {
        name: '首页',
        url: mscxPage.urlConfig.indexPage
    },
    {
        name: '云接口',
        url: mscxPage.urlConfig.sourcesPage
    },
    {
        name: '云服务',
        url: mscxPage.urlConfig.demandPage
    },
    {
        name: '云环境',
        url: mscxPage.urlConfig.pioneeringPage
    },
    {
        name: '部门需求',
        url: mscxPage.urlConfig.startupPage
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