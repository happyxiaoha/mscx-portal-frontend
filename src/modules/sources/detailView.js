/**
 * Created by Administrator on 2016/12/14.
 */

'use strict';

var detailTemplate = require('./detailTemplate.html');
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
var followModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'addUserDataAttention.do'
})
var unFollowModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'removeUserDataAttention.do'
})
require('util');

var detailView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    events: {
        'click .downLoadBtn': 'downloadData',
        'click #follow': 'follow'
    },
    template: _.template(detailTemplate,{variable: 'data'}),
    initialize: function() {
        this.$el.empty();
        this.model = new dataDetailModel();
        this.followModel = new followModel({
            dataId: this.id
        });
        this.unFollowModel = new unFollowModel();
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
        this.listenTo(this.followModel, 'sync', this.handleFollow);
        this.listenTo(this.unFollowModel, 'sync', this.handleUnFollow);
    },
    render: function () {
        this.nJson = this.model.toJSON().result;

        this.$el.html(this.template( this.nJson ));

        this.attentionFlag = this.nJson.attentionFlag;

        // 热门数据报告区域
        this.$hotDataReport = this.$('#hotDataReport');

        this.$hotDataReport.append(this.selectedView.$el).addClass('in');

        // 只有实名认证用户可以评分
        if(mscxPage.userInfo && mscxPage.userInfo.userType !== 'REGISTER') {
            this.$('.rating span').on('mouseover', function() {
                var index = $(this).data('index');
                $('.rating span').slice(0, index + 1).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
            }).on('mouseleave', function() {
                $('.rating span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
            }).one('click', this.handleRate);
        }
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
    },
    follow: function() {
        if(!this.attentionFlag) {
            this.followModel.save();
        }else {
            this.unFollowModel.fetch({
                data: {
                    dataId: this.id
                }             
            });
        }
    },
    handleFollow: function() {
        var model = this.followModel.toJSON();
        if(model.status == 'OK') {
            layer.msg('关注成功');
            this.attentionFlag = 1;
            this.$('#follow').text('取消关注');
        }
    },
    handleUnFollow: function() {
        var model = this.unFollowModel.toJSON();
        if(model.status == 'OK') {
            layer.msg('取消关注成功');
            this.attentionFlag = 0;
            this.$('#follow').text('关注');
        }
    },
    // 评分
    handleRate: function(e) {
        var $this = $(e.target);

        var index = $this.data('index');
        $('.rating span').slice(0, index + 1)
            .removeClass('glyphicon-star-empty')
            .addClass('glyphicon-star');

        $('.rating span').off();
    }
});


module.exports = detailView;
