'use strict';

var template = require('html!./selectPayTemplate.html');
var weixinPayView = require('./weixinPayView.js');
var orderModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/getOrderDetail.do'
})

require('./pay.css');

var PayResource = {
    host: mscxPage.host + '/ro/mscx-order-api/order/payOrder.do',
    channels: {
        alipay: 'ALI_WEB',
        weixin: 'WX_NATIVE'
    }
}

var view = Backbone.View.extend({
    el: mscxPage.domEl.payEl,
    events: {
        'click #payBtn': 'submitPay'
    },
    initialize: function() {
        this.$el.addClass('pay-wrapper grid960 mt20 clearfix bgWhite boxShadiow').html(template);

        var orderInfo = window.localStorage.getItem('orderInfo');
        var base = new Base64;
        var me = this;

        this.orderInfo = orderInfo && JSON.parse(base.decode(orderInfo)) || {};

        this.orderModel = new orderModel();
        this.listenTo(this.orderModel, 'sync', this.render);

        this.orderModel.fetch({
            data: {
                orderNum: this.orderInfo.orderNum
            }
        })
    },
    render: function() {
        var model = this.orderModel.toJSON();

        this.$('#amount').html(model.orderCash);
    },
    submitPay: function() {
        // 支付按钮
        var type = this.$('.pay-type').find('input[type="radio"]:checked').val();    
        var me = this;

        this.orderInfo = _.extend(this.orderInfo, {
            channel: PayResource.channels[type],
            title: '数创易'
        });
        /* 
         * 如果是支付宝，页面跳转
         * 如果是微信支付，ajax获取url生成二维码
         */
        var payUrl = PayResource.host + '?' + $.param(this.orderInfo);
        switch(type) {
            // case 'alipay':
            //     // location.href = payUrl + '&showUrl=' + mscxPage.host + 'pay.html#result/' + me.orderInfo.orderNum;
            //     location.href = payUrl + '&returnUrl=' + mscxPage.payReturnHost + 'pay-result.html';
            //     break;
            case 'weixin':
                $.get(payUrl, function(res) {
                    me.weixinPayView = new weixinPayView({
                        model: {
                            url: res.result,
                            order: me.orderModel.toJSON()
                        }
                    })
                    me.setElement(me.weixinPayView.render().el);
                })
                break;
            default:
                break;
        }
    }
});

module.exports = view;