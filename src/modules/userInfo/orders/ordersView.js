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

var orderView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 5,
        pageNum: 1,
        totalPage: 1
    },
    events: {
        'click .toOrderPay': 'toPay'
    },
    initialize: function() {
        var that = this;
        this.$el.addClass('user-center-tap');
        this.$el.html(_.template(commonTemplate)({name:'order'}));
        this.model = new orderListModel();
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
        var $this = $(e.target);
            orderNum = $this.attr('attrOrderId');

        var param = {
            orderNum: orderNum
        };
        var base = new Base64;
        window.localStorage.setItem('orderInfo', base.encode(JSON.stringify(param)));
        location.href = 'pay.html';
        e.stopPropagation();
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
    }
});

module.exports = orderView;