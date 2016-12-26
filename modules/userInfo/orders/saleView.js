/**
 * Created by Kevin on 2016/12/6.
 */


var commonTemplate = require('html!./orderCommon.html');
var orderTemplate = require('html!./sale.html');
require('./orders.css');
require('util');
var saleListModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/getOrderList.do'
});
var updateShopModel = Backbone.Model.extend({
    url: mscxPage.request.uc + 'shopping/cart/user/modify/times.do'
});

var saleView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 5,
        pageNum: 1,
        totalPage: 1
    },
    events: {

    },
    initialize: function() {
        var that = this;
        this.$el.html(_.template(commonTemplate)({name:'sale'}));
        this.model = new saleListModel();
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
    render: function () {

    },
    initRender: function () {
        this.$el.find('#orderInfo').html(orderTemplate);
    }
});

module.exports = saleView;