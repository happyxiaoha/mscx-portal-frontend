webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/7.
	 */

	var header = __webpack_require__(21);
	var footer = __webpack_require__(11);
	var router = __webpack_require__(29);

	$(function() {
	    new header();
	    new footer();

	    mscxPage.appRouter = new router();
	    Backbone.history.stop();
	    Backbone.history.start();
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
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
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/6.
	 */
	var template = __webpack_require__(22);
	__webpack_require__(23);

	var headerView = Backbone.View.extend({
	    el: mscxPage.domEl.headerEl,
	    events: {
	        'blur .info-line input':'changeAttribute'

	    },
	    initialize: function() {
	        this.$el.html(template);
	    }
	});

	module.exports = headerView;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"header grid960\">\r\n    <h1 class=\"logo fl\">\r\n        <a href=\"#\">\r\n            <img src=\"" + __webpack_require__(3) + "\">\r\n        </a>\r\n    </h1>\r\n    <div class=\"left-area fr clearfix\">\r\n        <div class=\"searchCons fl\">\r\n            <input type=\"text\" class=\"search\" id=\"inputs\" placeholder=\"请输入要查找的内容\">\r\n            <a class=\"search-img\"></a>\r\n        </div>\r\n        <div class=\"fr\">\r\n            <div class=\"noLogin hide\">\r\n                <a href=\"#\" id=\"login\">登陆</a>\r\n                <span>|</span>\r\n                <a href=\"#\" id=\"register\">注册</a>\r\n            </div>\r\n            <div class=\"yesLogin\">\r\n                <div id=\"personReal\" class=\"personIcon\">\r\n                    <span id=\"infoName\" class=\" down\">小太阳</span>\r\n                </div>\r\n            </div>\r\n            <div class=\"shareBox dropMenu\">\r\n                <div class=\"shareList\">\r\n                    <ul>\r\n                        <li class=\"usercenter\">\r\n                            <a href=\"#\">用户中心</a>\r\n                        </li>\r\n                        <li class=\"logout\"><a href=\"#\" id=\"exit\">退出</a></li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"navCons clearfix bgBlue\">\r\n    <div class=\"grid960\">\r\n        <ul class=\"nav fl\">\r\n            <li><a href=\"../newindex.html\">首页</a></li>\r\n            <li><a href=\"../openData/openData.html\">数据</a></li>\r\n            <li><a href=\"../api/citySdk.html\">API</a></li>\r\n            <li><a href=\"../server/server.html\">微服务</a></li>\r\n            <li><a href=\"../customized/citySdkRequire.html\">需求定制</a></li>\r\n            <li><a href=\"../pioneer/news.html\">创业园地</a></li>\r\n        </ul>\r\n    </div>\r\n</div>";

/***/ },
/* 23 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin_gu on 2016/4/7.
	 */
	var Routes =  Backbone.Router.extend({
	    routes: {
	        '':'defaultView',
	        'info': 'defaultView',
	        'companyInfo':'companyInfo'//企业信息
	    },
	    defaultView:function () {
	        
	        var defaultView = __webpack_require__(30);
	        mscxPage.views['defaultViewObj'] = new defaultView();
	    },
	    openPage: function(url) {
	        this.navigate(url,{trigger: true});
	    },
	    execute: function(callback,args,name) {
	        if(mscxPage.views[name+'Obj']) {
	            mscxPage.views[name+'Obj'].initialize();
	        }
	        else {
	            if (callback) callback.apply(this, args);
	        }
	    }
	});

	module.exports = Routes;



/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/6.
	 */

	var template = __webpack_require__(31);
	__webpack_require__(34);

	var mainView = Backbone.View.extend({
	    el: mscxPage.domEl.mainEl,
	    events: {
	        'blur .info-line input':'changeAttribute'

	    },
	    initialize: function() {
	        this.$el.html(template);
	    }
	});

	module.exports = mainView;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"R-topList clearfix mb20\">\r\n    <div class=\"fl bgWhite R-cons mr16 clearfix\">\r\n        <img src=\"" + __webpack_require__(32) + "\" alt=\"\" class=\"fl block mr16\">\r\n        <p class=\"fl\">\r\n            <span class=\"block ft16 corOrange wd82\">小太阳</span>\r\n            <a href=\"#\" class=\"block corBlue message\">消息</a>\r\n            <a href=\"#\" class=\"block corBlue realName\">立刻认证</a>\r\n        </p>\r\n    </div>\r\n    <div class=\"fl bgWhite R-cons mr16 clearfix\">\r\n        <img src=\"" + __webpack_require__(33) + "\" alt=\"\" class=\"fl block mr16\">\r\n        <p class=\"fl tc\">\r\n            <span class=\"block mt16\">累计消费金额</span>\r\n            <a href=\"#\" class=\"block corBlue ft18 mt14\">1200.00<em class=\"ft12 corBlue\">元</em></a>\r\n        </p>\r\n    </div>\r\n    <div class=\"fr bgWhite R-cons clearfix pt12\">\r\n        <div class=\"fl RCconsList\">\r\n            <p>\r\n                <span>关注数据：</span>\r\n                <span><em class=\"corOrange ft18\">26</em>个</span>\r\n            </p>\r\n            <p>\r\n                <span>关注API：</span>\r\n                <span><em class=\"corOrange ft18\">21</em>个</span>\r\n            </p>\r\n            <p>\r\n                <span>关注服务：</span>\r\n                <span><em class=\"corOrange ft18\">8</em>个</span>\r\n            </p>\r\n        </div>\r\n        <div class=\"fr RCconsListBtn\">\r\n            <p>申请API：<em class=\"corOrange ft18\">15</em>个</p>\r\n            <button class=\"bgBlue corff mb8 mt5\"><a class=\"corff\" href=\"#\">申请服务</a></button>\r\n            <button class=\"bgBlue corff\"><a class=\"corff\" href=\"#\">发布服务</a></button>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ebf72b80852735a0596cef579bf03100.png";

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "403ca06e08f234df32e6b1675d538981.png";

/***/ },
/* 34 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);