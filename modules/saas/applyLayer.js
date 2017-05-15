'use strict';

var template = require('html!./applyTemplate.html');

// saas服务套餐
var packageModel = Backbone.Model.extend({
    url: mscxPage.request.saas + 'chargeRule/get.do'
});
// 免费微服务是否已经购买
// var freeIsBaughtModel = Backbone.Model.extend({
//     url: mscxPage.request.order + 'order/purchaseOrNot.do'
// });
// 免费微服务下单
var freeOrderModel = Backbone.Model.extend({
    url: 'order/freeApp/placeOrder.do'
});
// 收费微服务下单
var feeOrderModel = Backbone.Model.extend({
    url: 'order/feeApp/placeOrder.do'
});
// 加入购物车
var addCartModel = Backbone.Model.extend({
    url: mscxPage.request.uc + 'shopping/cart/user/add.do'
});

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'apply-box hide',
    template: _.template(template, {variable: 'data'}),
    events: {
        'change .number': 'changeTdTotal',
        'click input[type="radio"]': 'selectPackage',
        'click .D_table tr': 'selectRadio'
    },
    initialize: function() {
        this.packageModel = new packageModel();
        // this.freeIsBaughtModel = new freeIsBaughtModel();
        this.freeOrderModel = new freeOrderModel();
        this.feeOrderModel = new feeOrderModel();
        this.addCartModel = new addCartModel();

        // 收费/免费
        this.chargeType = this.model.chargeType;

        this.listenTo(this.packageModel, 'sync', this.render);
        this.listenTo(this.addCartModel, 'sync', this.handleCart);
        this.listenTo(this.feeOrderModel, 'sync', this.handleFeeOrder);
        this.listenTo(this.freeOrderModel, 'sync', this.handleFreeOrder);
        // this.listenTo(this.freeIsBaughtModel, 'sync', this.handleIsBaughtOrder);

        this.on('caculate', this.caculate);

        // 如果是免费的或者是后付款的，就不需要获取套餐
        if(this.chargeType == '01' || this.chargeType == '03') {
            this.render();
        }else {
            this.packageModel.fetch({
                async: false,
                data: {
                    saasId: this.id
                }
            })
        }      
    },
    render: function() {
        this.packageModel.set('chargeType', this.chargeType);
        this.$el.html(this.template(this.packageModel.toJSON()));
        this.trigger('caculate');

        return this;
    },
    changeTdTotal: function(event) {
        var $target = this.$(event.currentTarget);
        var $tr = $target.parents('tr');
        var $number = $tr.find('.number');
        var num = Math.floor($number.val());
        $number.val(num);
        var price = $number.data('price');

        // var limit = $number.data('limit');

        if(num < 1) {
            $target.val(1);
            num = 1;
        }

        $tr.find('.total').html((10000*price*num)/10000);

        this.trigger('caculate');
    },
    selectPackage: function(event) {
        event.stopPropagation();

        var $selected = this.$el.find('td input[type="radio"]:checked');
        var $tr = $selected.parents('tr');

        $tr.find('.number').val(1).change();

        this.trigger('caculate');
    },
    caculate: function() {
        var count = 0,
            totalPrice = 0,
            $selected = this.$el.find('td input[type="radio"]:checked');

        if($selected.length > 0) {
            var $tr = $selected.parents('tr'),
                $number = $tr.find('.number'),
                num = $number.val(),
                price = $number.data('price');

            count++;
            totalPrice += (10000*price*num)/10000;
        }

        this.amount = totalPrice;
        this.$el.find('#selectedCount').html(count);
        this.$el.find('#totalPirce').html(totalPrice);
    },
    // 立即支付
    order: function(index) {
        var isAgree = this.$('#agreementBtn')[0].checked,
            msg = '';

        !isAgree && (msg += '请阅读并接受资源服务协议');

        if(msg) {
            layer.msg(msg);
            return;
        }

        this.layerIndex = index;

        // 免费API的提交
        if(this.chargeType == '01') {
            this.freeOrder();   
        }else {
            this.feeOrder();
        }
    },
    freeOrder: function() {
        this.freeOrderModel.fetch({
            data: {
                appId: this.id
            }
        })
        // this.freeIsBaughtModel.fetch({
        //     data: {
        //         sourceId: this.id,
        //         char_rule_id: '-1',
        //         sourceType: this.delegate.resourceType
        //     }
        // })
    },
    feeOrder: function() {
        var $selected = this.$el.find('td input[type="radio"]:checked'),
            $tr = $selected.parents('tr'),
            $number = $tr.find('.number'),
            num = $number.val(),
            ruleId = $number.data('id'),
            msg = '';

        if($selected.length < 1) {
            msg += '请至少选择一个套餐';
        }

        if(msg) {
            layer.msg(msg);
            return;
        }

        this.feeOrderModel.fetch({
            data: {
                appId: this.id,
                charRuleId: ruleId,
                itemNum: num
            }
        })
    },
    // 加入购物车
    addCart: function(index) {
        var resourceType = this.delegate.resourceType,
            isAgree = this.$('#agreementBtn')[0].checked,
            msg = '';

        var $selected = this.$el.find('td input[type="radio"]:checked'),
            $tr = $selected.parents('tr'),
            $number = $tr.find('.number'),
            num = $number.val(),
            ruleId = $number.data('id');

        if(!isAgree) {
            layer.msg('请阅读并接受资源服务协议');
            return;
        }

        if(!ruleId) {
            layer.msg('请至少选择一个套餐');
            return;
        }

        this.layerIndex = index;

        this.addCartModel.save({
            resourceType: resourceType,
            resourceId: this.id,
            chargeRuleId: ruleId,
            applyTimes: num
        })
    },
    selectRadio: function(event) {
        event.stopPropagation();
        // 增减API数量不触发radio
        if(event.toElement.tagName == 'INPUT') return;
        
        var $target = this.$(event.currentTarget);

        this.$el.find('td input[type="radio"]:checked').removeAttr('checked');

        $target.find('input[type="radio"]').click();

        $target.find('.number').val(1).change();
    },
    handleCart: function() {
        var model = this.addCartModel.toJSON();
        layer.msg('添加购物车成功！');

        if(model.status == 'OK') {
            layer.close(this.layerIndex);
        }
    },
    handleFeeOrder: function() {
        var model = this.feeOrderModel.toJSON();

        if(model.status != 'OK') {
            layer.msg('API下单失败！');
            return;
        }

        // 如果是0元套餐，不需要跳转到支付页面，直接提示成功
        if(this.amount == 0 && this.chargeType == '02') {
            layer.msg('购买成功！');
            layer.close(this.layerIndex);
            return;
        }

        var param = {
            orderNum: model.result,
            amount: this.amount
        };

        var base = new Base64;
        window.localStorage.setItem('orderInfo', base.encode(JSON.stringify(param)));
        location.href = 'pay.html';
    },
    // handleIsBaughtOrder: function() {
    //     var model = this.freeIsBaughtModel.toJSON();

    //     if(model.result != '03') {
    //         layer.msg('已经订购');
    //         return;
    //     }

    //     this.freeOrderModel.fetch({
    //         data: {
    //             appId: this.id
    //         }
    //     })
    // },
    handleFreeOrder: function() {
        var model = this.freeOrderModel.toJSON();

        if(model.status == 'OK') {
            layer.msg('申请成功！');
            layer.close(this.layerIndex);
        }else {
            layer.msg(model.message);
        }
    }
});

module.exports = view;