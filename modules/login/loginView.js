/**
 * Created by Administrator on 2016/12/15.
 */

var loginTemplate = require('html!./login.html');
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
        'blur #captcha': 'checkCaptcha',
        'input .loginTable input' : 'changeAttribute'
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
                   // mscxPage.appRouter.openPage('index.html');
                }
                else {

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
                    required: true
                }
            },
            submitHandler: function () {
                that.login()
            }
        }
    },
    checkCaptcha: function (e) {
        var captcha = e.target.value,
            that = this;
        new checkCaptchaModel().fetch({
            data: {
                captcha: captcha
            },
            success: function(res){
                res=res.toJSON();
                if(!res.result){
                    $(e.target).addClass('error');
                    $(e.target).after('<label id="captcha-error" class="error" for="captcha">验证码错误</label>');
                    that.refreshCaptcha();
                }
            }
        })
    }
});

module.exports = loginView;