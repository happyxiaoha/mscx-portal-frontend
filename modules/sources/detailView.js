/**
 * Created by Administrator on 2016/12/14.
 */

'use strict';

var detailTemplate = require('html!./detailTemplate.html');
var selectedView = require('hotDataReportWidget/dataReportView.js');
var applyView = require('./applyLayer.js');

var dataDetailModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'getDataDetail.do'
});
//下载数据
var downloadModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'data/download.do'
});
//判断数据是否已购
var purchaseOrNotModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'order/purchaseOrNot.do'
});

require('util');

var detailView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    events: {
        'click .downLoadBtn': 'downloadData',
    },
    template: _.template(detailTemplate,{variable: 'data'}),
    initialize: function() {
        this.$el.html();
        // this.$el.toggleClass('loading');
        this.model = new dataDetailModel();
        this.model.fetch({
            data: {
                dataId: this.id
            }
        });
        this.selectedView = new selectedView();

        this.purchaseOrNotModel = new purchaseOrNotModel();
        this.downloadModel = new downloadModel();

        this.listenTo(this.purchaseOrNotModel, 'sync', this.handlePurchase);
        this.listenTo(this.model, 'sync', this.render);
    },
    render: function () {
        this.nJson = this.model.toJSON().result;

        this.$el.toggleClass('loading');
        this.$el.html(this.template( this.nJson ));

        // 热门数据报告区域
        this.$hotDataReport = this.$('#hotDataReport');

        this.$hotDataReport.append(this.selectedView.$el).addClass('in');
    },
    downloadData: function(event) {
        this.purchaseOrNotModel.fetch({
            data: {
                sourceId: this.id,
                char_rule_id: '-1',
                sourceType: '02'
            }
        });
    },
    handlePurchase: function (res) {
        res = res.toJSON();
        var that = this;
            that.curr = that.model.toJSON().result;
        if(res.result =='02'){
            layer.confirm('该资源已经购买是否立即下载？', {
                btn: ['立即下载', '取消']
            }, function(index, layero){
                var newTarget = window.open('about:blank', '_blank'); //打开新的tab页
                that.downloadModel.fetch({
                    data: {
                        dataId: that.id
                    },
                    success: function(res){
                        res = res.toJSON();
                        newTarget.location.href= res.result; //在打开的tab页下载

                        if(!that.isIE()){
                            setTimeout(function(){newTarget.close()}, 1000);
                        }

                    }
                }) ;
                layer.close(index)
            }, function(index){
                layer.close(index)
            });
        }
        else  if(res.result =='01'){
            layer.confirm('该资源已经下单请付款', {
                btn: ['去付款', '取消']
            }, function(index, layero) {
                layer.close(index);
                window.open('userInfo.html#order','_self');
            })
        }
        else {
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
    },
    isIE: function() { //ie?
        if (!!window.ActiveXObject || "ActiveXObject" in window)
            return true;
        else
            return false;
    }
});


module.exports = detailView;
