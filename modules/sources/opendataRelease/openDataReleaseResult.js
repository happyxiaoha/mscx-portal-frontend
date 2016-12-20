'use strict';

var wrapTemplate = require('html!./openDataReleaseContent.html');
var listTemplate = require('html!./openDataSearchResult.html');
var applyView = require('./applyLayer.js');

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

        this.$dataList = this.$('#searchResult');
        this.$page = this.$('.page');
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
        debugger;
        var $target = this.$(event.currentTarget);
        var index = $target.data('index');
        var item = this.list[index];
        var me = this;

        this.applyView = new applyView({
            id: item.id,
            model: item
        });
        console.log(item);
        this.$el.append(this.applyView.$el);
        var btn = item.chargeType == '01' ? ['直接下载', '取消'] : ['立即支付', '加入购物车'];
        var btnCallback = item.chargeType == '01' ? {
            btn1: function (index) {
                me.applyView.order(index);
            },
            btn2: function(index) {
                layer.close(index);
            }
        } : {
            btn1: function (index) {
                me.applyView.order(index);
            },
            btn2: function(index) {
                me.applyView.addCart(index);
            }
        };

        var layerParam = {
            type: 1,
            btn: btn,
            title: '下载详情',
            shade: 0.6,
            shadeClose: false,
            area: ['500px'],
            content: this.applyView.$el,
            end: function() {
                me.applyView.remove();
            }
        };

        layer.open(_.extend(layerParam, btnCallback));

    }
});

module.exports = view;