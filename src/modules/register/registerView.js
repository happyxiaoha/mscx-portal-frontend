/**
 * Created by Administrator on 2016/12/15.
 */

var registerTemplate = require('./register.html');
require('validate');
require('customValidate');

var getCaptchaModel = Backbone.Model.extend({   //获取图形验证码
    url: 'register/captcha.do?t=' + new Date().getTime()
});

var getSmsCaptchaModel = Backbone.Model.extend({   //获取短信验证码
    url: 'register/sms/send.do'
});

var checkAccountModel = Backbone.Model.extend({   //验证用户名
    url: mscxPage.request.uc + 'unique/check/user/account/exist.do'
});

var checkMobileModel = Backbone.Model.extend({   //验证手机号
    url: mscxPage.request.uc + 'unique/check/user/mobile/exist.do'
});

var registerModel = Backbone.Model.extend({   //登录
    url: 'register.do'
});

var registerView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    template: _.template(registerTemplate,{variable: 'data'}),
    events: {
        'click .captchaImg': 'refreshCaptcha',
        'change #account': 'validateAccount',
        'change #mobile': 'validateMobile',
        //'change input.registerInput' : 'changeAttribute',
        'click #getCode': 'sendMsgCode'
    },
    initialize: function() {
        this.model = new registerModel();
        this.checkAccountModel = new checkAccountModel();
        this.checkMobileModel = new checkMobileModel;
        this.$el.html(this.template());
        this.render();
    },
    render: function () {
        this.refreshCaptcha();
        this.$registForm = this.$('#registForm');
        this.$registForm.validate(this.registerValidateConfig());
    },
    register: function(){
        var that = this,
            agreement = $('#agreement').is(':checked');
        if(!that.flag){
            $('#account-error').html('该用户名已被注册').show();
            return
        }
        var account = $('#account').val(),
            password = $('#password').val(),
            passwordConfirm = $('#passwordConfirm').val(),
            mobile = $('#mobile').val(),
            authCode = $('#authCode').val();

        if(agreement){
            that.model.save({
                account: account,
                password: password,
                passwordConfirm: passwordConfirm,
                mobile: mobile,
                authCode: authCode
            },{
                type: 'POST',
                success: function (res) {
                      res = res.toJSON();
                     if(res.message == 'success'){
                        layer.msg('注册成功');
                        setTimeout(function() {
                            location.href = '/index.html';
                        }, 1000);
                     }
                },
                error: function () {
                    that.refreshCaptcha();
                }
            });
        }
        else {
            layer.alert('请阅读并勾选协议！');
        }
    },
    changeAttribute: function (e) {
       this.model.set(e.target.id,e.target.value);
        return false;
    },
    refreshCaptcha: function () {
        $('.captchaImg').attr('src','/register/captcha.do?t='+ new Date().getTime());
    },
    registerValidateConfig: function () {
        var that = this;
        return {
            rules: {
                account:{
                    required: true,
                    letterStart: true,
                    account: true,
                    minlength: 6,
                    maxlength: 20
                },
                password:{
                    required: true,
                    password: true,
                    minlength: 8,
                    maxlength: 20
                },
                passwordConfirm: {
                    required: true,
                    equalTo: '#password'
                },
                mobile: {
                    required: true,
                    telephone: true
                },
                captcha: {
                    required: true,
                    minlength: 4,
                    maxlength: 4
                },
                authCode: {
                    required: true
                }
            },
            messages: {
                account:{
                    required: "请输入用户名",
                    minlength: "用户名最少6个字符",
                    maxlength: "用户名最多20个字符",
                    letterStart: '用户名必须以字母开头',
                    account: '用户名只能包含数字字母下划线',
                    remote: '用户名已注册'
                },
                password:{
                    required: "请输入密码",
                    password: '密码只能包含数字字母下划线中划线,长度为8-20位'
                },
                passwordConfirm: {
                    required: "请确认密码",
                    equalTo: "两次输入的密码不一致"
                },
                mobile: {
                    required: "请输入手机号码",
                    telephone: "请输入正确的手机号码"
                },
                captcha: {
                    required: "请输入验证码",
                    minlength: "验证码为四位",
                    maxlength: "验证码为四位"
                },
                authCode: {
                    required: "请输入手机验证码"
                },
                agreement: {
                    required: '请阅读并勾选协议！'
                }
            },
            submitHandler: function () {
                that.register()
            },
            ignore: '.ignore'
        }
    },
    validateAccount:　function (){
        var account = $('#account').val(),
            test = /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/,
            that = this;
        that.flag = true;
        $('#account').removeClass('ignore');
        if(!test.test(account)){
            return
        }
        this.checkAccountModel.fetch({
            data:{
              account: account
            },
            success: function(res){
                res = res.toJSON();
                if(res.result){
                    $('#account').addClass('error').addClass('ignore');
                    if($('#account-error').length == 0){
                        $('#account').after('<label id="account-error" class="error" for="account">该用户名已被注册</label>');
                    }
                    else {
                        $('#account-error').html('该用户名已被注册').show();
                    }
                    that.flag = false;
                }
            }
        });
    },
    validateMobile:　function (){
        var mobile = $('#mobile').val();
        var that = this;
        $('#mobile').removeClass('ignore');
        var check = this.$registForm.validate().element($('#mobile'));
        this.flag = this.flag || true;

        if(!check){
            return
        }
        this.checkMobileModel.fetch({
            data:{
              mobile: mobile
            },
            success: function(res){
                res = res.toJSON();
                if(res.result){
                    $('#mobile').addClass('error').addClass('ignore');
                    if($('#mobile-error').length == 0){
                        $('#mobile').after('<label id="mobile-error" class="error" for="mobile">该手机号已被使用</label>');
                    }
                    else {
                        $('#mobile-error').html('该手机号已被使用').show();
                    }
                    that.flag = false;
                }
            }
        });
    },
    sendMsgCode: function (e) {
        var submitForm = $("#registForm");
        if(!submitForm.validate().element($("#account")) || !submitForm.validate().element($("#mobile"))){
            return
        }
        if(!this.flag){
            // $('#account-error').html('该用户名已被注册').show();
            return
        }
        var check = submitForm.validate().element($("#password"))
                && submitForm.validate().element($("#passwordConfirm"))
                && submitForm.validate().element($("#mobile"))
                && submitForm.validate().element($("#captcha")),
            $target = $(e.target),
            that = this;

        if( that.flag && check ){
            new getSmsCaptchaModel().fetch({
                data: {
                    mobile: $('#mobile').val(),
                    captcha: $('#captcha').val()
                },
                success: function (res) {
                    res = res.toJSON().message;
                    if(res == 'success'){
                        layer.msg('验证码发送成功');
                        $('#authCode').removeAttr('readonly');
                        $('#authCode').val('');
                        $target.attr('disabled','disabled');
                        $target.html('<b id="jumpTime">60</b>秒后可重新发送');
                        that.subtraction($target, 60);
                    }
                },
                error: function (){
                    that.refreshCaptcha();
                }
            })
        }
    },
    subtraction: function(target ,time) {
        var $jumpTime = $("#jumpTime"),
            that = this;
        $jumpTime.html(time);
        time --;
        if (time == 0) {
            target.html('获取手机验证码');
            target.removeAttr("disabled");
        }
        else {
            setTimeout(function(){that.subtraction(target, time)}, 1000);
        }
    }
});

module.exports = registerView;