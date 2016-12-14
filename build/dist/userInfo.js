webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/7.
	 */

	var header = __webpack_require__(1);
	var footer = __webpack_require__(15);

	var router = __webpack_require__(184);
	var userCenterLeft = __webpack_require__(209);

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

/***/ 184:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin_gu on 2016/4/7.
	 */
	var Routes =  Backbone.Router.extend({
	    routes: {
	        '':'defaultView',
	        'info': 'defaultView',
	        'user':'userView',
	        'account': 'accountView',
	        'demand': 'demandView'
	    },
	    defaultView:function () {
	        var defaultView = __webpack_require__(185);
	        mscxPage.views['defaultViewObj'] = new defaultView();
	    },
	    userView: function () {
	        var userView = __webpack_require__(193);
	        mscxPage.views['userViewObj'] = new userView();
	    },
	    accountView: function () {
	        var accountView = __webpack_require__(201);
	        mscxPage.views['accountViewObj'] = new accountView();
	    },
	    demandView: function () {
	        var demandView = __webpack_require__(205);
	        mscxPage.views['demandViewObj'] = new demandView();
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

/***/ 185:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/6.
	 */

	var template = __webpack_require__(186);
	__webpack_require__(189);

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

/***/ 186:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"R-topList clearfix mb20\">\r\n    <div class=\"fl bgWhite R-cons mr16 clearfix\">\r\n        <img src=\"" + __webpack_require__(187) + "\" alt=\"\" class=\"fl block mr16\">\r\n        <p class=\"fl\">\r\n            <span class=\"block ft16 corOrange wd82\">小太阳</span>\r\n            <a href=\"#\" class=\"block corBlue message\">消息</a>\r\n            <a href=\"#\" class=\"block corBlue realName\">立刻认证</a>\r\n        </p>\r\n    </div>\r\n    <div class=\"fl bgWhite R-cons mr16 clearfix user-cost\">\r\n        <img src=\"" + __webpack_require__(188) + "\" alt=\"\" class=\"fl block mr16\">\r\n        <p class=\"fl tc\">\r\n            <span class=\"block mt16\">累计消费金额</span>\r\n            <a href=\"#\" class=\"block corBlue ft18 mt14\">1200.00<em class=\"ft12 corBlue\">元</em></a>\r\n        </p>\r\n    </div>\r\n    <div class=\"fr bgWhite R-cons clearfix pt12 user-ser\">\r\n        <div class=\"fl RCconsList\">\r\n            <p>\r\n                <span>关注数据：</span>\r\n                <span><em class=\"corOrange ft18\">26</em>个</span>\r\n            </p>\r\n            <p>\r\n                <span>关注API：</span>\r\n                <span><em class=\"corOrange ft18\">21</em>个</span>\r\n            </p>\r\n            <p>\r\n                <span>关注服务：</span>\r\n                <span><em class=\"corOrange ft18\">8</em>个</span>\r\n            </p>\r\n        </div>\r\n        <div class=\"fr RCconsListBtn\">\r\n            <p>申请API：<em class=\"corOrange ft18\">15</em>个</p>\r\n            <button class=\"bgBlue corff mb8 mt5\"><a class=\"corff\" href=\"#\">申请服务</a></button>\r\n            <button class=\"bgBlue corff\"><a class=\"corff\" href=\"#\">发布服务</a></button>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ebf72b80852735a0596cef579bf03100.png";

/***/ },

/***/ 188:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "403ca06e08f234df32e6b1675d538981.png";

/***/ },

/***/ 189:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 193:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/6.
	 */

	var template = __webpack_require__(194);
	__webpack_require__(195);
	__webpack_require__(199);
	__webpack_require__(200);
	var ucApi = '/ro/mscx-uc-api/';
	var getPersonAuthModel = Backbone.Model.extend({
	    url: mscxPage.host+''+ucApi+'certification/person/info.do'
	});
	var getEnterpriseAuthModel = Backbone.Model.extend({
	    url: mscxPage.host+''+ucApi+'certification/enterprise/info.do'
	});
	var userPasswordManagerModel = Backbone.Model.extend({
	    url: mscxPage.host+''+ucApi+'change/password.do'
	});

	var userView = Backbone.View.extend({
	    el: mscxPage.domEl.userCenterRight,
	    events: {
	        'click #userTabs span': 'changeTab'
	    },
	    changeTab: function (e) {
	        var $this = $(e.target),
	            isActive = $this.hasClass('active'),
	            index = $this.index();
	        if(!isActive){
	            $this.parent().find('.active').removeClass('active');
	            $this.addClass('active');
	            new this.childView[index]({el: '#userInfoArea'});
	        }

	    },
	    initialize: function() {
	        this.childView = [userInfoView,userAuthenticationView,userPasswordView];
	        this.$el.html(template);
	        new userInfoView({el: '#userInfoArea'});
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
	        'click #authTab':'changeTab',
	        'change .identifide': 'changeAuthType',
	        'change .upload-file': 'uploadFile'
	    },
	    personValidateConfig: function () {
	        var that = this;
	        return {
	            rules: {
	                name: {
	                    required: true,
	                    minlength: 2
	                },
	                idcard: {
	                    required: true,
	                    careId: true
	                },
	                bankCard: {
	                    required: true,
	                    bankCard: true
	                },
	                telephone: {
	                    required: true,
	                    telephone: true
	                }
	            },
	            submitHandler: function () {
	                that.doSavePerson()
	            }
	        }
	    },
	    enterpriseValidateConfig: function () {
	        var that = this;
	        return {
	            rules: {
	                contractName: {
	                    required: true,
	                    minlength: 2
	                },
	                name:{
	                    required: true,
	                    minlength: 2
	                },
	                address: {
	                    required: true
	                },
	                licenceNo: {
	                    required: true,
	                    bussinessCard: true
	                },
	                contractIdCard: {
	                    required: true,
	                    careId: true
	                },
	                contractMobile: {
	                    required: true,
	                    telephone: true
	                },
	                contractEmail: {
	                    required: true,
	                    email: true
	                }
	            },
	            submitHandler: function () {
	                that.doEnterpriseSave()
	            }
	        }
	    },
	    doSavePerson: function () {
	        if($('.identifide ').val() == 'photo' && !$('.upload-file').val()){
	            $('.identifyType').find('.phone-error').removeClass('hide');
	            return;
	        }
	        $('.identifyType').find('.phone-error').addClass('hide');


	    },
	    doEnterpriseSave: function () {

	    },
	    initialize: function() {
	        var that = this;
	        this.personAuthModel = new getPersonAuthModel();
	        this.enterpriseAuthModel = new getEnterpriseAuthModel();
	        this.template = _.template($('#userAuthentication').html());
	        this.personAuthModel.fetch({
	            success: function (model,res) {
	                if(res.result){
	                    that.renderPerson();
	                }
	                else {
	                    that.enterpriseAuthModel.fetch({
	                        success: function () {
	                            that.render();
	                        }
	                    });
	                }
	            }
	        });
	        that.render();
	    },
	    changeAuthType: function (e) {
	        var sVal = $(e.target).val();
	        if(sVal == 'photo'){
	            $('#ajaxUpload').show();
	        }
	        else {
	            $('#ajaxUpload').hide();
	        }
	        $('.identifyType').html($('#'+sVal).html());
	        e.stopPropagation();
	        e.preventDefault();
	    },
	    changeTab: function (e) {
	        var $this = $(e.target),
	            isActive = $this.hasClass('active'),
	            index = $this.index();
	        if(!$this.is('span')){
	            return;
	        }
	        if(!isActive){
	            $this.parent().find('.active').removeClass('active');
	            $this.addClass('active');
	            index === 0 ? this.renderPerson() : this.renderEnterprise() ;
	        }
	        e.stopPropagation();
	        e.preventDefault();
	    },
	    renderPerson: function () {
	        this.$el.find('.inputCons').html($('#userPersonAuth').html());
	        $('#personForm').validate(this.personValidateConfig());
	    },
	    renderEnterprise: function () {
	        this.$el.find('.inputCons').html($('#userEnterpriseAuth').html());
	        $('#enterpriseForm').validate(this.enterpriseValidateConfig());
	    },
	    uploadFile: function (e) {
	        var $this = $(e.target).parent(),
	            $formArea = $('#ajaxUpload');
	        if($this[0].id == 'ajaxEnterpriseUpload'){
	            $formArea = $('#ajaxEnterpriseUpload');
	            $formArea.attr('action',mscxPage.host+''+ucApi+'certification/person/upload/photo.do');
	        }
	        else {
	            $formArea.attr('action',mscxPage.host+''+ucApi+'enterprise/upload/licence.do');
	        }
	        var that = this;
	        var options = {
	            success: function (res) {
	                var src = res.result;
	                debugger;
	            },
	            error: function () {
	                layer.alert('上传失败', {icon: 2});
	            }
	        };
	        $formArea.ajaxForm(options);
	        $formArea.find('input[type="submit"]').click();
	        $formArea = null;
	    },
	    render: function () {
	        this.$el.html(this.template());

	        this.renderPerson();
	    }
	});
	var userPasswordView = Backbone.View.extend({
	    events: {
	        'input .user-password-area input[type="password"]' : 'changeAttribute'
	    },
	    validateConfig: function () {
	        var that = this;
	        return {
	            rules: {
	                oldPassword: {
	                    required: true,
	                    password: true
	                },
	                password: {
	                    required: true,
	                    password: true
	                },
	                passwordConfirm: {
	                    required: true,
	                    equalTo: '#password'
	                }
	            },
	            submitHandler: function () {
	                that.doSave()
	            }
	        }
	    },
	    doSave: function () {
	        this.model.save({},{
	            type: 'POST',
	            success: function () {
	                console.log(1);
	            }
	        });
	    },
	    changeAttribute: function (e) {
	        this.model.set(e.target.id,e.target.value);
	        return false;
	    },
	    initialize: function() {
	        this.render();
	        this.model = new userPasswordManagerModel();
	    },
	    render: function () {
	        this.$el.html($('#userPassword').html());
	        $('#userPasswordForm').validate(this.validateConfig());
	    }
	});
	module.exports = userView;

/***/ },

/***/ 194:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div id=\"userTabs\" class=\"topTab clearfix InfoTopTit\">\r\n    <span class=\"active\">用户基本信息</span>\r\n    <span>实名认证</span>\r\n    <span>修改密码</span>\r\n</div>\r\n<div id=\"userInfoArea\"  class=\"tabDownCons\">\r\n</div>\r\n<script id=\"userInfo\" type=\"template\">\r\n    <div class=\"M-mainInfo clearfix bgWhite\">\r\n        <img src=\"" + __webpack_require__(187) + "\" alt=\"\" class=\"block fl\">\r\n        <div class=\"M-rightMyTxt fr\">\r\n            <p>\r\n                <span class=\"ft16 cor7\">用户名：</span>\r\n                <span class=\"ft16\"><%=userInfo%></span>\r\n            </p>\r\n            <p>\r\n                <span class=\"ft16 cor7\">实名认证：</span>\r\n                <span class=\"ft16\"><%=status%></span>\r\n            </p>\r\n            <p>\r\n                <span class=\"ft16 cor7\">APIKey：</span>\r\n                <span class=\"ft16\"><%=apiKey%></span>\r\n            </p>\r\n            <p>\r\n                <span class=\"ft16 cor7\">secretKey：</span>\r\n                <span class=\"ft16\"><%=secretKey%></span>\r\n            </p>\r\n            <p>\r\n                <span class=\"ft16 cor7\">手机号码：</span>\r\n                <span class=\"ft16\"><%=telephone%></span>\r\n            </p>\r\n            <p>\r\n                <span class=\"ft16 cor7\">用户类型：</span>\r\n                <span class=\"ft16\"><%=userType%></span>\r\n            </p>\r\n        </div>\r\n    </div>\r\n</script>\r\n<script id=\"userAuthentication\" type=\"template\">\r\n    <div id=\"authTab\" class=\"R-titTab My-titTab\">\r\n        <span class=\"active\">个人</span>\r\n        <span>企业</span>\r\n    </div>\r\n    <!-- 输入报错  input增加errorBor ,错误提示 error显示 -->\r\n    <div class=\"inputCons bgWhite\">\r\n\r\n    </div>\r\n</script>\r\n<script id=\"userPersonAuth\" type=\"template\">\r\n    <div class=\"inputConsList\">\r\n        <form id=\"personForm\" onsubmit=\"return false;\">\r\n            <div class=\"loginTable\">\r\n                <ul>\r\n                    <li class=\"clearfix\">\r\n                        <div class=\"fl clearfix posRE\">\r\n                            <span>用户名：</span>\r\n                            <b class=\"cor4 fl ft14\" style=\"margin-top: 8px;\">小太阳</b>\r\n                        </div>\r\n                    </li>\r\n                    <li class=\"clearfix\">\r\n                        <div class=\"fl clearfix posRE\">\r\n                            <span><em>*</em>姓名：</span>\r\n                            <input type=\"text\" id=\"name\" name=\"name\" placeholder=\"请填写与有效身份证上一致的姓名\">\r\n                        </div>\r\n                        <i class=\"error\"></i>\r\n                    </li>\r\n                    <li class=\"clearfix\">\r\n                        <div class=\"fl clearfix posRE\">\r\n                            <span><em>*</em>身份证号码：</span>\r\n                            <input type=\"text\" id=\"idcard\" name=\"idcard\" placeholder=\"请填写有效身份证号码\">\r\n                        </div>\r\n                        <i class=\"error\"></i>\r\n                    </li>\r\n                    <li class=\"clearfix\">\r\n                        <div class=\"fl clearfix posRE w100\">\r\n                            <span><em>*</em>认证方式：</span>\r\n                            <select class=\"identifide\">\r\n                                <option value=\"photo\">照片认证</option>\r\n                                <option value=\"phone\">手机认证</option>\r\n                                <option value=\"creditCard\">银行卡认证号</option>\r\n                            </select>\r\n                        </div>\r\n                    </li>\r\n                    <li class=\"clearfix identifyType\" >\r\n                        <div class=\"clearfix\">\r\n                            <span><em>*</em>个人照片：</span>\r\n                            <label class=\"upLoad mr25 front allInfoImg\">\r\n                                <img class=\"hide\">\r\n                            </label>\r\n                            <label class=\"phone-error hide\">请上传个人照片</label>\r\n                        </div>\r\n                    </li>\r\n                    <li class=\"mt48 clearfix\">\r\n                        <input type=\"submit\" class=\"mt20\" value=\"提交\" />\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </form>\r\n        <form id=\"ajaxUpload\" class=\"imgForm\" action=\"\" method=\"post\">\r\n            <input type=\"file\" name=\"photo\" class=\"upload-file\">\r\n            <input type=\"submit\" id=\"btnAjax\">\r\n        </form>\r\n        <div id=\"photo\" class=\"clearfix\" style=\"display: none;\">\r\n            <span><em>*</em>个人照片：</span>\r\n            <label  class=\"upLoad mr25 front allInfoImg\">\r\n                <img class=\"hide\">\r\n            </label>\r\n            <label class=\"phone-error hide\">请上传个人照片</label>\r\n        </div>\r\n        <div id=\"phone\" class=\"clearfix\" style=\"display: none;\">\r\n            <span><em>*</em>手机号码：</span>\r\n            <input type=\"text\" id=\"telephone\" name=\"telephone\" placeholder=\"请输入手机号码\">\r\n        </div>\r\n        <div id=\"creditCard\" style=\"display: none;\">\r\n            <div class=\"clearfix mb20\" >\r\n                <span><em>*</em>手机号码：</span>\r\n                <input type=\"text\" id=\"telephone1\" name=\"telephone\" placeholder=\"请输入手机号码\">\r\n            </div>\r\n            <div class=\"clearfix\">\r\n                <span><em>*</em>银行卡号：</span>\r\n                <input type=\"text\" id=\"bankCard\" name=\"bankCard\" placeholder=\"请输入银行卡号\">\r\n            </div>\r\n        </div>\r\n    </div>\r\n</script>\r\n<script id=\"userEnterpriseAuth\" type=\"template\">\r\n    <div class=\"inputConsList\">\r\n        <form id=\"ajaxEnterpriseUpload\" class=\"imgForm\" action=\"\" method=\"post\" style=\"top: 343px;left: 175px;width: 136px;height: 99px;\">\r\n            <input type=\"file\" name=\"photo\" class=\"upload-file\">\r\n            <input type=\"submit\" id=\"btnEAjax\">\r\n        </form>\r\n        <form onsubmit=\"return false;\" id=\"enterpriseForm\">\r\n            <div class=\"loginTable\">\r\n                <h4 class=\"ft18\">企业信息</h4>\r\n                <ul class=\"mt30 mb30 companyCons\">\r\n                    <li class=\"clearfix\">\r\n                        <div class=\"fl clearfix posRE\">\r\n                            <span><em>*</em>公司名称：</span>\r\n                            <input type=\"text\" name=\"name\" id=\"companyName\" placeholder=\"请填写有效的公司名称\">\r\n                        </div>\r\n                    </li>\r\n                    <li class=\"clearfix\">\r\n                        <div class=\"fl clearfix posRE\">\r\n                            <span><em>*</em>详情地址：</span>\r\n                            <input type=\"text\" name=\"address\" id=\"address\" placeholder=\"请填写详情地址\">\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n                <ul class=\"mt30 mb30 companyCons\">\r\n                    <li class=\"clearfix\">\r\n                        <div class=\"fl clearfix posRE\">\r\n                            <span><em>*</em>营业执照编号：</span>\r\n                            <input type=\"text\" name=\"licenceNo\" id=\"licenceNo\" placeholder=\"请填写有效的营业执照编号\">\r\n                        </div>\r\n                    </li>\r\n                    <li class=\"clearfix\">\r\n                        <div class=\"fl clearfix posRE\">\r\n                            <span>税务登记证编号：</span>\r\n                            <input type=\"text\" name=\"taxRegisterNo\" id=\"taxRegisterNo\" placeholder=\"请填写有效的税务登记证编号\">\r\n                        </div>\r\n                    </li>\r\n                    <li class=\"clearfix\">\r\n                        <div class=\"fl clearfix posRE\">\r\n                            <span>组织机构编号：</span>\r\n                            <input type=\"text\" name=\"organizationCode\" id=\"organizationCode\" placeholder=\"请填写有效的组织机构编号\">\r\n                        </div>\r\n                    </li>\r\n                    <li class=\"clearfix\">\r\n                        <div class=\"clearfix\">\r\n                            <span><em>*</em>营业执照副本：</span>\r\n                            <label class=\"upLoad\">\r\n                                <img alt=\"\" class=\"hide\">\r\n                            </label>\r\n                            <label class=\"phone-error hide\">请上传有效的营业执照副本</label>\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n                <h4 class=\"ft18\">联系人信息</h4>\r\n                <ul class=\"mt30 mb30 companyCons\">\r\n                    <li class=\"clearfix\">\r\n                        <div class=\"fl clearfix posRE\">\r\n                            <span><em>*</em>联系人姓名：</span>\r\n                            <input type=\"text\" name=\"contractName\" id=\"contractName\" placeholder=\"请填写有效的联系人姓名\">\r\n                        </div>\r\n                    </li>\r\n                    <li class=\"clearfix\">\r\n                        <div class=\"fl clearfix posRE\">\r\n                            <span><em>*</em>联系人身份证号：</span>\r\n                            <input type=\"text\" name=\"contractIdCard\" id=\"contractIdCard\" placeholder=\"请填写有效的身份证号码\">\r\n                        </div>\r\n                    </li>\r\n\r\n                    <li class=\"clearfix\">\r\n                        <div class=\"fl clearfix posRE\">\r\n                            <span><em>*</em>手机号码：</span>\r\n                            <input type=\"text\" name=\"contractMobile\" id=\"contractMobile\" placeholder=\"请填写有效的手机号码\">\r\n                        </div>\r\n                    </li>\r\n                    <li class=\"clearfix\">\r\n                        <div class=\"fl clearfix posRE\">\r\n                            <span><em>*</em>公司邮箱：</span>\r\n                            <input type=\"text\" name=\"contractEmail\" id=\"contractEmail\" placeholder=\"请填写有效的公司邮箱\">\r\n                        </div>\r\n                    </li>\r\n                    <li class=\"mt48 clearfix\">\r\n                        <input type=\"submit\" class=\"mt20\" value=\"提交\" />\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</script>\r\n<script id=\"userPassword\" type=\"template\">\r\n        <div class=\"user-password-area bgWhite\">\r\n            <!-- 企业 -->\r\n            <form action=\"\" onsubmit=\"return false;\" id=\"userPasswordForm\">\r\n                <div class=\"loginTable bor0\">\r\n                    <ul class=\"companyCons\">\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE\">\r\n                                <span><em>*</em>旧密码：</span>\r\n                                <input type=\"password\" name=\"oldPassword\" id=\"oldPassword\" placeholder=\"请填写原始密码\" >\r\n                                <em class=\"close\">×</em>\r\n                            </div>\r\n                        </li>\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE\">\r\n                                <span><em>*</em>新密码：</span>\r\n                                <input type=\"password\" name=\"password\" id=\"password\" placeholder=\"请填写新密码\">\r\n                                <em class=\"close\">×</em>\r\n                            </div>\r\n                        </li>\r\n                        <li class=\"clearfix\">\r\n                            <div class=\"fl clearfix posRE\">\r\n                                <span><em>*</em>确认新密码：</span>\r\n                                <input type=\"password\" name=\"passwordConfirm\" id=\"passwordConfirm\" placeholder=\"请再次填写新密码\">\r\n                                <em class=\"close\">×</em>\r\n                            </div>\r\n                        </li>\r\n                        <li class=\"mt20 clearfix\">\r\n                            <input type=\"submit\" class=\"mt20\" value=\"提交\" />\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </form>\r\n    </div>\r\n</script>";

/***/ },

/***/ 195:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 199:
/***/ function(module, exports) {

	/*!
	 * jQuery Validation Plugin v1.15.0
	 *
	 * http://jqueryvalidation.org/
	 *
	 * Copyright (c) 2016 J枚rn Zaefferer
	 * Released under the MIT license
	 */
	    $.extend( $.fn, {

	        // http://jqueryvalidation.org/validate/
	        validate: function( options ) {

	            // If nothing is selected, return nothing; can't chain anyway
	            if ( !this.length ) {
	                if ( options && options.debug && window.console ) {
	                    console.warn( "Nothing selected, can't validate, returning nothing." );
	                }
	                return;
	            }

	            // Check if a validator for this form was already created
	            var validator = $.data( this[ 0 ], "validator" );
	            if ( validator ) {
	                return validator;
	            }

	            // Add novalidate tag if HTML5.
	            this.attr( "novalidate", "novalidate" );

	            validator = new $.validator( options, this[ 0 ] );
	            $.data( this[ 0 ], "validator", validator );

	            if ( validator.settings.onsubmit ) {

	                this.on( "click.validate", ":submit", function( event ) {
	                    if ( validator.settings.submitHandler ) {
	                        validator.submitButton = event.target;
	                    }

	                    // Allow suppressing validation by adding a cancel class to the submit button
	                    if ( $( this ).hasClass( "cancel" ) ) {
	                        validator.cancelSubmit = true;
	                    }

	                    // Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
	                    if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
	                        validator.cancelSubmit = true;
	                    }
	                } );

	                // Validate the form on submit
	                this.on( "submit.validate", function( event ) {
	                    if ( validator.settings.debug ) {

	                        // Prevent form submit to be able to see console output
	                        event.preventDefault();
	                    }
	                    function handle() {
	                        var hidden, result;
	                        if ( validator.settings.submitHandler ) {
	                            if ( validator.submitButton ) {

	                                // Insert a hidden input as a replacement for the missing submit button
	                                hidden = $( "<input type='hidden'/>" )
	                                    .attr( "name", validator.submitButton.name )
	                                    .val( $( validator.submitButton ).val() )
	                                    .appendTo( validator.currentForm );
	                            }
	                            result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
	                            if ( validator.submitButton ) {

	                                // And clean up afterwards; thanks to no-block-scope, hidden can be referenced
	                                hidden.remove();
	                            }
	                            if ( result !== undefined ) {
	                                return result;
	                            }
	                            return false;
	                        }
	                        return true;
	                    }

	                    // Prevent submit for invalid forms or custom submit handlers
	                    if ( validator.cancelSubmit ) {
	                        validator.cancelSubmit = false;
	                        return handle();
	                    }
	                    if ( validator.form() ) {
	                        if ( validator.pendingRequest ) {
	                            validator.formSubmitted = true;
	                            return false;
	                        }
	                        return handle();
	                    } else {
	                        validator.focusInvalid();
	                        return false;
	                    }
	                } );
	            }

	            return validator;
	        },

	        // http://jqueryvalidation.org/valid/
	        valid: function() {
	            var valid, validator, errorList;

	            if ( $( this[ 0 ] ).is( "form" ) ) {
	                valid = this.validate().form();
	            } else {
	                errorList = [];
	                valid = true;
	                validator = $( this[ 0 ].form ).validate();
	                this.each( function() {
	                    valid = validator.element( this ) && valid;
	                    if ( !valid ) {
	                        errorList = errorList.concat( validator.errorList );
	                    }
	                } );
	                validator.errorList = errorList;
	            }
	            return valid;
	        },

	        // http://jqueryvalidation.org/rules/
	        rules: function( command, argument ) {

	            // If nothing is selected, return nothing; can't chain anyway
	            if ( !this.length ) {
	                return;
	            }

	            var element = this[ 0 ],
	                settings, staticRules, existingRules, data, param, filtered;

	            if ( command ) {
	                settings = $.data( element.form, "validator" ).settings;
	                staticRules = settings.rules;
	                existingRules = $.validator.staticRules( element );
	                switch ( command ) {
	                    case "add":
	                        $.extend( existingRules, $.validator.normalizeRule( argument ) );

	                        // Remove messages from rules, but allow them to be set separately
	                        delete existingRules.messages;
	                        staticRules[ element.name ] = existingRules;
	                        if ( argument.messages ) {
	                            settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
	                        }
	                        break;
	                    case "remove":
	                        if ( !argument ) {
	                            delete staticRules[ element.name ];
	                            return existingRules;
	                        }
	                        filtered = {};
	                        $.each( argument.split( /\s/ ), function( index, method ) {
	                            filtered[ method ] = existingRules[ method ];
	                            delete existingRules[ method ];
	                            if ( method === "required" ) {
	                                $( element ).removeAttr( "aria-required" );
	                            }
	                        } );
	                        return filtered;
	                }
	            }

	            data = $.validator.normalizeRules(
	                $.extend(
	                    {},
	                    $.validator.classRules( element ),
	                    $.validator.attributeRules( element ),
	                    $.validator.dataRules( element ),
	                    $.validator.staticRules( element )
	                ), element );

	            // Make sure required is at front
	            if ( data.required ) {
	                param = data.required;
	                delete data.required;
	                data = $.extend( { required: param }, data );
	                $( element ).attr( "aria-required", "true" );
	            }

	            // Make sure remote is at back
	            if ( data.remote ) {
	                param = data.remote;
	                delete data.remote;
	                data = $.extend( data, { remote: param } );
	            }

	            return data;
	        }
	    } );

	// Custom selectors
	    $.extend( $.expr[ ":" ], {

	        // http://jqueryvalidation.org/blank-selector/
	        blank: function( a ) {
	            return !$.trim( "" + $( a ).val() );
	        },

	        // http://jqueryvalidation.org/filled-selector/
	        filled: function( a ) {
	            var val = $( a ).val();
	            return val !== null && !!$.trim( "" + val );
	        },

	        // http://jqueryvalidation.org/unchecked-selector/
	        unchecked: function( a ) {
	            return !$( a ).prop( "checked" );
	        }
	    } );

	// Constructor for validator
	    $.validator = function( options, form ) {
	        this.settings = $.extend( true, {}, $.validator.defaults, options );
	        this.currentForm = form;
	        this.init();
	    };

	// http://jqueryvalidation.org/jQuery.validator.format/
	    $.validator.format = function( source, params ) {
	        if ( arguments.length === 1 ) {
	            return function() {
	                var args = $.makeArray( arguments );
	                args.unshift( source );
	                return $.validator.format.apply( this, args );
	            };
	        }
	        if ( params === undefined ) {
	            return source;
	        }
	        if ( arguments.length > 2 && params.constructor !== Array  ) {
	            params = $.makeArray( arguments ).slice( 1 );
	        }
	        if ( params.constructor !== Array ) {
	            params = [ params ];
	        }
	        $.each( params, function( i, n ) {
	            source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
	                return n;
	            } );
	        } );
	        return source;
	    };

	    $.extend( $.validator, {

	        defaults: {
	            messages: {},
	            groups: {},
	            rules: {},
	            errorClass: "error",
	            pendingClass: "pending",
	            validClass: "valid",
	            errorElement: "label",
	            focusCleanup: false,
	            focusInvalid: true,
	            errorContainer: $( [] ),
	            errorLabelContainer: $( [] ),
	            onsubmit: true,
	            ignore: ":hidden",
	            ignoreTitle: false,
	            onfocusin: function( element ) {
	                this.lastActive = element;

	                // Hide error label and remove error class on focus if enabled
	                if ( this.settings.focusCleanup ) {
	                    if ( this.settings.unhighlight ) {
	                        this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
	                    }
	                    this.hideThese( this.errorsFor( element ) );
	                }
	            },
	            onfocusout: function( element ) {
	                if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
	                    this.element( element );
	                }
	            },
	            onkeyup: function( element, event ) {

	                // Avoid revalidate the field when pressing one of the following keys
	                // Shift       => 16
	                // Ctrl        => 17
	                // Alt         => 18
	                // Caps lock   => 20
	                // End         => 35
	                // Home        => 36
	                // Left arrow  => 37
	                // Up arrow    => 38
	                // Right arrow => 39
	                // Down arrow  => 40
	                // Insert      => 45
	                // Num lock    => 144
	                // AltGr key   => 225
	                var excludedKeys = [
	                    16, 17, 18, 20, 35, 36, 37,
	                    38, 39, 40, 45, 144, 225
	                ];

	                if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
	                    return;
	                } else if ( element.name in this.submitted || element.name in this.invalid ) {
	                    this.element( element );
	                }
	            },
	            onclick: function( element ) {

	                // Click on selects, radiobuttons and checkboxes
	                if ( element.name in this.submitted ) {
	                    this.element( element );

	                    // Or option elements, check parent select in that case
	                } else if ( element.parentNode.name in this.submitted ) {
	                    this.element( element.parentNode );
	                }
	            },
	            highlight: function( element, errorClass, validClass ) {
	                if ( element.type === "radio" ) {
	                    this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
	                } else {
	                    $( element ).addClass( errorClass ).removeClass( validClass );
	                }
	            },
	            unhighlight: function( element, errorClass, validClass ) {
	                if ( element.type === "radio" ) {
	                    this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
	                } else {
	                    $( element ).removeClass( errorClass ).addClass( validClass );
	                }
	            }
	        },

	        // http://jqueryvalidation.org/jQuery.validator.setDefaults/
	        setDefaults: function( settings ) {
	            $.extend( $.validator.defaults, settings );
	        },

	        messages: {
	            required: "这是必填字段",
	            remote: "请修正此字段",
	            email: "请输入有效的电子邮件地址",
	            telephone: "请输入有效的手机号码",
	            careId: "请输入有效的身份证号码",
	            bankCard: '请输入有效的银行号码',
	            bussinessCard: '请输入有效的营业执照编号',
	            password: '请输入有效的密码',
	            url: "请输入有效的网址",
	            date: "请输入有效的日期",
	            dateISO: "请输入有效的日期 (YYYY-MM-DD)",
	            number: "请输入有效的数字",
	            digits: "只能输入数字",
	            creditcard: "请输入有效的信用卡号码",
	            equalTo: "你的输入不相同",
	            extension: "请输入有效的后缀",
	            maxlength: $.validator.format("最多可以输入 {0} 个字符"),
	            minlength: $.validator.format("最少要输入 {0} 个字符"),
	            rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
	            range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
	            max: $.validator.format("请输入不大于 {0} 的数值"),
	            min: $.validator.format("请输入不小于 {0} 的数值")
	        },

	        autoCreateRanges: false,

	        prototype: {

	            init: function() {
	                this.labelContainer = $( this.settings.errorLabelContainer );
	                this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
	                this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
	                this.submitted = {};
	                this.valueCache = {};
	                this.pendingRequest = 0;
	                this.pending = {};
	                this.invalid = {};
	                this.reset();

	                var groups = ( this.groups = {} ),
	                    rules;
	                $.each( this.settings.groups, function( key, value ) {
	                    if ( typeof value === "string" ) {
	                        value = value.split( /\s/ );
	                    }
	                    $.each( value, function( index, name ) {
	                        groups[ name ] = key;
	                    } );
	                } );
	                rules = this.settings.rules;
	                $.each( rules, function( key, value ) {
	                    rules[ key ] = $.validator.normalizeRule( value );
	                } );

	                function delegate( event ) {
	                    var validator = $.data( this.form, "validator" ),
	                        eventType = "on" + event.type.replace( /^validate/, "" ),
	                        settings = validator.settings;
	                    if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
	                        settings[ eventType ].call( validator, this, event );
	                    }
	                }

	                $( this.currentForm )
	                    .on( "focusin.validate focusout.validate keyup.validate",
	                        ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
	                        "[type='tel'], [type='url'], [type='email'],[type='tel']， [type='datetime'], [type='date'], [type='month'], " +
	                        "[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
	                        "[type='radio'], [type='checkbox'], [contenteditable]", delegate )

	                    // Support: Chrome, oldIE
	                    // "select" is provided as event.target when clicking a option
	                    .on( "click.validate", "select, option, [type='radio'], [type='checkbox']", delegate );

	                if ( this.settings.invalidHandler ) {
	                    $( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
	                }

	                // Add aria-required to any Static/Data/Class required fields before first validation
	                // Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
	                $( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
	            },

	            // http://jqueryvalidation.org/Validator.form/
	            form: function() {
	                this.checkForm();
	                $.extend( this.submitted, this.errorMap );
	                this.invalid = $.extend( {}, this.errorMap );
	                if ( !this.valid() ) {
	                    $( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
	                }
	                this.showErrors();
	                return this.valid();
	            },

	            checkForm: function() {
	                this.prepareForm();
	                for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
	                    this.check( elements[ i ] );
	                }
	                return this.valid();
	            },

	            // http://jqueryvalidation.org/Validator.element/
	            element: function( element ) {
	                var cleanElement = this.clean( element ),
	                    checkElement = this.validationTargetFor( cleanElement ),
	                    v = this,
	                    result = true,
	                    rs, group;

	                if ( checkElement === undefined ) {
	                    delete this.invalid[ cleanElement.name ];
	                } else {
	                    this.prepareElement( checkElement );
	                    this.currentElements = $( checkElement );

	                    // If this element is grouped, then validate all group elements already
	                    // containing a value
	                    group = this.groups[ checkElement.name ];
	                    if ( group ) {
	                        $.each( this.groups, function( name, testgroup ) {
	                            if ( testgroup === group && name !== checkElement.name ) {
	                                cleanElement = v.validationTargetFor( v.clean( v.findByName( name ) ) );
	                                if ( cleanElement && cleanElement.name in v.invalid ) {
	                                    v.currentElements.push( cleanElement );
	                                    result = result && v.check( cleanElement );
	                                }
	                            }
	                        } );
	                    }

	                    rs = this.check( checkElement ) !== false;
	                    result = result && rs;
	                    if ( rs ) {
	                        this.invalid[ checkElement.name ] = false;
	                    } else {
	                        this.invalid[ checkElement.name ] = true;
	                    }

	                    if ( !this.numberOfInvalids() ) {

	                        // Hide error containers on last error
	                        this.toHide = this.toHide.add( this.containers );
	                    }
	                    this.showErrors();

	                    // Add aria-invalid status for screen readers
	                    $( element ).attr( "aria-invalid", !rs );
	                }

	                return result;
	            },

	            // http://jqueryvalidation.org/Validator.showErrors/
	            showErrors: function( errors ) {
	                if ( errors ) {
	                    var validator = this;

	                    // Add items to error list and map
	                    $.extend( this.errorMap, errors );
	                    this.errorList = $.map( this.errorMap, function( message, name ) {
	                        return {
	                            message: message,
	                            element: validator.findByName( name )[ 0 ]
	                        };
	                    } );

	                    // Remove items from success list
	                    this.successList = $.grep( this.successList, function( element ) {
	                        return !( element.name in errors );
	                    } );
	                }
	                if ( this.settings.showErrors ) {
	                    this.settings.showErrors.call( this, this.errorMap, this.errorList );
	                } else {
	                    this.defaultShowErrors();
	                }
	            },

	            // http://jqueryvalidation.org/Validator.resetForm/
	            resetForm: function() {
	                if ( $.fn.resetForm ) {
	                    $( this.currentForm ).resetForm();
	                }
	                this.invalid = {};
	                this.submitted = {};
	                this.prepareForm();
	                this.hideErrors();
	                var elements = this.elements()
	                    .removeData( "previousValue" )
	                    .removeAttr( "aria-invalid" );

	                this.resetElements( elements );
	            },

	            resetElements: function( elements ) {
	                var i;

	                if ( this.settings.unhighlight ) {
	                    for ( i = 0; elements[ i ]; i++ ) {
	                        this.settings.unhighlight.call( this, elements[ i ],
	                            this.settings.errorClass, "" );
	                        this.findByName( elements[ i ].name ).removeClass( this.settings.validClass );
	                    }
	                } else {
	                    elements
	                        .removeClass( this.settings.errorClass )
	                        .removeClass( this.settings.validClass );
	                }
	            },

	            numberOfInvalids: function() {
	                return this.objectLength( this.invalid );
	            },

	            objectLength: function( obj ) {
	                /* jshint unused: false */
	                var count = 0,
	                    i;
	                for ( i in obj ) {
	                    if ( obj[ i ] ) {
	                        count++;
	                    }
	                }
	                return count;
	            },

	            hideErrors: function() {
	                this.hideThese( this.toHide );
	            },

	            hideThese: function( errors ) {
	                errors.not( this.containers ).text( "" );
	                this.addWrapper( errors ).hide();
	            },

	            valid: function() {
	                return this.size() === 0;
	            },

	            size: function() {
	                return this.errorList.length;
	            },

	            focusInvalid: function() {
	                if ( this.settings.focusInvalid ) {
	                    try {
	                        $( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [] )
	                            .filter( ":visible" )
	                            .focus()

	                            // Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
	                            .trigger( "focusin" );
	                    } catch ( e ) {

	                        // Ignore IE throwing errors when focusing hidden elements
	                    }
	                }
	            },

	            findLastActive: function() {
	                var lastActive = this.lastActive;
	                return lastActive && $.grep( this.errorList, function( n ) {
	                        return n.element.name === lastActive.name;
	                    } ).length === 1 && lastActive;
	            },

	            elements: function() {
	                var validator = this,
	                    rulesCache = {};

	                // Select all valid inputs inside the form (no submit or reset buttons)
	                return $( this.currentForm )
	                    .find( "input, select, textarea, [contenteditable]" )
	                    .not( ":submit, :reset, :image, :disabled" )
	                    .not( this.settings.ignore )
	                    .filter( function() {
	                        var name = this.name || $( this ).attr( "name" ); // For contenteditable
	                        if ( !name && validator.settings.debug && window.console ) {
	                            console.error( "%o has no name assigned", this );
	                        }

	                        // Set form expando on contenteditable
	                        if ( this.hasAttribute( "contenteditable" ) ) {
	                            this.form = $( this ).closest( "form" )[ 0 ];
	                        }

	                        // Select only the first element for each name, and only those with rules specified
	                        if ( name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
	                            return false;
	                        }

	                        rulesCache[ name ] = true;
	                        return true;
	                    } );
	            },

	            clean: function( selector ) {
	                return $( selector )[ 0 ];
	            },

	            errors: function() {
	                var errorClass = this.settings.errorClass.split( " " ).join( "." );
	                return $( this.settings.errorElement + "." + errorClass, this.errorContext );
	            },

	            resetInternals: function() {
	                this.successList = [];
	                this.errorList = [];
	                this.errorMap = {};
	                this.toShow = $( [] );
	                this.toHide = $( [] );
	            },

	            reset: function() {
	                this.resetInternals();
	                this.currentElements = $( [] );
	            },

	            prepareForm: function() {
	                this.reset();
	                this.toHide = this.errors().add( this.containers );
	            },

	            prepareElement: function( element ) {
	                this.reset();
	                this.toHide = this.errorsFor( element );
	            },

	            elementValue: function( element ) {
	                var $element = $( element ),
	                    type = element.type,
	                    val, idx;

	                if ( type === "radio" || type === "checkbox" ) {
	                    return this.findByName( element.name ).filter( ":checked" ).val();
	                } else if ( type === "number" && typeof element.validity !== "undefined" ) {
	                    return element.validity.badInput ? "NaN" : $element.val();
	                }

	                if ( element.hasAttribute( "contenteditable" ) ) {
	                    val = $element.text();
	                } else {
	                    val = $element.val();
	                }

	                if ( type === "file" ) {

	                    // Modern browser (chrome & safari)
	                    if ( val.substr( 0, 12 ) === "C:\\fakepath\\" ) {
	                        return val.substr( 12 );
	                    }

	                    // Legacy browsers
	                    // Unix-based path
	                    idx = val.lastIndexOf( "/" );
	                    if ( idx >= 0 ) {
	                        return val.substr( idx + 1 );
	                    }

	                    // Windows-based path
	                    idx = val.lastIndexOf( "\\" );
	                    if ( idx >= 0 ) {
	                        return val.substr( idx + 1 );
	                    }

	                    // Just the file name
	                    return val;
	                }

	                if ( typeof val === "string" ) {
	                    return val.replace( /\r/g, "" );
	                }
	                return val;
	            },

	            check: function( element ) {
	                element = this.validationTargetFor( this.clean( element ) );

	                var rules = $( element ).rules(),
	                    rulesCount = $.map( rules, function( n, i ) {
	                        return i;
	                    } ).length,
	                    dependencyMismatch = false,
	                    val = this.elementValue( element ),
	                    result, method, rule;

	                // If a normalizer is defined for this element, then
	                // call it to retreive the changed value instead
	                // of using the real one.
	                // Note that `this` in the normalizer is `element`.
	                if ( typeof rules.normalizer === "function" ) {
	                    val = rules.normalizer.call( element, val );

	                    if ( typeof val !== "string" ) {
	                        throw new TypeError( "The normalizer should return a string value." );
	                    }

	                    // Delete the normalizer from rules to avoid treating
	                    // it as a pre-defined method.
	                    delete rules.normalizer;
	                }

	                for ( method in rules ) {
	                    rule = { method: method, parameters: rules[ method ] };
	                    try {
	                        result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

	                        // If a method indicates that the field is optional and therefore valid,
	                        // don't mark it as valid when there are no other rules
	                        if ( result === "dependency-mismatch" && rulesCount === 1 ) {
	                            dependencyMismatch = true;
	                            continue;
	                        }
	                        dependencyMismatch = false;

	                        if ( result === "pending" ) {
	                            this.toHide = this.toHide.not( this.errorsFor( element ) );
	                            return;
	                        }

	                        if ( !result ) {
	                            this.formatAndAdd( element, rule );
	                            return false;
	                        }
	                    } catch ( e ) {
	                        if ( this.settings.debug && window.console ) {
	                            console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
	                        }
	                        if ( e instanceof TypeError ) {
	                            e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
	                        }

	                        throw e;
	                    }
	                }
	                if ( dependencyMismatch ) {
	                    return;
	                }
	                if ( this.objectLength( rules ) ) {
	                    this.successList.push( element );
	                }
	                return true;
	            },

	            // Return the custom message for the given element and validation method
	            // specified in the element's HTML5 data attribute
	            // return the generic message if present and no method specific message is present
	            customDataMessage: function( element, method ) {
	                return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
	                        method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
	            },

	            // Return the custom message for the given element name and validation method
	            customMessage: function( name, method ) {
	                var m = this.settings.messages[ name ];
	                return m && ( m.constructor === String ? m : m[ method ] );
	            },

	            // Return the first defined argument, allowing empty strings
	            findDefined: function() {
	                for ( var i = 0; i < arguments.length; i++ ) {
	                    if ( arguments[ i ] !== undefined ) {
	                        return arguments[ i ];
	                    }
	                }
	                return undefined;
	            },

	            defaultMessage: function( element, rule ) {
	                var message = this.findDefined(
	                    this.customMessage( element.name, rule.method ),
	                    this.customDataMessage( element, rule.method ),

	                    // 'title' is never undefined, so handle empty string as undefined
	                        !this.settings.ignoreTitle && element.title || undefined,
	                    $.validator.messages[ rule.method ],
	                        "<strong>Warning: No message defined for " + element.name + "</strong>"
	                    ),
	                    theregex = /\$?\{(\d+)\}/g;
	                if ( typeof message === "function" ) {
	                    message = message.call( this, rule.parameters, element );
	                } else if ( theregex.test( message ) ) {
	                    message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
	                }

	                return message;
	            },

	            formatAndAdd: function( element, rule ) {
	                var message = this.defaultMessage( element, rule );

	                this.errorList.push( {
	                    message: message,
	                    element: element,
	                    method: rule.method
	                } );

	                this.errorMap[ element.name ] = message;
	                this.submitted[ element.name ] = message;
	            },

	            addWrapper: function( toToggle ) {
	                if ( this.settings.wrapper ) {
	                    toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
	                }
	                return toToggle;
	            },

	            defaultShowErrors: function() {
	                var i, elements, error;
	                for ( i = 0; this.errorList[ i ]; i++ ) {
	                    error = this.errorList[ i ];
	                    if ( this.settings.highlight ) {
	                        this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
	                    }
	                    this.showLabel( error.element, error.message );
	                }
	                if ( this.errorList.length ) {
	                    this.toShow = this.toShow.add( this.containers );
	                }
	                if ( this.settings.success ) {
	                    for ( i = 0; this.successList[ i ]; i++ ) {
	                        this.showLabel( this.successList[ i ] );
	                    }
	                }
	                if ( this.settings.unhighlight ) {
	                    for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
	                        this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
	                    }
	                }
	                this.toHide = this.toHide.not( this.toShow );
	                this.hideErrors();
	                this.addWrapper( this.toShow ).show();
	            },

	            validElements: function() {
	                return this.currentElements.not( this.invalidElements() );
	            },

	            invalidElements: function() {
	                return $( this.errorList ).map( function() {
	                    return this.element;
	                } );
	            },

	            showLabel: function( element, message ) {
	                var place, group, errorID, v,
	                    error = this.errorsFor( element ),
	                    elementID = this.idOrName( element ),
	                    describedBy = $( element ).attr( "aria-describedby" );

	                if ( error.length ) {

	                    // Refresh error/success class
	                    error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

	                    // Replace message on existing label
	                    error.html( message );
	                } else {

	                    // Create error element
	                    error = $( "<" + this.settings.errorElement + ">" )
	                        .attr( "id", elementID + "-error" )
	                        .addClass( this.settings.errorClass )
	                        .html( message || "" );

	                    // Maintain reference to the element to be placed into the DOM
	                    place = error;
	                    if ( this.settings.wrapper ) {

	                        // Make sure the element is visible, even in IE
	                        // actually showing the wrapped element is handled elsewhere
	                        place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
	                    }
	                    if ( this.labelContainer.length ) {
	                        this.labelContainer.append( place );
	                    } else if ( this.settings.errorPlacement ) {
	                        this.settings.errorPlacement( place, $( element ) );
	                    } else {
	                        place.insertAfter( element );
	                    }

	                    // Link error back to the element
	                    if ( error.is( "label" ) ) {

	                        // If the error is a label, then associate using 'for'
	                        error.attr( "for", elementID );

	                        // If the element is not a child of an associated label, then it's necessary
	                        // to explicitly apply aria-describedby
	                    } else if ( error.parents( "label[for='" + this.escapeCssMeta( elementID ) + "']" ).length === 0 ) {
	                        errorID = error.attr( "id" );

	                        // Respect existing non-error aria-describedby
	                        if ( !describedBy ) {
	                            describedBy = errorID;
	                        } else if ( !describedBy.match( new RegExp( "\\b" + this.escapeCssMeta( errorID ) + "\\b" ) ) ) {

	                            // Add to end of list if not already present
	                            describedBy += " " + errorID;
	                        }
	                        $( element ).attr( "aria-describedby", describedBy );

	                        // If this element is grouped, then assign to all elements in the same group
	                        group = this.groups[ element.name ];
	                        if ( group ) {
	                            v = this;
	                            $.each( v.groups, function( name, testgroup ) {
	                                if ( testgroup === group ) {
	                                    $( "[name='" + v.escapeCssMeta( name ) + "']", v.currentForm )
	                                        .attr( "aria-describedby", error.attr( "id" ) );
	                                }
	                            } );
	                        }
	                    }
	                }
	                if ( !message && this.settings.success ) {
	                    error.text( "" );
	                    if ( typeof this.settings.success === "string" ) {
	                        error.addClass( this.settings.success );
	                    } else {
	                        this.settings.success( error, element );
	                    }
	                }
	                this.toShow = this.toShow.add( error );
	            },

	            errorsFor: function( element ) {
	                var name = this.escapeCssMeta( this.idOrName( element ) ),
	                    describer = $( element ).attr( "aria-describedby" ),
	                    selector = "label[for='" + name + "'], label[for='" + name + "'] *";

	                // 'aria-describedby' should directly reference the error element
	                if ( describer ) {
	                    selector = selector + ", #" + this.escapeCssMeta( describer )
	                            .replace( /\s+/g, ", #" );
	                }

	                return this
	                    .errors()
	                    .filter( selector );
	            },

	            // See https://api.jquery.com/category/selectors/, for CSS
	            // meta-characters that should be escaped in order to be used with JQuery
	            // as a literal part of a name/id or any selector.
	            escapeCssMeta: function( string ) {
	                return string.replace( /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1" );
	            },

	            idOrName: function( element ) {
	                return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
	            },

	            validationTargetFor: function( element ) {

	                // If radio/checkbox, validate first element in group instead
	                if ( this.checkable( element ) ) {
	                    element = this.findByName( element.name );
	                }

	                // Always apply ignore filter
	                return $( element ).not( this.settings.ignore )[ 0 ];
	            },

	            checkable: function( element ) {
	                return ( /radio|checkbox/i ).test( element.type );
	            },

	            findByName: function( name ) {
	                return $( this.currentForm ).find( "[name='" + this.escapeCssMeta( name ) + "']" );
	            },

	            getLength: function( value, element ) {
	                switch ( element.nodeName.toLowerCase() ) {
	                    case "select":
	                        return $( "option:selected", element ).length;
	                    case "input":
	                        if ( this.checkable( element ) ) {
	                            return this.findByName( element.name ).filter( ":checked" ).length;
	                        }
	                }
	                return value.length;
	            },

	            depend: function( param, element ) {
	                return this.dependTypes[ typeof param ] ? this.dependTypes[ typeof param ]( param, element ) : true;
	            },

	            dependTypes: {
	                "boolean": function( param ) {
	                    return param;
	                },
	                "string": function( param, element ) {
	                    return !!$( param, element.form ).length;
	                },
	                "function": function( param, element ) {
	                    return param( element );
	                }
	            },

	            optional: function( element ) {
	                var val = this.elementValue( element );
	                return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
	            },

	            startRequest: function( element ) {
	                if ( !this.pending[ element.name ] ) {
	                    this.pendingRequest++;
	                    $( element ).addClass( this.settings.pendingClass );
	                    this.pending[ element.name ] = true;
	                }
	            },

	            stopRequest: function( element, valid ) {
	                this.pendingRequest--;

	                // Sometimes synchronization fails, make sure pendingRequest is never < 0
	                if ( this.pendingRequest < 0 ) {
	                    this.pendingRequest = 0;
	                }
	                delete this.pending[ element.name ];
	                $( element ).removeClass( this.settings.pendingClass );
	                if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
	                    $( this.currentForm ).submit();
	                    this.formSubmitted = false;
	                } else if ( !valid && this.pendingRequest === 0 && this.formSubmitted ) {
	                    $( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
	                    this.formSubmitted = false;
	                }
	            },

	            previousValue: function( element, method ) {
	                return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
	                        old: null,
	                        valid: true,
	                        message: this.defaultMessage( element, { method: method } )
	                    } );
	            },

	            // Cleans up all forms and elements, removes validator-specific events
	            destroy: function() {
	                this.resetForm();

	                $( this.currentForm )
	                    .off( ".validate" )
	                    .removeData( "validator" )
	                    .find( ".validate-equalTo-blur" )
	                    .off( ".validate-equalTo" )
	                    .removeClass( "validate-equalTo-blur" );
	            }

	        },

	        classRuleSettings: {
	            required: { required: true },
	            email: { email: true },
	            telephone: {telephone: true},
	            careId: {careId: true},
	            bankCard: {bankCard: true},
	            bussinessCard: {bussinessCard: true},
	            password: {password:true},
	            url: { url: true },
	            date: { date: true },
	            dateISO: { dateISO: true },
	            number: { number: true },
	            digits: { digits: true },
	            creditcard: { creditcard: true }
	        },

	        addClassRules: function( className, rules ) {
	            if ( className.constructor === String ) {
	                this.classRuleSettings[ className ] = rules;
	            } else {
	                $.extend( this.classRuleSettings, className );
	            }
	        },

	        classRules: function( element ) {
	            var rules = {},
	                classes = $( element ).attr( "class" );

	            if ( classes ) {
	                $.each( classes.split( " " ), function() {
	                    if ( this in $.validator.classRuleSettings ) {
	                        $.extend( rules, $.validator.classRuleSettings[ this ] );
	                    }
	                } );
	            }
	            return rules;
	        },

	        normalizeAttributeRule: function( rules, type, method, value ) {

	            // Convert the value to a number for number inputs, and for text for backwards compability
	            // allows type="date" and others to be compared as strings
	            if ( /min|max|step/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
	                value = Number( value );

	                // Support Opera Mini, which returns NaN for undefined minlength
	                if ( isNaN( value ) ) {
	                    value = undefined;
	                }
	            }

	            if ( value || value === 0 ) {
	                rules[ method ] = value;
	            } else if ( type === method && type !== "range" ) {

	                // Exception: the jquery validate 'range' method
	                // does not test for the html5 'range' type
	                rules[ method ] = true;
	            }
	        },

	        attributeRules: function( element ) {
	            var rules = {},
	                $element = $( element ),
	                type = element.getAttribute( "type" ),
	                method, value;

	            for ( method in $.validator.methods ) {

	                // Support for <input required> in both html5 and older browsers
	                if ( method === "required" ) {
	                    value = element.getAttribute( method );

	                    // Some browsers return an empty string for the required attribute
	                    // and non-HTML5 browsers might have required="" markup
	                    if ( value === "" ) {
	                        value = true;
	                    }

	                    // Force non-HTML5 browsers to return bool
	                    value = !!value;
	                } else {
	                    value = $element.attr( method );
	                }

	                this.normalizeAttributeRule( rules, type, method, value );
	            }

	            // 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
	            if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
	                delete rules.maxlength;
	            }

	            return rules;
	        },

	        dataRules: function( element ) {
	            var rules = {},
	                $element = $( element ),
	                type = element.getAttribute( "type" ),
	                method, value;

	            for ( method in $.validator.methods ) {
	                value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
	                this.normalizeAttributeRule( rules, type, method, value );
	            }
	            return rules;
	        },

	        staticRules: function( element ) {
	            var rules = {},
	                validator = $.data( element.form, "validator" );

	            if ( validator.settings.rules ) {
	                rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
	            }
	            return rules;
	        },

	        normalizeRules: function( rules, element ) {

	            // Handle dependency check
	            $.each( rules, function( prop, val ) {

	                // Ignore rule when param is explicitly false, eg. required:false
	                if ( val === false ) {
	                    delete rules[ prop ];
	                    return;
	                }
	                if ( val.param || val.depends ) {
	                    var keepRule = true;
	                    switch ( typeof val.depends ) {
	                        case "string":
	                            keepRule = !!$( val.depends, element.form ).length;
	                            break;
	                        case "function":
	                            keepRule = val.depends.call( element, element );
	                            break;
	                    }
	                    if ( keepRule ) {
	                        rules[ prop ] = val.param !== undefined ? val.param : true;
	                    } else {
	                        $.data( element.form, "validator" ).resetElements( $( element ) );
	                        delete rules[ prop ];
	                    }
	                }
	            } );

	            // Evaluate parameters
	            $.each( rules, function( rule, parameter ) {
	                rules[ rule ] = $.isFunction( parameter ) && rule !== "normalizer" ? parameter( element ) : parameter;
	            } );

	            // Clean number parameters
	            $.each( [ "minlength", "maxlength" ], function() {
	                if ( rules[ this ] ) {
	                    rules[ this ] = Number( rules[ this ] );
	                }
	            } );
	            $.each( [ "rangelength", "range" ], function() {
	                var parts;
	                if ( rules[ this ] ) {
	                    if ( $.isArray( rules[ this ] ) ) {
	                        rules[ this ] = [ Number( rules[ this ][ 0 ] ), Number( rules[ this ][ 1 ] ) ];
	                    } else if ( typeof rules[ this ] === "string" ) {
	                        parts = rules[ this ].replace( /[\[\]]/g, "" ).split( /[\s,]+/ );
	                        rules[ this ] = [ Number( parts[ 0 ] ), Number( parts[ 1 ] ) ];
	                    }
	                }
	            } );

	            if ( $.validator.autoCreateRanges ) {

	                // Auto-create ranges
	                if ( rules.min != null && rules.max != null ) {
	                    rules.range = [ rules.min, rules.max ];
	                    delete rules.min;
	                    delete rules.max;
	                }
	                if ( rules.minlength != null && rules.maxlength != null ) {
	                    rules.rangelength = [ rules.minlength, rules.maxlength ];
	                    delete rules.minlength;
	                    delete rules.maxlength;
	                }
	            }

	            return rules;
	        },

	        // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	        normalizeRule: function( data ) {
	            if ( typeof data === "string" ) {
	                var transformed = {};
	                $.each( data.split( /\s/ ), function() {
	                    transformed[ this ] = true;
	                } );
	                data = transformed;
	            }
	            return data;
	        },

	        // http://jqueryvalidation.org/jQuery.validator.addMethod/
	        addMethod: function( name, method, message ) {
	            $.validator.methods[ name ] = method;
	            $.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
	            if ( method.length < 3 ) {
	                $.validator.addClassRules( name, $.validator.normalizeRule( name ) );
	            }
	        },

	        // http://jqueryvalidation.org/jQuery.validator.methods/
	        methods: {

	            // http://jqueryvalidation.org/required-method/
	            required: function( value, element, param ) {

	                // Check if dependency is met
	                if ( !this.depend( param, element ) ) {
	                    return "dependency-mismatch";
	                }
	                if ( element.nodeName.toLowerCase() === "select" ) {

	                    // Could be an array for select-multiple or a string, both are fine this way
	                    var val = $( element ).val();
	                    return val && val.length > 0;
	                }
	                if ( this.checkable( element ) ) {
	                    return this.getLength( value, element ) > 0;
	                }
	                return value.length > 0;
	            },

	            // http://jqueryvalidation.org/email-method/
	            email: function( value, element ) {

	                // From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
	                // Retrieved 2014-01-14
	                // If you have a problem with this implementation, report a bug against the above spec
	                // Or use custom methods to implement your own email validation
	                return this.optional( element ) || /^[\d,a-z]([\w\.\-]+)@([a-z0-9\-]+).([a-z\.]+[a-z])$/i .test( value );
	            },
	            telephone: function (value, element) {
	                return this.optional( element ) || /^1[34578]\d{9}$/.test( value );
	            },
	            careId: function (value, element) {
	                var iSum=0,res = true;
	                var aCity= {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
	                if(!/^\d{17}(\d|x)$/i.test(value)) res=false;
	                var value = value.replace(/x$/i,"a");
	                if(aCity[parseInt(value.substr(0,2))]==null) res=false;
	                var sBirthday = value.substr(6,4)+"-"+Number(value.substr(10,2))+"-"+Number(value.substr(12,2));
	                var d = new Date(sBirthday.replace(/-/g,"/")) ;
	                if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())) res=false;
	                for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(value.charAt(17 - i),11) ;
	                if(iSum%11!=1) res=false;
	                return this.optional( element ) || res;
	            },
	            bankCard: function (value, element) {
	                var res = true;
	                if(isNaN(value)) {
	                    res = false;
	                }
	                if(value.length > 23 || value.length < 15){
	                    res = false;
	                }
	                return this.optional( element ) || res;
	            },
	            bussinessCard: function (value,element) {
	                var res = true;
	                if(value.length == 15) {
	                    var s=[];
	                    var p=[];
	                    var a=[];
	                    var m=10;
	                     p[0]=m;
	                     for(var i=0;i<value.length;i++){
	                         a[i]=parseInt(value.substring(i,i+1),m);
	                         s[i]=(p[i]%(m+1))+a[i];
	                         if(0==s[i]%m){
	                            p[i+1]=10*2;
	                         }
	                         else{
	                            p[i+1]=(s[i]%m)*2;
	                         }
	                     }
	                     if(1 != (s[14]%m)){
	                         res = false;
	                     }

	                 }
	                 else {
	                     res = false;
	                 }
	                return this.optional( element ) || res;
	            },
	            password: function (value,element) {
	                return this.optional( element ) || /^[a-zA-Z0-9_-]{6,20}$/.test( value );
	            },
	            // http://jqueryvalidation.org/url-method/
	            url: function( value, element ) {

	                // Copyright (c) 2010-2013 Diego Perini, MIT licensed
	                // https://gist.github.com/dperini/729294
	                // see also https://mathiasbynens.be/demo/url-regex
	                // modified to allow protocol-relative URLs
	                return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
	            },

	            // http://jqueryvalidation.org/date-method/
	            date: function( value, element ) {
	                return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
	            },

	            // http://jqueryvalidation.org/dateISO-method/
	            dateISO: function( value, element ) {
	                return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
	            },

	            // http://jqueryvalidation.org/number-method/
	            number: function( value, element ) {
	                return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
	            },

	            // http://jqueryvalidation.org/digits-method/
	            digits: function( value, element ) {
	                return this.optional( element ) || /^\d+$/.test( value );
	            },

	            // http://jqueryvalidation.org/minlength-method/
	            minlength: function( value, element, param ) {
	                var length = $.isArray( value ) ? value.length : this.getLength( value, element );
	                return this.optional( element ) || length >= param;
	            },

	            // http://jqueryvalidation.org/maxlength-method/
	            maxlength: function( value, element, param ) {
	                var length = $.isArray( value ) ? value.length : this.getLength( value, element );
	                return this.optional( element ) || length <= param;
	            },

	            // http://jqueryvalidation.org/rangelength-method/
	            rangelength: function( value, element, param ) {
	                var length = $.isArray( value ) ? value.length : this.getLength( value, element );
	                return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
	            },

	            // http://jqueryvalidation.org/min-method/
	            min: function( value, element, param ) {
	                return this.optional( element ) || value >= param;
	            },

	            // http://jqueryvalidation.org/max-method/
	            max: function( value, element, param ) {
	                return this.optional( element ) || value <= param;
	            },

	            // http://jqueryvalidation.org/range-method/
	            range: function( value, element, param ) {
	                return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
	            },

	            // http://jqueryvalidation.org/step-method/
	            step: function( value, element, param ) {
	                var type = $( element ).attr( "type" ),
	                    errorMessage = "Step attribute on input type " + type + " is not supported.",
	                    supportedTypes = [ "text", "number", "range" ],
	                    re = new RegExp( "\\b" + type + "\\b" ),
	                    notSupported = type && !re.test( supportedTypes.join() );

	                // Works only for text, number and range input types
	                // TODO find a way to support input types date, datetime, datetime-local, month, time and week
	                if ( notSupported ) {
	                    throw new Error( errorMessage );
	                }
	                return this.optional( element ) || ( value % param === 0 );
	            },

	            // http://jqueryvalidation.org/equalTo-method/
	            equalTo: function( value, element, param ) {

	                // Bind to the blur event of the target in order to revalidate whenever the target field is updated
	                var target = $( param );
	                if ( this.settings.onfocusout && target.not( ".validate-equalTo-blur" ).length ) {
	                    target.addClass( "validate-equalTo-blur" ).on( "blur.validate-equalTo", function() {
	                        $( element ).valid();
	                    } );
	                }
	                return value === target.val();
	            },

	            // http://jqueryvalidation.org/remote-method/
	            remote: function( value, element, param, method ) {
	                if ( this.optional( element ) ) {
	                    return "dependency-mismatch";
	                }

	                method = typeof method === "string" && method || "remote";

	                var previous = this.previousValue( element, method ),
	                    validator, data, optionDataString;

	                if ( !this.settings.messages[ element.name ] ) {
	                    this.settings.messages[ element.name ] = {};
	                }
	                previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
	                this.settings.messages[ element.name ][ method ] = previous.message;

	                param = typeof param === "string" && { url: param } || param;
	                optionDataString = $.param( $.extend( { data: value }, param.data ) );
	                if ( previous.old === optionDataString ) {
	                    return previous.valid;
	                }

	                previous.old = optionDataString;
	                validator = this;
	                this.startRequest( element );
	                data = {};
	                data[ element.name ] = value;
	                $.ajax( $.extend( true, {
	                    mode: "abort",
	                    port: "validate" + element.name,
	                    dataType: "json",
	                    data: data,
	                    context: validator.currentForm,
	                    success: function( response ) {
	                        var valid = response === true || response === "true",
	                            errors, message, submitted;

	                        validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
	                        if ( valid ) {
	                            submitted = validator.formSubmitted;
	                            validator.resetInternals();
	                            validator.toHide = validator.errorsFor( element );
	                            validator.formSubmitted = submitted;
	                            validator.successList.push( element );
	                            validator.invalid[ element.name ] = false;
	                            validator.showErrors();
	                        } else {
	                            errors = {};
	                            message = response || validator.defaultMessage( element, { method: method, parameters: value } );
	                            errors[ element.name ] = previous.message = message;
	                            validator.invalid[ element.name ] = true;
	                            validator.showErrors( errors );
	                        }
	                        previous.valid = valid;
	                        validator.stopRequest( element, valid );
	                    }
	                }, param ) );
	                return "pending";
	            }
	        }

	    } );

	// Ajax mode: abort
	// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
	// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

	    var pendingRequests = {},
	        ajax;

	// Use a prefilter if available (1.5+)
	    if ( $.ajaxPrefilter ) {
	        $.ajaxPrefilter( function( settings, _, xhr ) {
	            var port = settings.port;
	            if ( settings.mode === "abort" ) {
	                if ( pendingRequests[ port ] ) {
	                    pendingRequests[ port ].abort();
	                }
	                pendingRequests[ port ] = xhr;
	            }
	        } );
	    } else {

	        // Proxy ajax
	        ajax = $.ajax;
	        $.ajax = function( settings ) {
	            var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
	                port = ( "port" in settings ? settings : $.ajaxSettings ).port;
	            if ( mode === "abort" ) {
	                if ( pendingRequests[ port ] ) {
	                    pendingRequests[ port ].abort();
	                }
	                pendingRequests[ port ] = ajax.apply( this, arguments );
	                return pendingRequests[ port ];
	            }
	            return ajax.apply( this, arguments );
	        };
	    }




/***/ },

/***/ 200:
/***/ function(module, exports) {

	/*!
	 * jQuery Form Plugin
	 * version: 3.51.0-2014.06.20
	 * Requires jQuery v1.5 or later
	 * Copyright (c) 2014 M. Alsup
	 * Examples and documentation at: http://malsup.com/jquery/form/
	 * Project repository: https://github.com/malsup/form
	 * Dual licensed under the MIT and GPL licenses.
	 * https://github.com/malsup/form#copyright-and-license
	 */
	/*global ActiveXObject */

	// AMD support
	$(function () {
	    "use strict";

	    /*
	     Usage Note:
	     -----------
	     Do not use both ajaxSubmit and ajaxForm on the same form.  These
	     functions are mutually exclusive.  Use ajaxSubmit if you want
	     to bind your own submit handler to the form.  For example,

	     $(document).ready(function() {
	     $('#myForm').on('submit', function(e) {
	     e.preventDefault(); // <-- important
	     $(this).ajaxSubmit({
	     target: '#output'
	     });
	     });
	     });

	     Use ajaxForm when you want the plugin to manage all the event binding
	     for you.  For example,

	     $(document).ready(function() {
	     $('#myForm').ajaxForm({
	     target: '#output'
	     });
	     });

	     You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
	     form does not have to exist when you invoke ajaxForm:

	     $('#myForm').ajaxForm({
	     delegation: true,
	     target: '#output'
	     });

	     When using ajaxForm, the ajaxSubmit function will be invoked for you
	     at the appropriate time.
	     */

	    /**
	     * Feature detection
	     */
	    var feature = {};
	    feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
	    feature.formdata = window.FormData !== undefined;

	    var hasProp = !!$.fn.prop;

	// attr2 uses prop when it can but checks the return type for
	// an expected string.  this accounts for the case where a form
	// contains inputs with names like "action" or "method"; in those
	// cases "prop" returns the element
	    $.fn.attr2 = function() {
	        if ( ! hasProp ) {
	            return this.attr.apply(this, arguments);
	        }
	        var val = this.prop.apply(this, arguments);
	        if ( ( val && val.jquery ) || typeof val === 'string' ) {
	            return val;
	        }
	        return this.attr.apply(this, arguments);
	    };

	    /**
	     * ajaxSubmit() provides a mechanism for immediately submitting
	     * an HTML form using AJAX.
	     */
	    $.fn.ajaxSubmit = function(options) {
	        /*jshint scripturl:true */

	        // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
	        if (!this.length) {
	            log('ajaxSubmit: skipping submit process - no element selected');
	            return this;
	        }

	        var method, action, url, $form = this;

	        if (typeof options == 'function') {
	            options = { success: options };
	        }
	        else if ( options === undefined ) {
	            options = {};
	        }

	        method = options.type || this.attr2('method');
	        action = options.url  || this.attr2('action');

	        url = (typeof action === 'string') ? $.trim(action) : '';
	        url = url || window.location.href || '';
	        if (url) {
	            // clean url (don't include hash vaue)
	            url = (url.match(/^([^#]+)/)||[])[1];
	        }

	        options = $.extend(true, {
	            url:  url,
	            success: $.ajaxSettings.success,
	            type: method || $.ajaxSettings.type,
	            iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
	        }, options);

	        // hook for manipulating the form data before it is extracted;
	        // convenient for use with rich editors like tinyMCE or FCKEditor
	        var veto = {};
	        this.trigger('form-pre-serialize', [this, options, veto]);
	        if (veto.veto) {
	            log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
	            return this;
	        }

	        // provide opportunity to alter form data before it is serialized
	        if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
	            log('ajaxSubmit: submit aborted via beforeSerialize callback');
	            return this;
	        }

	        var traditional = options.traditional;
	        if ( traditional === undefined ) {
	            traditional = $.ajaxSettings.traditional;
	        }

	        var elements = [];
	        var qx, a = this.formToArray(options.semantic, elements);
	        if (options.data) {
	            options.extraData = options.data;
	            qx = $.param(options.data, traditional);
	        }

	        // give pre-submit callback an opportunity to abort the submit
	        if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
	            log('ajaxSubmit: submit aborted via beforeSubmit callback');
	            return this;
	        }

	        // fire vetoable 'validate' event
	        this.trigger('form-submit-validate', [a, this, options, veto]);
	        if (veto.veto) {
	            log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
	            return this;
	        }

	        var q = $.param(a, traditional);
	        if (qx) {
	            q = ( q ? (q + '&' + qx) : qx );
	        }
	        if (options.type.toUpperCase() == 'GET') {
	            options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
	            options.data = null;  // data is null for 'get'
	        }
	        else {
	            options.data = q; // data is the query string for 'post'
	        }

	        var callbacks = [];
	        if (options.resetForm) {
	            callbacks.push(function() { $form.resetForm(); });
	        }
	        if (options.clearForm) {
	            callbacks.push(function() { $form.clearForm(options.includeHidden); });
	        }

	        // perform a load on the target only if dataType is not provided
	        if (!options.dataType && options.target) {
	            var oldSuccess = options.success || function(){};
	            callbacks.push(function(data) {
	                var fn = options.replaceTarget ? 'replaceWith' : 'html';
	                $(options.target)[fn](data).each(oldSuccess, arguments);
	            });
	        }
	        else if (options.success) {
	            callbacks.push(options.success);
	        }

	        options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
	            var context = options.context || this ;    // jQuery 1.4+ supports scope context
	            for (var i=0, max=callbacks.length; i < max; i++) {
	                callbacks[i].apply(context, [data, status, xhr || $form, $form]);
	            }
	        };

	        if (options.error) {
	            var oldError = options.error;
	            options.error = function(xhr, status, error) {
	                var context = options.context || this;
	                oldError.apply(context, [xhr, status, error, $form]);
	            };
	        }

	        if (options.complete) {
	            var oldComplete = options.complete;
	            options.complete = function(xhr, status) {
	                var context = options.context || this;
	                oldComplete.apply(context, [xhr, status, $form]);
	            };
	        }

	        // are there files to upload?

	        // [value] (issue #113), also see comment:
	        // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
	        var fileInputs = $('input[type=file]:enabled', this).filter(function() { return $(this).val() !== ''; });

	        var hasFileInputs = fileInputs.length > 0;
	        var mp = 'multipart/form-data';
	        var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

	        var fileAPI = feature.fileapi && feature.formdata;
	        log("fileAPI :" + fileAPI);
	        var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

	        var jqxhr;

	        // options.iframe allows user to force iframe mode
	        // 06-NOV-09: now defaulting to iframe mode if file input is detected
	        if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
	            // hack to fix Safari hang (thanks to Tim Molendijk for this)
	            // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
	            if (options.closeKeepAlive) {
	                $.get(options.closeKeepAlive, function() {
	                    jqxhr = fileUploadIframe(a);
	                });
	            }
	            else {
	                jqxhr = fileUploadIframe(a);
	            }
	        }
	        else if ((hasFileInputs || multipart) && fileAPI) {
	            jqxhr = fileUploadXhr(a);
	        }
	        else {
	            jqxhr = $.ajax(options);
	        }

	        $form.removeData('jqxhr').data('jqxhr', jqxhr);

	        // clear element array
	        for (var k=0; k < elements.length; k++) {
	            elements[k] = null;
	        }

	        // fire 'notify' event
	        this.trigger('form-submit-notify', [this, options]);
	        return this;

	        // utility fn for deep serialization
	        function deepSerialize(extraData){
	            var serialized = $.param(extraData, options.traditional).split('&');
	            var len = serialized.length;
	            var result = [];
	            var i, part;
	            for (i=0; i < len; i++) {
	                // #252; undo param space replacement
	                serialized[i] = serialized[i].replace(/\+/g,' ');
	                part = serialized[i].split('=');
	                // #278; use array instead of object storage, favoring array serializations
	                result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
	            }
	            return result;
	        }

	        // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
	        function fileUploadXhr(a) {
	            var formdata = new FormData();

	            for (var i=0; i < a.length; i++) {
	                formdata.append(a[i].name, a[i].value);
	            }

	            if (options.extraData) {
	                var serializedData = deepSerialize(options.extraData);
	                for (i=0; i < serializedData.length; i++) {
	                    if (serializedData[i]) {
	                        formdata.append(serializedData[i][0], serializedData[i][1]);
	                    }
	                }
	            }

	            options.data = null;

	            var s = $.extend(true, {}, $.ajaxSettings, options, {
	                contentType: false,
	                processData: false,
	                cache: false,
	                type: method || 'POST'
	            });

	            if (options.uploadProgress) {
	                // workaround because jqXHR does not expose upload property
	                s.xhr = function() {
	                    var xhr = $.ajaxSettings.xhr();
	                    if (xhr.upload) {
	                        xhr.upload.addEventListener('progress', function(event) {
	                            var percent = 0;
	                            var position = event.loaded || event.position; /*event.position is deprecated*/
	                            var total = event.total;
	                            if (event.lengthComputable) {
	                                percent = Math.ceil(position / total * 100);
	                            }
	                            options.uploadProgress(event, position, total, percent);
	                        }, false);
	                    }
	                    return xhr;
	                };
	            }

	            s.data = null;
	            var beforeSend = s.beforeSend;
	            s.beforeSend = function(xhr, o) {
	                //Send FormData() provided by user
	                if (options.formData) {
	                    o.data = options.formData;
	                }
	                else {
	                    o.data = formdata;
	                }
	                if(beforeSend) {
	                    beforeSend.call(this, xhr, o);
	                }
	            };
	            return $.ajax(s);
	        }

	        // private function for handling file uploads (hat tip to YAHOO!)
	        function fileUploadIframe(a) {
	            var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
	            var deferred = $.Deferred();

	            // #341
	            deferred.abort = function(status) {
	                xhr.abort(status);
	            };

	            if (a) {
	                // ensure that every serialized input is still enabled
	                for (i=0; i < elements.length; i++) {
	                    el = $(elements[i]);
	                    if ( hasProp ) {
	                        el.prop('disabled', false);
	                    }
	                    else {
	                        el.removeAttr('disabled');
	                    }
	                }
	            }

	            s = $.extend(true, {}, $.ajaxSettings, options);
	            s.context = s.context || s;
	            id = 'jqFormIO' + (new Date().getTime());
	            if (s.iframeTarget) {
	                $io = $(s.iframeTarget);
	                n = $io.attr2('name');
	                if (!n) {
	                    $io.attr2('name', id);
	                }
	                else {
	                    id = n;
	                }
	            }
	            else {
	                $io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
	                $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
	            }
	            io = $io[0];


	            xhr = { // mock object
	                aborted: 0,
	                responseText: null,
	                responseXML: null,
	                status: 0,
	                statusText: 'n/a',
	                getAllResponseHeaders: function() {},
	                getResponseHeader: function() {},
	                setRequestHeader: function() {},
	                abort: function(status) {
	                    var e = (status === 'timeout' ? 'timeout' : 'aborted');
	                    log('aborting upload... ' + e);
	                    this.aborted = 1;

	                    try { // #214, #257
	                        if (io.contentWindow.document.execCommand) {
	                            io.contentWindow.document.execCommand('Stop');
	                        }
	                    }
	                    catch(ignore) {}

	                    $io.attr('src', s.iframeSrc); // abort op in progress
	                    xhr.error = e;
	                    if (s.error) {
	                        s.error.call(s.context, xhr, e, status);
	                    }
	                    if (g) {
	                        $.event.trigger("ajaxError", [xhr, s, e]);
	                    }
	                    if (s.complete) {
	                        s.complete.call(s.context, xhr, e);
	                    }
	                }
	            };

	            g = s.global;
	            // trigger ajax global events so that activity/block indicators work like normal
	            if (g && 0 === $.active++) {
	                $.event.trigger("ajaxStart");
	            }
	            if (g) {
	                $.event.trigger("ajaxSend", [xhr, s]);
	            }

	            if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
	                if (s.global) {
	                    $.active--;
	                }
	                deferred.reject();
	                return deferred;
	            }
	            if (xhr.aborted) {
	                deferred.reject();
	                return deferred;
	            }

	            // add submitting element to data if we know it
	            sub = form.clk;
	            if (sub) {
	                n = sub.name;
	                if (n && !sub.disabled) {
	                    s.extraData = s.extraData || {};
	                    s.extraData[n] = sub.value;
	                    if (sub.type == "image") {
	                        s.extraData[n+'.x'] = form.clk_x;
	                        s.extraData[n+'.y'] = form.clk_y;
	                    }
	                }
	            }

	            var CLIENT_TIMEOUT_ABORT = 1;
	            var SERVER_ABORT = 2;

	            function getDoc(frame) {
	                /* it looks like contentWindow or contentDocument do not
	                 * carry the protocol property in ie8, when running under ssl
	                 * frame.document is the only valid response document, since
	                 * the protocol is know but not on the other two objects. strange?
	                 * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
	                 */

	                var doc = null;

	                // IE8 cascading access check
	                try {
	                    if (frame.contentWindow) {
	                        doc = frame.contentWindow.document;
	                    }
	                } catch(err) {
	                    // IE8 access denied under ssl & missing protocol
	                    log('cannot get iframe.contentWindow document: ' + err);
	                }

	                if (doc) { // successful getting content
	                    return doc;
	                }

	                try { // simply checking may throw in ie8 under ssl or mismatched protocol
	                    doc = frame.contentDocument ? frame.contentDocument : frame.document;
	                } catch(err) {
	                    // last attempt
	                    log('cannot get iframe.contentDocument: ' + err);
	                    doc = frame.document;
	                }
	                return doc;
	            }

	            // Rails CSRF hack (thanks to Yvan Barthelemy)
	            var csrf_token = $('meta[name=csrf-token]').attr('content');
	            var csrf_param = $('meta[name=csrf-param]').attr('content');
	            if (csrf_param && csrf_token) {
	                s.extraData = s.extraData || {};
	                s.extraData[csrf_param] = csrf_token;
	            }

	            // take a breath so that pending repaints get some cpu time before the upload starts
	            function doSubmit() {
	                // make sure form attrs are set
	                var t = $form.attr2('target'),
	                    a = $form.attr2('action'),
	                    mp = 'multipart/form-data',
	                    et = $form.attr('enctype') || $form.attr('encoding') || mp;

	                // update form attrs in IE friendly way
	                form.setAttribute('target',id);
	                if (!method || /post/i.test(method) ) {
	                    form.setAttribute('method', 'POST');
	                }
	                if (a != s.url) {
	                    form.setAttribute('action', s.url);
	                }

	                // ie borks in some cases when setting encoding
	                if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
	                    $form.attr({
	                        encoding: 'multipart/form-data',
	                        enctype:  'multipart/form-data'
	                    });
	                }

	                // support timout
	                if (s.timeout) {
	                    timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
	                }

	                // look for server aborts
	                function checkState() {
	                    try {
	                        var state = getDoc(io).readyState;
	                        log('state = ' + state);
	                        if (state && state.toLowerCase() == 'uninitialized') {
	                            setTimeout(checkState,50);
	                        }
	                    }
	                    catch(e) {
	                        log('Server abort: ' , e, ' (', e.name, ')');
	                        cb(SERVER_ABORT);
	                        if (timeoutHandle) {
	                            clearTimeout(timeoutHandle);
	                        }
	                        timeoutHandle = undefined;
	                    }
	                }

	                // add "extra" data to form if provided in options
	                var extraInputs = [];
	                try {
	                    if (s.extraData) {
	                        for (var n in s.extraData) {
	                            if (s.extraData.hasOwnProperty(n)) {
	                                // if using the $.param format that allows for multiple values with the same name
	                                if($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
	                                    extraInputs.push(
	                                        $('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value)
	                                            .appendTo(form)[0]);
	                                } else {
	                                    extraInputs.push(
	                                        $('<input type="hidden" name="'+n+'">').val(s.extraData[n])
	                                            .appendTo(form)[0]);
	                                }
	                            }
	                        }
	                    }

	                    if (!s.iframeTarget) {
	                        // add iframe to doc and submit the form
	                        $io.appendTo('body');
	                    }
	                    if (io.attachEvent) {
	                        io.attachEvent('onload', cb);
	                    }
	                    else {
	                        io.addEventListener('load', cb, false);
	                    }
	                    setTimeout(checkState,15);

	                    try {
	                        form.submit();
	                    } catch(err) {
	                        // just in case form has element with name/id of 'submit'
	                        var submitFn = document.createElement('form').submit;
	                        submitFn.apply(form);
	                    }
	                }
	                finally {
	                    // reset attrs and remove "extra" input elements
	                    form.setAttribute('action',a);
	                    form.setAttribute('enctype', et); // #380
	                    if(t) {
	                        form.setAttribute('target', t);
	                    } else {
	                        $form.removeAttr('target');
	                    }
	                    $(extraInputs).remove();
	                }
	            }

	            if (s.forceSync) {
	                doSubmit();
	            }
	            else {
	                setTimeout(doSubmit, 10); // this lets dom updates render
	            }

	            var data, doc, domCheckCount = 50, callbackProcessed;

	            function cb(e) {
	                if (xhr.aborted || callbackProcessed) {
	                    return;
	                }

	                doc = getDoc(io);
	                if(!doc) {
	                    log('cannot access response document');
	                    e = SERVER_ABORT;
	                }
	                if (e === CLIENT_TIMEOUT_ABORT && xhr) {
	                    xhr.abort('timeout');
	                    deferred.reject(xhr, 'timeout');
	                    return;
	                }
	                else if (e == SERVER_ABORT && xhr) {
	                    xhr.abort('server abort');
	                    deferred.reject(xhr, 'error', 'server abort');
	                    return;
	                }

	                if (!doc || doc.location.href == s.iframeSrc) {
	                    // response not received yet
	                    if (!timedOut) {
	                        return;
	                    }
	                }
	                if (io.detachEvent) {
	                    io.detachEvent('onload', cb);
	                }
	                else {
	                    io.removeEventListener('load', cb, false);
	                }

	                var status = 'success', errMsg;
	                try {
	                    if (timedOut) {
	                        throw 'timeout';
	                    }

	                    var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
	                    log('isXml='+isXml);
	                    if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
	                        if (--domCheckCount) {
	                            // in some browsers (Opera) the iframe DOM is not always traversable when
	                            // the onload callback fires, so we loop a bit to accommodate
	                            log('requeing onLoad callback, DOM not available');
	                            setTimeout(cb, 250);
	                            return;
	                        }
	                        // let this fall through because server response could be an empty document
	                        //log('Could not access iframe DOM after mutiple tries.');
	                        //throw 'DOMException: not available';
	                    }

	                    //log('response detected');
	                    var docRoot = doc.body ? doc.body : doc.documentElement;
	                    xhr.responseText = docRoot ? docRoot.innerHTML : null;
	                    xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
	                    if (isXml) {
	                        s.dataType = 'xml';
	                    }
	                    xhr.getResponseHeader = function(header){
	                        var headers = {'content-type': s.dataType};
	                        return headers[header.toLowerCase()];
	                    };
	                    // support for XHR 'status' & 'statusText' emulation :
	                    if (docRoot) {
	                        xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
	                        xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
	                    }

	                    var dt = (s.dataType || '').toLowerCase();
	                    var scr = /(json|script|text)/.test(dt);
	                    if (scr || s.textarea) {
	                        // see if user embedded response in textarea
	                        var ta = doc.getElementsByTagName('textarea')[0];
	                        if (ta) {
	                            xhr.responseText = ta.value;
	                            // support for XHR 'status' & 'statusText' emulation :
	                            xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
	                            xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
	                        }
	                        else if (scr) {
	                            // account for browsers injecting pre around json response
	                            var pre = doc.getElementsByTagName('pre')[0];
	                            var b = doc.getElementsByTagName('body')[0];
	                            if (pre) {
	                                xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
	                            }
	                            else if (b) {
	                                xhr.responseText = b.textContent ? b.textContent : b.innerText;
	                            }
	                        }
	                    }
	                    else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
	                        xhr.responseXML = toXml(xhr.responseText);
	                    }

	                    try {
	                        data = httpData(xhr, dt, s);
	                    }
	                    catch (err) {
	                        status = 'parsererror';
	                        xhr.error = errMsg = (err || status);
	                    }
	                }
	                catch (err) {
	                    log('error caught: ',err);
	                    status = 'error';
	                    xhr.error = errMsg = (err || status);
	                }

	                if (xhr.aborted) {
	                    log('upload aborted');
	                    status = null;
	                }

	                if (xhr.status) { // we've set xhr.status
	                    status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
	                }

	                // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
	                if (status === 'success') {
	                    if (s.success) {
	                        s.success.call(s.context, data, 'success', xhr);
	                    }
	                    deferred.resolve(xhr.responseText, 'success', xhr);
	                    if (g) {
	                        $.event.trigger("ajaxSuccess", [xhr, s]);
	                    }
	                }
	                else if (status) {
	                    if (errMsg === undefined) {
	                        errMsg = xhr.statusText;
	                    }
	                    if (s.error) {
	                        s.error.call(s.context, xhr, status, errMsg);
	                    }
	                    deferred.reject(xhr, 'error', errMsg);
	                    if (g) {
	                        $.event.trigger("ajaxError", [xhr, s, errMsg]);
	                    }
	                }

	                if (g) {
	                    $.event.trigger("ajaxComplete", [xhr, s]);
	                }

	                if (g && ! --$.active) {
	                    $.event.trigger("ajaxStop");
	                }

	                if (s.complete) {
	                    s.complete.call(s.context, xhr, status);
	                }

	                callbackProcessed = true;
	                if (s.timeout) {
	                    clearTimeout(timeoutHandle);
	                }

	                // clean up
	                setTimeout(function() {
	                    if (!s.iframeTarget) {
	                        $io.remove();
	                    }
	                    else { //adding else to clean up existing iframe response.
	                        $io.attr('src', s.iframeSrc);
	                    }
	                    xhr.responseXML = null;
	                }, 100);
	            }

	            var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
	                    if (window.ActiveXObject) {
	                        doc = new ActiveXObject('Microsoft.XMLDOM');
	                        doc.async = 'false';
	                        doc.loadXML(s);
	                    }
	                    else {
	                        doc = (new DOMParser()).parseFromString(s, 'text/xml');
	                    }
	                    return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
	                };
	            var parseJSON = $.parseJSON || function(s) {
	                    /*jslint evil:true */
	                    return window['eval']('(' + s + ')');
	                };

	            var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

	                var ct = xhr.getResponseHeader('content-type') || '',
	                    xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
	                    data = xml ? xhr.responseXML : xhr.responseText;

	                if (xml && data.documentElement.nodeName === 'parsererror') {
	                    if ($.error) {
	                        $.error('parsererror');
	                    }
	                }
	                if (s && s.dataFilter) {
	                    data = s.dataFilter(data, type);
	                }
	                if (typeof data === 'string') {
	                    if (type === 'json' || !type && ct.indexOf('json') >= 0) {
	                        data = parseJSON(data);
	                    } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
	                        $.globalEval(data);
	                    }
	                }
	                return data;
	            };

	            return deferred;
	        }
	    };

	    /**
	     * ajaxForm() provides a mechanism for fully automating form submission.
	     *
	     * The advantages of using this method instead of ajaxSubmit() are:
	     *
	     * 1: This method will include coordinates for <input type="image" /> elements (if the element
	     *    is used to submit the form).
	     * 2. This method will include the submit element's name/value data (for the element that was
	     *    used to submit the form).
	     * 3. This method binds the submit() method to the form for you.
	     *
	     * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
	     * passes the options argument along after properly binding events for submit elements and
	     * the form itself.
	     */
	    $.fn.ajaxForm = function(options) {
	        options = options || {};
	        options.delegation = options.delegation && $.isFunction($.fn.on);

	        // in jQuery 1.3+ we can fix mistakes with the ready state
	        if (!options.delegation && this.length === 0) {
	            var o = { s: this.selector, c: this.context };
	            if (!$.isReady && o.s) {
	                log('DOM not ready, queuing ajaxForm');
	                $(function() {
	                    $(o.s,o.c).ajaxForm(options);
	                });
	                return this;
	            }
	            // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
	            log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
	            return this;
	        }

	        if ( options.delegation ) {
	            $(document)
	                .off('submit.form-plugin', this.selector, doAjaxSubmit)
	                .off('click.form-plugin', this.selector, captureSubmittingElement)
	                .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
	                .on('click.form-plugin', this.selector, options, captureSubmittingElement);
	            return this;
	        }

	        return this.ajaxFormUnbind()
	            .bind('submit.form-plugin', options, doAjaxSubmit)
	            .bind('click.form-plugin', options, captureSubmittingElement);
	    };

	// private event handlers
	    function doAjaxSubmit(e) {
	        /*jshint validthis:true */
	        var options = e.data;
	        if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
	            e.preventDefault();
	            $(e.target).ajaxSubmit(options); // #365
	        }
	    }

	    function captureSubmittingElement(e) {
	        /*jshint validthis:true */
	        var target = e.target;
	        var $el = $(target);
	        if (!($el.is("[type=submit],[type=image]"))) {
	            // is this a child element of the submit el?  (ex: a span within a button)
	            var t = $el.closest('[type=submit]');
	            if (t.length === 0) {
	                return;
	            }
	            target = t[0];
	        }
	        var form = this;
	        form.clk = target;
	        if (target.type == 'image') {
	            if (e.offsetX !== undefined) {
	                form.clk_x = e.offsetX;
	                form.clk_y = e.offsetY;
	            } else if (typeof $.fn.offset == 'function') {
	                var offset = $el.offset();
	                form.clk_x = e.pageX - offset.left;
	                form.clk_y = e.pageY - offset.top;
	            } else {
	                form.clk_x = e.pageX - target.offsetLeft;
	                form.clk_y = e.pageY - target.offsetTop;
	            }
	        }
	        // clear form vars
	        setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
	    }


	// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
	    $.fn.ajaxFormUnbind = function() {
	        return this.unbind('submit.form-plugin click.form-plugin');
	    };

	    /**
	     * formToArray() gathers form element data into an array of objects that can
	     * be passed to any of the following ajax functions: $.get, $.post, or load.
	     * Each object in the array has both a 'name' and 'value' property.  An example of
	     * an array for a simple login form might be:
	     *
	     * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
	     *
	     * It is this array that is passed to pre-submit callback functions provided to the
	     * ajaxSubmit() and ajaxForm() methods.
	     */
	    $.fn.formToArray = function(semantic, elements) {
	        var a = [];
	        if (this.length === 0) {
	            return a;
	        }

	        var form = this[0];
	        var formId = this.attr('id');
	        var els = semantic ? form.getElementsByTagName('*') : form.elements;
	        var els2;

	        if (els && !/MSIE [678]/.test(navigator.userAgent)) { // #390
	            els = $(els).get();  // convert to standard array
	        }

	        // #386; account for inputs outside the form which use the 'form' attribute
	        if ( formId ) {
	            els2 = $(':input[form="' + formId + '"]').get(); // hat tip @thet
	            if ( els2.length ) {
	                els = (els || []).concat(els2);
	            }
	        }

	        if (!els || !els.length) {
	            return a;
	        }

	        var i,j,n,v,el,max,jmax;
	        for(i=0, max=els.length; i < max; i++) {
	            el = els[i];
	            n = el.name;
	            if (!n || el.disabled) {
	                continue;
	            }

	            if (semantic && form.clk && el.type == "image") {
	                // handle image inputs on the fly when semantic == true
	                if(form.clk == el) {
	                    a.push({name: n, value: $(el).val(), type: el.type });
	                    a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
	                }
	                continue;
	            }

	            v = $.fieldValue(el, true);
	            if (v && v.constructor == Array) {
	                if (elements) {
	                    elements.push(el);
	                }
	                for(j=0, jmax=v.length; j < jmax; j++) {
	                    a.push({name: n, value: v[j]});
	                }
	            }
	            else if (feature.fileapi && el.type == 'file') {
	                if (elements) {
	                    elements.push(el);
	                }
	                var files = el.files;
	                if (files.length) {
	                    for (j=0; j < files.length; j++) {
	                        a.push({name: n, value: files[j], type: el.type});
	                    }
	                }
	                else {
	                    // #180
	                    a.push({ name: n, value: '', type: el.type });
	                }
	            }
	            else if (v !== null && typeof v != 'undefined') {
	                if (elements) {
	                    elements.push(el);
	                }
	                a.push({name: n, value: v, type: el.type, required: el.required});
	            }
	        }

	        if (!semantic && form.clk) {
	            // input type=='image' are not found in elements array! handle it here
	            var $input = $(form.clk), input = $input[0];
	            n = input.name;
	            if (n && !input.disabled && input.type == 'image') {
	                a.push({name: n, value: $input.val()});
	                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
	            }
	        }
	        return a;
	    };

	    /**
	     * Serializes form data into a 'submittable' string. This method will return a string
	     * in the format: name1=value1&amp;name2=value2
	     */
	    $.fn.formSerialize = function(semantic) {
	        //hand off to jQuery.param for proper encoding
	        return $.param(this.formToArray(semantic));
	    };

	    /**
	     * Serializes all field elements in the jQuery object into a query string.
	     * This method will return a string in the format: name1=value1&amp;name2=value2
	     */
	    $.fn.fieldSerialize = function(successful) {
	        var a = [];
	        this.each(function() {
	            var n = this.name;
	            if (!n) {
	                return;
	            }
	            var v = $.fieldValue(this, successful);
	            if (v && v.constructor == Array) {
	                for (var i=0,max=v.length; i < max; i++) {
	                    a.push({name: n, value: v[i]});
	                }
	            }
	            else if (v !== null && typeof v != 'undefined') {
	                a.push({name: this.name, value: v});
	            }
	        });
	        //hand off to jQuery.param for proper encoding
	        return $.param(a);
	    };

	    /**
	     * Returns the value(s) of the element in the matched set.  For example, consider the following form:
	     *
	     *  <form><fieldset>
	     *      <input name="A" type="text" />
	     *      <input name="A" type="text" />
	     *      <input name="B" type="checkbox" value="B1" />
	     *      <input name="B" type="checkbox" value="B2"/>
	     *      <input name="C" type="radio" value="C1" />
	     *      <input name="C" type="radio" value="C2" />
	     *  </fieldset></form>
	     *
	     *  var v = $('input[type=text]').fieldValue();
	     *  // if no values are entered into the text inputs
	     *  v == ['','']
	     *  // if values entered into the text inputs are 'foo' and 'bar'
	     *  v == ['foo','bar']
	     *
	     *  var v = $('input[type=checkbox]').fieldValue();
	     *  // if neither checkbox is checked
	     *  v === undefined
	     *  // if both checkboxes are checked
	     *  v == ['B1', 'B2']
	     *
	     *  var v = $('input[type=radio]').fieldValue();
	     *  // if neither radio is checked
	     *  v === undefined
	     *  // if first radio is checked
	     *  v == ['C1']
	     *
	     * The successful argument controls whether or not the field element must be 'successful'
	     * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
	     * The default value of the successful argument is true.  If this value is false the value(s)
	     * for each element is returned.
	     *
	     * Note: This method *always* returns an array.  If no valid value can be determined the
	     *    array will be empty, otherwise it will contain one or more values.
	     */
	    $.fn.fieldValue = function(successful) {
	        for (var val=[], i=0, max=this.length; i < max; i++) {
	            var el = this[i];
	            var v = $.fieldValue(el, successful);
	            if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
	                continue;
	            }
	            if (v.constructor == Array) {
	                $.merge(val, v);
	            }
	            else {
	                val.push(v);
	            }
	        }
	        return val;
	    };

	    /**
	     * Returns the value of the field element.
	     */
	    $.fieldValue = function(el, successful) {
	        var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	        if (successful === undefined) {
	            successful = true;
	        }

	        if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
	            (t == 'checkbox' || t == 'radio') && !el.checked ||
	            (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
	            tag == 'select' && el.selectedIndex == -1)) {
	            return null;
	        }

	        if (tag == 'select') {
	            var index = el.selectedIndex;
	            if (index < 0) {
	                return null;
	            }
	            var a = [], ops = el.options;
	            var one = (t == 'select-one');
	            var max = (one ? index+1 : ops.length);
	            for(var i=(one ? index : 0); i < max; i++) {
	                var op = ops[i];
	                if (op.selected) {
	                    var v = op.value;
	                    if (!v) { // extra pain for IE...
	                        v = (op.attributes && op.attributes.value && !(op.attributes.value.specified)) ? op.text : op.value;
	                    }
	                    if (one) {
	                        return v;
	                    }
	                    a.push(v);
	                }
	            }
	            return a;
	        }
	        return $(el).val();
	    };

	    /**
	     * Clears the form data.  Takes the following actions on the form's input fields:
	     *  - input text fields will have their 'value' property set to the empty string
	     *  - select elements will have their 'selectedIndex' property set to -1
	     *  - checkbox and radio inputs will have their 'checked' property set to false
	     *  - inputs of type submit, button, reset, and hidden will *not* be effected
	     *  - button elements will *not* be effected
	     */
	    $.fn.clearForm = function(includeHidden) {
	        return this.each(function() {
	            $('input,select,textarea', this).clearFields(includeHidden);
	        });
	    };

	    /**
	     * Clears the selected form elements.
	     */
	    $.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
	        var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
	        return this.each(function() {
	            var t = this.type, tag = this.tagName.toLowerCase();
	            if (re.test(t) || tag == 'textarea') {
	                this.value = '';
	            }
	            else if (t == 'checkbox' || t == 'radio') {
	                this.checked = false;
	            }
	            else if (tag == 'select') {
	                this.selectedIndex = -1;
	            }
	            else if (t == "file") {
	                if (/MSIE/.test(navigator.userAgent)) {
	                    $(this).replaceWith($(this).clone(true));
	                } else {
	                    $(this).val('');
	                }
	            }
	            else if (includeHidden) {
	                // includeHidden can be the value true, or it can be a selector string
	                // indicating a special test; for example:
	                //  $('#myForm').clearForm('.special:hidden')
	                // the above would clean hidden inputs that have the class of 'special'
	                if ( (includeHidden === true && /hidden/.test(t)) ||
	                    (typeof includeHidden == 'string' && $(this).is(includeHidden)) ) {
	                    this.value = '';
	                }
	            }
	        });
	    };

	    /**
	     * Resets the form data.  Causes all form elements to be reset to their original value.
	     */
	    $.fn.resetForm = function() {
	        return this.each(function() {
	            // guard against an input with the name of 'reset'
	            // note that IE reports the reset function as an 'object'
	            if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
	                this.reset();
	            }
	        });
	    };

	    /**
	     * Enables or disables any matching elements.
	     */
	    $.fn.enable = function(b) {
	        if (b === undefined) {
	            b = true;
	        }
	        return this.each(function() {
	            this.disabled = !b;
	        });
	    };

	    /**
	     * Checks/unchecks any matching checkboxes or radio buttons and
	     * selects/deselects and matching option elements.
	     */
	    $.fn.selected = function(select) {
	        if (select === undefined) {
	            select = true;
	        }
	        return this.each(function() {
	            var t = this.type;
	            if (t == 'checkbox' || t == 'radio') {
	                this.checked = select;
	            }
	            else if (this.tagName.toLowerCase() == 'option') {
	                var $sel = $(this).parent('select');
	                if (select && $sel[0] && $sel[0].type == 'select-one') {
	                    // deselect all other options
	                    $sel.find('option').selected(false);
	                }
	                this.selected = select;
	            }
	        });
	    };

	// expose debug var
	    $.fn.ajaxSubmit.debug = false;

	// helper fn for console logging
	    function log() {
	        if (!$.fn.ajaxSubmit.debug) {
	            return;
	        }
	        var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
	        if (window.console && window.console.log) {
	            window.console.log(msg);
	        }
	        else if (window.opera && window.opera.postError) {
	            window.opera.postError(msg);
	        }
	    }

	});

/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/6.
	 */

	var template = __webpack_require__(202);
	__webpack_require__(203);

	var userModel = Backbone.Model.extend({
	    url: mscxPage.host+'/user/info.do'
	});

	var accountView = Backbone.View.extend({
	    el: mscxPage.domEl.userCenterRight,
	    events: {
	        'click #accountTabs span': 'changeTab'

	    },
	    changeTab: function (e) {
	        var $this = $(e.target),
	            isActive = $this.hasClass('active'),
	            index = $this.index();
	        if(!isActive){
	            $this.parent().find('.active').removeClass('active');
	            $this.addClass('active');
	            new this.childView[index]({el: '#accountInfo'});
	        }
	    },
	    initialize: function() {
	        this.childView = [accountSourcesView,accountApplyView];
	        this.$el.html(template);
	        new accountSourcesView({el: '#accountInfo'});
	    }
	});
	var accountSourcesView = Backbone.View.extend({
	    events: {
	        'click #applyTab': 'changeTab'
	    },
	    initialize: function() {
	        this.template = _.template($('#accountSources').html());
	        //this.model.fetch();
	        this.render();
	    },
	    changeTab: function (e) {
	        var $this = $(e.target),
	            isActive = $this.hasClass('active'),
	            index = $this.index();
	        if(!isActive){
	            var $nowActive = $this.parent().find('.active'),
	                $colsList = this.$el.find('.M-downCons'),
	                nowIndex = $nowActive.index();
	            $nowActive.removeClass('active');
	            $this.addClass('active');
	            $($colsList[nowIndex]).toggleClass('hide');
	            $($colsList[index]).toggleClass('hide');
	            $nowActive = null;$colsList = null;
	        }
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
	var accountApplyView = Backbone.View.extend({
	    events: {
	    },
	    initialize: function() {
	        this.template = _.template($('#accountApply').html());
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
	module.exports = accountView;

/***/ },

/***/ 202:
/***/ function(module, exports) {

	module.exports = "<div id=\"accountTabs\" class=\"topTab clearfix myApiTop\">\r\n    <span class=\"active\">我的消费记录</span>\r\n    <span>发票申请</span>\r\n</div>\r\n<div id=\"accountInfo\"  class=\"tabDownCons\">\r\n\r\n</div>\r\n<script id=\"accountSources\" type=\"template\">\r\n    <div class=\"R-mainInfo clearfix\">\r\n        <!-- API、运行资源、微服务 tab -->\r\n        <div id=\"applyTab\" class=\"R-titTab\">\r\n            <span class=\"active\">资源</span>\r\n            <span>运行环境</span>\r\n        </div>\r\n        <div class=\" M-DownCons bgWhite\">\r\n            <!-- API -->\r\n            <div class=\"M-downCons account\">\r\n                <div class=\"D_table M-table\">\r\n                    <table>\r\n                        <thead>\r\n                        <tr>\r\n                            <th>订单号</th>\r\n                            <th>资源名称</th>\r\n                            <th>资源类型</th>\r\n                            <th>价格</th>\r\n                            <th>数量</th>\r\n                            <th>支付金额</th>\r\n                            <th>支付方式</th>\r\n                            <th>支付时间</th>\r\n                        </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                        <tr>\r\n                            <td rowspan=\"2\">1100036238</td>\r\n                            <td><a href=\"../api/citySdkInfo.html\">全国交通违章查询</a></td>\r\n                            <td>数据API</td>\r\n                            <td>免费</td>\r\n                            <td>3</td>\r\n                            <td rowspan=\"2\">￥400</td>\r\n                            <td rowspan=\"2\">线下支付</td>\r\n\r\n                            <td rowspan=\"2\">2016-06-12 12:04:32</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td><a>天气预报</a></td>\r\n                            <td>工具API</td>\r\n                            <td>2元/次</td>\r\n                            <td>200</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>1100011674</td>\r\n                            <td><a>企业谱系模型</a></td>\r\n                            <td>模型API</td>\r\n                            <td>￥99.00/10000次<br>（申请即送1000次)</td>\r\n                            <td>1100</td>\r\n                            <td>￥99.00</td>\r\n                            <td>在线支付</td>\r\n                            <td>2016-07-20 9:34:04</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>1100011649</td>\r\n                            <td><a>北京水费账单</a></td>\r\n                            <td>数据</td>\r\n                            <td>￥5.00/200次</td>\r\n                            <td>2</td>\r\n                            <td>￥10.00</td>\r\n                            <td>在线支付</td>\r\n                            <td>2016-04-30 18:26:39</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>1100011632</td>\r\n                            <td><a>专利信息查询</a></td>\r\n                            <td>微服务</td>\r\n                            <td>￥10.00/600次</td>\r\n                            <td>1</td>\r\n                            <td>￥10.00</td>\r\n                            <td>在线支付</td>\r\n                            <td>2016-05-22 14:20:01</td>\r\n                        </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n\r\n            <!-- 运行环境 -->\r\n            <div class=\"M-downCons hide\">\r\n                <div class=\"D_table M-table\">\r\n                    <table>\r\n                        <thead>\r\n                        <tr>\r\n                            <th>订单号</th>\r\n                            <th>应用</th>\r\n                            <th>类型</th>\r\n                            <th>资源数量</th>\r\n                            <th>时长</th>\r\n                            <th>金额</th>\r\n                            <th>时间</th>\r\n                        </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                        <tr>\r\n                            <td>dd000000000008</td>\r\n                            <td>公积金查询</td>\r\n                            <td>dcoker实例</td>\r\n                            <td>1</td>\r\n                            <td>1个月</td>\r\n                            <td>免费</td>\r\n                            <td>2016-08-07 13:00:00</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>dd000000000007</td>\r\n                            <td>公积金查询</td>\r\n                            <td>dcoker实例</td>\r\n                            <td>2</td>\r\n                            <td>1个月</td>\r\n                            <td>免费</td>\r\n                            <td>2016-09-07 09:01:23</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>dd000000000006</td>\r\n                            <td>数据库</td>\r\n                            <td>数据库实例</td>\r\n                            <td>2</td>\r\n                            <td>自动续费(1个月)</td>\r\n                            <td>￥40</td>\r\n                            <td>2016-08-21 15:00:00</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>dd000000000005</td>\r\n                            <td>数据库</td>\r\n                            <td>数据库实例</td>\r\n                            <td>1</td>\r\n                            <td>12个月</td>\r\n                            <td>￥240</td>\r\n                            <td>2016-07-02 21:21:11</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>dd000000000004</td>\r\n                            <td>数据库</td>\r\n                            <td>数据库实例</td>\r\n                            <td>2</td>\r\n                            <td>2个月</td>\r\n                            <td>￥80</td>\r\n                            <td>2016-06-22 15:00:00</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>dd000000000002</td>\r\n                            <td>水费查询</td>\r\n                            <td>dcoker实例</td>\r\n                            <td>2</td>\r\n                            <td>12个月</td>\r\n                            <td>￥4800.00</td>\r\n                            <td>2016-07-07 09:01:23</td>\r\n                        </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</script>\r\n<script id=\"accountApply\" type=\"template\">\r\n    <div class=\"M-DownCons bgWhite\" style=\"border-top: 1px solid #ccc;padding-top: 20px;\">\r\n        <div class=\"tab-title\" ><button class=\"mr20\"><a class=\"invoice corff\">申请发票</a></button>\r\n            <input type=\"text\" placeholder=\"请输入发票抬头\" style=\"margin-top: 6px;\">\r\n            <button class=\"ml10\">搜索</button></div>\r\n        <div class=\"M-downCons\">\r\n            <div class=\"D_table M-table\">\r\n                <table>\r\n                    <thead>\r\n                    <tr>\r\n                        <th>序号</th>\r\n                        <th>发票类型</th>\r\n                        <th>发票金额</th>\r\n                        <th>单位名称</th>\r\n                        <th>发票申请时间</th>\r\n                        <th>收取方式</th>\r\n                        <th>取票地址</th>\r\n                        <th>发票状态</th>\r\n                    </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                    <tr>\r\n                        <td>1</td>\r\n                        <td>增值税专用发票</td>\r\n                        <td>400</td>\r\n                        <td>北京海阔天空公司</td>\r\n                        <td>2016-08-07 13:00</td>\r\n                        <td>邮寄</td>\r\n                        <td>神州数码广场</td>\r\n                        <td>未开票</td>\r\n                    </tr>\r\n\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</script>\r\n";

/***/ },

/***/ 203:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/6.
	 */

	var template = __webpack_require__(206);
	__webpack_require__(207);

	var userModel = Backbone.Model.extend({
	    url: mscxPage.host+'/user/info.do'
	});

	var demandView = Backbone.View.extend({
	    el: mscxPage.domEl.userCenterRight,
	    events: {
	        'click #demandTabs span': 'changeTab'

	    },
	    changeTab: function (e) {
	        var $this = $(e.target),
	            isActive = $this.hasClass('active'),
	            index = $this.index();
	        if(!isActive){
	            $this.parent().find('.active').removeClass('active');
	            $this.addClass('active');
	           // new this.childView[index]({el: '#accountInfo'});
	        }
	    },
	    initialize: function() {
	        this.childView = [];
	        this.$el.html(template);
	        new resourcesDemandListView({el: '#demandInfo'});
	    }
	});

	var resourcesDemandListView = Backbone.View.extend({
	    events: {
	    },
	    changeTab: function (e) {
	        var $this = $(e.target),
	            isActive = $this.hasClass('active'),
	            index = $this.index();
	        if(!isActive){
	            $this.parent().find('.active').removeClass('active');
	            $this.addClass('active');
	            // new this.childView[index]({el: '#accountInfo'});
	        }
	    },
	    initialize: function() {
	        this.childView = [];
	        this.$el.html($('#resourcesDemandList').html());
	        //new accountSourcesView({el: '#accountInfo'});
	    }
	});

	module.exports = demandView;

/***/ },

/***/ 206:
/***/ function(module, exports) {

	module.exports = "<div id=\"demandTabs\" class=\"topTab clearfix myApiTop\">\r\n    <span class=\"active\">发布的数据需求</span>\r\n    <span>发布的API需求</span>\r\n    <span>发布的服务需求</span>\r\n    <span>我的关注</span>\r\n    <span>我的接单</span>\r\n</div>\r\n<div id=\"demandInfo\"  class=\"tabDownCons\">\r\n\r\n</div>\r\n<script id=\"resourcesDemandList\" type=\"template\">\r\n    <div class=\"M-mainInfo clearfix bgWhite\" style=\"padding-top: 20px;\">\r\n        <div class=\"tab-title\" ><button><a class=\"corff\" href=\"../customized/citySdkTask.html\">发布数据需求</a></button></div>\r\n        <div class=\"M-downCons\">\r\n            <div class=\"D_table M-table\">\r\n                <table>\r\n                    <thead>\r\n                    <tr>\r\n                        <th width=\"8%\">需求名称</th>\r\n                        <th width=\"28%\">需求描述</th>\r\n                        <th width=\"8%\">发布日期</th>\r\n                        <th width=\"8%\">状态</th>\r\n                        <th width=\"8%\">反馈日期</th>\r\n                        <th width=\"16%\">操作</th>\r\n                    </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                    <tr>\r\n                        <td><a  href=\"../customized/dataInf.html\">失业人员信息</a></td>\r\n                        <td>数据包括身份证号码、姓名、性别、出生日期、户口性质、联系电话等信息</td>\r\n                        <td>2016.6.10</td>\r\n                        <td>预审驳回</td>\r\n                        <td>2016.6.10</td>\r\n                        <td><a class=\"edit\">修改</a>\r\n                            <a class=\"delete\">删除</a>\r\n                            <a class=\"closed\">关闭</a>\r\n                            <a class=\"remove\">下架</a>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td><a>老人优待证信息</a></td>\r\n                        <td>数据包含姓名、身份证号、老年人类别等相关数据信息</td>\r\n                        <td>2016.7.19</td>\r\n                        <td>预审中</td>\r\n                        <td>2016.6.10</td>\r\n                        <td><a class=\"edit\">修改</a>\r\n                            <a class=\"delete\">删除</a>\r\n                            <a class=\"closed\">关闭</a>\r\n                            <a class=\"remove\">下架</a>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td><a>著名商标企业信息</a></td>\r\n                        <td>数据包含企业名称、商标名称、认定年度</td>\r\n                        <td>2016.4.20</td>\r\n                        <td>处理中</td>\r\n                        <td>2016.4.20</td>\r\n                        <td><a class=\"edit\">修改</a>\r\n                            <a class=\"delete\">删除</a>\r\n                            <a class=\"closed\">关闭</a>\r\n                            <a class=\"remove\">下架</a>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td><a>审批项目信息</a></td>\r\n                        <td>数据包含项目名称、建设单位、项目建议书审批文号、可研审批文号、初步设计审批文号</td>\r\n                        <td>2016.6.18</td>\r\n                        <td>公开</td>\r\n                        <td>2016.6.18</td>\r\n                        <td>\r\n                            <a class=\"delete\">删除</a>\r\n                            <a class=\"closed\">关闭</a>\r\n                            <a class=\"remove\">下架</a>\r\n                        </td>\r\n                    </tr>\r\n\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</script>\r\n<script id=\"accountApply\" type=\"template\">\r\n\r\n</script>\r\n";

/***/ },

/***/ 207:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Kevin on 2016/12/6.
	 */

	var template = __webpack_require__(210);
	__webpack_require__(211);

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

/***/ 210:
/***/ function(module, exports) {

	module.exports = "<a href=\"#info\" class=\"myinfo\">用户中心</a>\r\n<ul>\r\n    <li>\r\n        <a href=\"#user\" <%= (name == 'userView' ? 'class=active' : '' ) %> >个人中心</a>\r\n        <!--\r\n        <a href=\"#account\" <%= (name == 'accountView' ? 'class=active' : '' ) %> >我的账户</a>\r\n        -->\r\n        <a href=\"#demand\" <%= (name == 'demandView' ? 'class=active' : '' ) %> >我的需求</a>\r\n        <a href=\"myData.html\">我的数据</a>\r\n        <a href=\"myAPI.html\">我的API</a>\r\n        <a href=\"myServer.html\">我的服务</a>\r\n        <a href=\"myOrder.html\">订单管理</a>\r\n        <a href=\"myPioneer.html\">创业园地</a>\r\n    </li>\r\n</ul>";

/***/ },

/***/ 211:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});