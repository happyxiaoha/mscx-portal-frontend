'use strict';

var template = require('html!./selectPayTemplate.html');
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
        this.$el.addClass('.pay-wrapper grid960 mt20 clearfix bgWhite boxShadiow').html(template);

        var orderInfo = window.localStorage.getItem('orderInfo');
        var base = new Base64;

        orderInfo = orderInfo && JSON.parse(base.decode(orderInfo)) || {};

        this.$('#amount').html(orderInfo.amount);

        this.$('#payBtn').on('click', function() {
            // 支付按钮
            var type = $('.pay-type').find('input[type="radio"]:checked').val();
            
            _.extend(orderInfo, {
                channel: PayResource.channels[type],
                title: '广州大数据'
            })

            location.href = PayResource.host + '?' + $.param(orderInfo);
        })
    }
});

module.exports = view;