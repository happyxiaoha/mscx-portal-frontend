'use strict';

var template = require('./resultTemplate.html');
var orderModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/getOrderDetail.do'
})
require('./pay.css');


var view = Backbone.View.extend({
    el: mscxPage.domEl.payEl,
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.removeClass().addClass('pay-content');

        this.orderModel = new orderModel();
        this.listenTo(this.orderModel, 'sync', this.render);

        this.orderModel.fetch({
            data: {
                orderNum: this.id
            }
        })
    },
    render: function() {
        var model = this.orderModel.toJSON();

        // 如果是充值订单，跳转
        if(model.order_classify == '2') {
            location.replace('userInfo.html#recharge/result/' + model.orderNum);
        }

        this.$el.html(this.template(model));
    }
});

module.exports = view;