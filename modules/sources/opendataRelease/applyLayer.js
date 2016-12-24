'use strict';

var template = require('html!./applyTemplate.html');

// 数据数据下单
var freeOrderModel = Backbone.Model.extend({
    url: 'order/freeData/placeOrder.do'
});
// 收费数据下单
var feeOrderModel = Backbone.Model.extend({
    url: 'order/feeData/placeOrder.do'
});

//下载数据
var downloadModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'data/download.do'
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
        'click input[type="radio"]': 'selectPackage',
        'click .D_table tr': 'selectRadio'
    },
    initialize: function() {
        this.freeOrderModel = new freeOrderModel();
        this.feeOrderModel = new feeOrderModel();
        this.addCartModel = new addCartModel();
        this.downloadModel = new downloadModel();
        // 收费/免费
        this.chargeType = this.model.chargeType;

        this.listenTo(this.downloadModel, 'sync', this.handleDownload);

        this.listenTo(this.addCartModel, 'sync', this.handleCart);
        this.listenTo(this.feeOrderModel, 'sync', this.handleFeeOrder);


        this.render();

    },
    render: function() {
        this.$el.html(this.template(this.model));
    },
    // 立即支付
    order: function(index) {
        var isAgree = this.$('#agreementBtn')[0].checked,
            that = this,
            msg = '';

        !isAgree && (msg += '请阅读并接受资源服务协议');

        if(msg) {
            layer.alert(msg);
            return;
        }

        that.layerIndex = index;

        // 免费API的提交
        if(that.chargeType == '01') {
            var newTarget = window.open('about:blank', '_blank'); //打开新的tab页
            that.freeOrderModel.fetch({
                data: {
                    dataId: that.id
                },
                success: function (res) {
                    res = res.toJSON();
                    newTarget.location.href = res.result; //在打开的tab页下载
                    layer.close(that.layerIndex);
                    setTimeout(function(){newTarget.close()}, 1000);
                }
            })
        }else {
            that.feeOrder();
        }
    },
    handleDownload: function(res){
        res = res.toJSON();
        if(res.status =='OK'){
            window.open(res.result);
        }
    },
    feeOrder: function() {

        this.feeOrderModel.fetch({
            data: {
                dataId: this.id
            }
        })
    },
    // 加入购物车
    addCart: function(index) {
        var resourceType = this.model.resourceType || '02',
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
            resourceId: this.id
        })
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
        if(model.status != 'OK') {
            layer.alert('API下单失败！');
            return;
        }

        var param = {
            orderNum: model.result,
            amount: this.model.price
        };

        var base = new Base64;
        window.localStorage.setItem('orderInfo', base.encode(JSON.stringify(param)));
        location.href = 'pay.html';
    },
    handleFreeOrder: function(res) {
        var model = this.freeOrderModel.toJSON();

        //layer.alert(model.message);

        this.downloadModel.fetch({
            data: {
                dataId: this.id
            }
        }) ;
        if(model.status == 'OK') {
            layer.close(this.layerIndex);
        }
    }
});

module.exports = view;