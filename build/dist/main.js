webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by kevin on 2016/12/6.
	 */

	var header = __webpack_require__(1);
	var footer = __webpack_require__(11);
	var mianView = __webpack_require__(17);

	$(function() {
	    new header();
	    new footer();
	    new mianView();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/6.
	 */

	var template = __webpack_require__(2);
	__webpack_require__(4);

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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"header grid1190\">\r\n    <h1 class=\"logo fl\">\r\n        <a href=\"../templates/newindex.html\">\r\n            <img src=\"" + __webpack_require__(3) + "\">\r\n        </a>\r\n    </h1>\r\n    <div class=\"navCons fl mt20\">\r\n        <ul class=\"nav fl\">\r\n            <li class=\"active\"><a href=\"#\">首页</a></li>\r\n            <li><a href=\"openData/openData.html\">数据</a></li>\r\n            <li><a href=\"api/citySdk.html\">API</a></li>\r\n            <li><a href=\"server/server.html\">微服务</a></li>\r\n            <li><a href=\"customized/citySdkRequire.html\">需求定制</a></li>\r\n            <li><a href=\"pioneer/news.html\">创业园地</a></li>\r\n        </ul>\r\n    </div>\r\n    <div class=\"haslogin fr clearfix\">\r\n        <div class=\"searchCons fl\">\r\n            <input type=\"text\" class=\"search\" id=\"inputs\" placeholder=\"请输入要查找的内容\">\r\n            <a class=\"search-img\"></a>\r\n        </div>\r\n        <div class=\"fr\">\r\n            <div class=\"noLogin hide\">\r\n                <a href=\"#\" id=\"login\">登陆</a>\r\n                <span>|</span>\r\n                <a href=\"#\" id=\"register\">注册</a>\r\n            </div><div class=\"yesLogin\">\r\n            <div id=\"personReal\" class=\"personIcon\">\r\n                <span id=\"infoName\" class=\" down\">小太阳</span>\r\n            </div>\r\n        </div><!-- 个人中心 -->\r\n            <div class=\"shareBox dropMenu\" style=\"display: none;\">\r\n                <div class=\"shareList\">\r\n                    <ul>\r\n                        <li class=\"usercenter\">\r\n                            <a href=\"../templates/myinfo/myinfo.html\">用户中心</a>\r\n                        </li>\r\n                        <li class=\"logout\"><a href=\"#\" id=\"exit\">退出</a></li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

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
/* 15 */,
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/6.
	 */
	var template = __webpack_require__(18);
	__webpack_require__(19);

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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"footer bg535353 indexfooter\">\r\n    <div class=\"grid1190 clearfix\">\r\n        <a href=\"../templates/newindex2.html\" class=\"block fl\">\r\n            <img src=\"" + __webpack_require__(13) + "\" alt=\"\">\r\n        </a>\r\n        <ul class=\"fl clearfix\">\r\n            <li class=\"fl\">\r\n                <a href=\"../templates/newindex.html\">首页</a>\r\n                <a href=\"../templates/openData/openData.html\">数据</a>\r\n                <a href=\"../templates/api/citySdk.html\">API</a>\r\n                <a href=\"../templates/server/server.html\">微服务</a>\r\n                <a href=\"../templates/customized/citySdkRequire.html\">\r\n                    需求定制</a>\r\n                <a href=\"../templates/pioneer/news.html\">创业园地</a>\r\n            </li>\r\n            <li class=\"fl\">\r\n                <a href=\"#\">帮助</a>\r\n                <a href=\"#\">关于我们</a>\r\n                <a href=\"#\">新手指导</a>\r\n                <a href=\"#\">API使用</a>\r\n                <a href=\"#\">微应用使用</a>\r\n                <a href=\"#\">常见问题</a>\r\n            </li>\r\n            <li class=\"fl\">\r\n                <a href=\"#\">联系我们</a>\r\n                <a href=\"#\">商务合作</a>\r\n                <a href=\"#\">用户反馈</a>\r\n                <a href=\"#\">合作伙伴</a>\r\n            </li>\r\n        </ul>\r\n        <div class=\"fl text-center righttext\">\r\n            <p class=\"textinfo\">关注官方微信</p>\r\n            <img src=\"" + __webpack_require__(14) + "\" alt=\"\">\r\n        </div>\r\n        <div class=\"forhelp fl\">\r\n            <div class=\"swhz\">\r\n                <p>商务合作（工作日9:00-18:00）</p>\r\n                <p class=\"ft18 mt10\">010-8765436</p>\r\n            </div>\r\n            <div class=\"jisuzhichi\">\r\n                <p>技术支持</p>\r\n                <p class=\"ft18 mt10\">010-8765436</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 19 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);