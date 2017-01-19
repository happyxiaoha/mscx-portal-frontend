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
var unFollowModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'cancelServiceFocus.do'
})
require('../demand.css');
require('util');

var view = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    events: {
        'click #applyService': 'apply',
        'click #follow': 'follow'
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.addClass('ReleaseMainCons grid1190 clearfix bgWhite boxShadiow animate-content opacity0');
        
        this.detailModel = new detailModel();
        this.followModel = new followModel({
            serviceId: +this.id
        });
        this.unFollowModel = new unFollowModel({
            serviceId: +this.id
        });
        this.pvModel = new pvModel();

        this.fetchDetail();
        this.pvModel.fetch({
            data: {
                id: this.id
            }
        })

        this.listenTo(this.detailModel, 'sync', this.render);
        this.listenTo(this.followModel, 'sync', this.handleFollow);
        this.listenTo(this.unFollowModel, 'sync', this.handleUnFollow);
    },
    render: function() {
        var model = this.detailModel.toJSON();

        this.attentionFlag = model.result.attentionFlag;
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
        
        if(!mscxPage.isLogin() || !mscxPage.isRealName()) {
            return;
        }

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
        if(!this.attentionFlag) {
            this.followModel.save();
        }else {
            this.unFollowModel.save();
        }
        
    },
    handleFollow: function() {
        var model = this.followModel.toJSON();
        if(model.status == 'OK') {
            layer.msg('关注成功');
            this.attentionFlag = true;
            this.$('#follow').text('取消关注');
        }
    },
    handleUnFollow: function() {
        var model = this.unFollowModel.toJSON();
        if(model.status == 'OK') {
            layer.msg('取消关注成功');
            this.attentionFlag = false;
            this.$('#follow').text('关注');
        }
    }
});

module.exports = view;