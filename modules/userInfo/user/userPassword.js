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
                    equalTo: '#password'
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
            }
        });
    },
    changeAttribute: function (e) {
        this.model.set(e.target.id,e.target.value);
        return false;
    },
    initialize: function() {
        this.$el.html(_.template(commonTemplate)({name:'userPassword'}));
        this.$el.find('#userInfoArea').html(template);
        this.model = new userPasswordManagerModel();
        $('#userPasswordForm').validate(this.validateConfig());
    }
});
module.exports = userPasswordView;