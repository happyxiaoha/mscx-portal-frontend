'use strict';

var template = require('html!./selectPayTemplate.html');
var weixinPayView = require('./weixinPayView.js');
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
    initialize: function() {
        this.$el.addClass('pay-wrapper grid960 mt20 clearfix bgWhite boxShadiow').html(template);

        var orderInfo = window.localStorage.getItem('orderInfo');
        var base = new Base64;
        var me = this;

        orderInfo = orderInfo && JSON.parse(base.decode(orderInfo)) || {};

        this.$('#amount').html(orderInfo.amount);

        this.$('#payBtn').on('click', function() {
            // 支付按钮
            var type = $('.pay-type').find('input[type="radio"]:checked').val();
            
            _.extend(orderInfo, {
                channel: PayResource.channels[type],
                title: '广州大数据'
            })

            /* 
             * 如果是支付宝，页面跳转
             * 如果是微信支付，ajax获取url生成二维码
             */
            var payUrl = PayResource.host + '?' + $.param(orderInfo);
            switch(type) {
                case 'alipay':
                    location.href = payUrl;
                    break;
                case 'weixin':
                    $.get(payUrl, function(res) {
                        me.weixinPayView = new weixinPayView({
                            model: {
                                url: res.result
                            }
                        })
                        me.setElement(me.weixinPayView.render().el);
                    })
                    break;
                default:
                    break;
            }
            
        })
    }
});

module.exports = view;