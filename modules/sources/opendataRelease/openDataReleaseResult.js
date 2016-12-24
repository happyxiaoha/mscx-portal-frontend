'use strict';

var wrapTemplate = require('html!./openDataReleaseContent.html');
var listTemplate = require('html!./openDataSearchResult.html');
var applyView = require('./applyLayer.js');

//判断数据是否已购
var purchaseOrNotModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/purchaseOrNot.do'
});
//下载数据
var downloadModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'data/download.do'
});

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'animate-content posRE opacity0',
    wrapTemplate: _.template(wrapTemplate),
    listTemplate: _.template(listTemplate, {variable: 'data'}),
    events: {
        'click .sort a': 'sort',
        'click .downLoadBtn': 'download'
    },
    initialize: function() {
        this.$el.html(this.wrapTemplate());
        this.purchaseOrNotModel = new purchaseOrNotModel();

        this.downloadModel = new downloadModel();
        this.listenTo(this.purchaseOrNotModel, 'sync', this.handlePurchase);
        this.listenTo(this.downloadModel, 'sync', this.handleDownload);


        this.$dataList = this.$('#searchResult');
        this.$count = this.$('#count');
        this.$sort = this.$('.sort');
    },
    render: function(model) {
        this.$el.removeClass('opacity0');
        var result = model.toJSON().result || {};

        var list = result.list || [];
        var pageInfo = result.page || {};
        var me = this;

        this.list = list;

        if(list.length < 1) {
            this.$sort.hide();
            this.$dataList.html('暂无数据');
        }else {
            this.$sort.show();
            this.$dataList.html(this.listTemplate(list));
        }
        this.$count.html(pageInfo.totalSize || 0);

        laypage({
            cont: 'page',
            skip: true,
            curr: pageInfo.currentPage || 1,
            pages: pageInfo.totalPage,
            jump: function(obj, first) {
                if(!first) {
                    me.trigger('page', {
                        page: obj.curr,
                        pageSize: '10'
                    })
                }
            }
        })
    },
    sort: function(event) {
        // 排序方式
        var $target = this.$(event.currentTarget);
        var type = $target.data('type') || '';

        $target.parent().find('.active').removeClass('active');
        $target.addClass('active');


        this.trigger('sort', {
            orderBy: type
        })
    },
    download: function(event) {
        var $target = this.$(event.currentTarget);
        var index = $target.data('index');
        var item = this.list[index];
        this.curr = item;
        this.purchaseOrNotModel.fetch({
            data: {
                sourceId: item.id,
                char_rule_id: '-1',
                sourceType: '02'
            }
        });
    },
    handlePurchase: function (res) {
        res = res.toJSON();
        var that = this;
        if(res.result =='02'){
            layer.confirm('该资源已经购买是否立即下载？', {
                btn: ['立即下载', '取消']
            }, function(index, layero) {
                var newTarget = window.open('about:blank', '_blank'); //打开新的tab页
                that.downloadModel.fetch({
                    data: {
                        dataId: that.curr.id
                    },
                    success: function (res) {
                        res = res.toJSON();
                        newTarget.location.href = res.result; //在打开的tab页下载
                        setTimeout(function(){newTarget.close()}, 1000);
                    }
                });
                layer.close(index);
            })
        }
        else if(res.result =='01'){
            layer.confirm('该资源已经下单请付款', {
                btn: ['去付款', '取消']
            }, function(index, layero) {
                layer.close(index);
                window.open('userInfo.html#order','_self');
            })
        }
        else{
            this.applyView = new applyView({
                id: that.curr.id,
                model: that.curr
            });
            this.$el.append(this.applyView.$el);
            var btn = that.curr.chargeType === '02'? ['立即支付', '加入购物车']: ['立即下载', '取消'];
            var btnCallback =  that.curr.chargeType === '02'? {
                 btn1: function (index) {
                     that.applyView.order(index);
                 },
                 btn2: function (index) {
                     that.applyView.addCart(index);
                 }
                 } : {btn1: function (index) {
                        that.applyView.order(index);
                    },
                    btn2: function (index) {
                         layer.close(index);
                    }};

            var layerParam = {
                type: 1,
                btn: btn,
                title: '下载详情',
                shade: 0.6,
                shadeClose: false,
                area: ['500px'],
                content: this.applyView.$el,
                end: function () {
                    that.applyView.remove();
                }
            };
            layer.open(_.extend(layerParam, btnCallback));

    }
}
});

module.exports = view;