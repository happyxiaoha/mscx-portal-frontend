'use strict';

var passwordView = require('passwordWidget/passwordView.js');
var rechargeModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/placeRechargeOrder.do'
})
var guaranteeRechargeModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/placeGuaranteeRechargeOrder.do'
})
var drawAmountModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/drawAmountApply.do'
})
var serviceDetailModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getRequirementGuaranteeByReqId.do'
})
var transferGuaranteeModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'transferGuarantee.do'
})
var rechargeServiceModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'getRechargeServices.do'
})
var applyDrawingModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getApplyDrawingList.do'
})

var amountView = Backbone.View.extend({
    events: {
        'change input[type=radio]': 'changeOperateType'
    },
    initialize: function() {
        this.templete = _.template($('#amount').html(), {variable: 'data'});
        // this.stepTemplete = _.template($('#step').html(), {variable: 'data'});
        this.serviceListTemplate = _.template($('#serviceList').html(), {variable: 'data'});
        this.transferTemplate = _.template($('#transferTemplate').html(), {variable: 'data'});
        this.applyDrawingListTemplate = _.template($('#drawingList').html(), {variable: 'data'});

        // 账户充值接口
        this.rechargeModel = new rechargeModel();
        // 接口保证金充值接口
        this.guaranteeRechargeModel = new guaranteeRechargeModel();
        // 提款申请接口
        this.drawAmountModel = new drawAmountModel();
        // 某个服务需求详情接口
        this.serviceDetailModel = new serviceDetailModel();
        // 保证金转帐接口
        this.transferGuaranteeModel = new transferGuaranteeModel();

        this.rechargeServiceModel = new rechargeServiceModel();
        this.applyDrawingModel = new applyDrawingModel();
        this.selectedServiceModel = new Backbone.Model();

        this.listenTo(this.selectedServiceModel, 'change', this.renderSelectedService);
        this.listenTo(this.rechargeModel, 'sync', this.handleRecharge);
        this.listenTo(this.guaranteeRechargeModel, 'sync', this.handleGuaranteeRecharge);
        this.listenTo(this.drawAmountModel, 'sync', this.handleDrawAmount);
        
        this.listenTo(this.serviceDetailModel, 'sync', this.renderServiceDetail);
        this.listenTo(this.rechargeServiceModel, 'sync', this.renderRechageList);
        this.listenTo(this.applyDrawingModel, 'sync', this.renderApplyDrawingList);

        // 默认的操作是账户充值
        this.operateType = 'account';

        return this;
    },
    render: function() {
        this.$el.empty();
        // this.$el.append(this.stepTemplete({
        //     current: 'step1'
        // }));
        this.$el.append(this.templete(this.model));

        this.$form = this.$('form');
        this.$form.validate(this.validateConfig());

        // 需求页面跳转来的保证金充值
        if(this.model.serviceId) {
            this.operateType = 'services';
            this.serviceDetailModel.fetch({
                data: {
                    reqId: this.model.serviceId
                }
            })
        }else if(this.model.transferId) {
            this.operateType = 'transfer';
        }
    },
    renderRechageList: function() {
        var model = this.rechargeServiceModel.toJSON();

        $('#selectServiceLayer').html(this.serviceListTemplate(model.result));

        var dialog= layer.open({
            type: 1,
            btn: ['确定','取消'],
            title: '请选择充值项目',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['350px', '350px'],
            content: $('#selectServiceLayer'),
            btn1: function () {
                var checkedItem = $('#selectServiceLayer').find('input[name="services"]:checked');

                this.selectedServiceModel.set({
                    id: checkedItem.val(),
                    name: checkedItem.data('name')
                })

                layer.close(dialog);
            }.bind(this),
            btn2: function () {
                layer.close(dialog);
            }
        });
    },
    renderApplyDrawingList: function() {
        var model = this.applyDrawingModel.toJSON();

        $('#applyDrawingLayer').html(this.applyDrawingListTemplate(model.result));

        var dialog= layer.open({
            type: 1,
            btn: ['提交申请','取消'],
            title: '请选择提款申请类别',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['400px', '350px'],
            content: $('#applyDrawingLayer'),
            btn1: function () {
                var checkedItem = $('#applyDrawingLayer').find('input[name="services"]:checked');

                this.drawAmountModel.set({
                    applyAmount: checkedItem.data('balance'),
                    applyType: checkedItem.data('type'),
                    balanceAmount: (checkedItem.data('type') == '01' ? checkedItem.data('balance') : ''),
                    projectAmount: (checkedItem.data('type') == '02' ? checkedItem.data('balance') : ''),
                    projectId: checkedItem.val(),
                    projectName: checkedItem.data('name')
                })
                this.drawAmountModel.save();

                layer.close(dialog);
            }.bind(this),
            btn2: function () {
                layer.close(dialog);
            }
        });
    },
    renderSelectedService: function() {
        this.$('#rechargeTip').html(this.selectedServiceModel.get('name') ? '充值项目：' + this.selectedServiceModel.get('name') : '');
    },
    renderServiceDetail: function() {
        var model = this.serviceDetailModel.toJSON();
        var moneyIpt;

        if(model.status == 'OK') {
            // 渲染保证金转账layer
            if(this.model.transferId) {
                this.renderTransferLayer();
                return;
            }
            model = model.result;
            this.selectedServiceModel.set({
                id: this.model.serviceId,
                name: model.name
            })

            if(model.rate == 0) {
                moneyIpt = (model.money * model.percent / 100).toFixed(2);
            }else if(model.guaranteeBalance == 0) {
                moneyIpt = (model.money * model.leftRate).toFixed(2);
            }
            
            this.$('#amountInput').val(moneyIpt).attr('readonly', 'readonly');
        }        
    },
    renderTransferLayer: function() {
        var model = this.serviceDetailModel.toJSON();

        $('#transferLayer').html(this.transferTemplate(model));
        this.$passForm = $('#passForm');

        // 加密码框view到页面中
        $('#passContent').append(new passwordView({
            model: {
                title: '',
                name: 'password'
            }
        }).$el);

        this.$passForm.validate(this.validatePwdConfig());
        this.$passwordTail = $('#passwordTail');

        this.transferDialog= layer.open({
            type: 1,
            btn: ['完成','取消'],
            title: '项目保证金转账详情',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['450px', '350px'],
            content: $('#transferLayer'),
            btn1: function () {
                this.$passForm.submit();
            }.bind(this),
            btn2: function () {
                layer.close(this.transferDialog);
            }.bind(this)
        });
    },
    changeOperateType: function(e) {
        var $target = this.$(e.target);

        this.operateType = $target.val();

        if(this.operateType == 'services') {
            this.rechargeServiceModel.fetch();
        }else if(this.operateType == 'draw') {
            this.applyDrawingModel.fetch();
        }else{
            //  清空选择的项目
            this.selectedServiceModel.clear();
        }
    },
    validatePwdConfig: function() {
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
                me.submitTransfer();
            }
        }
    },
    validateConfig: function () {
        var me = this;
        return {
            rules: {
                money: {
                    max: 10000000,
                    required: true,
                    price: true
                }
            },
            submitHandler: function () {
                me.submitForm();
            }
        }
    },
    submitTransfer: function() {
        if(this.$passwordTail.val().length < 1 || this.submitting) {
            return;
        }

        var params = this.$passForm.serializeObject();
        var model = this.serviceDetailModel.toJSON();
        var me = this;
        // TODO

        this.submitting = true;
        this.transferGuaranteeModel.set({
            payPwd: params.password + params.passwordTail,
            amount: model.amount,
            billId: ''
        })
        this.transferGuaranteeModel.save({
            complete: function(res) {
                layer.close(this.transferDialog);
                me.submitting = false;
            }.bind(this)
        });
    },
    submitForm: function () {
        var params = this.$form.serializeObject();
        this.amount = params.money;

        switch(this.operateType) {
            case 'account':
                this.rechargeModel.set('amount', this.amount);
                this.rechargeModel.fetch({
                    data: {
                        rechargeAmount: this.amount
                    }
                })
                break;
            case 'services':
                this.guaranteeRechargeModel.set('amount', this.amount);
                this.guaranteeRechargeModel.fetch({
                    data: {
                        rechargeAmount: this.amount,
                        reqId: this.selectedServiceModel.get('id'),
                        rechargeFlag: 0
                    }
                })
                break;
            case 'transfer':
                this.serviceDetailModel.set('amount', this.amount);
                this.serviceDetailModel.fetch({
                    data: {
                        reqId: this.model.transferId
                    }
                })
                break;
        }
        
    },
    handleRecharge: function() {
        var model = this.rechargeModel.toJSON();

        // 下单成功
        if(model.status == 'OK') {
            this.trigger('next', model);
        }
    },
    handleGuaranteeRecharge: function() {
        var model = this.guaranteeRechargeModel.toJSON();

        // 下单成功
        if(model.status == 'OK') {
            this.trigger('next', model);
        }
    },
    handleDrawAmount: function() {
        var model = this.drawAmountModel.toJSON();

        // 提款成功
        if(model.status == 'OK') {
            layer.msg('申请提款成功！');            
        }
    }
})
module.exports = amountView;