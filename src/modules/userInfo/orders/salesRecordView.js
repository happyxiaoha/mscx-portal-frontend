
var commonTemplate = require('html!./orderCommon.html');
var salesRecordTemplate = require('html!./salesRecord.html');
require('./orders.css');
require('util');

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
        // 'click .show-detail': 'showDetail'
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
            page = res.page;
        this.salesList = res.list;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        var temps = _.template($('#salesList').html());
        this.$el.find('tbody').html(temps({salesList: this.salesList}));
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

        this.sourceTemplate = _.template(this.$el.find('#sourceList').html(), {variable: 'data'});
    },
    showDetail: function(event) {
        var $target = this.$(event.target);
        var index = $target.data('index');

        index = (this.pagObj.pageNum - 1) * this.pagObj.pageSize + index;

        var source = JSON.parse(this.salesList[index].sourceJson);

        this.$el.find('#sourceLayer').html(this.sourceTemplate(source));

        layer.open({
            type: 1,
            title: '详情',
            btn: ['关闭'],
            shade: 0.6,
            shadeClose: true,
            area: ['500px'],
            content: this.$el.find('#sourceLayer')
        })
    }
});

module.exports = orderView;