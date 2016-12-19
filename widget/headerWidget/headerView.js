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
        key: 'service'
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

var logoutModel = Backbone.Model.extend({
    url: mscxPage.host+'/logout.do'
});

var getUserMsg = Backbone.Model.extend({
    url: mscxPage.host+'/briefInfo.do'
});

var headerView = Backbone.View.extend({
    el: mscxPage.domEl.headerEl,
    template: _.template(template, {variable: 'data'}),
    events: {
        'blur .info-line input': 'changeAttribute',
        'click #exit': 'logout'
    },
    initialize: function() {
        this.model = new getUserMsg();
        this.model.fetch();
        this.listenTo(this.model, 'sync', this.render);
        this.$el.html(this.template({
            id: 'index',
            menuList: menuList
        }));
    },
    render: function () {
        var nJson = this.model.toJSON();

        this.$el.html(this.template({
            id: 'index',
            menuList: menuList,
            username: nJson.result
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
    },
    logout: function(){
        new logoutModel().fetch({
            success: function(res){
                res = res.toJSON();
                if(res.message == 'success'){
                    window.open('index.html','_self');
                }
            }
        })
    }
});

module.exports = headerView;