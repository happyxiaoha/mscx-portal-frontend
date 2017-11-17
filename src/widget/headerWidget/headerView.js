/**
 * Created by Kevin on 2016/12/6.
 */
var template = require('./header.html');
var userTemplate = require('./userInfo.html');
var cityMap = require('./cityStation.json');
require('./header.css');
var menuList = [
    {
        name: '首页',
        url: mscxPage.urlConfig.indexPage,
        key: 'index'
    },
    {
        name: '数据服务',
        url: mscxPage.urlConfig.sourcesPage,
        key: 'sources'
    },
    {
        name: '充值缴费',
        url: mscxPage.urlConfig.rechargePage,
        key: 'recharge'
    },
    {
        name: '需求定制',
        url: mscxPage.urlConfig.demandPage,
        key: 'demand'
    },
    {
        name: '新闻资讯',
        url: mscxPage.urlConfig.newsPage,
        key: 'news'
    },
    {
        name: '关于我们',
        url: mscxPage.urlConfig.contactPage,
        key: 'contactUs'
    }
];

var logoutModel = Backbone.Model.extend({
    url: mscxPage.host+'/logout.do'
});

var getUserMsg = Backbone.Model.extend({
    url: mscxPage.host+'/briefInfo.do?'
});

var developCheck = Backbone.Model.extend({
    url: mscxPage.host+'/developer/portal.do'
});

var switchCity = Backbone.Model.extend({
    url: mscxPage.host+'/home/switchCity.do?'
});

var headerView = Backbone.View.extend({
    el: mscxPage.domEl.headerEl,
    template: _.template(template, {variable: 'data'}),
    userTemplate: _.template(userTemplate, {variable: 'data'}),
    events: {
        'blur .info-line input': 'changeAttribute',
        'click #exit': 'logout',
        'click .search-img': 'search',
        'keydown #inputs': 'keyDownSearch',
        'click #developLink': 'jumpDevelop',
        'click .switch-city': 'showCityStation',
        'click #cityStation a': 'switchCity'
    },
    initialize: function() {
        this.model = new getUserMsg();
        this.developCheck = new developCheck();
        this.switchCityModel = new switchCity();
        this.currentCity = _.find(cityMap.cities, function(item){
            return item.url.indexOf(location.host) > -1;
        }) || cityMap.cities[0];
        sessionStorage.setItem('currentCity',JSON.stringify(this.currentCity))
        _.extend(mscxPage.city, this.currentCity)
        
        // 先获取城市areacode
        this.switchCityModel.fetch({
            data: {
                areaCode: this.currentCity.code,
                t: new Date().getTime()
            },
            async: false
            // silent: true
        })
        this.model.fetch({
            data: {
                t: new Date().getTime()
            }
        });
        this.listenTo(this.switchCityModel, 'sync', this.handleSwitchCity);
        this.listenTo(this.model, 'sync', this.render);
        this.$el.html(this.template({
            id: this.id,
            menuList: menuList,
            cityStations: cityMap.cities,
            currentCity: this.currentCity,
            img:this.currentCity.img
        }));

    },
    showCityStation: function() {
        this.$('.city-station').show();
        $('.city-station').on('mouseleave', function() {
            $('.city-station').hide();
        })
    },
    addDidRender: function(callback) {
        this.didRender = callback;
    },
    switchCity: function(event) {
        var $target = this.$(event.currentTarget);
        var areaCode = $target.data('code');
        this.swicthUrl = $target.data('url');

        this.switchCityModel.fetch({
            data: {
                areaCode: areaCode
            }
        })
    },
    handleSwitchCity: function() {
        var model = this.switchCityModel.toJSON();
        if(model.status == 'OK') {
            location.href = this.swicthUrl;

        }else {
            layer.msg('切换城市失败，请稍后再试');
        }
    },
    renderLogoPage: function (res) {
        if(!res && $(mscxPage.domEl.apiEl).length>0 && $(mscxPage.domEl.apiEl).data('isLogin') == 1){
            var sHref = window.location.href,
                sUrl = 'login.html' + '?service='+ encodeURIComponent(sHref);
            location.href = sUrl;
        }
        if(!res && $(mscxPage.domEl.userCenterLeft).length > 0 && $(mscxPage.domEl.userCenterLeft).data('isLogin') == 1){
            var sHref = window.location.href,
                sUrl = 'login.html' + '?service='+ encodeURIComponent(sHref);
            location.href = sUrl;
        }
    },
    render: function () {
        var nJson = this.model.toJSON();
        mscxPage.userInfo = nJson.result;
        this.renderLogoPage(nJson.result);
        this.didRender && this.didRender();
        this.$('.user-area').html(this.userTemplate({
            username: nJson.result && (nJson.result.name || nJson.result.account),
            isRealName: nJson.result && (nJson.result.userType != 'REGISTER'),
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
    search: function () {
        var $inputs = $('#inputs'),
            keyWord = $.trim($inputs.val());
        window.localStorage.setItem('keyword', keyWord);
        window.localStorage.setItem('dataType','API');
        window.open('search.html','_self');
    },
    keyDownSearch: function(e){
        var that = this;
        if (e.keyCode == "13") {
            e.preventDefault();
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
    jumpDevelop: function() {
        this.developCheck.fetch({
            success: function(model) {
                var res = model.toJSON();
                if(res.status == 'OK') {
                    location.href = res.result;
                }
            }
        });
    }
});

module.exports = headerView;

/*
 {
 "code": "104",
 "name": "广州城投",
 "abbr": "guangzhou",
 "url": "http://www.gzopendata.com",
 "img":"../../images/newicon/gzct.png"
 },*/