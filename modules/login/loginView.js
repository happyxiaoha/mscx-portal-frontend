/**
 * Created by Administrator on 2016/12/15.
 */
'use strict';
var loginTemplate = require('html!./login.html');
var changePwdView = require('./changePwdView.js');
require('validate');

var getCaptchaModel = Backbone.Model.extend({   //获取图形验证码
    url: mscxPage.host+'/login/captcha.do?t=' + new Date().getTime()
});

var checkCaptchaModel = Backbone.Model.extend({   //图形验证码验证
    url: mscxPage.host+'/login/captcha/check.do'
});

var loginModel = Backbone.Model.extend({   //登录
    url: mscxPage.host+'/login.do'
});

var loginView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    template: _.template(loginTemplate,{variable: 'data'}),
    events: {
        'click .captchaImg': 'refreshCaptcha',
        'input .loginTable input' : 'changeAttribute',
        'click #forgetPwd': 'forgetPwd'
    },
    initialize: function() {
        this.model = new loginModel();
        this.$el.html(this.template());
        this.render();
        //$('#loginOrRegister').html('注册');
    },
    render: function () {
        $('#loginform').validate(this.loginValidateConfig());
    },
    login: function(){
        var that = this;
        that.model.save({},{
            type: 'POST',
            success: function (res) {
                  res = res.toJSON();
                if(res.status == 'OK'){
                    window.open('index.html','_self');
                }
                else if(res.status  == 'ERROR') {
                    if (layer) {
                        layer.alert(res.message, {icon: 2});
                    }
                    that.refreshCaptcha();
                }
            }
        });
    },
    changeAttribute: function (e) {
       this.model.set(e.target.id,e.target.value);
        return false;
    },
    refreshCaptcha: function () {
        $('.captchaImg').attr('src','/login/captcha.do?t='+ new Date().getTime());
    },
    loginValidateConfig: function () {
        var that = this;
        return {
            rules: {
                loginName:{
                    required: true,
                    minlength: 2
                },
                password:{
                    required: true,
                    minlength: 6
                },
                captcha: {
                    required: true,
                    remote: {
                        url: '/login/captcha/check.do',
                        data: {
                            captcha: function () {
                                return $("#captcha").val();
                            }
                        }
                    }
                }
            },
            messages: {
                loginName:{
                    required: "请输入用户名",
                    minlength: "用户名最少两个字符"
                },
                password:{
                    required: "请输入密码",
                    minlength: "密码最少为6位"
                },
                captcha: {
                    required: "请输入验证码",
                    remote: "验证码错误"
                }
            },
            submitHandler: function () {
                that.login()
            }
        }
    },
    forgetPwd: function () {
        var dialog= layer.open({
            type: 1,
            btn: [],
            title: '重置密码',
            shade: 0.6,
            shadeClose: false,
            area: ['520px', '450px'],
            content: $('#changePwd'), //捕获的元素
            success: function(index) {
               new changePwdView(index);
            }
        })
    }
});

module.exports = loginView;