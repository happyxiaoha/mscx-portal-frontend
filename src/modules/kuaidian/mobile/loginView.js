/**
 * ================================================
 * 作    者：Hope Chen
 * 版    本：1.0
 * 创建日期：2017/11/14 11:41
 * 描    述：
 * 修订历史：
 * ================================================
 */
var mLoginTemplate = require('./login.html');
require('validate');
require('customValidate');

var loginModel = Backbone.Model.extend({   //登录
    url: '/login.do'
});

var mLoginView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    template: _.template(mLoginTemplate, {variable: 'data'}),
    events: {
        'click .captchaImg': 'refreshCaptcha'
    },
    initialize: function () {
        var whdef = 100 / 375;// 表示1920的设计图,使用100PX的默认值
        var wH = window.innerHeight;// 当前窗口的高度
        var wW = window.innerWidth;// 当前窗口的宽度
        var rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
        $('html').css('font-size', rem + "px");

        this.model = new loginModel();
        this.$el.html(this.template());
        this.render();

        var fromUrl = location.search && location.search.split('?')[1] && location.search.split('?')[1].split('=')[1];

        if (fromUrl) {
            window.localStorage.setItem('GYFromUrl', fromUrl);
        } else {
            window.localStorage.removeItem('GYFromUrl');
        }
    },
    render: function () {
        this.refreshCaptcha();
        $('#loginForm').validate(this.loginValidateConfig());
    },
    refreshCaptcha: function () {
        $('.captchaImg').attr('src','/login/captcha.do?t='+ new Date().getTime());
    },
    login: function () {
        var that = this,
            account = $('#loginName').val(),
            password = $('#password').val(),
            captcha = $('#captcha').val();

        that.model.save({
            loginName: account,
            password: password,
            captcha: captcha
        }, {
            success: function (res) {
                res = res.toJSON();
                if (res.status === 'OK') {
                    var fromUrl = window.localStorage.getItem('GYFromUrl');
                    if (fromUrl) {
                        window.open(decodeURIComponent(fromUrl), '_self');
                    }
                    else {
                        window.open('index.html', '_self');
                    }

                }
            },
            error: function () {
                // that.refreshCaptcha();
            }
        });
    },
    loginValidateConfig: function () {
        var that = this;
        return {
            rules: {
                loginName:{
                    required: true,
                    minlength: 6,
                    maxlength: 20
                },
                password:{
                    required: true
                },
                captcha: {
                    required: true,
                    minlength: 4,
                    maxlength: 4
                }
            },
            messages: {
                loginName:{
                    required: "请输入用户名",
                    minlength: "用户名最少6个字符",
                    maxlength: "用户名最多20个字符"
                },
                password:{
                    required: "请输入密码"
                },
                captcha: {
                    required: "请输入验证码",
                    minlength: "验证码为四位",
                    maxlength: "验证码为四位"
                }
            },
            submitHandler: function () {
                that.login()
            }
        }
    }
});

module.exports = mLoginView;