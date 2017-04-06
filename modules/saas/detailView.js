/**
 * Created by Administrator on 2016/12/14.
 */

'use strict';

var detailTemplate = require('html!./detailTemplate.html');
var shareView = require('shareWidget/shareView.js');
var selectedView = require('./selectedSaasView.js');
var applyView = require('./applyLayer.js');

var dataDetailModel = Backbone.Model.extend({
    url: mscxPage.request.saas + 'get.do'
});

var attentionModel = Backbone.Model.extend({   //关注
    url: mscxPage.request.saas + 'attention/add.do'
});

var reAttentionModel = Backbone.Model.extend({   //取消关注
    url: mscxPage.request.saas + 'attention/delete.do'
});

var followModel = Backbone.Model.extend({
    url: mscxPage.request.saas + 'attention/add.do'
});
var unFollowModel = Backbone.Model.extend({
    url: mscxPage.request.saas + 'attention/delete.do'
});

require('../../lib/jquery.SuperSlide.2.1.1.js');

var openDataDetailView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    template: _.template(detailTemplate,{variable: 'data'}),
    events: {
        'click #applyBtn': 'apply',
        'click #followBtn': 'follow',
        'click #example': 'showExample',
        'click .nav-tabs a': 'selectTab'
    },
    initialize: function() {
        this.$el.html();
        this.$el.toggleClass('loading');
        this.model = new dataDetailModel();
        this.model.fetch({
            data: {
                id: this.id
            }
        });
        this.shareView = new shareView();
        this.selectedView = new selectedView();

        this.followModel = new followModel();
        this.unFollowModel = new unFollowModel();

        this.attentionDataModel = new attentionModel();
        this.removeAttentionModel = new reAttentionModel();
        this.listenTo(this.attentionDataModel, 'sync', this.handleAttention);
        this.listenTo(this.removeAttentionModel, 'sync', this.handlereAttention);
        this.listenTo(this.followModel, 'sync', this.handleFollow);
        this.listenTo(this.unFollowModel, 'sync', this.handleUnFollow);
        this.listenTo(this.model, 'sync', this.render);
    },
    render: function () {
        this.nJson = this.model.toJSON().result;

        this.$el.toggleClass('loading');
        this.$el.html(this.template( this.nJson ));
        this.$appInfoCons = this.$('.share');
        // 热门微服务区域
        this.$selectedService = this.$('#selectedService');
        this.$tabContent = this.$('.tab-pane');
        this.$tabWrap = this.$('.tab-content');

        this.$appInfoCons.html(this.shareView.$el);

        this.$selectedService.append(this.selectedView.$el).addClass('in');

        this.resourceType = this.nJson.resourceType;
        this.chargeType = this.nJson.chargeType;
        this.attentionFlag = this.nJson.attentionFlag;
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
    handleUnFollow: function() {
        var result = this.unFollowModel.toJSON();

        if(result.status == 'OK') {
            layer.msg('取消关注成功');
            this.attentionFlag = !this.attentionFlag;
            this.$('#followBtn').text('关注');
        }else {
            layer.msg('取消关注失败');
        }
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
    selectTab: function(event) {
        event.preventDefault();
        this.$tabWrap.addClass('fade');
        var $target = this.$(event.currentTarget);
        var index = $target.data('index');

        $target.parents('.nav-tabs').find('.active').removeClass('active');
        $target.parent().addClass('active');

        this.$tabContent.hide().eq(index).show();

        this.$tabWrap.removeClass('fade');
    },
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

        var btn = this.chargeType == '01' ? ['完成'] : ['立即支付', '加入购物车'];

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
    follow: function (ss) {
        if(this.attentionFlag) {
            this.unFollowModel.fetch({
                data: {
                    id: this.id
                }
            })
        }else {
            this.followModel.fetch({
                data: {
                    id: this.id
                }
            })
        }
    },
    handleFollow: function() {
        var result = this.followModel.toJSON();

        if(result.status == 'OK') {
            layer.msg('关注成功');
            this.attentionFlag = !this.attentionFlag;
            this.$('#followBtn').text('取消关注');
        }else {
            layer.msg('关注失败');
        }
    }
});


module.exports = openDataDetailView;
