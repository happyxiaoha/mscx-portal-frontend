'use strict';

var template = require('./detailTemplate.html');
var offlineView = require('offlineWidget/offlineLayer.js');
var latestView = require('./latestRoadShowView.js');

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

require('util');
require('../../../lib/swiper.jquery.js');

var view = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    events: {
        'click #followBtn': 'follow',
        'click #contactBtn': 'contact',
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

        this.latestView = new latestView();

        return this;
    },
    render: function () {
        this.nJson = this.model.toJSON().result;

        this.attentionFlag = !!+this.nJson.isAttention;
        this.$el.html(this.template( this.nJson ));

        this.$tabContent = this.$('.tab-pane');
        this.$tabWrap = this.$('.tab-content');
        this.$followBtn = this.$('#followBtn');
        this.$latestRoadshow = this.$('#latestRoadshow');

        this.$latestRoadshow.append(this.latestView.$el).addClass('in');

        this.$followBtn.text(this.attentionFlag ? '取消关注' : '关注');

        var galleryLeft = new Swiper('.swiper-left', {
            spaceBetween: 10,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            direction: 'vertical'
        });

        //this.nJson.projectDescription.split(',').length

        var galleryThumbs = new Swiper('.swiper-right', {
            spaceBetween: 10,
            slidesPerView: 3,
            // centeredSlides: true,
            // touchRatio: 0.2,
            direction: 'vertical',
            // slideToClickedSlide: true
            onTouchStart: function(swiper, event) {
                var index = $(event.target).data('index');
                galleryLeft.slideTo(index);
            }
        });
        galleryLeft.params.control = galleryThumbs;
        // galleryThumbs.params.control = galleryLeft;
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
    },
    contact: function() {
        var detail = this.model.toJSON().result;
        var me = this;

        if(!mscxPage.isLogin()) {
            return;
        }

        this.offlineView = new offlineView({
            model: {
                apiServiceId: this.id,
                cname: detail.roadName,
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
    }
});

module.exports = view;