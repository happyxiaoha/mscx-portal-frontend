/**
 * Created by Administrator on 2016/12/13.
 */

'use strict';

var openDataDetailTemplate = require('html!./openDataDetailView.html');
var shareView = require('shareWidget/shareView.js');
var applyView = require('../opendataRelease/applyLayer.js');
var offlineView = require('./offlineLayer.js');

var openDataDetailModel = Backbone.Model.extend({
    url: mscxPage.host+'/ro/mscx-data-api/getDataDetail.do'
});

//下载数据
var downloadModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-data-api/download.do'
});
//判断数据是否已购
var purchaseOrNotModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-order-api/order/purchaseOrNot.do'
});
var attentionDataModel = Backbone.Model.extend({    //关注
    url: mscxPage.host+'/ro/mscx-data-api/addUserDataAttention.do'
});

var removeAttentionModel = Backbone.Model.extend({    //取消关注
    url: mscxPage.host+'/ro/mscx-data-api/removeUserDataAttention.do'
});

var openDataDetailView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    template: _.template(openDataDetailTemplate,{variable: 'data'}),
    events: {
        'click span.attention': 'attentionData',
        'click .downLoadBtn.free': 'downloadData',
        'click #offline': 'offlineChat'
    },
    initialize: function() {
        this.$el.html();
        this.model = new openDataDetailModel();
        this.model.fetch({
           data: {
               dataId: this.id
           }
        });
        this.purchaseOrNotModel = new purchaseOrNotModel();

        this.downloadModel = new downloadModel();
        this.listenTo(this.purchaseOrNotModel, 'sync', this.handlePurchase);

        this.shareView = new shareView();
        this.attentionDataModel = new attentionDataModel();
        this.removeAttentionModel = new removeAttentionModel();

        this.listenTo(this.downloadModel, 'sync', this.handleDownload);
        this.listenTo(this.attentionDataModel, 'sync', this.handleAttention);
        this.listenTo(this.removeAttentionModel, 'sync', this.handlereAttention);
        this.listenTo(this.model, 'sync', this.render);
    },
    render: function () {
        this.$el.html(this.template( this.model.toJSON().result));
        this.$appInfoCons = this.$('.share');
        this.$appInfoCons.html(this.shareView.$el);
    },
    handleAttention: function(res) {
        var model = res.toJSON(),
            that = this;
        if(model.message == 'success'){
            this.nJson.attentionFlag = true;
            $('.attention').html('取消关注').addClass('haves-attention');
        }

        layer.msg(model.result);
    },
    handlereAttention: function(res) {
        var model = res.toJSON(),
            that = this;
        if(model.message == 'success') {
            $('.attention').html('关注').removeClass('haves-attention');
            this.nJson.attentionFlag = false;
        }
        layer.msg(model.result);
    },
    attentionData: function(){
        if(!this.nJson){
            this.nJson = this.model.toJSON().result;
        }
        if(this.nJson.attentionFlag){
            this.removeAttentionModel.fetch({
                data:{dataId: this.id}
            })
        }
        else{
            this.attentionDataModel.save({
                dataId: this.id
            })
        }
    },
    // 线下洽谈
    offlineChat: function() {
        var me = this;

        this.offlineView = new offlineView({
            id: this.id
        });
        this.offlineView.delegate = this;
        this.$el.append(this.offlineView.$el);

        layer.open({
            type: 1,
            btn: ['确定','取消'],
            title: '<p class="ft22">资源使用需求</p>',
            shade: 0.6,
            shadeClose: true,
            area: ['500px', '450px'],
            content: this.offlineView.$el,
            btn1: function (index) {
                me.offlineView.submit(index);
            },
            btn2: function (index) {
                layer.close(index);
            },
            end: function() {
                me.offlineView.remove();
            }
        })
    },
    downloadData: function(event) {
        var me = this;
        if (me.model.toJSON().result.chargeType == '02') {
            this.purchaseOrNotModel.fetch({
                data: {
                    sourceId: me.id,
                    char_rule_id: '-1',
                    sourceType: '02'
                }
            });
        }
        else {
            this.applyView = new applyView({
                id: me.id,
                model: me.model.toJSON().result
            });
            this.$el.append(this.applyView.$el);
            var btn = ['直接下载', '取消'];
            var btnCallback = {
                btn1: function (index) {
                    me.applyView.order(index);
                },
                btn2: function (index) {
                    layer.close(index);
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
                end: function () {
                    me.applyView.remove();
                }
            };
            layer.open(_.extend(layerParam, btnCallback));
        }
    },
    handlePurchase: function (res) {
        res = res.toJSON();
        var me = this;
        if(res.status =='error'){
            layer.confirm('该资源已经购买是否立即下载？', {
                btn: ['立即下载', '取消']
            }, function(index, layero){
                me.downloadModel.fetch({
                    data: {
                        dataId: me.id
                    }
                }) ;
                layer.close(index)
            }, function(index){
                layer.close(index)
            });
        }
        else {
            this.applyView = new applyView({
                id: me.id,
                model: me.model.toJSON().result
            });
            this.$el.append(this.applyView.$el);
            var btn = ['立即支付', '加入购物车'];
            var btnCallback =   {
                btn1: function (index) {
                    me.applyView.order(index);
                },
                btn2: function (index) {
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
                end: function () {
                    me.applyView.remove();
                }
            };
            layer.open(_.extend(layerParam, btnCallback));
        }

    },
    handleDownload: function(res){
        res = res.toJSON();
        if(res.status =='OK'){
            window.open(res.result);
        }
    }
});


module.exports = openDataDetailView;
