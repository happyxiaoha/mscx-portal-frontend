'use strict';

var template = require('html!./selectPayTemplate.html');
var weixinPayView = require('./weixinPayView.js');
var orderModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/getOrderDetail.do'
})
// 获取账户余额
var accountInfoModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getAccountInfo.do'
});
var pointModel = Backbone.Model.extend({
    url: mscxPage.request.point + 'point/getRemainingPoint.do'
})
var pointDeductionModel = Backbone.Model.extend({
    url: mscxPage.request.point + 'point/getDeductionMoney.do'
})

require('./pay.css');
require('validate');
require('customValidate');

var PayResource = {
    host: mscxPage.host + '/ro/mscx-order-api/order/payOrder.do',
    channels: {
        alipay: 'ALI_WEB',
        weixin: 'WX_NATIVE',
        account: 'ACCOUNT_PAY',
        weixinPoint: 'WX_NATIVE_POINT_PAY',
        alipayPoint: 'ALI_WEB_POINT_PAY',
        accountPoint: 'ACCOUNT_PAY_POINT_PAY'
    }
}

var view = Backbone.View.extend({
    el: mscxPage.domEl.payEl,
    events: {
        'click #payBtn': 'submitPay',
        'click .point-title': 'showPointPay',
        'click .pay-type input[type="radio"]': 'selectPayWay',
        'input .input-point': 'handleInputPoint'
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
        this.pointModel = new pointModel();
        this.pointDeductionModel = new pointDeductionModel();

        this.on('render', this.render);

        var queue = [this.orderModel.fetch({
            data: {
                orderNum: this.orderInfo.orderNum
            }
        }), this.accountInfoModel.fetch(), this.pointModel.fetch()];

        $.when.apply($, queue).done(function() {
            this.trigger('render');
        }.bind(this));
    },
    render: function() {
        var orderModel = this.orderModel.toJSON();
        var accountInfoModel = this.accountInfoModel.toJSON();
        var pointModel = this.pointModel.toJSON();

        // 总价
        this.orderAmount = orderModel.orderCash;
        // 账户余额
        this.accountBalance = accountInfoModel.result.account_balance;

        // 混合价格Model
        this.priceModel = new Backbone.Model({
            // 积分抵用
            pointAmount: 0,
            // 账户余额支付
            accountAmount: 0
        });

        this.listenTo(this.priceModel, 'change', this.renderPrice);

        this.$el.html(this.template({
            order: orderModel,
            account: accountInfoModel.result,
            point: pointModel.result
        }));

        this.$payBtn = this.$('#payBtn');
        this.$pointError = this.$('#pointError');
        this.$pointForm = this.$('#pointForm');
        this.$serveAmount = this.$('#serveAmount');

        this.$pointForm.validate({
            rules: {
                point: {
                    number: true,
                    required: true,
                    tenMultiple: true,
                    min: 0,
                    max: Math.floor(+pointModel.result.remainingPoint/10) * 10
                }
            }
        });
    },
    submitPay: function() {

        if(!this.submitFlag) {
            return;
        }

        // 支付按钮
        var type = this.$('.pay-type').find('input[type="radio"]:checked').val();    
        var me = this;

        this.orderInfo = _.extend(this.orderInfo, {
            channel: PayResource.channels[type],
            title: '广州数聚'
        });
        /* 
         * 如果是支付宝，页面跳转
         * 如果是微信支付，ajax获取url生成二维码
         */
        var payUrl = PayResource.host + '?' + $.param(this.orderInfo);
        switch(type) {
            case 'alipay':
                location.href = payUrl + '&returnUrl=' + mscxPage.payReturnHost + 'pay-result.html';
                break;
            case 'weixin':
                $.get(payUrl, function(res) {
                    location.href = 'pay.html#weixin/' + encodeURIComponent(res.result) + '/' + me.orderInfo.orderNum;
                })
                break;
            case 'account':
                location.href = payUrl + '&payAccountUrl=' + encodeURIComponent(mscxPage.payReturnHost + 'pay.html#result/' + me.orderInfo.orderNum);
                break;
            default:
                break;
        }
    },
    selectPayWay: function(event) {
        var $target = this.$(event.currentTarget);

        // 如果选择了账户支付
        if($target.val() == 'account') {
            this.priceModel.set('accountAmount', this.accountBalance);
        }else {
            this.priceModel.unset('accountAmount');
        }
    },
    showPointPay: function(event) {
        var $target = this.$(event.currentTarget);
        $target.toggleClass('more');

        this.$('.point-pay').toggle();
    },
    handleInputPoint: function(event) {
        var $target = this.$(event.currentTarget);
        var value = $target.val();

        var me = this;
        var wait = _.debounce(function() {
            var check = me.$pointForm.validate().element($(".input-point"));

            if(check) {
                me.pointDeductionModel.fetch({
                    data: {
                        pointNum: value
                    }
                })
            }

        }, 500);

        wait();
    },
    renderPrice: function() {
        // 判断当前金额是否可以去支付
        this.submitFlag = false;
        var pointAmount = this.priceModel.get('pointAmount');
        var accountAmount = this.priceModel.get('accountAmount');

        if(accountAmount) {
            this.submitFlag = +this.orderAmount < +pointAmount + +accountAmount
        }else {
            this.submitFlag = true;
        }

        if(this.submitFlag) {
            this.$payBtn.removeClass('disabled');
        }else {
            this.$payBtn.addClass('disabled');
        }
        
    },
    renderServeAmount: function() {
        var model = this.pointDeductionModel.toJSON();

        this.$serveAmount.text('￥' + model.result + '元');
    }
});

module.exports = view;