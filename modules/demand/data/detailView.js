'use strict';

var template = require('html!./detailTemplate.html');
var detailModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'dataDetail.do'
})
var pvModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'addPV.do'
})
var followModel = Backbone.Model.extend({
    idAttribute: 'dataId',
    url:mscxPage.request.demand + 'addFocus.do'
})
var unFollowModel = Backbone.Model.extend({
    idAttribute: 'dataId',
    url:mscxPage.request.demand + 'reduceFocus.do'
})
require('util');

var view = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    events: {
        'click #follow': 'follow'
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.addClass('ReleaseMainCons grid1190 clearfix bgWhite boxShadiow animate-content opacity0');
        
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
    render: function() {
        var model = this.detailModel.toJSON();

        this.attentionFlag = model.result.flag;
        this.$el.html(this.template(model.result)).removeClass('opacity0');
    },
    fetchDetail: function() {
        this.detailModel.fetch({
            data: {
                id: this.id
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
    }
});

module.exports = view;