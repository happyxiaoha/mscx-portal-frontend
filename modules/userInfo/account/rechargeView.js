'use strict';

var commonTemplate = require('html!./common.html');
var template = require('html!./recharge.html');
var amountView = require('./amountView');
var rechargeModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/placeRechargeOrder.do'
})


var orderModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/getOrderDetail.do'
})
var guaranteeListModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getRequirementGuaranteeList.do'
    // url: mscxPage.request.demand + 'queryData.do'
})


var PayResource = {
    host: mscxPage.host + '/ro/mscx-order-api/order/payOrder.do',
    channels: {
        alipay: 'ALI_WEB',
        weixin: 'WX_NATIVE'
    }
}

require('validate');
require('./account.css');

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: template,
    events: {

    },
    initialize: function() {
        _.extend(this, this.model);

        this.rechargeModel = new rechargeModel();
        // 保证金列表
        this.guaranteeListModel = new guaranteeListModel();

        this.$el.html(this.commonTemplate({
            name: this.id,
            hasAccount: this.hasAccount
        }));

        this.$('#userInfoArea').html(this.template);
        this.$('#balance').html(this.accountInfoModel.toJSON().result.account_balance);

        this.ensureListTemplate = _.template($('#ensureList').html(), {variable: 'data'});

        this.guaranteePage = 1;
        this.guaranteePageSize = 5;

        this.guaranteeListModel.fetch({
            data: {
                page: this.guaranteePage,
                pageSize: this.guaranteePageSize
            }
        });

        this.total = this.model.accountInfoModel.get('result').guaranteeBalance;

        // step1 输入金额页面
        this.amountView = new amountView({
            el: '#content',
            model: {
                serviceId: this.serviceId,
                transferId: this.transferId
            }
        })
        // step2 选择支付方式页面
        this.selectPayWayView = new selectPayWayView({
            el: '#content',
            model: this.rechargeModel
        })
        // step3 支付结果页面
        this.payResultView = new payResultView({
            el: '#content',
            model: {
                order: this.order
        }})

        this.listenTo(this.amountView, 'next', this.goSelectPayWay);
        this.listenTo(this.selectPayWayView, 'next', this.goPayResultView);
        this.listenTo(this.guaranteeListModel, 'sync', this.renderGuaranteeList);

        // 如果有订单号，则是支付回调页面
        if(this.order) {
            this.payResultView.render();
        }else {
            // 第一步的初始化
            this.amountView.render();
        }

        return this;
    },
    goSelectPayWay: function(model) {
        this.selectPayWayView.model = model;
        this.selectPayWayView.render();
    },
    goPayResultView: function() {
        this.payResultView.render();
    },
    renderGuaranteeList: function() {
        var model = this.guaranteeListModel.toJSON();
        _.extend(model.result, {
            total: this.total
        })

        if(model.status == 'OK') {
            this.$('.ensure-list').html(this.ensureListTemplate(model.result));

            laypage({
                cont: 'guaranteePage',
                pages: model.result.page.totalPage,
                skip: true,
                curr: this.guaranteePage || 1,
                jump: function(obj, first){
                    if(!first){
                        this.guaranteePage = obj.curr;
                        this.reloadGuaranteePage();
                    }
                }.bind(this)
            });
        }
    },
    reloadGuaranteePage: function() {
        this.guaranteeListModel.fetch({
            data: {
                page: this.guaranteePage,
                pageSize: this.guaranteePageSize
            }
        });
    }
});

var selectPayWayView = Backbone.View.extend({
    events: {
        'click .btn-pay': 'submitPay'
    },
    initialize: function() {
        this.templete = _.template($('#slectPayWay').html(), {variable: 'data'});
         this.stepTemplete = _.template($('#step').html(), {variable: 'data'});
        this.payTipsTemplate = $('#payTips').html();
    },
    render: function() {
        this.$el.empty();
        // this.$el.append(this.stepTemplete({
        //     done: ['step1'],
        //     current: 'step2'
        // }));
        this.$el.append(this.templete(this.model));

        // 支付提示弹层
        // layer.open({
        //     type: 1,
        //     title: '支付提示',
        //     shade: 0.6,
        //     shadeClose: true,
        //     area: ['600px', '350px'],
        //     content: this.payTipsTemplate
        // })
    },
    submitPay: function() {
        // 支付按钮
        var type = this.$('.pay-type').find('input[type="radio"]:checked').val();
        var me = this;

        this.orderInfo = _.extend({
            orderNum: this.model.result,
            amount: this.model.amount
        }, {
            channel: PayResource.channels[type],
            title: '广州数聚'
        });
        /*
         * 如果是支付宝，页面跳转
         * 如果是微信支付，ajax获取url生成二维码
         */
        var payUrl = PayResource.host + '?' + $.param(this.orderInfo);
        switch(type) {
            case 'alipay':
                location.href = payUrl + '&returnUrl=' + mscxPage.payReturnHost + 'pay-result.html';
                break;
            case 'weixin':
                $.get(payUrl, function(res) {
                    location.href = 'pay.html#weixin/' + encodeURIComponent(res.result) + '/' + me.orderInfo.orderNum;
                })
                break;
            default:
                break;
        }
    }
})
var payResultView = Backbone.View.extend({
    initialize: function() {
        this.templete = _.template($('#payResult').html(), {variable: 'data'});
        this.stepTemplete = _.template($('#step').html(), {variable: 'data'});
    },
    render: function() {
        this.$el.empty();
        this.$el.append(this.stepTemplete({
            done: ['step1', 'step2'],
            current: 'step3'
        }));

        this.orderModel = new orderModel();
        this.listenTo(this.orderModel, 'sync', this.renderResult);

        this.orderModel.fetch({
            data: {
                orderNum: this.model.order
            }
        })
    },
    renderResult: function() {
        var model = this.orderModel.toJSON();
        this.$el.append(this.templete(model));
    }
})
module.exports = accountView;