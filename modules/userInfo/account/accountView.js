'use strict';

var commonTemplate = require('html!./common.html');
var template = require('html!./accountPay.html');

var accountInfoModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getAccountInfo.do'
});

require('./account.css');

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.commonTemplate({
            name: 'account'
        }));

        this.accountInfoModel = new accountInfoModel();

        this.listenTo(this.accountInfoModel, 'sync', this.render);

        this.accountInfoModel.fetch();
        this.$('#userInfoArea').html(this.template());
    },
    render: function() {
        debugger;
        this.$('#userInfoArea').html(this.template());
    }
});
module.exports = accountView;