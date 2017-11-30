'use strict';

var shareView = require('shareWidget/shareView.js');
var offlineView = require('offlineWidget/offlineLayer.js');

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    events: {
        'click #offlineBtn': 'offlineChat'
    },
    initialize: function() {
        this.$el.empty().addClass('opacity0');

        var me = this;

        this.shareView = new shareView({
            className: 'share posAB'
        });

        this.$el.load(decodeURIComponent(this.model.url) + '?time=' + +(new Date()), function() {
            me.$el.removeClass('opacity0');
            // 添加分享组件
            me.$('.TopTit').addClass('pr').append(me.shareView.$el)
                .append("<button id=\"offlineBtn\" class=\"fr\" style=\"margin-right: 0;\">线下洽谈申请</button>");
        });

        return this;
    },

    offlineChat: function() {
        var me = this;

        if(!mscxPage.isLogin()) {
            return;
        }

        this.offlineView = new offlineView({
            model: {
                apiServiceId: '0',
                cname: '解决方案' + $(".TopTit h2").text(),
                type: '0'
            }
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