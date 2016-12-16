'use strict';

var template = require('html!./applyTemplate.html');

// 套餐api
var packageModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-api-api/charge/getChargeRuleByServiceId.do'
});
// 免费api下单
var freeOrderModel = Backbone.Model.extend({
    url: mscxPage.host + '/order/freeApi/placeOrder.do'
});
// 收费api下单
var feeOrderModel = Backbone.Model.extend({
    url: mscxPage.host + '/order/feeApi/placeOrder.do'
});
// 加入购物车
var addCartModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-uc-api/shopping/cart/user/add.do'
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
        this.freeOrderModel = new freeOrderModel();
        this.feeOrderModel = new feeOrderModel();
        this.addCartModel = new addCartModel();

        this.chargeType = this.model.chargeType;

        this.listenTo(this.packageModel, 'sync', this.render);
        this.listenTo(this.addCartModel, 'sync', this.handleCart);
        this.listenTo(this.feeOrderModel, 'sync', this.handleFeeOrder);
        this.listenTo(this.freeOrderModel, 'sync', this.handleFreeOrder);

        this.on('caculate', this.caculate);

        this.packageModel.fetch({
            data: {
                apiServiceId: this.id
            }
        })
    },
    render: function() {
        this.$el.html(this.template(this.packageModel.toJSON()));
        this.trigger('caculate');
    },
    changeTdTotal: function(event) {
        var $target = this.$(event.currentTarget);
        var $tr = $target.parents('tr');
        var $number = $tr.find('.number');
        var num = $number.val();
        var price = $number.data('price');

        if(num < 0) {
            $target.val(0);
            num = 0;
        }

        $tr.find('.total').html(num * price);

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
            totalPrice += num * price;
        }

        this.$el.find('#selectedCount').html(count);
        this.$el.find('#totalPirce').html(totalPrice);
    },
    // 立即支付
    order: function(index) {
        var sourceType = this.delegate.sourceType,
            isAgree = this.$('#agreementBtn')[0].checked,
            msg = '';

        var $selected = this.$el.find('td input[type="radio"]:checked'),
            $tr = $selected.parents('tr'),
            $number = $tr.find('.number'),
            num = $number.val(),
            ruleId = $number.data('id');

        // 免费API的提交
        if(this.chargeType == '01') {
            this.freeOrderModel.fetch({
                data: {
                    apiId: this.id
                }
            })
        }else {
            this.feeOrderModel.fetch({
                data: {
                    apiId: this.id,
                    charRuleId: ruleId,
                    itemNum: num
                }
            })
        }
        return;
        

        if($selected.length < 1) {
            msg += '请至少选择一个资源';
        }else {
            !isAgree && (msg += '请阅读并接受资源服务协议');
        }
        
        if(msg) {
            layer.alert(msg);
            return;
        }

        this.orderModel.fetch({
            data: {
                apiId: apiId
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
        layer.alert('添加购物车成功！');

        if(model.status == 'OK') {
            layer.close(this.layerIndex);
        }
    },
    handleFeeOrder: function() {
        var model = this.feeOrderModel.toJSON();
    },
    handleFreeOrder: function() {
        var model = this.freeOrderModel.toJSON();
    }
});

module.exports = view;