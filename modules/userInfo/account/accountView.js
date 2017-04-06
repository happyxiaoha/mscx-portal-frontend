'use strict';

var commonTemplate = require('html!./common.html');
var template = require('html!./accountPay.html');

var accountInfoModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getAccountInfo.do'
});

var paymentRecordView = require('./paymentRecordView.js');
var rechargeRecordView = require('./rechargeRecordView.js');
var setPayPasswordView = require('./setPayPasswordView.js');

require('./account.css');

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        // 获取账户余额信息，同时更重要的是校验账户是否存在
        this.accountInfoModel = new accountInfoModel();

        this.listenTo(this.accountInfoModel, 'sync', this.render);

        this.accountInfoModel.fetch();
        // 账户是否存在标识，默认不存在
        this.hasAccount = false;
    },
    render: function() {
        var accountInfo = this.accountInfoModel.toJSON();
        // 如果账户不存在，那么跳转支付密码设置页面。同时，账户充值/充值记录/支出记录tab标签隐藏
        if(accountInfo.result == 'noAccount') {
            this.id = 'setPayPassword';
            this.currentView = new setPayPasswordView({
                model: _.pick(this, ['id', 'hasAccount'])
            });
            this.$el.replaceWith(this.currentView.$el);
        }else {
            this.hasAccount = true;
            switch(this.id) {
                case 'recharge':
                    this.$el.html(this.commonTemplate({
                        name: this.id,
                        hasAccount: this.hasAccount
                    }));
                    this.$('#userInfoArea').html(this.template(accountInfo));
                    break;
                case 'setPayPassword':
                case 'forgetPayPassword':
                    this.currentView = new setPayPasswordView({
                        model: _.pick(this, ['id', 'hasAccount'])
                    });
                    this.$el.replaceWith(this.currentView.$el);
                    break;
                case 'rechargeRecord':
                    this.currentView = new rechargeRecordView({
                        model: _.pick(this, ['id', 'hasAccount'])
                    });
                    this.$el.replaceWith(this.currentView.$el);
                    break;
                case 'paymentRecord':
                    this.currentView = new paymentRecordView({
                        model: _.pick(this, ['id', 'hasAccount'])
                    });
                    this.$el.replaceWith(this.currentView.$el);
                    break;
            }
            
            // console.log(this.id);
            // this.hasAccount = true;
            // this.$el.html(this.commonTemplate({
            //     name: this.id,
            //     hasAccount: this.hasAccount
            // }));
            // this.$('#userInfoArea').html(this.template(accountInfo));
        }
        
    }
});
module.exports = accountView;