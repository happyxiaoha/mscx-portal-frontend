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
        url: mscxPage.urlConfig.apiPage,
        key: 'sources'
    },
    {
        name: '需求大厅',
        url: mscxPage.urlConfig.demandPage,
        key: 'demand'
    },
    {
        name: '创客工场',
        url: mscxPage.urlConfig.pioneeringPage,
        key: 'pioneering'
    },
    {
        name: '孵化器',
        url: mscxPage.urlConfig.demandPage,
        key: ''
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

var headerView = Backbone.View.extend({
    el: mscxPage.domEl.headerEl,
    template: _.template(template, {variable: 'data'}),
    events: {
        'blur .info-line input': 'changeAttribute',
        'click #exit': 'logout',
        'click .search-img': 'search',
        'keydown #inputs': 'keyDownSearch',
        'click #developLink': 'jumpDevelop'
    },
    initialize: function() {
        this.model = new getUserMsg();
        this.developCheck = new developCheck();
        this.model.fetch({
            data: {
                t: new Date().getTime()
            }
        });
        this.listenTo(this.model, 'sync', this.render);
        this.$el.html(this.template({
            id: this.id,
            menuList: menuList
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
    render: function () {
        var nJson = this.model.toJSON();
        mscxPage.userInfo = nJson.result;
        this.renderLogoPage(nJson.result);
        this.didRender && this.didRender();
        this.$el.html(this.template({
            id: this.id,
            menuList: menuList,
            username: nJson.result && (nJson.result.name || nJson.result.account),
            isRealName: nJson.result && (nJson.result.userType != 'REGISTER')
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