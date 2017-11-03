/**
 * Created by Kevin on 2016/12/6.
 */


var commonTemplate = require('./orderCommon.html');
var orderTemplate = require('./orders.html');
require('./orders.css');
require('util');
var orderListModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/getOrderList.do'
});
var updateShopModel = Backbone.Model.extend({
    url: mscxPage.request.uc + 'shopping/cart/user/modify/times.do'
});
var cancelOrderModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/cancelOrder.do'
});
var serviceDetailModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'getServiceDetailOfMe.do'
});

var orderView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 5,
        pageNum: 1,
        totalPage: 1
    },
    events: {
        'click .toOrderPay': 'toPay',
        'click .toCancelPay': 'cancelPay'
    },
    initialize: function() {
        var that = this;
        this.$el.html(_.template(commonTemplate)({name:'order'}));
        this.model = new orderListModel();
        this.cancelOrderModel = new cancelOrderModel();
        this.serviceDetailModel = new serviceDetailModel();

        this.listenTo(this.cancelOrderModel, 'sync', this.handleCancelOrder);
        this.listenTo(this.serviceDetailModel, 'sync', this.handleServiceOrder);
        this.model.on('change',function () {
            that.render();
        });
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
        this.initRender();
    },
    toPay: function (e) {
        e.stopPropagation();
        var $this = $(e.target);
            orderNum = $this.attr('attrOrderId'),
            orderClassify = $this.data('classify');

        var list = this.model.toJSON().result.list;
        var orderItem;

        this.jumpPay(orderNum);

        // // 如果是保证金充值订单，先判断该资源是否已经下架
        // if(orderClassify == 3) {
        //     orderItem = _.find(list, function(item) {
        //         return item.orderNum == orderNum
        //     }) 

        //     this.serviceDetailModel.set('orderNum', orderNum);
        //     this.serviceDetailModel.fetch({
        //         data: {
        //             id: orderItem.sourceDetail[0].resourceId
        //         }
        //     })
        // }else {
        //     this.jumpPay(orderNum);
        // }
    },
    jumpPay: function(orderNum) {
        var param = {
            orderNum: orderNum
        };
        var base = new Base64;
        window.localStorage.setItem('orderInfo', base.encode(JSON.stringify(param)));
        location.href = 'pay.html';
    },
    cancelPay: function(e) {
        var $this = $(e.target);
            orderNum = $this.data('orderid');

        this.cancelOrderModel.fetch({
            data: {
                orderNo: orderNum
            }
        })
    },
    render: function () {
        var res = this.model.get('result'),
            that = this,
            orderList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        var temps = _.template($('#orderList').html());
        this.$el.find('tbody').html(temps({orderList: orderList}));
        laypage({
            cont: 'orderPages',
            skip: true,
            pages: this.pagObj.totalPage,
            curr: this.pagObj.pageNum || 1,
            jump: function(obj, first){
                if(!first){
                    that.pagObj.pageNum = obj.curr;
                    that.reloadPage();
                }
            }
        });
    },
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    initRender: function () {
        this.$el.find('#orderInfo').html(orderTemplate);
    },
    handleCancelOrder: function() {
        var model = this.cancelOrderModel.toJSON();

        layer.msg(model.message);
        setTimeout(function() {
            this.reloadPage();
        }.bind(this), 1000);
    },
    handleServiceOrder: function() {
        var model = this.serviceDetailModel.toJSON();

        if(model.status == 'OK') {
            if(model.result.status == 7) {
                layer.alert('该资源已经下架了，不能支付');
            }else {
                this.jumpPay(model.orderNum);
            }
        }
    }
});

module.exports = orderView;