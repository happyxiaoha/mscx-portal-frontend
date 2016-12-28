/**
 * Created by Kevin on 2016/12/6.
 */


var commonTemplate = require('html!./orderCommon.html');
var orderTemplate = require('html!./orders.html');
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

    },
    initialize: function() {
        var that = this;
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
    buildList: function (list) {
        var begObj = {
            begInx: 0,
            count: 0,
            orderNum: null
        };
        for(var i = 0, len = list.length; i < len; i++){
            var obj = list[i],
                orderNum = obj.orderNum;
            if(!begObj.orderNum) {
                begObj.orderNum = orderNum;
                begObj.begInx = i;
                begObj.count = 1;
            }
            else {
                if(begObj.orderNum != obj.orderNum){
                    list[begObj.begInx].count = begObj.count;
                    begObj.orderNum = orderNum;
                    begObj.begInx = i;
                    begObj.count = 1;
                }
                else {
                    obj.isDump = true;
                    begObj.count++;
                }
            }
            console.log(list);
        }
        return list;
    },
    render: function () {
        var res = this.model.get('result'),
            that = this,
            orderList = res.list,
            page = res.page;
        orderList = this.buildList(orderList);
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
    initRender: function () {
        this.$el.find('#orderInfo').html(orderTemplate);
    }
});

module.exports = orderView;