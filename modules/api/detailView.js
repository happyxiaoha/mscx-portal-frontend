'use strict';

var template = require('html!./detailTemplate.html');
var applyView = require('./applyLayer.js');
var offlineView = require('./offlineLayer.js');
var shareView = require('shareWidget/shareView.js');

var detailModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-api-api/service/getApiServiceDetailById.do'
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

        this.listenTo(this.detailModel, 'sync', this.render);

        this.detailModel.fetch({
            data: {
                apiServiceId: this.id
            }
        })
        this.shareView = new shareView();

        return this;
    },
    render: function() {
        var converter = new showdown.Converter();
        var model = this.detailModel.toJSON();

        model.result.apiList.forEach(function(item) {
            item.directions = converter.makeHtml(item.directions);
        })

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
        if(!this.applyView) {
            this.applyView = new applyView({
                id: this.id
            });
            this.$el.append(this.applyView.$el);
        }
        layer.open({
            type: 1,
            btn: ['完成'],
            title: '选择您要购买的套餐：',
            shade: 0.6,
            shadeClose: true,
            area: ['500px', '500px'],
            content: this.applyView.$el,
            btn1: function (index) {
                layer.close(index);
                layer.msg('资源已申请成功！');
            }
        })

    },
    // 关注
    follow: function() {
        layer.msg('关注成功！');
    },
    // 线下洽谈
    offlineChat: function() {
        if(!this.offlineView) {
            this.offlineView = new offlineView({
                id: this.id
            });
            this.$el.append(this.offlineView.$el);
        }
        layer.open({
            type: 1,
            btn: ['确定','取消'],
            title: '<p class="ft22">资源使用需求</p>',
            shade: 0.6,
            shadeClose: true,
            area: ['500px', '450px'],
            content: this.offlineView.$el,
            btn1: function (index) {
                layer.close(index);
            },
            btn2: function (index) {
                layer.close(index);
            }
        })
    }
});

module.exports = view;