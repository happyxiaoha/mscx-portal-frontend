/**
 * Created by Kevin on 2016/12/6.
 */
var commonTemplate = require('html!./userCommon.html');
var template = require('html!./userPassword.html');
require('./user.css');
require('validate');

var userPasswordManagerModel = Backbone.Model.extend({
    url: mscxPage.request.uc + 'change/password.do'
});
var userInfoModel = Backbone.Model.extend({
    url: mscxPage.request.uc + 'user/info/mine.do'
});
var userPasswordView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
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
                    password: true,
                    equalTo: '#password'
                }
            },
            messages: {
                passwordConfirm:{
                    required: '确认密码不能为空',
                    equalTo: '新密码和确认密码不一致',
                    password: '密码只能包含数字字母下划线中划线'
                },
                password: {
                    required: '新密码不能为空',
                    password: '密码只能包含数字字母下划线中划线'
                },
                oldPassword: {
                    required: '旧密码不能为空',
                    password: '密码只能包含数字字母下划线中划线'
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
                layer.msg('修改密码成功!');
                setTimeout(function () {
                    location.href = '#info';
                },2000);
            }
        });
    },
    changeAttribute: function (e) {
        this.model.set(e.target.id,e.target.value);
        return false;
    },
    renderUserCommon: function (isDisplay) {
        this.$el.html(_.template(commonTemplate)({name:'userPassword',isDisplay:isDisplay}));
    },
    initialize: function() {
        var that = this;
        if(mscxPage.userInfo){
            var isDis = mscxPage.userInfo.userType == 'PARTNER_ORG' || mscxPage.userInfo.userType == 'PARTNER_GOV' ? true : false;
            this.renderUserCommon(isDis);
            callback();
        }
        else {
            new userInfoModel().fetch({
                success: function (model,res) {
                    var useType = res.result.userType;
                    var isDis = useType == '合作伙伴'? true : false;
                    that.renderUserCommon(isDis);
                    callback();
                }
            });
            callback();
        }
        function callback() {
            that.$el.find('#userInfoArea').html(template);
            that.model = new userPasswordManagerModel();
            $('#userPasswordForm').validate(that.validateConfig());
        }

    }
});
module.exports = userPasswordView;