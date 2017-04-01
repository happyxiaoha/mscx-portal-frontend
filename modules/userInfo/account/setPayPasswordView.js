'use strict';

var commonTemplate = require('html!./common.html');
var template = require('html!./setPayPassword.html');

require('./account.css');

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: _.template(template, {variable: 'data'}),
    events: {
        'input .input-pwd': 'handleInputPwd'
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

        return this;
    },
    render: function() {
        
    },
    handleInputPwd: function(event) {
        var $target = this.$(event.currentTarget);
        console.log($target.val());
        if($target.val().length === 6) {
            $target.attr('readonly', 'readonly').blur();
            // this.$el.focus();
        }
    }
});
module.exports = accountView;