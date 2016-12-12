/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		2:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"main","1":"userInfo"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "9f6e159f7a73bd569db758081747c520.png";

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "45705948a6ffc7ba7eac9fc3a41587db.png";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f14b7e2ba540c8f368a95e4081460ab9.png";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "2325267fd5ded71e89275c1b9d878b1c.png";

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/6.
	 */

	var template = __webpack_require__(12);
	__webpack_require__(15);


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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"footer\">\r\n    <div class=\"grid960 clearfix\">\r\n        <a href=\"../../templates/newindex.html\" class=\"block fl\">\r\n            <img src=\"" + __webpack_require__(13) + "\" alt=\"\">\r\n        </a>\r\n        <ul class=\"fl clearfix\">\r\n            <li class=\"fl\">\r\n                <a href=\"../../templates/newindex.html\">首页</a>\r\n                <a href=\"../../templates/openData/openData.html\">数据</a>\r\n                <a href=\"../../templates/api/citySdk.html\">API</a>\r\n                <a href=\"../../templates/server/server.html\">微服务</a>\r\n                <a href=\"../../templates/customized/citySdkRequire.html\">需求定制</a>\r\n                <a href=\"../../templates/pioneer/news.html\">创业园地</a>\r\n            </li>\r\n            <li class=\"fl\">\r\n                <a href=\"#\">帮助</a>\r\n                <a href=\"#\">关于我们</a>\r\n                <a href=\"#\">新手指导</a>\r\n                <a href=\"#\">API使用</a>\r\n                <a href=\"#\">微应用使用</a>\r\n                <a href=\"#\">常见问题</a>\r\n            </li>\r\n            <li class=\"fl\">\r\n                <a href=\"#\">联系我们</a>\r\n                <a href=\"#\">商务合作</a>\r\n                <a href=\"#\">用户反馈</a>\r\n                <a href=\"#\">合作伙伴</a>\r\n            </li>\r\n        </ul>\r\n        <div class=\"fl text-center righttext\">\r\n            <p class=\"textinfo\">关注官方微信</p><img src=\"" + __webpack_require__(14) + "\" alt=\"\">\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "b650363e7cd18799d8f62d6bd07eda14.png";

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "9127e17c7fc9fecace8922cd066f9443.png";

/***/ },
/* 15 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);