/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./header.html');
require('./header.css');
var menuList = [
    {
        name: '首页',
        url: mscxPage.urlConfig.indexPage,
        key: 'index'
    },
    {
        name: '数据',
        url: mscxPage.urlConfig.sourcesPage,
        key: 'sources'
    },
    {
        name: 'API',
        url: mscxPage.urlConfig.apiPage,
        key: 'api'
    },
    {
        name: '微服务',
        url: mscxPage.urlConfig.servicesPage,
        key: 'services'
    },
    {
        name: '需求定制',
        url: mscxPage.urlConfig.demandPage,
        key: 'demand'
    },
    {
        name: '创业园地',
        url: mscxPage.urlConfig.pioneeringPage,
        key: 'pioneering'
    }
];

var headerView = Backbone.View.extend({
    el: mscxPage.domEl.headerEl,
    template: _.template(template),
    events: {
        'blur .info-line input':'changeAttribute'
    },
    initialize: function() {
        this.$el.html(this.template({
            id: this.id || '',
            menuList: menuList
        }));
        var _c;
        $("#personReal").hover(function(){
            $(".shareBox").show();
            $(this).addClass('active');
        },function(){
            _c = setTimeout(function(){
                $(".shareBox").hide();
                $('#personReal').removeClass('active');
            },10);
        });
        $(".shareBox").hover(function(){
            clearTimeout(_c);
        },function(){
            $(".shareBox").hide();
            $('#personReal').removeClass('active');
        });
    }
});

module.exports = headerView;