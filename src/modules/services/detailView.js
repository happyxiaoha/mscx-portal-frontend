/**
 * Created by Administrator on 2016/12/14.
 */

'use strict';

var serviceDetailModelTemplate = require('./detailTemplate.html');
var shareView = require('shareWidget/shareView.js');
var offlineView = require('offlineWidget/offlineLayer.js');
var applyView = require('./applyLayer.js');
var selectedView = require('selectedServiceWidget/selectedServiceView.js');

var serviceDetailModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'get.do'
});

var attentionModel = Backbone.Model.extend({   //关注
    url: mscxPage.request.app + 'attention/add.do'
});

var reAttentionModel = Backbone.Model.extend({   //取消关注
    url: mscxPage.request.app + 'attention/delete.do'
});
var userScoreModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'userScore/add.do'
});

require('./services.css');
require('../../lib/jquery.SuperSlide.2.1.1.js');

var openDataDetailView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    template: _.template(serviceDetailModelTemplate,{variable: 'data'}),
    events: {
        'click #attention': 'attentionData',
        'click #example': 'showExample',
        'click #offlineBtn': 'offlineChat',
        'click #applyBtn': 'apply'
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
        this.selectedView = new selectedView();

        this.attentionDataModel = new attentionModel();
        this.removeAttentionModel = new reAttentionModel();
        this.userScoreModel = new userScoreModel();
        this.listenTo(this.attentionDataModel, 'sync', this.handleAttention);
        this.listenTo(this.removeAttentionModel, 'sync', this.handlereAttention);
        this.listenTo(this.userScoreModel, 'sync', this.handleScore);

        this.listenTo(this.model, 'sync', this.render);
    },
    render: function () {
        this.nJson = this.model.toJSON().result;

        this.$el.toggleClass('loading');
        this.$el.html(this.template( this.nJson ));
        this.$appInfoCons = this.$('.share');
        // 热门微服务区域
        this.$selectedService = this.$('#selectedService');

        this.$appInfoCons.html(this.shareView.$el);

        this.$selectedService.append(this.selectedView.$el).addClass('in');

        this.resourceType = this.nJson.resourceType;
        this.chargeType = this.nJson.chargeType;

        if(this.nJson){
         if(this.nJson.demoImage1 && this.nJson.demoImage2) {
            this.$el.find('.next').show();
            this.$el.find('.prev').show();

            $(".picScroll-left").slide({
                // titCell: ".hd ul",
                mainCell: ".bd ul",
                autoPage: true,
                effect: "left",
                autoPlay: false,
                vis: 1,
                trigger: "click"
            });
        }
        }

        // 只有实名认证用户可以评分
        if(mscxPage.userInfo && mscxPage.userInfo.userType !== 'REGISTER') {
            this.$('.rating').removeClass('hide');
            this.$('.rating span').on('mouseover', function() {
                var index = $(this).data('index');
                $('.rating span').slice(0, index + 1).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
            }).on('mouseleave', function() {
                $('.rating span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
            }).one('click', this.handleRate.bind(this));
        }
    },
    handleScore: function() {
        var result = this.userScoreModel.toJSON();

        if(result.status == 'OK') {

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
    showExample: function () {
        var that =this,
            url = that.nJson.demoUri;
        if(url.indexOf('http') < 0){
            url = 'http://' + url
        }
        layer.open({
            type: 2,
            title: that.nJson.name+'演示',
            shadeClose: false,
            maxmin: true,
            shade: 0.8,
            area: ['500px', '500px'],
            content: url //iframe的url
        });
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

        var btn = this.chargeType == '01' ? ['完成'] : ['立即支付', '加入购物车']

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
                type: 6
            }
        });
        this.offlineView.delegate = this;
        this.$el.append(this.offlineView.$el);
        
        layer.open({
            type: 1,
            btn: ['确定','取消'],
            title: '<p class="ft22">需求</p>',
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
    // 评分
    handleRate: function(e) {
        var $this = $(e.target);

        var index = $this.data('index');
        $('.rating span').slice(0, index + 1)
            .removeClass('glyphicon-star-empty')
            .addClass('glyphicon-star');

        this.userScoreModel.fetch({
            data: {
                appId: this.id,
                score: index + 1
            }
        })

        $('.rating span').off();
    }
});


module.exports = openDataDetailView;
