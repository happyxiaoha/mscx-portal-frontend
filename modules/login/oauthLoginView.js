/**
 * Created by Administrator on 2016/12/15.
 */
'use strict';
var loginTemplate = require('html!./oauthLogin.html');
var changePwdView = require('./changePwdView.js');
require('validate');
require('customValidate');

var getCaptchaModel = Backbone.Model.extend({   //获取图形验证码
    url: 'oauth/captcha.do?t=' + new Date().getTime()
});

var getSmsCaptchaModel = Backbone.Model.extend({   //获取短信验证码
    url: 'oauth/sms/send.do'
});

var checkCaptchaModel = Backbone.Model.extend({   //图形验证码验证
    url: 'oauth/captcha/check.do'
});

var loginModel = Backbone.Model.extend({   //登录
    url: 'oauth/oauthLogin.do'
});

var loginView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    template: _.template(loginTemplate, {variable: 'data'}),
    events: {
        'click #getCode': 'sendMsgCode',
        'click .captchaImg': 'refreshCaptcha'
    },
    initialize: function() {
        this.loginModel = new loginModel();
        this.$el.html(this.template(this.model));
        this.render();
    },
    render: function () {
        this.refreshCaptcha();
        $('#loginform').validate(this.loginValidateConfig());
    },
    login: function(){
        var that = this,
            authCode = $('#authCode').val();

        that.loginModel.fetch({
            data: {
                accessToken: this.model.accessToken,
                authCode: authCode
            },
            success: function (res) {
                  res = res.toJSON();
                if(res.status == 'OK'){
                    var nHref = location.search.replace('?service=','');
                    if(nHref){
                        window.open( decodeURIComponent(nHref),'_self');
                    }
                    else{
                        window.open('index.html','_self');
                    }

                }
            },
            error: function () {
                that.refreshCaptcha();
            }
        });
    },
    sendMsgCode: function (e) {
        var submitForm = this.$('#loginform');
        var check = submitForm.validate().element($('#mobile'))
                    && submitForm.validate().element($('#captcha')),
            $target = $(e.target),
            that = this;
        if(check){
            new getSmsCaptchaModel().fetch({
                data: {
                    accessToken: this.model.accessToken,
                    captcha: $('#captcha').val()
                },
                success: function (res) {
                    res = res.toJSON().message;
                    if(res == 'success'){
                        layer.msg('验证码发送成功!');
                        $('#authCode').removeAttr('readonly').val('');
                        $target.attr('disabled','disabled');
                        $target.html('<b id="jumpTime">60</b>秒后可重新发送');
                        that.subtraction($target, 60);
                    }
                },
                error: function () {
                    that.refreshCaptcha();
                }
            })
        }
    },
    refreshCaptcha: function () {
        $('.captchaImg').attr('src','/oauth/captcha.do?t='+ new Date().getTime());
    },
    loginValidateConfig: function () {
        var that = this;
        return {
            rules: {
                mobile:{
                    required: true,
                    telephone: true
                },
                authCode: {
                    required: true
                },
                captcha: {
                    required: true,
                    minlength: 4,
                    maxlength: 4
                }
            },
            messages: {
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
                }
            },
            submitHandler: function () {
                that.login()
            }
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

module.exports = loginView;