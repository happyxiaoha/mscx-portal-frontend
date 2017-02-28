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
        name: '交易广场',
        url: mscxPage.urlConfig.sourcesPage,
        key: 'sources'
    },
    {
        name: '需求大厅',
        url: mscxPage.urlConfig.apiPage,
        key: 'api'
    },
    {
        name: '创客工场',
        url: mscxPage.urlConfig.servicesPage,
        key: 'service'
    },
    {
        name: '孵化器',
        url: mscxPage.urlConfig.demandPage,
        key: 'demand'
    }
];

var logoutModel = Backbone.Model.extend({
    url: mscxPage.host+'/logout.do'
});

var getUserMsg = Backbone.Model.extend({
    url: mscxPage.host+'/briefInfo.do?t='+new Date().getTime()
});

var headerView = Backbone.View.extend({
    el: mscxPage.domEl.headerEl,
    template: _.template(template, {variable: 'data'}),
    events: {
        'blur .info-line input': 'changeAttribute',
        'click #exit': 'logout',
        'click .search-img': 'search',
        'keydown #inputs': 'keyDownSearch'
    },
    initialize: function() {
        this.model = new getUserMsg();
        this.model.fetch({
            data: {
                t: new Date().getTime()
            }
        });
        this.listenTo(this.model, 'sync', this.render);
        this.$el.html(this.template({
            id: 'index',
            menuList: menuList
        }));
    },
    render: function () {
        var nJson = this.model.toJSON();
        mscxPage.userInfo = nJson.result;
        this.$el.html(this.template({
            id: 'index',
            menuList: menuList,
            username: nJson.result && (nJson.result.name || nJson.result.account)
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
    keyDownSearch: function(e){
        var that = this;
        if (e.keyCode == "13") {
            //回车执行查询
            that.search();
        }
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
    },
    search: function (e) {
        var $inputs = $('#inputs'),
            keyWord = $.trim($inputs.val());
        window.localStorage.setItem('keyword', keyWord);
        window.localStorage.setItem('dataType','API');
        window.open('search.html','_self');
    }
});

module.exports = headerView;