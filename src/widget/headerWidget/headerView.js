/**
 * Created by Kevin on 2016/12/6.
 */
var template = require('./header.html');
var cityMap = require('./cityStation.json');
require('./header.less');
var menuList = [
    {
        name: '首页',
        url: mscxPage.urlConfig.indexPage,
        key: 'index'
    },
    // {
    //     name: '数据',
    //     url: mscxPage.urlConfig.sourcesPage,
    //     key: 'sources'
    // },
    {
        name: 'API',
        url: mscxPage.urlConfig.apiPage,
        key: 'api'
    },
    {
        name: '微应用',
        url: mscxPage.urlConfig.servicesPage,
        key: 'service'
    },
    {
        name: 'SaaS服务',
        url: mscxPage.urlConfig.saasPage,
        key: 'saas'
    },
    {
        name: '需求定制',
        url: mscxPage.urlConfig.demandPage,
        key: 'demand'
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

var hotWordModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'hotWord/selectHotWordList.do'
});

var headerView = Backbone.View.extend({
    el: mscxPage.domEl.headerEl,
    template: _.template(template, {variable: 'data'}),
    hotWordTemplate: _.template('<% data.forEach(function(item){ %><li><a href="javascript:;" data-word="<%= item.hotWord %>" ><%= item.hotWord %></a></li><% }) %>', {variable: 'data'}),
    events: {
        'blur .info-line input': 'changeAttribute',
        'click #exit': 'logout',
        'click .search-img': 'search',
        'keydown #inputs': 'keyDownSearch',
        'click #developLink': 'jumpDevelop',
        'click #city-station a': 'switchCity',
        'click .hot-search-ul a': 'hotSearch',
    },
    initialize: function() {
        this.model = new getUserMsg();
        this.developCheck = new developCheck();
        this.switchCity = new switchCity();
        this.hotWordModel = new hotWordModel();
        this.currentCity = _.find(cityMap.cities, function(item){
            return item.url.indexOf(location.host) > -1;
        }) || cityMap.cities[0];

        _.extend(mscxPage.city, this.currentCity)
        
        // 先获取城市areacode
        this.switchCity.fetch({
            data: {
                areaCode: this.currentCity.code,
                t: new Date().getTime()
            },
            async: false
            // silent: true
        })
        this.listenTo(this.model, 'sync', this.render);
        this.listenTo(this.switchCity, 'sync', this.handleSwitchCity);
        this.listenTo(this.hotWordModel, 'sync', this.renderHotWord);

        this.model.fetch({
            data: {
                t: new Date().getTime()
            }
        });
        
        this.$el.html(this.template({
            id: this.id,
            menuList: menuList,
            cityStations: cityMap.cities,
            currentCity: this.currentCity
        }));
    },
    addDidRender: function(callback) {
        this.didRender = callback;
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
    renderHotWord: function() {
        var model = this.hotWordModel.toJSON();
        this.$('.hot-search-ul').append(this.hotWordTemplate(model.result));
    },
    render: function () {
        var nJson = this.model.toJSON();
        mscxPage.userInfo = nJson.result;
        this.renderLogoPage(nJson.result);
        this.didRender && this.didRender();
        this.$el.html(this.template({
            id: this.id,
            menuList: menuList,
            username: nJson.result && (nJson.result.name || nJson.result.account),
            isRealName: nJson.result && (nJson.result.userType != 'REGISTER'),
            cityStations: cityMap.cities,
            currentCity: this.currentCity
        }));
        // 获取热门关键词搜索
        this.hotWordModel.fetch();
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

        //选择城市
        this.$('.area-picker').hover(function() {
            var $this = $(this);
            $this.addClass('active');

        }, function() {
            var $this = $(this);
            $this.removeClass('active');
        })
    },
    search: function () {
        var $inputs = $('#inputs'),
            keyWord = $.trim($inputs.val());
        window.localStorage.setItem('keyword', keyWord);
        window.localStorage.setItem('dataType','API');
        window.open('search.html','_self');
    },
    hotSearch: function(event) {
        var $target = this.$(event.target);
        this.$('#inputs').val($target.data('word'));
        this.search();
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
    },
    switchCity: function(event) {
        var $target = this.$(event.currentTarget);
        var areaCode = $target.data('code');
        this.swicthUrl = $target.data('url');

        this.switchCity.fetch({
            data: {
                areaCode: areaCode
            }
        })
    },
    handleSwitchCity: function() {
        var model = this.switchCity.toJSON();
        if(model.status == 'OK') {
            location.href = this.swicthUrl;
        }else {
            layer.msg('切换城市失败，请稍后再试');
        }
    }
});

module.exports = headerView;