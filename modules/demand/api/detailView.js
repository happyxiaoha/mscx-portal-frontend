'use strict';

var template = require('html!./detailTemplate.html');
var applyView = require('./applyLayer.js');
var detailModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'apiDetail.do'
})
var pvModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'addApiPV.do'
})
var followModel = Backbone.Model.extend({
    idAttribute: 'apiId',
    url: mscxPage.request.demand + 'addApiFocus.do'
})
var unFollowModel = Backbone.Model.extend({
    idAttribute: 'apiId',
    url: mscxPage.request.demand + 'reduceApiFocus.do'
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
        this.pvModel = new pvModel();
        this.followModel = new followModel({
            id: this.id
        });
        this.unFollowModel = new unFollowModel({
            id: this.id
        });

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
    fetchDetail: function() {
        this.$el.addClass('opacity0');
        this.detailModel.fetch({
            data: {
                id: this.id
            }
        })
    },
    render: function() {
        var model = this.detailModel.toJSON();

        this.attentionFlag = model.result.flag;
        this.$el.html(this.template(model.result)).removeClass('opacity0');
    },
    apply: function() {
        var me = this;

        if(!this.validateLogin()) {
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
            this.attentionFlag = 1;
            this.$('#follow').text('取消关注');
        }
    },
    handleUnFollow: function() {
        var model = this.unFollowModel.toJSON();
        if(model.status == 'OK') {
            layer.msg('取消关注成功');
            this.attentionFlag = 0;
            this.$('#follow').text('关注');
        }
    },
    validateLogin: function() {
        if(!mscxPage.userInfo){
            location.href = 'login.html?service=' + encodeURIComponent(location.href);
        }
        return !!mscxPage.userInfo;
    }
});

module.exports = view;