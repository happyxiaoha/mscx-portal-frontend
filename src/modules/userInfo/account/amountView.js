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
var getBillInfoModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'getBillInfo.do'
})
var getTransferInfoModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getTransferGuaranteeInfo.do'
})
var verifyPwdModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'verifyPwd.do'
})
var setDrawCountModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'setAccountWithdraw.do'
})
var getDrawCountModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'accountWithdrawSettingInfo.do'
})


var amountView = Backbone.View.extend({
    events: {
        'change input[type=radio]': 'changeOperateType',
        'click #setDrawCount': 'setDrawCount'
    },
    initialize: function() {
        this.templete = _.template($('#amount').html(), {variable: 'data'});
        this.stepTemplete = _.template($('#step').html(), {variable: 'data'});
        this.serviceListTemplate = _.template($('#serviceList').html(), {variable: 'data'});
        this.transferTemplate = _.template($('#transferTemplate').html(), {variable: 'data'});
        this.applyDrawingListTemplate = _.template($('#drawingList').html(), {variable: 'data'});

        // 账户充值接口
        this.rechargeModel = new rechargeModel();
        // 保证金充值接口
        this.guaranteeRechargeModel = new guaranteeRechargeModel();
        // 提款申请接口
        this.drawAmountModel = new drawAmountModel();
        // 某个服务需求详情接口
        this.serviceDetailModel = new serviceDetailModel();
        // 保证金转帐接口
        this.transferGuaranteeModel = new transferGuaranteeModel();
        // 某个服务需求的接单信息接口
        this.getBillInfoModel = new getBillInfoModel();
        // 项目保证金转账所需信息接口
        this.getTransferInfoModel = new getTransferInfoModel();
        // 验证支付密码接口
        this.verifyPwdModel = new verifyPwdModel();
        // 设置提款次数接口
        this.setDrawCountModel = new setDrawCountModel();
        // 获取提款次数接口
        this.getDrawCountModel = new getDrawCountModel

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
        this.listenTo(this.getTransferInfoModel, 'sync', this.renderTransferLayer);
        this.listenTo(this.verifyPwdModel, 'sync', this.handlePayPwdResult);
        this.listenTo(this.setDrawCountModel, 'sync', this.handleSetDrawCount);
        this.listenTo(this.getDrawCountModel, 'sync', this.handleGetDrawCount);

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

        this.getDrawCountModel.fetch();
    },
    renderRechageList: function() {
        var model = this.rechargeServiceModel.toJSON();
        var btn = model.result.length > 0 ? ['确定','取消'] : ['取消']

        $('#selectServiceLayer').html(this.serviceListTemplate(model.result));


        var dialog= layer.open({
            type: 1,
            btn: btn,
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

        var enabledItems = $('#applyDrawingLayer').html(this.applyDrawingListTemplate(model.result)).find('input[type="radio"]:enabled');
        var btns = enabledItems.length < 1 ? ['取消'] : ['提交申请','取消'];

        enabledItems.first().attr('checked', 'checked');

        var dialog= layer.open({
            type: 1,
            btn: btns,
            title: '请选择提款申请类别',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['400px', '350px'],
            content: $('#applyDrawingLayer'),
            btn1: function () {
                if(btns.length > 1) {
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
                }

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
        if(this.model.transferId) {
            return
        }
        var model = this.serviceDetailModel.toJSON();
        var moneyIpt;

        if(model.status == 'OK') {
            model = model.result;
            this.selectedServiceModel.set({
                id: this.model.serviceId,
                name: model.name
            })
            if(model.rate == 0) {
                if(model.percent == 0) {
                    moneyIpt = model.money;
                }else {
                    moneyIpt = (model.money * model.percent / 100);
                }
            }else if(model.guaranteeBalance == 0) {
                moneyIpt = model.leftMoney;
            }
            
            this.$('#amountInput').val(moneyIpt).attr('readonly', 'readonly');
        }
    },
    renderTransferLayer: function() {
        var model = this.getTransferInfoModel.toJSON();
        var serviceDetailModel = this.serviceDetailModel.toJSON();

        _.extend(model.result, serviceDetailModel.result);

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
            area: ['450px', '400px'],
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
        this.$('.operate-area').show();

        if(this.operateType == 'services') {
            this.rechargeServiceModel.fetch();
        }else if(this.operateType == 'draw') {
            this.applyDrawingModel.fetch();
            this.$('.operate-area').hide();
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
        var transferModel = this.getTransferInfoModel.toJSON();
        var billInfoModel = this.getBillInfoModel.toJSON();
        var me = this;

        this.submitting = true;
        this.transferGuaranteeModel.set({
            payPwd: params.password + params.passwordTail,
            amount: transferModel.amount,
            billId: billInfoModel.result.id
        })
        this.transferGuaranteeModel.save({}, {
            success: function(res) {
                res = res.toJSON();
                if(res.status == 'OK') {
                    layer.msg(res.result);
                    setTimeout(function() {
                        location.href = 'userInfo.html#account';
                    }, 1000);
                }
            },
            complete: function(res) {
                layer.close(this.transferDialog);
                this.submitting = false;
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
                });
                break;
            case 'services':
                if(!this.selectedServiceModel.get('id')) {
                    return;
                }
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
                this.getTransferInfoModel.set('amount', this.amount);
                this.once('handleBillInfo', this.handleBillInfo);

                var queue = [this.getBillInfoModel.fetch({
                    data: {
                        reqId: this.model.transferId
                    }
                }), this.serviceDetailModel.fetch({
                    data: {
                        reqId: this.model.transferId
                    }
                })];

                $.when.apply($, queue).done(function() {
                    this.trigger('handleBillInfo');
                }.bind(this));
                
                break;
        }
        
    },
    handleBillInfo: function() {
        var billInfoModel = this.getBillInfoModel.toJSON();

        if(!billInfoModel.result) return;

        var billId = billInfoModel.result.id;
        
        this.getTransferInfoModel.fetch({
            data: {
                billId: billId
            }
        })
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
    },
    toggleDrawBtnStatus: function() {
        var $target = $('#passDrawContent #passwordTail');
        var btn = $('#payPwdLayer').parents('.layui-layer').find('.layui-layer-btn0');
        if($target.val()) {
            btn.removeClass('disabled');
        }else {
            btn.addClass('disabled');
        }
    },
    setDrawCount: function() {
        // if($('#passDrawContent').find('.pass-wrap').length < 1) {
            this.$passDrawContent = $('#passDrawContent');
            this.$passDrawForm = $('#passDrawForm');

            // 加密码框view到页面中
            this.$passDrawContent.append(new passwordView({
                model: {
                    title: '',
                    name: 'password'
                }
            }).$el);

            this.$passwordDrawTail = $('#payPwdLayer #passwordTail');

            $('#passDrawContent #passwordTail').on('input', this.toggleDrawBtnStatus);
        // }
        

        this.verifyPayPwdDialog = layer.open({
            type: 1,
            btn: ['确认','取消'],
            title: '请输入支付密码',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['400px', '250px'],
            content: $('#payPwdLayer'),
            success: function() {
                $('#payPwdLayer').parents('.layui-layer').find('.layui-layer-btn0').addClass('disabled');
            },
            btn1: function () {
                if($('#payPwdLayer').parents('.layui-layer').find('.layui-layer-btn0').hasClass('disabled')) {
                    return;
                }

                var params = this.$passDrawForm.serializeObject();
                this.verifyPwdModel.fetch({
                    data: {
                        pwd: params.password + params.passwordTail
                    }
                })
            }.bind(this),
            btn2: function () {
                layer.close(this.verifyPayPwdDialog);
            }.bind(this),
            end: function() {
                this.$passDrawContent.empty();
            }.bind(this)
        });
    },
    handleDrawCountIpt: function() {
        var $count = $('#drawCountIpt');
        var num = +$count.val();

        if(typeof num != 'number') {
            $count.val(1);
        }else if(num < 1) {
            $count.val(1);
        }else if(num > 10) {
            $count.val(10);
        }
    },
    handlePayPwdResult: function() {
        var model = this.verifyPwdModel.toJSON();

        if(model.status == 'OK') {
            layer.close(this.verifyPayPwdDialog);
            var dialog = layer.open({
                type: 1,
                btn: ['确认','取消'],
                title: '请输入次数',
                shade: 0.6,
                shadeClose: true,
                closeBtn:'1',
                area: ['250px', '250px'],
                content: $('#drawCountLayer'),
                success: function() {
                    $('#drawCountIpt').on('change', this.handleDrawCountIpt)
                }.bind(this),
                btn1: function () {
                    this.setDrawCountModel.fetch({
                        data: {
                            withdrawTimes: $('#drawCountIpt').val()
                        }
                    })
                }.bind(this),
                btn2: function () {
                    layer.close(dialog);
                }
            })
        }
    },
    handleSetDrawCount: function() {
        var model = this.setDrawCountModel.toJSON();

        if(model.status == 'OK') {
            layer.closeAll();
            this.getDrawCountModel.fetch();
        }
    },
    handleGetDrawCount: function() {
        var model = this.getDrawCountModel.toJSON();

        if(model.status == 'OK' && model.result && model.result.withdrawTimes) {
            $('#drawCountTip').html(model.result.withdrawTimes + '次')
            $('#drawCountIpt').val(model.result.withdrawTimes)
        }
    }
})
module.exports = amountView;