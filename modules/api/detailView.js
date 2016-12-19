'use strict';

var template = require('html!./detailTemplate.html');
var applyView = require('./applyLayer.js');
var offlineView = require('./offlineLayer.js');
var shareView = require('shareWidget/shareView.js');

var detailModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-api-api/service/getApiServiceDetailById.do'
});

var followModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-api-api/userAttention/add.do'
});

var showdown = require('markdown');

require('./api.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    template: _.template(template, {variable: 'data'}),
    events: {
        'click .tab span': 'selectTab',
        'click #applyBtn': 'apply',
        'click #followBtn': 'follow',
        'click #offlineBtn': 'offlineChat'
    },
    initialize: function() {
        this.$el.addClass('grid960 animate-content opacity0');

        this.detailModel = new detailModel();
        this.followModel = new followModel();

        this.listenTo(this.detailModel, 'sync', this.render);
        this.listenTo(this.followModel, 'sync', this.handleFollow);
        
        this.detailModel.fetch({
            data: {
                apiServiceId: this.id
            }
        })
        this.shareView = new shareView({
            className: 'share posAB'
        });

        return this;
    },
    render: function() {
        var converter = new showdown.Converter();
        var model = this.detailModel.toJSON();

        model.result.apiList.forEach(function(item) {
            item.directions = converter.makeHtml(item.directions);
        })

        model.result.rtnCode = converter.makeHtml(model.result.rtnCode);

        this.chargeType = model.result.chargeType;
        this.resourceType = model.result.resourceType;
        this.$el.html(this.template(model)).removeClass('opacity0');

        this.$tabContent = this.$('.tabConsInfo');
        this.$tabWrap = this.$('.tabCons');
        this.$appInfoCons = this.$('.appInfoCons');

        // 添加分享组件
        this.$appInfoCons.append(this.shareView.$el);

        // 默认选中第一个
        this.$('.tab span').eq(0).click();
    },
    selectTab: function(event) {
        this.$tabWrap.addClass('opacity0');
        var $target = this.$(event.currentTarget);
        var index = $target.data('index');

        $target.parent().find('.active').removeClass('active');
        $target.addClass('active');

        this.$tabContent.hide().eq(index).show();

        this.$tabWrap.removeClass('opacity0');
    },
    // 申请
    apply: function() {
        var me = this;

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
    // 关注
    follow: function() {
        this.followModel.fetch({
            data: {
                apiServiceId: this.id
            }
        })
    },
    handleFollow: function() {
        var result = this.followModel.toJSON();
        if(result.status == 'OK') {
            layer.msg('关注成功！');
        }else {
            layer.msg('关注失败！');
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
    }
});

module.exports = view;