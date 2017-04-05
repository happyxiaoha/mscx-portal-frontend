'use strict';

var commonTemplate = require('html!./common.html');
var template = require('html!./setPayPassword.html');

require('./account.css');
require('validate');
require('customValidate');

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: _.template(template, {variable: 'data'}),
    events: {
        'input .input-pwd': 'handleInputPwd',
        'keydown .tail-pwd-input': 'handleTailPwd',
        'click .btn-set': 'setPayPassword'
    },
    initialize: function() {
        _.extend(this, this.model);

        this.$el.html(this.commonTemplate({
            name: this.id,
            hasAccount: this.hasAccount
        }));

        this.$('#userInfoArea').html(this.template({
            hasAccount: this.hasAccount
        }));

        this.$form = this.$('#passForm');
        this.$form.validate(this.validateConfig());

        return this;
    },
    validateConfig: function () {
        var me = this;
        return {
            rules: {
                // setPassword: {
                //     // required: true,
                //     setPayPassword: true
                // },
                // confirmPassword: {
                //     required: true,
                //     equalTo: '#setPassword'
                // }
            },
            submitHandler: function () {
                me.submitForm();
            }
        }
    },
    submitForm: function () {
        var params = this.$form.serializeObject();

        this.model.set(params);
        this.model.save();
    },
    handleInputPwd: function(event) {
        var $target = this.$(event.currentTarget);
        var $tailPwdInput = $target.parents('.pass-wrap').find('.tail-pwd-input');
        if($target.val().length === 5) {
            $target.attr('readonly', 'readonly').attr('UNSELECTABLE', 'on').blur();
            $tailPwdInput.removeAttr('readonly').focus();  
        }
    },
    handleTailPwd: function(event){
        var $tailPwdInput = this.$(event.currentTarget);
        var $pwdInput = $tailPwdInput.parents('.pass-wrap').find('.input-pwd');
        // 删除键监听
        if(event.keyCode == '8') {
            if($tailPwdInput.val() == '') {
                $pwdInput.focus();
                // IE下移动光标到文本末尾
                if (document.selection) {
                    var selection = document.selection.createRange();  
                    selection.moveStart('character', -this.$pwdInput.val().length);
                    selection.move("character", 5);
                    selection.select();
                } 
                setTimeout(function() {
                    $tailPwdInput.attr('readonly', 'readonly').attr('UNSELECTABLE', 'on');
                }.bind(this));
            }else {
                $pwdInput.removeAttr('readonly').removeAttr('UNSELECTABLE');
            }
        }
    },
    setPayPassword: function() {

    }
});
module.exports = accountView;