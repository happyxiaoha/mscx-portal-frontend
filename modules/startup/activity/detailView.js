'use strict';

var template = require('html!./detailTemplate.html');

var detailModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/getActivityById.do'
});
// 关注
var followModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/addUserAttention.do'
});
// 报名
var signModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/addUserSign.do'
});
// 取消关注
var unFollowModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/deleteUserAttention.do'
});
// 取消报名
var unSignModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/deleteUserSign.do'
});

require('util');

var view = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    events: {
        'click #followBtn': 'follow',
        'click #signBtn': 'sign'
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.model = new detailModel();
        this.followModel = new followModel();
        this.unFollowModel = new unFollowModel();
        this.signModel = new signModel();
        this.unSignModel = new unSignModel();

        this.listenTo(this.followModel, 'sync', this.handleFollow);
        this.listenTo(this.unFollowModel, 'sync', this.handleUnFollow);
        this.listenTo(this.signModel, 'sync', this.handleSign);
        this.listenTo(this.unSignModel, 'sync', this.handleUnSign);
        this.listenTo(this.model, 'sync', this.render);

        this.model.fetch({
            data: {
                id: this.id
            }
        });

        return this;
    },
    render: function () {
        this.nJson = this.model.toJSON().result;

        this.attentionFlag = !!this.nJson.isAttention;
        this.signFlag = !!this.nJson.isSign;

        var signEndTime = this.nJson.detail.signEndTime,
            signStartTime = this.nJson.detail.signStartTime,
            today = new Date(),
            isSignAvaliable = false,
            currentDate = new Date();

        signEndTime = new Date(signEndTime);
        signStartTime = new Date(signStartTime);
        today = today.format('yyyy-MM-dd');

        today = today.split('-');

        signEndTime.setHours(0);
        signEndTime.setMinutes(0);
        signEndTime.setSeconds(0);
        signEndTime.setMilliseconds(0);

        signStartTime.setHours(0);
        signStartTime.setMinutes(0);
        signStartTime.setSeconds(0);
        signStartTime.setMilliseconds(0);

        currentDate.setFullYear(today[0]);
        currentDate.setMonth(+today[1] - 1);
        currentDate.setDate(today[2]);
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        
        // 只有在报名时间范围内才可以报名
        isSignAvaliable = (currentDate <= signEndTime && currentDate >= signStartTime) ? true : false;

        this.nJson.detail.isSignAvaliable = isSignAvaliable;

        this.$el.html(this.template( this.nJson.detail ));

        this.$followBtn = this.$('#followBtn');
        this.$signBtn = this.$('#signBtn');

        this.$followBtn.text(this.attentionFlag ? '取消关注' : '关注');
        this.$signBtn.text(this.signFlag ? '取消报名' : '报名');
    },
    // 关注或取消关注
    follow: function() {
        if(this.attentionFlag) {
            this.unFollowModel.fetch({
                data: {
                    activityId: this.id
                }
            })
        }else {
            this.followModel.fetch({
                data: {
                    activityId: this.id
                }
            })
        }
    },
    sign: function() {
        if(this.signFlag) {
            this.unSignModel.fetch({
                data: {
                    activityId: this.id
                }
            })
        }else {
            this.signModel.fetch({
                data: {
                    activityId: this.id
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
    },
    handleSign: function() {
        var result = this.signModel.toJSON();

        if(result.status == 'OK') {
            layer.msg('报名成功');
            this.signFlag = !this.signFlag;
            this.$signBtn.text('取消报名');
        }else {
            layer.msg('报名失败');
        }
    },
    handleUnSign: function() {
        var result = this.unSignModel.toJSON();

        if(result.status == 'OK') {
            layer.msg('取消报名成功');
            this.signFlag = !this.signFlag;
            this.$signBtn.text('报名');
        }else {
            layer.msg('取消报名失败');
        }
    }
});

module.exports = view;