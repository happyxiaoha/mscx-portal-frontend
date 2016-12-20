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
        this.shareView = new shareView();
        this.attentionDataModel = new attentionDataModel();
        this.removeAttentionModel = new removeAttentionModel();

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
        var $target = this.$(event.currentTarget);
        var index = $target.data('index');
        var me = this,
            item = me.model.toJSON().result;

        this.applyView = new applyView({
            id: me.id,
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
            shadeClose: true,
            area: ['500px'],
            content: this.applyView.$el,
            end: function() {
                me.applyView.remove();
            }
        };

        layer.open(_.extend(layerParam, btnCallback));

    }
});


module.exports = openDataDetailView;
