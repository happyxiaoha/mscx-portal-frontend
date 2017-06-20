'use strict';

var template = require('./selectPayTemplate.html');
var weixinPayView = require('./weixinPayView.js');
var orderModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/getOrderDetail.do'
})
// 获取账户余额
var accountInfoModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getAccountInfo.do'
});

var PayResource = {
    host: mscxPage.host + '/ro/mscx-order-api/order/payOrder.do',
    channels: {
        alipay: 'ALI_WEB',
        weixin: 'WX_NATIVE',
        account: 'ACCOUNT_PAY'
    }
}

var view = Backbone.View.extend({
    el: mscxPage.domEl.payEl,
    events: {
        'click #payBtn': 'submitPay',
        'click .pay-type input[type="radio"]': 'selectPayWay'
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.addClass('pay-wrapper mt20 clearfix');

        var orderInfo = window.localStorage.getItem('orderInfo');
        var base = new Base64;
        var me = this;

        this.orderInfo = orderInfo && JSON.parse(base.decode(orderInfo)) || {};

        this.orderModel = new orderModel();
        this.accountInfoModel = new accountInfoModel();
        // this.listenTo(this.orderModel, 'sync', this.render);

        this.on('render', this.render);

        var queue = [this.orderModel.fetch({
            data: {
                orderNum: this.orderInfo.orderNum
            }
        }), this.accountInfoModel.fetch()];

        $.when.apply($, queue).done(function() {
            this.trigger('render');
        }.bind(this));
    },
    render: function() {
        var orderModel = this.orderModel.toJSON();
        var accountInfoModel = this.accountInfoModel.toJSON();

        // 总价
        this.orderAmount = orderModel.orderCash;
        // 账户余额
        this.accountBalance = accountInfoModel.result.account_balance;
        // 账户余额支付金额
        this.payBalance = 0;

        this.$el.html(this.template({
            order: orderModel,
            account: accountInfoModel.result
        }));

        this.$payBtn = this.$('#payBtn');
        this.$totalPoint = this.$('.point-serve');
        this.$actualAmount = this.$('#actualAmount');

    },
    submitPay: function() {
        // 支付按钮
        var type = this.$('.pay-type').find('input[type="radio"]:checked').val();    
        var me = this;

        var payBalance = this.payBalance;

        this.orderInfo = _.extend(this.orderInfo, {
            channel: PayResource.channels[type],
            title: '神州数云',
            payBalance: payBalance
        });
        /* 
         * 如果是支付宝，页面跳转
         * 如果是微信支付，ajax获取url生成二维码
         */
        var payUrl = PayResource.host + '?' + $.param(this.orderInfo);
        switch(type) {
            case 'alipay':
                // location.href = payUrl + '&showUrl=' + mscxPage.host + 'pay.html#result/' + me.orderInfo.orderNum;
                location.href = payUrl + '&returnUrl=' + mscxPage.payReturnHost + 'pay-result.html';
                break;
            case 'weixin':
                $.get(payUrl, function(res) {
                    location.href = 'pay.html#weixin/' + encodeURIComponent(res.result) + '/' + me.orderInfo.orderNum;
                })
                break;
            case 'account':
                location.href = payUrl + '&payAccountUrl=' + encodeURIComponent(mscxPage.payReturnHost + 'pay-account.html')
                    + '&returnUrl=' + encodeURIComponent(mscxPage.payReturnHost + 'pay-result.html');
                break;
            default:
                break;
        }
    },
    selectPayWay: function(event) {
        var $target = this.$(event.currentTarget);

        // 如果选择了账户支付
        if($target.val() == 'account') {
            this.payBalance = +this.orderAmount;
        }else {
            this.payBalance = 0;
        }
    },
});

module.exports = view;