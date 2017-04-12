'use strict';

require('./password.css');
var template = require('html!./template.html');

var view = Backbone.View.extend({
    events: {
        'input .input-pwd': 'handleInputPwd',
        'keydown .tail-pwd-input': 'handleTailPwd'
    },
    tagName: 'div',
    className: 'pass-wrap',
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template(this.model));

        if(!this.model.title) {
            this.$('.tail-pwd').css('left', '250px');
            this.$('.pass-container').css('left', '0');
        }

        return this;
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
            $pwdInput.removeAttr('readonly').removeAttr('UNSELECTABLE');
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
            }
        }
    },
});

module.exports = view;