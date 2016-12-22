'use strict';

var template = require('html!./detailTemplate.html');
var applyView = require('./applyLayer.js');
var detailModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'getServiceDetail.do'
})
var pvModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'addPageViewAmount.do'
})
var followModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'addReqServiceFocus.do'
})
require('../demand.css');
require('util');

var view = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    events: {
        'click #apply': 'apply',
        'click #follow': 'follow'
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.addClass('ReleaseMainCons grid960 clearfix bgWhite boxShadiow animate-content opacity0');
        
        this.detailModel = new detailModel();
        this.followModel = new followModel();
        this.pvModel = new pvModel();

        this.fetchDetail();
        this.pvModel.fetch({
            data: {
                id: this.id
            }
        })

        this.listenTo(this.detailModel, 'sync', this.render);
        this.listenTo(this.followModel, 'sync', this.handleFollow);
    },
    render: function() {
        var model = this.detailModel.toJSON();

        this.$el.html(this.template(model.result)).removeClass('opacity0');
    },
    fetchDetail: function() {
        this.detailModel.fetch({
            data: {
                id: this.id
            }
        })
    },
    apply: function() {
        var me = this;
        this.applyView = new applyView({
            id: this.id
        });
        this.$el.append(this.applyView.$el);

        this.applyView.delegate = this;

        layer.open({
            type: 1,
            btn: ['确定', '取消'],
            title: '方案详情',
            shade: 0.6,
            shadeClose: true,
            area: ['500px'],
            content: this.applyView.$el,
            btn1: function (index) {
                me.applyView.submitForm(index);
            },
            btn2: function(index) {
                layer.close(index);
            },
            end: function() {
                me.applyView.remove();
            }
        })
    },
    follow: function() {
        this.followModel.set('serviceId', this.id);
        this.followModel.save();
    },
    handleFollow: function() {
        var model = this.followModel.toJSON();
        if(model.result.status == 'OK') {
            layer.msg('关注成功');
            this.fetchDetail();
        }
    }
});

module.exports = view;