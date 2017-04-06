'use strict';

var commonTemplate = require('html!./common.html');
// var template = require('html!./setPayPassword.html');

require('./account.css');

// var setPayPasswordModel = Backbone.Model.extend({
//     url: mscxPage.request.account + 'createPaypwd.do'
// });

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    // template: _.template(template, {variable: 'data'}),
    events: {

    },
    initialize: function() {
        _.extend(this, this.model);

        this.$el.html(this.commonTemplate({
            name: this.id,
            hasAccount: this.hasAccount
        }));

        // this.$('#userInfoArea').html(this.template({
        //     hasAccount: this.hasAccount
        // }));

        // this.model = new setPayPasswordModel();
        // this.$form = this.$('#passForm');
        // this.$form.validate(this.validateConfig());

        // this.listenTo(this.model, 'sync', this.handleSubmit);

        return this;
    }
});
module.exports = accountView;