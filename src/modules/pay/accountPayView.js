'use strict';

var template = require('./accountPayTemplate.html');
var passwordView = require('passwordWidget/passwordView.js');

var orderModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/getOrderDetail.do'
})
// 获取账户余额
var accountInfoModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getAccountInfo.do'
});
// 账户支付接口
var minusAmountModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'minusAmount.do'
});

require('./pay.less');
require('validate');
require('util');

var view = Backbone.View.extend({
    el: mscxPage.domEl.payEl,
    template: _.template(template, {variable: 'data'}),
    events: {
        'click .wx-result-btn': 'goPayResult',
        'input #passwordTail': 'toggleBtnStatus'
    },
    validateConfig: function () {
        var me = this;
        return {
            groups: {
                passwordGroup: "password passwordTail"
            },
            rules: {
                password: {
                    digits: true,
                    password: false
                },
                passwordTail: {
                    digits: true,
                    password: false
                }
            },
            submitHandler: function () {
                me.submitForm();
            }
        }
    },
    initialize: function() {
        this.$el.addClass('pay-wrapper mt20 clearfix');

        this.orderModel = new orderModel();
        this.accountInfoModel = new accountInfoModel();
        this.minusAmountModel = new minusAmountModel();

        this.listenTo(this.minusAmountModel, 'sync', this.handleAccountPay);

        this.on('render', this.render);

        var queue = [this.orderModel.fetch({
            data: {
                orderNum: this.model.orderNum
            }
        }), this.accountInfoModel.fetch()];

        $.when.apply($, queue).done(function() {
            this.trigger('render');
        }.bind(this));
    },
    render: function() {
        var orderModel = this.orderModel.toJSON();
        var accountInfoModel = this.accountInfoModel.toJSON();

        this.$el.html(this.template({
            order: orderModel,
            account: accountInfoModel.result
        }));

        this.$passContent = this.$('#passContent');
        this.$passForm = this.$('#passForm');
        this.$accountPayBtn = this.$('.btn-account-pay');

        // 加密码框view到页面中
        this.$passContent.append(new passwordView({
            model: {
                title: '',
                name: 'password'
            }
        }).$el);

        this.$passForm.validate(this.validateConfig());
        this.$passwordTail = this.$('#passwordTail');
        
        return this;
    },
    submitForm: function() {
        if(this.$passwordTail.val().length < 1 || this.submitting) {
            return;
        }

        var params = this.$passForm.serializeObject();
        var me = this;

        this.submitting = true;
        this.$accountPayBtn.addClass('disabled');
        this.minusAmountModel.fetch({
            data: {
                payPwd: params.password + params.passwordTail,
                orderNo: this.model.orderNum
            },
            complete: function() {
                me.$accountPayBtn.removeClass('disabled');
                me.submitting = false;;
            }
        });
    },
    toggleBtnStatus: function(event) {
        var $target = this.$(event.currentTarget);
        if($target.val()) {
            this.$accountPayBtn.removeClass('disabled');
        }else {
            this.$accountPayBtn.addClass('disabled');
        }
    },
    handleAccountPay: function() {
        var model = this.minusAmountModel.toJSON();

        if(model.status == 'OK') {
            layer.msg('账户余额支付成功');
        }else {
            layer.msg(model.message);
        }
        

        setTimeout(function() {
            location.href = '#result/' + this.model.orderNum;
        }.bind(this), 2000);
    }
});

module.exports = view;