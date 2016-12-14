'use strict';

var template = require('html!./detailTemplate.html');
var applyView = require('./applyLayer.js');

var detailModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-api-api/service/getApiServiceDetailById.do'
});

require('./api.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    template: _.template(template, {variable: 'data'}),
    events: {
        'click .tab span': 'selectTab',
        'click #applyBtn': 'apply',
        'click #followBtn': 'follow'
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

        return this;
    },
    render: function() {
        this.$el.html(this.template(this.detailModel.toJSON())).removeClass('opacity0');

        this.$tabContent = this.$('.tabConsInfo');
        this.$tabWrap = this.$('.tabCons');

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
            this.applyView = new applyView();
        }
        layer.open({
            type: 1,
            btn: ['完成'],
            title: '选择您要购买的套餐：',
            shade: 0.6,
            shadeClose: true,
            area: ['500px', '400px'],
            content: this.applyView.$el,
            btn1: function (index) {
                layer.close(index);
                layer.msg('资源已申请成功！');
            }
        })

    },
    // 关注
    follow: function() {
        
    }
});

module.exports = view;