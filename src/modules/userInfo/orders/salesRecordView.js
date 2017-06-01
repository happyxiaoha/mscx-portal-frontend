
var commonTemplate = require('html!./orderCommon.html');
var salesRecordTemplate = require('html!./salesRecord.html');
require('./orders.css');

var recordListModel = Backbone.Model.extend({
    url: 'order/getSaledOrderList.do'
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
        this.$el.html(_.template(commonTemplate)({name:'sales'}));
        this.model = new recordListModel();
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
        var res = this.model.get('result'),
            that = this,
            salesList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        var temps = _.template($('#salesList').html());
        this.$el.find('tbody').html(temps({salesList: salesList}));
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
        this.$el.find('#orderInfo').html(salesRecordTemplate);
    }
});

module.exports = orderView;