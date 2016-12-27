/**
 * Created by Administrator on 2016/12/16.
 */

'use strict';
var changePwdTemplate = require('html!./changePwd.html');
require('validate');
require('../../lib/additional-methods.js');

var getCaptchaModel = Backbone.Model.extend({   //获取图形验证码
    url: 'forget/password/captcha.do?t=' + new Date().getTime()
});

var getSmsCaptchaModel = Backbone.Model.extend({   //获取短信验证码
    url: 'forget/password/sms/send.do'
});

var checkCaptchaModel = Backbone.Model.extend({   //图形验证码验证
    url: 'forget/password/captcha/check.do'
});

var resetPwdModel = Backbone.Model.extend({   //重置密码
    url: 'forget/password.do'
});


var changePwdView = Backbone.View.extend({
    el: '#changePwd',
    template: _.template(changePwdTemplate),
    events: {
        'input input.changeInput' : 'changeAttribute',
        'click #getCode': 'sendMsgCode',
        'click .captchaImgChange': 'refreshCaptcha'
    },
    initialize: function () {
        this.model = new resetPwdModel();
        this.$el.html(this.template());
        this.render();
    },
    render: function () {
        $('#changePwdForm').validate(this.changePwdValidateConfig());
    },
    changePwd: function() {
        var that = this;
        that.model.save({},{
            type: 'POST',
            success: function (res) {
                res = res.toJSON();
                if(res.status == 'OK'){
                    layer.msg('密码修改成功,即将跳转登录页');
                    setTimeout(function(){ window.open('login.html','_self');},4000)

                }
            },
            error: function () {
                that.refreshCaptcha();
            }
        });
    },
    changeAttribute: function (e) {
        this.model.set(e.target.id,e.target.value);
        return false;
    },
    refreshCaptcha: function () {
        $('.captchaImgChange').attr('src','/forget/password/captcha.do?t='+ new Date().getTime());
    },
    sendMsgCode: function (e) {
        var submitForm = $('#changePwdForm');
        var check = submitForm.validate().element($('#mobile'))
                    && submitForm.validate().element($('#captchaForChange')),
            $target = $(e.target),
            that = this;
        if(check){
            new getSmsCaptchaModel().fetch({
                data: {
                    mobile: $('#mobile').val(),
                    captcha: $('#captchaForChange').val()
                },
                success: function (res) {
                    res = res.toJSON().message;
                    if(res == 'success'){
                        layer.msg('验证码发送成功!');
                        $('#authCode').val('');
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
    changePwdValidateConfig: function () {
        var that = this;
        return {
            rules: {
                mobile: {
                    required: true,
                    telephone: true
                },
                captchaForChange: {
                    required: true,
                    minlength: 4,
                    maxlength: 4
                   /*
                    remote: {
                        url: '/forget/password/captcha/check.do',
                        data: {
                            captcha: function () {
                                return $("#captchaForChange").val();
                            }
                        }
                    }*/
                },
                authCode: {
                    required: true
                },
                password:{
                    required: true,
                    password: true,
                    minlength: 6,
                    maxlength: 20
                },
                passwordConfirm: {
                    required: true,
                    equalTo: '.newPwd'
                }
            },
            messages: {
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
                captchaForChange: {
                    required: "请输入验证码",
                    minlength: "验证码为四位",
                    maxlength: "验证码为四位"
                },
                authCode: {
                    required: "请输入手机验证码"
                }
            },
            submitHandler: function () {
                that.changePwd()
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
module.exports = changePwdView;