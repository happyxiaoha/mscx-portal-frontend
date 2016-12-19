/**
 * Created by Kevin on 2016/12/7.
 */

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
require('pay/pay.css');

var PayResource = {
    host: mscxPage.host + '/ro/mscx-order-api/order/payOrder.do',
    channels: {
        alipay: 'ALI_WEB',
        weixin: 'WX_NATIVE'
    }
}

$(function() {
    new header();
    new footer();

    var orderInfo = window.localStorage.getItem('orderInfo');
    orderInfo = orderInfo && JSON.parse(orderInfo) || {};

    $('#amount').html(orderInfo.amount);

    $('#payBtn').on('click', function() {
        // 支付按钮
        var type = $('.pay-type').find('input[type="radio"]:checked').val();
        
        _.extend(orderInfo, {
            channel: PayResource.channels[type],
            title: '广州大数据'
        })

        location.href = PayResource.host + '?' + $.param(orderInfo);
    })
});