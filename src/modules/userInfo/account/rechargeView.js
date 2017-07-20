'use strict';

var commonTemplate = require('./common.html');
var template = require('./recharge.html');
var amountView = require('./amountView');

var orderModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/getOrderDetail.do'
})

var alarmModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getBalanceAlertInfo.do'
})

var guaranteeListModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getRequirementGuaranteeList.do'
    // url: mscxPage.request.demand + 'queryData.do'
})

var addAlarmModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'addBalanceAlert.do'
})
var editAlarmPhoneModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'modifyAlertPhone.do'
})
var editAlarmAmountModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'modifyBalanceAlert.do'
})

var PayResource = {
    host: mscxPage.host + '/ro/mscx-order-api/order/payOrder.do',
    channels: {
        alipay: 'ALI_WEB',
        weixin: 'WX_NATIVE'
    }
}

require('validate');
require('./account.less');

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: template,
    events: {
        'click #setAlarm': 'showEditForm',
        'click #editAlarmPhone': 'showEditPhone',
        'click #editAlarmAmount': 'showEditAmount'
    },
    initialize: function() {
        _.extend(this, this.model);

        // 预警信息
        this.alarmModel = new alarmModel();
        // 保证金列表
        this.guaranteeListModel = new guaranteeListModel();
        // 设置预警
        this.addAlarmModel = new addAlarmModel();
        this.editAlarmPhoneModel = new editAlarmPhoneModel();
        this.editAlarmAmountModel = new editAlarmAmountModel();

        this.guaranteePage = 1;
        this.guaranteePageSize = 5;

        this.$el.html(this.commonTemplate({
            name: this.id,
            hasAccount: this.hasAccount
        }));

        this.accountId = this.model.accountInfoModel.get('result').id;
        this.total = this.model.accountInfoModel.get('result').guaranteeBalance;

        this.$('#userInfoArea').html(this.template);
        this.$('#balance').html(this.accountInfoModel.toJSON().result.account_balance);

        this.alarmTemplete = _.template($('#alarm').html(), {variable: 'data'});
        this.editAlarmTemplate = _.template($('#alarmForm').html(), {variable: 'data'});
        this.ensureListTemplate = _.template($('#ensureList').html(), {variable: 'data'});

        this.alarmModel.fetch({
            data: {
                accountId: this.accountId
            }
        });

        this.guaranteeListModel.fetch({
            data: {
                page: this.guaranteePage,
                pageSize: this.guaranteePageSize
            }
        });

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
            el: '#content'
        })
        // step3 支付结果页面
        this.payResultView = new payResultView({
            el: '#content',
            model: {
                order: this.order
            }
        })

        this.listenTo(this.amountView, 'next', this.goSelectPayWay);
        this.listenTo(this.selectPayWayView, 'next', this.goPayResultView);
        this.listenTo(this.alarmModel, 'sync', this.renderAlarm);
        this.listenTo(this.guaranteeListModel, 'sync', this.renderGuaranteeList);
        this.listenTo(this.addAlarmModel, 'sync', this.handleAddAlarm);
        this.listenTo(this.editAlarmPhoneModel, 'sync', this.handleEditAlarmPhone);
        this.listenTo(this.editAlarmAmountModel, 'sync', this.handleEditAlarmAmount);

        // 如果有订单号，则是支付回调页面
        if(this.order) {
            this.payResultView.render();
        }else {
            // 第一步的初始化
            this.amountView.render();
        }

        return this;
    },
    validateConfig: function () {
        var me = this;
        return {
            rules: {
                alertPhone: {
                    required: true,
                    telephone: true
                },
                alertAmount: {
                    required: true,
                    integers: true,
                    max: 1000000
                }
            },
            messages: {
                alertAmount: {
                    integers: '金额为大于0的整数'
                }
            },
            submitHandler: function () {
                me.submitForm();
            }
        }
    },
    goSelectPayWay: function(model) {
        this.selectPayWayView.model = model;
        this.selectPayWayView.render();
    },
    goPayResultView: function() {
        this.payResultView.render();
    },
    renderAlarm: function() {
        var model = this.alarmModel.toJSON();

        if(model.status == 'OK') {
            this.$('.alarm-wrapper').html(this.alarmTemplete(model.result));
        }
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
    },
    showEditForm: function() {
        this.$('.alarm-wrapper').html(this.editAlarmTemplate({
            alertPhone: mscxPage.userInfo.mobile
        }));

        this.$('#editAlarmForm').validate(this.validateConfig())
    },
    showEditPhone: function(e) {
        var $target = this.$(e.target);
        var model = this.alarmModel.toJSON();
        var me = this;
        this.$('.alarm-tel #telContent').html('<form><input class="alarm-input" name="alertPhone" maxlength="11" value="' + model.result.alertPhone + '"><label id="alertPhone-error" style="left:0" class="error" for="alertPhone"></label><button class="btn btn-edit-alarm">确定</button></form>');
        this.$('.alarm-tel form').validate({
            rules: {
                alertPhone: {
                    required: true,
                    telephone: true
                }
            },
            submitHandler: function () {
                me.submitEditPhoneForm();
            }
        })
        $target.hide();
        this.$('#telTitle').hide();
    },
    showEditAmount: function(e) {
        var $target = this.$(e.target);
        var model = this.alarmModel.toJSON();
        var me = this;
        this.$('.alarm-money #amountContent').html('<form><input class="alarm-input" name="alertAmount" value="' + model.result.alertAmount + '">元&nbsp;&nbsp;<label id="alertAmount-error" style="left:0" class="error" for="alertAmount"></label><button class="btn btn-edit-alarm">确定</button></form>');
        this.$('.alarm-money form').validate({
            rules: {
                alertAmount: {
                    required: true,
                    integers: true
                }
            },
            messages: {
                alertAmount: {
                    integers: '金额为大于0的整数'
                }
            },
            submitHandler: function () {
                me.submitEditAmountForm();
            }
        })
        $target.hide();
        this.$('#amountTitle').hide();
    },
    submitForm: function() {
        var params = this.$('#editAlarmForm').serializeObject();

        params.accountId = this.accountId;
        this.addAlarmModel.set(params);
        this.addAlarmModel.save();
    },
    submitEditPhoneForm: function() {
        var params = this.$('.alarm-tel form').serializeObject();
        params.accountId = this.accountId;
        this.editAlarmPhoneModel.set(params);
        this.editAlarmPhoneModel.save();
    },
    submitEditAmountForm: function() {
        var params = this.$('.alarm-money form').serializeObject();
        params.accountId = this.accountId;
        this.editAlarmAmountModel.set(params);
        this.editAlarmAmountModel.save();
    },
    handleAddAlarm: function() {
        var model = this.addAlarmModel.toJSON();

        if(model.status == 'OK') {
            this.alarmModel.set('result', model.result);
            this.$('.alarm-wrapper').html(this.alarmTemplete(model.result));
        }
    },
    handleEditAlarmPhone: function() {
        var model = this.editAlarmPhoneModel.toJSON();

        if(model.status == 'OK') {
            layer.msg(model.result);
            this.alarmModel.fetch({
                data: {
                    accountId: this.accountId
                }
            });
        } 
    },
    handleEditAlarmAmount: function() {
        var model = this.editAlarmAmountModel.toJSON();

        if(model.status == 'OK') {
            layer.msg(model.result);
            this.alarmModel.fetch({
                data: {
                    accountId: this.accountId
                }
            });
        }
    }
});

var selectPayWayView = Backbone.View.extend({
    events: {
        'click .btn-pay': 'submitPay'
    },
    initialize: function() {
        this.templete = _.template($('#slectPayWay').html(), {variable: 'data'});
        // this.stepTemplete = _.template($('#step').html(), {variable: 'data'});
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
            title: '数创易'
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
        // this.stepTemplete = _.template($('#step').html(), {variable: 'data'});
    },
    render: function() {
        this.$el.empty();
        // this.$el.append(this.stepTemplete({
        //     done: ['step1', 'step2'],
        //     current: 'step3'
        // }));

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