'use strict';

var template = require('./detailTemplate.html');
var applyView = require('./applyLayer.js');
var offlineView = require('offlineWidget/offlineLayer.js');
var shareView = require('shareWidget/shareView.js');
var selectedView = require('selectedAPIWidget/selectedAPIView.js');

var detailModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/getApiServiceDetailById.do?t=' + new Date().getTime()
});

var followModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'userAttention/add.do'
});
var unFollowModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'userAttention/remove.do'
});

var showdown = require('showdown');

var view = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    template: _.template(template, {variable: 'data'}),
    events: {
        'click .nav-tabs a': 'selectTab',
        'click #applyBtn': 'apply',
        'click #followBtn': 'follow',
        'click #offlineBtn': 'offlineChat',
        'click .side li': 'selectAPI'
    },
    initialize: function() {
        this.detailModel = new detailModel();
        this.followModel = new followModel();
        this.unFollowModel = new unFollowModel();

        this.listenTo(this.detailModel, 'sync', this.render);
        this.listenTo(this.followModel, 'sync', this.handleFollow);
        this.listenTo(this.unFollowModel, 'sync', this.handleUnFollow);
        
        this.detailModel.fetch({
            data: {
                apiServiceId: this.id
            }
        });
        this.shareView = new shareView();
        this.selectedView = new selectedView();

        return this;
    },
    render: function() {
        var converter = new showdown.Converter({
            omitExtraWLInCodeBlocks: true,
            noHeaderId: false,
            parseImgDimensions: true,
            simplifiedAutoLink: true,
            literalMidWordUnderscores: true,
            strikethrough: true,
            tables: true,
            tablesHeaderId: false,
            ghCodeBlocks: true,
            tasklists: true,
            smoothLivePreview: true,
            prefixHeaderId: false,
            disableForced4SpacesIndentedSublists: false
        });

        
        var model = this.detailModel.toJSON();

        _.each(model.result.apiList,function(item) {
            item.testPacket = converter.makeHtml(item.testPacket);
            item.directions = converter.makeHtml(item.directions);
        });

        model.result.rtnCode = converter.makeHtml(model.result.rtnCode);

        this.attentionFlag = model.result.attentionFlag;
        this.chargeType = model.result.chargeType;
        this.resourceType = model.result.resourceType;
        this.$el.html(this.template(model)).removeClass('opacity0');

        this.$tabContent = this.$('.tab-pane');
        this.$tabWrap = this.$('.tab-content');
        this.$appInfoCons = this.$('.share');
        // 热门API区域
        this.$selectedAPI = this.$('#selectedAPI');

        // 添加分享组件
        this.$appInfoCons.append(this.shareView.$el);

        this.$selectedAPI.append(this.selectedView.$el).addClass('in');

        // 默认选中第一个
        this.$('.tab span').eq(0).click();

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
    selectAPI: function(event) {
        var $target = this.$(event.currentTarget);
        var index = $target.data('index');

        $target.parent().find('.active').removeClass('active');
        $target.addClass('active');

        this.$('.rightCons').addClass('hide').eq(index).removeClass('hide');
    },
    // 申请
    apply: function() {
        var me = this;

        if(!mscxPage.isLogin()) {
            return;
        }

        // 涉密API判断
        if(_.indexOf(mscxPage.secretAPI, +this.id) > -1 || this.detailModel.get('result').publishType === '02') {
            this.offlineChat();
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
    // 关注或取消关注
    follow: function() {
        if(this.attentionFlag) {
            this.unFollowModel.fetch({
                data: {
                    apiServiceId: this.id
                }
            })
        }else {
            this.followModel.fetch({
                data: {
                    apiServiceId: this.id
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
    // 线下洽谈
    offlineChat: function() {
        var me = this;
        var detail = this.detailModel.toJSON().result;

        if(!mscxPage.isLogin()) {
            return;
        }

        this.offlineView = new offlineView({
            model: {
                apiServiceId: this.id,
                cname: detail.apiServiceCName,
                type: detail.type
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

        $('.rating span').off();
    }
});

module.exports = view;