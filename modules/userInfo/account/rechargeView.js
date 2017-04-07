'use strict';

var commonTemplate = require('html!./common.html');
var template = require('html!./recharge.html');

var rechargeModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/placeRechargeOrder.do'
})

require('validate');
require('./account.css');

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: _.template(template, {variable: 'data'}),
    events: {

    },
    initialize: function() {
        _.extend(this, this.model);

        this.rechargeModel = new rechargeModel();

        this.$el.html(this.commonTemplate({
            name: this.id,
            hasAccount: this.hasAccount
        }));

        this.$('#userInfoArea').html(this.template());
        this.$('#balance').html(this.accountInfoModel.toJSON().result.account_balance);

        // step1 输入金额页面
        this.amountView = new amountView({
            el: '#content',
            model: this.rechargeModel
        })
        // step2 选择支付方式页面
        this.selectPayWayView = new selectPayWayView({
            el: '#content'
        })
        // step3 支付结果页面
        this.payResultView = new payResultView({
            el: '#content'
        })

        this.amountView.render();

        this.listenTo(this.amountView, 'next', this.goSelectPayWay);
        this.listenTo(this.selectPayWayView, 'next', this.goPayResultView);

        return this;
    },
    goSelectPayWay: function() {
        this.selectPayWayView.render();
    },
    goPayResultView: function() {
        this.payResultView.render();
    }
});
var amountView = Backbone.View.extend({
    initialize: function() {
        this.templete = _.template($('#amount').html());
        this.stepTemplete = _.template($('#step').html());

        this.listenTo(this.model, 'sync', this.handleRecharge);
        return this;
    },
    render: function() {
        this.$el.append(this.stepTemplete({
            done: 'step'
        }));
        this.$el.append(this.templete());

        this.$form = this.$('form');
        this.$form.validate(this.validateConfig());
    },
    validateConfig: function () {
        var me = this;
        return {
            rules: {
                money: {
                    required: true,
                    price: true
                }
            },
            submitHandler: function () {
                me.submitForm();
            }
        }
    },
    submitForm: function () {
        var params = this.$form.serializeObject();
        this.amount = params.money;

        this.model.fetch({
            data: {
                rechargeAmount: this.amount
            }
        })
    },
    handleRecharge: function() {
        var model = this.model.toJSON();

        // 下单成功
        if(model.status == 'OK') {
            this.trigger('next');
        }
    }
})
var selectPayWayView = Backbone.View.extend({
    initialize: function() {
        this.templete = _.template($('#slectPayWay').html());
        this.stepTemplete = _.template($('#step').html());
    },
    render: function() {
        this.$el.append(this.stepTemplete({
            done: 'step1',
            current: 'step2'
        }));
        this.$el.append(this.templete());
    }
})
module.exports = accountView;