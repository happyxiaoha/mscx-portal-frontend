webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/7.
	 */

	var header = __webpack_require__(1);
	var footer = __webpack_require__(15);

	var router = __webpack_require__(97);
	var userCenterLeft = __webpack_require__(110);

	$(function() {
	    new header();
	    new footer();
	    mscxPage.userCenter = {leftView: new userCenterLeft()};
	    mscxPage.appRouter = new router();
	    Backbone.history.stop();
	    Backbone.history.start();
	});

/***/ },

/***/ 1:
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

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"header grid960\">\r\n    <h1 class=\"logo fl\">\r\n        <a href=\"#\">\r\n            <img src=\"" + __webpack_require__(3) + "\">\r\n        </a>\r\n    </h1>\r\n    <div class=\"left-area fr clearfix\">\r\n        <div class=\"searchCons fl\">\r\n            <input type=\"text\" class=\"search\" id=\"inputs\" placeholder=\"请输入要查找的内容\">\r\n            <a class=\"search-img\"></a>\r\n        </div>\r\n        <div class=\"fr\">\r\n            <div class=\"noLogin hide\">\r\n                <a href=\"#\" id=\"login\">登陆</a>\r\n                <span>|</span>\r\n                <a href=\"#\" id=\"register\">注册</a>\r\n            </div>\r\n            <div class=\"yesLogin\">\r\n                <div id=\"personReal\" class=\"personIcon\">\r\n                    <span id=\"infoName\" class=\" down\">小太阳</span>\r\n                </div>\r\n            </div>\r\n            <div class=\"shareBox dropMenu\">\r\n                <div class=\"shareList\">\r\n                    <ul>\r\n                        <li class=\"usercenter\">\r\n                            <a href=\"#\">用户中心</a>\r\n                        </li>\r\n                        <li class=\"logout\"><a href=\"#\" id=\"exit\">退出</a></li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"navCons clearfix bgBlue\">\r\n    <div class=\"grid960\">\r\n        <ul class=\"nav fl\">\r\n            <% _.each(menuList, function (item) { %>\r\n                <li <%= (id == item.key ? 'class=active' : '' ) %>><a href=\"<%=item.url%>\"><%=item.name%></a></li>\r\n            <%})%>\r\n        </ul>\r\n    </div>\r\n</div>";

/***/ },

/***/ 4:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 15:
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

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"footer\">\r\n    <div class=\"grid960 clearfix\">\r\n        <a href=\"../../templates/newindex.html\" class=\"block fl\">\r\n            <img src=\"" + __webpack_require__(17) + "\" alt=\"\">\r\n        </a>\r\n        <ul class=\"fl clearfix\">\r\n            <li class=\"fl\">\r\n                <a href=\"../../templates/newindex.html\">首页</a>\r\n                <a href=\"../../templates/openData/openData.html\">数据</a>\r\n                <a href=\"../../templates/api/citySdk.html\">API</a>\r\n                <a href=\"../../templates/server/server.html\">微服务</a>\r\n                <a href=\"../../templates/customized/citySdkRequire.html\">需求定制</a>\r\n                <a href=\"../../templates/pioneer/news.html\">创业园地</a>\r\n            </li>\r\n            <li class=\"fl\">\r\n                <a href=\"#\">帮助</a>\r\n                <a href=\"#\">关于我们</a>\r\n                <a href=\"#\">新手指导</a>\r\n                <a href=\"#\">API使用</a>\r\n                <a href=\"#\">微应用使用</a>\r\n                <a href=\"#\">常见问题</a>\r\n            </li>\r\n            <li class=\"fl\">\r\n                <a href=\"#\">联系我们</a>\r\n                <a href=\"#\">商务合作</a>\r\n                <a href=\"#\">用户反馈</a>\r\n                <a href=\"#\">合作伙伴</a>\r\n            </li>\r\n        </ul>\r\n        <div class=\"fl text-center righttext\">\r\n            <p class=\"textinfo\">关注官方微信</p>\r\n            <img src=\"" + __webpack_require__(18) + "\" alt=\"\">\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },

/***/ 19:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 97:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin_gu on 2016/4/7.
	 */
	var Routes =  Backbone.Router.extend({
	    routes: {
	        '':'defaultView',
	        'info': 'defaultView',
	        'user':'userView'
	    },
	    defaultView:function () {
	        var defaultView = __webpack_require__(98);
	        mscxPage.views['defaultViewObj'] = new defaultView();
	    },
	    userView: function () {
	        var userView = __webpack_require__(104);
	        mscxPage.views['userViewObj'] = new userView();
	    },
	    openPage: function(url) {
	        this.navigate(url,{trigger: true});
	    },
	    execute: function(callback,args,name) {
	        if(mscxPage.userCenter){
	            mscxPage.userCenter.leftView.initialize(name);
	        }
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

/***/ 98:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/6.
	 */

	var template = __webpack_require__(99);
	__webpack_require__(102);

	var defaultView = Backbone.View.extend({
	    el: mscxPage.domEl.userCenterRight,
	    events: {
	        'blur .info-line input':'changeAttribute'

	    },
	    initialize: function() {
	        this.$el.html(template);
	    }
	});

	module.exports = defaultView;

/***/ },

/***/ 99:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"R-topList clearfix mb20\">\r\n    <div class=\"fl bgWhite R-cons mr16 clearfix\">\r\n        <img src=\"" + __webpack_require__(100) + "\" alt=\"\" class=\"fl block mr16\">\r\n        <p class=\"fl\">\r\n            <span class=\"block ft16 corOrange wd82\">小太阳</span>\r\n            <a href=\"#\" class=\"block corBlue message\">消息</a>\r\n            <a href=\"#\" class=\"block corBlue realName\">立刻认证</a>\r\n        </p>\r\n    </div>\r\n    <div class=\"fl bgWhite R-cons mr16 clearfix\">\r\n        <img src=\"" + __webpack_require__(101) + "\" alt=\"\" class=\"fl block mr16\">\r\n        <p class=\"fl tc\">\r\n            <span class=\"block mt16\">累计消费金额</span>\r\n            <a href=\"#\" class=\"block corBlue ft18 mt14\">1200.00<em class=\"ft12 corBlue\">元</em></a>\r\n        </p>\r\n    </div>\r\n    <div class=\"fr bgWhite R-cons clearfix pt12\">\r\n        <div class=\"fl RCconsList\">\r\n            <p>\r\n                <span>关注数据：</span>\r\n                <span><em class=\"corOrange ft18\">26</em>个</span>\r\n            </p>\r\n            <p>\r\n                <span>关注API：</span>\r\n                <span><em class=\"corOrange ft18\">21</em>个</span>\r\n            </p>\r\n            <p>\r\n                <span>关注服务：</span>\r\n                <span><em class=\"corOrange ft18\">8</em>个</span>\r\n            </p>\r\n        </div>\r\n        <div class=\"fr RCconsListBtn\">\r\n            <p>申请API：<em class=\"corOrange ft18\">15</em>个</p>\r\n            <button class=\"bgBlue corff mb8 mt5\"><a class=\"corff\" href=\"#\">申请服务</a></button>\r\n            <button class=\"bgBlue corff\"><a class=\"corff\" href=\"#\">发布服务</a></button>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },

/***/ 100:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ebf72b80852735a0596cef579bf03100.png";

/***/ },

/***/ 101:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "403ca06e08f234df32e6b1675d538981.png";

/***/ },

/***/ 102:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 104:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/6.
	 */

	var template = __webpack_require__(105);
	__webpack_require__(106);

	var userModel = Backbone.Model.extend({
	    url: mscxPage.host+'/user/info.do'
	});

	var userView = Backbone.View.extend({
	    el: mscxPage.domEl.userCenterRight,
	    events: {
	        'click .topTab span': 'changeTab'

	    },
	    changeTab: function (e) {
	        var $this = $(e.target),
	            index = $this.index();
	        new this.childView[index]({el: '#userInfoArea',model: this.userInfoModel})
	    },
	    initialize: function() {
	        this.childView = [userInfoView,userAuthenticationView,userPasswordView];
	        this.userInfoModel = new userModel();
	        this.$el.html(template);
	        debugger;
	        new userInfoView({el: '#userInfoArea',model: this.userInfoModel});
	    }
	});
	var userInfoView = Backbone.View.extend({
	    events: {
	        'blur .info-line input':'changeAttribute'
	    },
	    initialize: function() {
	        this.template = _.template($('#userInfo').html());
	        //this.model.fetch();
	        this.render();
	    },
	    render: function () {
	        var res = {
	            userInfo: '1',
	            status: '未认证',
	            apiKey: 'dasdsa',
	            secretKey: '64517dd09056a42997c36ae3a8b0d354444464517dd0905e',
	            telephone: '123444333',
	            userType: 'sadsa'
	        };
	        this.$el.html(this.template(res));
	    }
	});
	var userAuthenticationView = Backbone.View.extend({
	    events: {
	        'blur .info-line input':'changeAttribute'
	    },
	    initialize: function() {
	        this.template = _.template($('#userAuthentication').html());
	        //this.model.fetch();
	        this.render();
	    },
	    render: function () {
	        var res = {
	            userInfo: '1',
	            status: '未认证',
	            apiKey: 'dasdsa',
	            secretKey: '64517dd09056a42997c36ae3a8b0d354444464517dd0905e',
	            telephone: '123444333',
	            userType: 'sadsa'
	        };
	        this.$el.html(this.template(res));
	    }
	});
	var userPasswordView = Backbone.View.extend({
	    events: {
	        'blur .info-line input':'changeAttribute'
	    },
	    initialize: function() {
	        this.template = _.template($('#userPassword').html());
	        //this.model.fetch();
	        this.render();
	    },
	    render: function () {
	        var res = {
	            userInfo: '1',
	            status: '未认证',
	            apiKey: 'dasdsa',
	            secretKey: '64517dd09056a42997c36ae3a8b0d354444464517dd0905e',
	            telephone: '123444333',
	            userType: 'sadsa'
	        };
	        this.$el.html(this.template(res));
	    }
	});
	module.exports = userView;

/***/ },

/***/ 105:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"topTab clearfix InfoTopTit\">\r\n    <span class=\"active\">用户基本信息</span>\r\n    <span>实名认证</span>\r\n    <span>修改密码</span>\r\n</div>\r\n<div id=\"userInfoArea\"  class=\"tabDownCons\">\r\n\r\n</div>\r\n<script id=\"userInfo\" type=\"template\">\r\n    <div class=\"M-mainInfo clearfix bgWhite\">\r\n        <img src=\"" + __webpack_require__(100) + "\" alt=\"\" class=\"block fl\">\r\n        <div class=\"M-rightMyTxt fr\">\r\n            <p>\r\n                <span class=\"ft16 cor7\">用户名：</span>\r\n                <span class=\"ft16\"><%=userInfo%></span>\r\n            </p>\r\n            <p>\r\n                <span class=\"ft16 cor7\">实名认证：</span>\r\n                <span class=\"ft16\"><%=status%></span>\r\n            </p>\r\n            <p>\r\n                <span class=\"ft16 cor7\">APIKey：</span>\r\n                <span class=\"ft16\"><%=apiKey%></span>\r\n            </p>\r\n            <p>\r\n                <span class=\"ft16 cor7\">secretKey：</span>\r\n                <span class=\"ft16\"><%=secretKey%></span>\r\n            </p>\r\n            <p>\r\n                <span class=\"ft16 cor7\">手机号码：</span>\r\n                <span class=\"ft16\"><%=telephone%></span>\r\n            </p>\r\n            <p>\r\n                <span class=\"ft16 cor7\">用户类型：</span>\r\n                <span class=\"ft16\"><%=userType%></span>\r\n            </p>\r\n        </div>\r\n    </div>\r\n</script>\r\n<script id=\"userAuthentication\" type=\"template\">\r\n    <div class=\"R-titTab My-titTab\">\r\n        <span class=\"active\">个人</span>\r\n        <span>企业</span>\r\n\r\n    </div>\r\n    <!-- 输入报错  input增加errorBor ,错误提示 error显示 -->\r\n    <div class=\"inputCons bgWhite\">\r\n        <!-- 个人 -->\r\n        <div class=\"inputConsList\">\r\n            <form action=\"\">\r\n                <div class=\"loginTable\">\r\n                    <ul>\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE\">\r\n                                <span>用户名：</span>\r\n                                <b class=\"cor4 fl ft14\" style=\"margin-top: 8px;\">小太阳</b>\r\n                            </div>\r\n                            <i class=\"error\">请填写与有效身份证上一致的姓名</i>\r\n                        </li>\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE\">\r\n                                <span><em>*</em>姓名：</span>\r\n                                <input type=\"text\" placeholder=\"请填写与有效身份证上一致的姓名\">\r\n                                <em class=\"close\">×</em>\r\n                            </div>\r\n                            <i class=\"error\">请填写与有效身份证上一致的姓名</i>\r\n                        </li>\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE\">\r\n                                <span><em>*</em>身份证号码：</span>\r\n                                <input type=\"text\" placeholder=\"请填写18位身份证号码\">\r\n                                <em class=\"close\">×</em>\r\n                            </div>\r\n                            <i class=\"error\">请填写有效的18位数字的身份证号码</i>\r\n                        </li>\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE w100\">\r\n                                <span><em>*</em>认证方式：</span>\r\n                                <select class=\"identifide \" style=\"margin-bottom: 0\">\r\n                                    <option value=\"\">请选择认证方式</option>\r\n                                    <option value=\"photo\">照片认证</option>\r\n                                    <option value=\"phone\">手机认证</option>\r\n                                    <option value=\"creditCard\">银行卡认证号</option>\r\n                                </select>\r\n                                <em class=\"close\">×</em>\r\n                            </div>\r\n                            <i class=\"error\">请填写有效的18位数字的身份证号码</i>\r\n                        </li>\r\n                        <li class=\"clearfix identifyType\" id=\"photo\" style=\"display: none;\">\r\n                            <div class=\"clearfix\">\r\n                                <span><em>*</em>个人照片：</span>\r\n                                <input type=\"file\" class=\"hide\">\r\n                                <label  class=\"upLoad mr25 front allInfoImg\">\r\n                                    <img src=\"xxxHTMLLINKxxx0.53250806778669360.09566040756180882xxx\" alt=\"\" class=\"hide\">\r\n                                    <input type=\"file\">\r\n                                </label>\r\n                            </div>\r\n                        </li>\r\n                        <li class=\"clearfix identifyType \" id=\"phone\" style=\"display: none;\">\r\n                            <div class=\"clearfix\">\r\n                                <span><em>*</em>手机号码：</span>\r\n                                <input type=\"text\" placeholder=\"请输入手机号码\">\r\n                            </div>\r\n                        </li>\r\n                        <li class=\"clearfix identifyType\" id=\"creditCard\" style=\"display: none;\">\r\n                            <div class=\"clearfix mb20\">\r\n                                <span><em>*</em>手机号码：</span>\r\n                                <input type=\"text\" placeholder=\"请输入手机号码\">\r\n                            </div>\r\n                            <div class=\"clearfix\">\r\n                                <span><em>*</em>银行卡号：</span>\r\n                                <input type=\"text\" placeholder=\"请输入银行卡号\">\r\n                            </div>\r\n                        </li>\r\n                        <li class=\"mt48 clearfix\">\r\n                            <button class=\"mt20\">提交</button>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </form>\r\n        </div>\r\n        <!-- 企业 -->\r\n        <div class=\"inputConsList hide\">\r\n            <form action=\"\">\r\n                <div class=\"loginTable\">\r\n                    <h4 class=\"ft18\">企业信息</h4>\r\n                    <ul class=\"mt30 mb30 companyCons\">\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE\">\r\n                                <span><em>*</em>公司名称：</span>\r\n                                <input type=\"text\" placeholder=\"请填写有效的公司名称\">\r\n                                <em class=\"close\">×</em>\r\n                            </div>\r\n                            <i class=\"error\">请填写有效的公司名称</i>\r\n                        </li>\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE\">\r\n                                <span><em>*</em>详情地址：</span>\r\n                                <input type=\"text\" placeholder=\"请填写详情地址\">\r\n                                <em class=\"close\">×</em>\r\n                            </div>\r\n                            <i class=\"error\">请填写详情地址</i>\r\n                        </li>\r\n                    </ul>\r\n                    <ul class=\"mt30 mb30 companyCons\">\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE\">\r\n                                <span><em>*</em>营业执照编号：</span>\r\n                                <input type=\"text\" placeholder=\"请填写有效的营业执照编号\">\r\n                                <em class=\"close\">×</em>\r\n                            </div>\r\n                            <i class=\"error\">请填写有效的营业执照编号</i>\r\n                        </li>\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE\">\r\n                                <span>税务登记证编号：</span>\r\n                                <input type=\"text\" placeholder=\"请填写有效的税务登记证编号\">\r\n                                <em class=\"close\">×</em>\r\n                            </div>\r\n                            <i class=\"error\">请填写有效的税务登记证编号</i>\r\n                        </li>\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE\">\r\n                                <span>组织机构编号：</span>\r\n                                <input type=\"text\" placeholder=\"请填写有效的组织机构编号\">\r\n                                <em class=\"close\">×</em>\r\n                            </div>\r\n                            <i class=\"error\">请填写有效的组织机构编号</i>\r\n                        </li>\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"clearfix\">\r\n                                <span><em>*</em>营业执照副本：</span>\r\n                                <input type=\"file\" id=\"Url\" class=\"hide\">\r\n                                <label for=\"Url\" class=\"upLoad\">\r\n                                    <img src=\"xxxHTMLLINKxxx0.116929244250059130.3585990678984672xxx\" alt=\"\" class=\"hide\">\r\n                                </label>\r\n                                <i class=\"error mt34\">请上传有效的营业执照副本</i>\r\n                            </div>\r\n                        </li>\r\n                    </ul>\r\n                    <h4 class=\"ft18\">联系人信息</h4>\r\n                    <ul class=\"mt30 mb30 companyCons\">\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE\">\r\n                                <span><em>*</em>联系人姓名：</span>\r\n                                <input type=\"text\" placeholder=\"请填写有效的联系人姓名\">\r\n                                <em class=\"close\">×</em>\r\n                            </div>\r\n                            <i class=\"error\">请填写有效的联系人姓名</i>\r\n                        </li>\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE\">\r\n                                <span><em>*</em>联系人身份证号：</span>\r\n                                <input type=\"text\" placeholder=\"请填写有效的身份证号码\">\r\n                                <em class=\"close\">×</em>\r\n                            </div>\r\n                            <i class=\"error\">请填写有效的18位数字的身份证号码</i>\r\n                        </li>\r\n\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE\">\r\n                                <span><em>*</em>手机号码：</span>\r\n                                <input type=\"text\" placeholder=\"请填写有效的手机号码\">\r\n                                <em class=\"close\">×</em>\r\n                            </div>\r\n                            <i class=\"error\">请填写有效的11位手机号码</i>\r\n                        </li>\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE\">\r\n                                <span><em>*</em>公司邮箱：</span>\r\n                                <input type=\"text\" placeholder=\"请填写有效的公司邮箱\">\r\n                                <em class=\"close\">×</em>\r\n                            </div>\r\n                            <i class=\"error\">请填写有效的公司邮箱</i>\r\n                        </li>\r\n\r\n\r\n\r\n                    </ul>\r\n                    <ul>\r\n                        <li>\r\n                            <button  class=\"mt20\">提交</button>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </form>\r\n        </div>\r\n\r\n    </div>\r\n</script>\r\n<script id=\"userPassword\" type=\"template\">\r\n    <div class=\"R-mainInfo clearfix\">\r\n        <div class=\"inputCons bgWhite\">\r\n            <!-- 企业 -->\r\n            <div class=\"inputConsList\">\r\n                <form action=\"\">\r\n                    <div class=\"loginTable bor0\">\r\n                        <ul class=\"companyCons\">\r\n                            <li class=\"clearfix\">\r\n                                <div class=\"fl clearfix posRE\">\r\n                                    <span><em>*</em>旧密码：</span>\r\n                                    <input type=\"password\" placeholder=\"请填写原始密码\" >\r\n                                    <em class=\"close\">×</em>\r\n                                </div>\r\n                                <i class=\"error\">请填写正确的原始密码</i>\r\n                            </li>\r\n                            <li class=\"clearfix\">\r\n                                <div class=\"fl clearfix posRE\">\r\n                                    <span><em>*</em>新密码：</span>\r\n                                    <input type=\"password\" placeholder=\"请填写新密码\">\r\n                                    <em class=\"close\">×</em>\r\n                                </div>\r\n                                <i class=\"error\">请核对密码</i>\r\n                            </li>\r\n                            <li class=\"clearfix\">\r\n                                <div class=\"fl clearfix posRE\">\r\n                                    <span><em>*</em>确认新密码：</span>\r\n                                    <input type=\"password\" placeholder=\"请再次填写新密码\">\r\n                                    <em class=\"close\">×</em>\r\n                                </div>\r\n                                <i class=\"error\">请核对密码</i>\r\n                            </li>\r\n                            <li>\r\n                                <button id=\"Login\" class=\"mt20\">确认修改</button>\r\n                            </li>\r\n                        </ul>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</script>";

/***/ },

/***/ 106:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 110:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/6.
	 */

	var template = __webpack_require__(111);
	__webpack_require__(112);

	var mainView = Backbone.View.extend({
	    el: mscxPage.domEl.userCenterLeft,
	    events: {
	    },
	    initialize: function(name) {
	        var sName = name || '';
	        this.$el.html(_.template(template)({
	            name: sName
	        }));
	    }
	});

	module.exports = mainView;

/***/ },

/***/ 111:
/***/ function(module, exports) {

	module.exports = "<a href=\"myinfo.html\" class=\"myinfo\">用户中心</a>\r\n<ul>\r\n    <li>\r\n        <a href=\"#user\" <%= (name == 'userView' ? 'class=active' : '' ) %> >个人中心</a>\r\n        <a href=\"myAccount.html\">我的账户</a>\r\n        <a href=\"myRequire.html\">我的需求</a>\r\n        <a href=\"myData.html\">我的数据</a>\r\n        <a href=\"myAPI.html\">我的API</a>\r\n        <a href=\"myServer.html\">我的服务</a>\r\n        <a href=\"myOrder.html\">订单管理</a>\r\n        <a href=\"myPioneer.html\">创业园地</a>\r\n    </li>\r\n</ul>";

/***/ },

/***/ 112:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});