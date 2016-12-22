'use strict';

var template = require('html!./resultTemplate.html');
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
        this.$el.html(this.template(this.orderModel.toJSON()));
    }
});

module.exports = view;