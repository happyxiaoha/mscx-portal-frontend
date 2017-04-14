'use strict';

var commonTemplate = require('html!./common.html');
var template = require('html!./setPayPassword.html');
var passwordView = require('passwordWidget/passwordView.js');

require('./account.css');
require('validate');
require('util');
require('customValidate');

var setPayPasswordModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'createPaypwd.do'
});
var editPayPasswordModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'changePwd.do'
});
var getSmsCaptchaModel = Backbone.Model.extend({   //获取短信验证码
    url: 'forget/payPwd/sms/send.do'
});
var forgetPasswordModel = Backbone.Model.extend({   //重置密码
    url: 'forget/payPwd.do'
});

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: _.template(template, {variable: 'data'}),
    events: {
        'click .R-titTab span': 'toggleTab'
    },
    initialize: function() {
        _.extend(this, this.model);

        this.$el.html(this.commonTemplate({
            name: this.id,
            hasAccount: this.hasAccount
        }));

        this.childView = this.hasAccount ? {
            setPayPassword: editView,
            forgetPayPassword: forgetView
        } : {
            setPayPassword: setView
        };

        this.$('#userInfoArea').html(this.template({
            hasAccount: this.hasAccount,
            id: this.id
        }));

        new this.childView[this.id]({
            el: '.pass-area'
        });

        return this;
    },
    toggleTab: function(event) {
        var $target = this.$(event.currentTarget);

        if($target.hasClass('active')) {
            return;
        }

        $target.parent().find('.active').removeClass('active');
        $target.addClass('active');

        new this.childView[$target.data('id')]({
            el: '.pass-area'
        });
    }
});
var setView = Backbone.View.extend({
    initialize: function() {
        this.templete = _.template($('#setPassword').html());

        this.$el.html(this.templete());

        this.model = new setPayPasswordModel();
        this.$form = this.$('#passForm');
        this.$passContent = this.$('#passContent');

        // 加密码框view到form中
        this.$passContent.append(new passwordView({
            model: {
                title: '设置六位密码',
                name: 'password'
            }
        }).$el);
        this.$passContent.append(new passwordView({
            model: {
                title: '确认密码',
                name: 'confirmPassword'
            }
        }).$el);

        this.$form.validate(this.validateConfig());

        this.listenTo(this.model, 'sync', this.handleSubmit);
    },
    validateConfig: function () {
        var me = this;
        return {
            groups: {
                passwordGroup: "password passwordTail",
                confirmPasswordGroup: 'confirmPassword confirmPasswordTail'
            },
            rules: {
                password: {
                    required: true,
                    digits: true,
                    password: false
                },
                passwordTail: {
                    required: true,
                    digits: true,
                    password: false
                },
                confirmPassword: {
                    required: true,
                    password: false,
                    equalTo: '#password'
                },
                confirmPasswordTail: {
                    required: true,
                    password: false,
                    equalTo: '#passwordTail'
                }
            },
            submitHandler: function () {
                me.submitForm();
            }
        }
    },
    submitForm: function () {
        var params = this.$form.serializeObject();

        this.model.fetch({
            data: {
                payPwd: params.password + params.passwordTail
            }
        });
    },
    handleSubmit: function() {
        var model = this.model.toJSON();
        layer.msg(model.result);
        setTimeout(function () {
            location.href = 'userInfo.html';
        },2000);
    }
})
var editView = Backbone.View.extend({
    initialize: function() {
        this.templete = _.template($('#editPassword').html());

        this.$el.html(this.templete());

        this.model = new editPayPasswordModel();
        this.$form = this.$('#passForm');
        this.$passContent = this.$('#passContent');

        // 加密码框view到form中
        this.$passContent.append(new passwordView({
            model: {
                title: '请输入六位原始密码',
                name: 'oldPassword'
            }
        }).$el);
        this.$passContent.append(new passwordView({
            model: {
                title: '请输入新六位密码',
                name: 'newPassword'
            }
        }).$el);
        this.$passContent.append(new passwordView({
            model: {
                title: '请确认新六位密码',
                name: 'confirmNewPassword'
            }
        }).$el);

        this.$form.validate(this.validateConfig());

        this.listenTo(this.model, 'sync', this.handleSubmit);
    },
    validateConfig: function () {
        var me = this;
        return {
            groups: {
                oldPasswordGroup: "oldPassword oldPasswordTail",
                newPasswordGroup: "newPassword newPasswordTail",
                confirmNewPasswordGroup: 'confirmNewPassword confirmNewPasswordTail'
            },
            rules: {
                oldPassword: {
                    required: true,
                    digits: true,
                    password: false
                },
                oldPasswordTail: {
                    required: true,
                    digits: true,
                    password: false
                },
                newPassword: {
                    required: true,
                    digits: true,
                    password: false
                },
                newPasswordTail: {
                    required: true,
                    digits: true,
                    password: false
                },
                confirmNewPassword: {
                    required: true,
                    password: false,
                    equalTo: '#newPassword'
                },
                confirmNewPasswordTail: {
                    password: false,
                    equalTo: '#newPasswordTail'
                }
            },
            submitHandler: function () {
                me.submitForm();
            }
        }
    },
    submitForm: function () {
        var params = this.$form.serializeObject();

        // if(!params.confirmNewPassword) {
        //     this.$('#confirmNewPassword-error').text('这是必填字段').show();
        //     return;
        // }

        this.model.fetch({
            data: {
                oldPwd: params.oldPassword + params.oldPasswordTail,
                newPwd: params.newPassword + params.newPasswordTail
            }
        });
    },
    handleSubmit: function() {
        var model = this.model.toJSON();
        layer.msg(model.result);
        setTimeout(function () {
            location.href = 'userInfo.html';
        },2000);
    }
});
var forgetView = Backbone.View.extend({
    events: {
        'click .captchaImg': 'refreshCaptcha',
        'click #getCode': 'sendMsgCode'
    },
    initialize: function() {
        this.templete = _.template($('#forgetPassword').html(), {variable: 'data'});

        this.$el.html(this.templete());

        this.getSmsCaptchaModel = new getSmsCaptchaModel();
        this.model = new forgetPasswordModel();

        this.$form = this.$('#passForm');
        this.$passContent = this.$('#passContent');
        this.$('#mobile').val(mscxPage.userInfo.mobile);
        this.refreshCaptcha();

        // 加密码框view到form中
        this.$passContent.append(new passwordView({
            model: {
                title: '请输入新六位密码',
                name: 'newPassword'
            }
        }).$el);
        this.$passContent.append(new passwordView({
            model: {
                title: '请确认新六位密码',
                name: 'newConfirmPassword'
            }
        }).$el);

        this.$form.validate(this.validateConfig());

        this.listenTo(this.model, 'sync', this.handleSubmit);
    },
    refreshCaptcha: function() {
        this.$('.captchaImg').attr('src', 'forget/payPwd/captcha.do?t=' + new Date().getTime());
    },
    validateConfig: function () {
        var me = this;
        return {
            groups: {
                newPasswordGroup: "newPassword newPasswordTail",
                newConfirmPasswordGroup: 'newConfirmPassword newConfirmPasswordTail'
            },
            rules: {
                newPassword: {
                    digits: true,
                    required: true,
                    password: false
                },
                newPasswordTail: {
                    required: true,
                    digits: true,
                    password: false
                },
                newConfirmPassword: {
                    required: true,
                    password: false,
                    equalTo: '#newPassword'
                },
                newConfirmPasswordTail: {
                    password: false,
                    equalTo: '#newPasswordTail'
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
            submitHandler: function () {
                me.submitForm();
            }
        }
    },
    submitForm: function () {
        var params = this.$form.serializeObject();

        this.model.set({
            password: params.newPassword + params.newPasswordTail,
            passwordConfirm: params.newConfirmPassword + params.newConfirmPasswordTail,
            authCode: params.authCode
        });
        this.model.save();
    },
    handleSubmit: function() {
        var model = this.model.toJSON();
        if(model.status == 'OK') {
            layer.msg('重置支付密码成功！');
        }else {
            layer.msg('重置支付密码失败！');
        }

        var callbackUrl = location.search.replace('?callback=','');
        setTimeout(function () {
            location.href = callbackUrl ? callbackUrl : 'userInfo.html';
        },2000);
    },
    sendMsgCode: function (e) {
        var check = this.$form.validate().element($("#mobile"))
                && this.$form.validate().element($("#captcha")),
            $target = $(e.target),
            that = this;

        if(check){
            new getSmsCaptchaModel().fetch({
                data: {
                    captcha: $('#captcha').val()
                },
                success: function (res) {
                    res = res.toJSON().message;
                    if(res == 'success'){
                        layer.msg('验证码发送成功');
                        $('#authCode').removeAttr('readonly').val('');
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
})
module.exports = accountView;