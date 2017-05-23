/**
 * Created by Administrator on 2016/12/14.
 */

'use strict';

var serviceDetailModelTemplate = require('html!./detailTemplate.html');
var shareView = require('shareWidget/shareView.js');
var offlineView = require('offlineWidget/offlineLayer.js');
var applyView = require('./applyLayer.js');

var serviceDetailModel = Backbone.Model.extend({
    url: mscxPage.request.saas + 'get.do'
});

var attentionModel = Backbone.Model.extend({   //关注
    url: mscxPage.request.saas + 'attention/add.do'
});

var reAttentionModel = Backbone.Model.extend({   //取消关注
    url: mscxPage.request.saas + 'attention/delete.do'
});

require('../../lib/jquery.SuperSlide.2.1.1.js');

var openDataDetailView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    template: _.template(serviceDetailModelTemplate,{variable: 'data'}),
    events: {
        'click #attention': 'attentionData',
        'click #offlineBtn': 'offlineChat',
        'click #applyBtn': 'apply',
        'click .titTop a': 'toggleContent'
    },
    initialize: function() {
        this.$el.html();
        this.$el.toggleClass('loading');
        this.model = new serviceDetailModel();
        this.model.fetch({
            data: {
                id: this.id
            }
        });
        this.shareView = new shareView();
        this.attentionDataModel = new attentionModel();
        this.removeAttentionModel = new reAttentionModel();
        this.listenTo(this.attentionDataModel, 'sync', this.handleAttention);
        this.listenTo(this.removeAttentionModel, 'sync', this.handlereAttention);

        this.listenTo(this.model, 'sync', this.render);
    },
    render: function () {
        this.nJson = this.model.toJSON().result;
        this.$el.toggleClass('loading');
        this.$el.html(this.template( this.nJson ));
        this.$appInfoCons = this.$('.share');
        this.$appInfoCons.html(this.shareView.$el);

        this.resourceType = this.nJson.resourceType;
        this.chargeType = this.nJson.chargeType;

        if(this.nJson){
         if(this.nJson.demoImage1 && this.nJson.demoImage2 && this.nJson.demoImage3) {
            this.$el.find('.next').show();
            this.$el.find('.prev').show();

            $(".picScroll-left").slide({
                titCell: ".hd ul",
                mainCell: ".bd ul",
                autoPage: true,
                effect: "left",
                autoPlay: false,
                vis: 2,
                trigger: "click"
            });
        }
        }
    },
    handleAttention: function(res) {
        var model = res.toJSON(),
            that = this;
        if(model.status == 'OK'){
            that.nJson.attentionFlag = true;
            $('#attention').html('取消关注')
        }

        layer.msg('关注成功');
    },
    handlereAttention: function(res) {
        var model = res.toJSON(),
            that = this;
        if(model.status == 'OK') {
            $('#attention').html('关注')
            this.nJson.attentionFlag = false;
        }
        layer.msg('取消关注成功');
    },
    attentionData: function(){
        if(this.nJson.attentionFlag){
            this.removeAttentionModel.fetch({
                data:{id: this.id}
            })
        }
        else{
            this.attentionDataModel.fetch({
                data:{id: this.id}
            })
        }
    },
    // 申请
    apply: function() {
        var me = this;

        if(!mscxPage.isLogin()) {
            return;
        }

        this.applyView = new applyView({
            id: this.id,
            model: {
                chargeType: this.chargeType
            }
        });
        this.$el.append(this.applyView.$el);

        this.applyView.delegate = this;

        var btn = (this.chargeType == '01' || this.chargeType == '03') ? ['完成'] : ['立即支付', '加入购物车']

        layer.open({
            type: 1,
            btn: btn,
            title: '选择您要购买的套餐：',
            shade: 0.6,
            shadeClose: true,
            area: ['500px'],
            content: this.applyView.$el,
            btn1: function (index) {
                me.applyView.order(index);
            },
            btn2: function(index) {
                me.applyView.addCart(index);
            },
            end: function() {
                me.applyView.remove();
            }
        })
    },
    // 线下洽谈
    offlineChat: function() {
        var me = this;
        var detail = this.model.toJSON().result;

        if(!mscxPage.isLogin()) {
            return;
        }

        this.offlineView = new offlineView({
            model: {
                apiServiceId: this.id,
                cname: detail.name,
                type: detail.type || 7
            }
        });
        this.offlineView.delegate = this;
        this.$el.append(this.offlineView.$el);
        
        layer.open({
            type: 1,
            btn: ['确定','取消'],
            title: '<p class="ft22">线下洽谈申请</p>',
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
    toggleContent: function(event) {
        var $target = this.$(event.target);
        var index = $target.data('index');

        this.$('.titTop a').removeClass('corBlue');
        $target.addClass('corBlue');
        this.$('.titTopCons').addClass('hide').eq(index).removeClass('hide');

    }
});


module.exports = openDataDetailView;
