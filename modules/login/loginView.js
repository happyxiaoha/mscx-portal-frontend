/**
 * Created by Administrator on 2016/12/15.
 */
'use strict';
var loginTemplate = require('html!./login.html');
var changePwdView = require('./changePwdView.js');
require('validate');
require('../../lib/additional-methods.js');

var getCaptchaModel = Backbone.Model.extend({   //获取图形验证码
    url: 'login/captcha.do?t=' + new Date().getTime()
});

var checkCaptchaModel = Backbone.Model.extend({   //图形验证码验证
    url: 'login/captcha/check.do'
});

var loginModel = Backbone.Model.extend({   //登录
    url: 'login.do'
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
    },
    render: function () {
        $('#loginform').validate(this.loginValidateConfig());
    },
    login: function(){
        var that = this;
        that.model.save({},{
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
                    letterStart: true,
                    account: true,
                    minlength: 6,
                    maxlength: 20
                },
                password:{
                    required: true,
                    password: true,
                    minlength: 6,
                    maxlength: 20
                },
                captcha: {
                    required: true,
                    minlength: 4,
                    maxlength: 4
                   /* remote: {
                        url: '/login/captcha/check.do',
                        data: {
                            captcha: function () {
                                return $("#captcha").val();
                            }
                        }
                    }*/
                }
            },
            messages: {
                loginName:{
                    required: "请输入用户名",
                    minlength: "用户名最少6个字符",
                    maxlength: "用户名最多20个字符",
                    letterStart: '用户名必须以字母开头',
                    account: '用户名只能包含数字字母下划线'
                },
                password:{
                    required: "请输入密码",
                    minlength: "密码最少为6位",
                    maxlength: "密码最多20个字符"
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