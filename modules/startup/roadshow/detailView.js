'use strict';

var template = require('html!./detailTemplate.html');

var detailModel = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/getRoadInfoByRoadId.do'
});
// 关注
var followModel = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/addUserAttention.do'
});
// 取消关注
var unFollowModel = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/deleteUserAttention.do'
});

var view = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    events: {
        'click #followBtn': 'follow',
        'click .nav-tabs a': 'selectTab'
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.model = new detailModel();
        this.followModel = new followModel();
        this.unFollowModel = new unFollowModel();

        this.listenTo(this.model, 'sync', this.render);
        this.listenTo(this.followModel, 'sync', this.handleFollow);
        this.listenTo(this.unFollowModel, 'sync', this.handleUnFollow);

        this.model.fetch({
            data: {
                roadId: this.id
            }
        });

        return this;
    },
    render: function () {
        this.nJson = this.model.toJSON().result;

        this.attentionFlag = !!this.nJson.isAttention;
        this.$el.html(this.template( this.nJson ));

        this.$tabContent = this.$('.tab-pane');
        this.$tabWrap = this.$('.tab-content');
        this.$followBtn = this.$('#followBtn');

        this.$followBtn.text(this.attentionFlag ? '取消关注' : '关注');
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
    // 关注或取消关注
    follow: function() {
        if(this.attentionFlag) {
            this.unFollowModel.fetch({
                data: {
                    roadId: this.id
                }
            })
        }else {
            this.followModel.fetch({
                data: {
                    roadId: this.id
                }
            })
        }
    },
    handleFollow: function() {
        var result = this.followModel.toJSON();

        if(result.status == 'OK') {
            layer.msg('关注成功');
            this.attentionFlag = !this.attentionFlag;
            this.$followBtn.text('取消关注');
        }else {
            layer.msg('关注失败');
        }
    },
    handleUnFollow: function() {
        var result = this.unFollowModel.toJSON();

        if(result.status == 'OK') {
            layer.msg('取消关注成功');
            this.attentionFlag = !this.attentionFlag;
            this.$followBtn.text('关注');
        }else {
            layer.msg('取消关注失败');
        }
    }
});

module.exports = view;