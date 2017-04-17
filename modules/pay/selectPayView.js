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
var pointDeductionRuleModel = Backbone.Model.extend({
    url: mscxPage.request.point + 'pointDeduction/getPointDeductionRule.do'
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
        point: 'POINT_PAY',
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
        'mouseenter .point-rule i': 'showPointTip'
    },
    template: _.template(template, {variable: 'data'}),
    pointRuleTemplate: '<div class="point-rule-wrapper"><p>积分抵用规则：</p>' +
    '<ul class="point-rule-tip">' +
        '<li><span class="corOrange"><%= data && data.deductionPoint %></span>积分='+
        '<span class="corOrange"><%= data && data.deductionMoney %><span>元</li>' +
        '<li>每次使用的积分必须为10的整倍数</li>' +
    '</ul></div>',
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
        this.pointDeductionRuleModel = new pointDeductionRuleModel();

        this.listenTo(this.pointDeductionModel, 'sync', this.renderServeAmount);
        // this.listenTo(this.pointDeductionRuleModel, 'sync', this.renderPointRule);

        this.on('render', this.render);

        var queue = [this.orderModel.fetch({
            data: {
                orderNum: this.orderInfo.orderNum
            }
        }), this.accountInfoModel.fetch(), this.pointModel.fetch(), this.pointDeductionRuleModel.fetch({type: 'post'})];

        $.when.apply($, queue).done(function() {
            this.trigger('render');
        }.bind(this));
    },
    render: function() {
        var orderModel = this.orderModel.toJSON();
        var accountInfoModel = this.accountInfoModel.toJSON();
        var pointModel = this.pointModel.toJSON();
        var pointRuleModel = this.pointDeductionRuleModel.toJSON();

        // 总价
        this.orderAmount = orderModel.orderCash;
        // 账户余额
        this.accountBalance = accountInfoModel.result.account_balance;
        // 账户余额支付金额
        this.payBalance = 0;

        // 混合价格Model
        this.priceModel = new Backbone.Model({
            // 积分抵用
            pointAmount: 0
        });

        this.listenTo(this.priceModel, 'change', this.renderPrice);

        this.$el.html(this.template({
            order: orderModel,
            account: accountInfoModel.result,
            point: pointModel.result,
            pointRule: pointRuleModel.result
        }));

        this.$payBtn = this.$('#payBtn');
        this.$pointError = this.$('#pointError');
        this.$pointForm = this.$('#pointForm');
        this.$serveAmount = this.$('#serveAmount');
        this.$totalPoint = this.$('.point-serve');
        this.$actualAmount = this.$('#actualAmount');

        this.$pointForm.validate({
            ignore: '',
            groups: {
                pointGroup: 'point pointAmount'
            },
            rules: {
                point: {
                    number: true,
                    tenMultiple: true,
                    min: 0,
                    max: Math.floor(+pointModel.result.remainingPoint/10) * 10
                },
                pointAmount: {
                    max: +this.orderAmount
                }
            },
            messages: {
                pointAmount: {
                    max: '积分抵用金额不得大于订单金额'
                }
            }
        });

        this.$('.input-point').on('input', _.debounce(this.getPointDeduction.bind(this), 500));
    },
    submitPay: function() {

        // if(!this.submitFlag) {
        //     return;
        // }

        // 支付按钮
        var type = this.$('.pay-type').find('input[type="radio"]:checked').val();    
        var me = this;

        var pointAmount = this.priceModel.get('pointAmount');
        var payBalance = this.payBalance;

        // 使用积分，且完全积分支付
        if(+pointAmount - +this.orderAmount >= 0) {
            type = 'point';
        }else if(pointAmount > 0) {
            // 否则，积分混合支付
            type = type + 'Point';
        }

        this.orderInfo = _.extend(this.orderInfo, {
            channel: PayResource.channels[type],
            title: '广州数聚',
            payPoint: this.pointNum,
            payBalance: payBalance
        });
        /* 
         * 如果是支付宝，页面跳转
         * 如果是微信支付，ajax获取url生成二维码
         */
        var payUrl = PayResource.host + '?' + $.param(this.orderInfo);
        switch(type) {
            case 'alipay':
            case 'alipayPoint':
                location.href = payUrl + '&returnUrl=' + mscxPage.payReturnHost + 'pay-result.html';
                break;
            case 'weixin':
            case 'weixinPoint':
                $.get(payUrl, function(res) {
                    location.href = 'pay.html#weixin/' + encodeURIComponent(res.result) + '/' + me.orderInfo.orderNum;
                })
                break;
            case 'account':
            case 'accountPoint':
                location.href = payUrl + '&payAccountUrl=' + encodeURIComponent(mscxPage.payReturnHost + 'pay-account.html')
                    + '&returnUrl=' + encodeURIComponent(mscxPage.payReturnHost + 'pay-result.html');
                break;
            default:
                location.href = payUrl + '&returnUrl=' + encodeURIComponent(mscxPage.payReturnHost + 'pay-result.html');
                break;
        }
    },
    selectPayWay: function(event) {
        var $target = this.$(event.currentTarget);

        var pointAmount = this.priceModel.get('pointAmount');
        // 如果选择了账户支付
        if($target.val() == 'account') {
            this.payBalance = +this.orderAmount - pointAmount;
        }else {
            this.payBalance = 0;
        }
    },
    showPointPay: function(event) {
        var $target = this.$(event.currentTarget);
        $target.toggleClass('more');

        this.$('.point-pay').toggle();
    },
    getPointDeduction: function() {
        var value = this.$('.input-point').val();
        this.$('.input-point-amount').val(0);
        this.pointNum = undefined;

        if(value == '') {
            this.pointDeductionModel.set('result', 0).trigger('sync');
            return;
        }

        var check = this.$pointForm.validate().element($(".input-point"));

        if(check) {
            this.pointNum = value;
            this.pointDeductionModel.fetch({
                data: {
                    pointNum: value
                }
            })
        }
    },
    renderPrice: function() {
        var pointAmount = this.priceModel.get('pointAmount');
        var finalAmount;

        this.payBalance = +this.orderAmount - pointAmount;

        // 计算最终需要支付额度
        if(pointAmount > 0) {
            finalAmount = +pointAmount - +this.orderAmount > 0 ? 0 : +this.orderAmount - +pointAmount;
        }else {
            finalAmount = this.orderAmount;
        }
        this.$actualAmount.text(finalAmount + '元');
        
    },
    renderServeAmount: function() {
        var model = this.pointDeductionModel.toJSON();

        this.$('.input-point-amount').val(model.result).valid();

        // 积分抵用金额必须小于等于订单金额
        if(+model.result > +this.orderAmount) {
            // this.$('#point-error').text('积分抵用金额不得大于订单金额').show();
            // this.$('.input-point').addClass('error').attr('aria-invalid', 'true');

            this.priceModel.set('pointAmount', 0);
            this.$serveAmount.text('--');
            this.$totalPoint.hide();
            return;
        }
        model.result > 0 ? this.$totalPoint.show() : this.$totalPoint.hide();

        this.priceModel.set('pointAmount', model.result);
        this.$serveAmount.text('￥' + model.result + '元');
        this.$totalPoint.find('.amount').text(model.result + '元');
    },
    showPointTip: function() {
        var model = this.pointDeductionRuleModel.toJSON();

        // 已经显示着了
        if(this.tipIndex) {return;}

        if(model.result) {
            this.renderPointRule();
        }
        // else {
        //     this.pointDeductionRuleModel.fetch({
        //         type: 'post'
        //     });
        // }

        $(document).on('click.pointTip', this.closePointTip.bind(this));
    },
    closePointTip: function() {
        layer.close(this.tipIndex);
        this.tipIndex = undefined;
        $(document).off('.pointTip');
    },
    renderPointRule: function() {
        var model = this.pointDeductionRuleModel.toJSON();
        var html = _.template(this.pointRuleTemplate, {variable: 'data'})(model.result);
        this.tipIndex = layer.tips(html, '.point-rule', {
            tips: [2, '#fffeed'],
            time: 0,
            maxWidth: 300
        });
    }
});

module.exports = view;