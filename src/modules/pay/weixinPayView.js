'use strict';

var template = require('./weixinPayTemplate.html');
var QrCode = require('lib/qrCode.js');
var orderModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/getOrderDetail.do'
})

var view = Backbone.View.extend({
    el: mscxPage.domEl.payEl,
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.removeClass().addClass('pay-content');

        this.orderModel = new orderModel();
        this.listenTo(this.orderModel, 'sync', this.render);

        this.orderModel.fetch({
            data: {
                orderNum: this.model.orderNum
            }
        })
    },
    render: function() {
        this.$el.html(this.template(this.orderModel.toJSON()));
        this.$qrcode = this.$('#qrCode');

        var qrcode = new QrCode(this.$qrcode[0], {
            width : 200,
            height : 200
        });
        qrcode.makeCode(this.model.url);
        return this;
    },
    goPayResult: function() {
        var model = this.orderModel.toJSON();

        location.href = model.order_classify == '2' ? 'userInfo.html#recharge/result/' + model.orderNum : '#result/' + model.orderNum;
        
    }
});

module.exports = view;