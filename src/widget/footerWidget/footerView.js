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
        name: '需求大厅',
        url: mscxPage.urlConfig.demandPage
    },
    {
        name: '交易广场',
        url: mscxPage.urlConfig.sourcesPage
    },
    {
        name: '创客工场',
        url: mscxPage.urlConfig.pioneeringPage
    },
    {
        name: '孵化空间',
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