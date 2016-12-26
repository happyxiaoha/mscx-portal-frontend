/**
 * Created by Administrator on 2016/12/15.
 */

var registerTemplate = require('html!./register.html');
require('validate');
require('../../lib/additional-methods.js');

var getCaptchaModel = Backbone.Model.extend({   //获取图形验证码
    url: 'register/captcha.do?t=' + new Date().getTime()
});

var getSmsCaptchaModel = Backbone.Model.extend({   //获取短信验证码
    url: 'register/sms/send.do'
});

var checkAccountModel = Backbone.Model.extend({   //验证用户名
    url: 'ro/mscx-uc-api/unique/check/user/account/exist.do'
});

var registerModel = Backbone.Model.extend({   //登录
    url: 'register.do'
});

var registerView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    template: _.template(registerTemplate,{variable: 'data'}),
    events: {
        'click .captchaImg': 'refreshCaptcha',
        //'blur #captcha': 'checkCaptcha',
        'input input.registerInput' : 'changeAttribute',
        'click #getCode': 'sendMsgCode'
    },
    initialize: function() {
        this.model = new registerModel();
        this.checkAccountModel = new checkAccountModel();
        this.$el.html(this.template());
        this.render();
    },
    render: function () {
        $('#registForm').validate(this.registerValidateConfig());
    },
    register: function(){
        var that = this,
            agreement = $('#agreement').is(':checked');
        if(agreement){
            that.model.save({},{
                type: 'POST',
                success: function (res) {
                      res = res.toJSON();
                     if(res.message == 'success'){
                         layer.confirm('注册成功', {
                             btn: ['去登陆','去首页'] //按钮
                         }, function(){
                             window.open('login.html','_self');
                         }, function(){
                             window.open('index.html','_self');
                         });
                     }
                },
                error: function () {
                    that.refreshCaptcha();
                }
            });
        }
        else {
            layer.alert('请确认协议！');
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
                    maxlength: 20,
                    remote: {
                        url: 'ro/mscx-uc-api/unique/check/user/account/exist.do',
                        flag: true   //由于用户名存在返回的是true，给个标记方便validate操作
                    }
                },
                password:{
                    required: true,
                    password: true,
                    minlength: 6,
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
                },
                agreement: {
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
                    minlength: "密码最少为6位",
                    maxlength: "密码最多20个字符"
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
                    required: '请点击确认协议'
                }
            },
            submitHandler: function () {
                that.register()
            }
        }
    },
    validateAccount:　function (){
        var account = $('#account').val(),
            flag = true;
        this.checkAccountModel.fetch({
            data:{
              account: account
            },
            success: function(res){
                res = res.toJSON();
                if(res.result){
                    $('#account').addClass('error');
                    $('#account').after('<label id="account-error" class="error" for="account">该用户名已被注册</label>');
                    return false;
                }else
                return true
            }
        });
    },
    sendMsgCode: function (e) {
        var submitForm = $("#registForm");
        var check = submitForm.validate().element($("#account"))
                && submitForm.validate().element($("#password"))
                && submitForm.validate().element($("#passwordConfirm"))
                && submitForm.validate().element($("#mobile"))
                && submitForm.validate().element($("#captcha")),
            $target = $(e.target),
            that = this;

        if( check && that.validateAccount() ){
            debugger;
            new getSmsCaptchaModel().fetch({
                data: {
                    mobile: $('#mobile').val(),
                    captcha: $('#captcha').val()
                },
                success: function (res) {
                    res = res.toJSON().message;
                    if(res == 'success'){
                        layer.msg('验证码发送成功');
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