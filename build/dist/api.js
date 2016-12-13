webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/7.
	 */

	var header = __webpack_require__(1);
	var footer = __webpack_require__(15);
	var router = __webpack_require__(23);

	$(function() {
	    new header({
	        id: 'api'
	    });
	    new footer();

	    mscxPage.appRouter = new router();
	    Backbone.history.stop();
	    Backbone.history.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/6.
	 */
	var template = __webpack_require__(2);
	__webpack_require__(4);
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
	    }
	});

	module.exports = headerView;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"header grid960\">\r\n    <h1 class=\"logo fl\">\r\n        <a href=\"#\">\r\n            <img src=\"" + __webpack_require__(3) + "\">\r\n        </a>\r\n    </h1>\r\n    <div class=\"left-area fr clearfix\">\r\n        <div class=\"searchCons fl\">\r\n            <input type=\"text\" class=\"search\" id=\"inputs\" placeholder=\"请输入要查找的内容\">\r\n            <a class=\"search-img\"></a>\r\n        </div>\r\n        <div class=\"fr\">\r\n            <div class=\"noLogin hide\">\r\n                <a href=\"#\" id=\"login\">登陆</a>\r\n                <span>|</span>\r\n                <a href=\"#\" id=\"register\">注册</a>\r\n            </div>\r\n            <div class=\"yesLogin\">\r\n                <div id=\"personReal\" class=\"personIcon\">\r\n                    <span id=\"infoName\" class=\" down\">小太阳</span>\r\n                </div>\r\n            </div>\r\n            <div class=\"shareBox dropMenu\">\r\n                <div class=\"shareList\">\r\n                    <ul>\r\n                        <li class=\"usercenter\">\r\n                            <a href=\"#\">用户中心</a>\r\n                        </li>\r\n                        <li class=\"logout\"><a href=\"#\" id=\"exit\">退出</a></li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"navCons clearfix bgBlue\">\r\n    <div class=\"grid960\">\r\n        <ul class=\"nav fl\">\r\n            <% _.each(menuList, function (item) { %>\r\n                <li <%= (id == item.key ? 'class=active' : '' ) %>><a href=\"<%=item.url%>\"><%=item.name%></a></li>\r\n            <%})%>\r\n        </ul>\r\n    </div>\r\n</div>";

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/6.
	 */

	var template = __webpack_require__(16);
	__webpack_require__(19);


	var footerView = Backbone.View.extend({
	    el: mscxPage.domEl.footerEl,
	    events: {
	        'blur .info-line input':'changeAttribute'
	    },
	    initialize: function() {
	        this.$el.html(template);
	    }
	});

	module.exports = footerView;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"footer\">\r\n    <div class=\"grid960 clearfix\">\r\n        <a href=\"../../templates/newindex.html\" class=\"block fl\">\r\n            <img src=\"" + __webpack_require__(17) + "\" alt=\"\">\r\n        </a>\r\n        <ul class=\"fl clearfix\">\r\n            <li class=\"fl\">\r\n                <a href=\"../../templates/newindex.html\">首页</a>\r\n                <a href=\"../../templates/openData/openData.html\">数据</a>\r\n                <a href=\"../../templates/api/citySdk.html\">API</a>\r\n                <a href=\"../../templates/server/server.html\">微服务</a>\r\n                <a href=\"../../templates/customized/citySdkRequire.html\">需求定制</a>\r\n                <a href=\"../../templates/pioneer/news.html\">创业园地</a>\r\n            </li>\r\n            <li class=\"fl\">\r\n                <a href=\"#\">帮助</a>\r\n                <a href=\"#\">关于我们</a>\r\n                <a href=\"#\">新手指导</a>\r\n                <a href=\"#\">API使用</a>\r\n                <a href=\"#\">微应用使用</a>\r\n                <a href=\"#\">常见问题</a>\r\n            </li>\r\n            <li class=\"fl\">\r\n                <a href=\"#\">联系我们</a>\r\n                <a href=\"#\">商务合作</a>\r\n                <a href=\"#\">用户反馈</a>\r\n                <a href=\"#\">合作伙伴</a>\r\n            </li>\r\n        </ul>\r\n        <div class=\"fl text-center righttext\">\r\n            <p class=\"textinfo\">关注官方微信</p>\r\n            <img src=\"" + __webpack_require__(18) + "\" alt=\"\">\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 17 */,
/* 18 */,
/* 19 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin_gu on 2016/4/7.
	 */
	var Routes =  Backbone.Router.extend({
	    routes: {
	        'messageNotice':'messageNotice',//消息通知
	        'companyInfo':'companyInfo'//企业信息
	    },
	    /*首页*/
	    companyInfo:function () {
	        var companyInfoReg = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"companyInfo/companyInfoView.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	        smartPage.backboneViewObj['companyInfoObj'] = new companyInfoReg();
	    },
	    messageNotice: function() {
	        var messageNoticeView = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"messageNotice/messageNoticeView.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	        smartPage.backboneViewObj['messageNoticeObj'] = new messageNoticeView();
	    },
	    openPage: function(url) {
	        this.navigate(url,{trigger: true});
	    },
	    execute: function(callback,args,name) {
	        if(smartPage.backboneViewObj[name+'Obj']) {
	            smartPage.backboneViewObj[name+'Obj'].initialize();
	        }
	        else {
	            if (callback) callback.apply(this, args);
	        }
	    }
	});

	module.exports = Routes;



/***/ }
]);