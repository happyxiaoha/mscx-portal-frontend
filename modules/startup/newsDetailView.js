'use strict';

// var shareView = require('shareWidget/shareView.js');

var view = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    initialize: function() {
        this.$el.empty().addClass('opacity0');

        var me = this;

        // this.shareView = new shareView({
        //     className: 'share'
        // });

        this.$el.load(decodeURIComponent(this.model.url) + '?time=' + +(new Date()), function() {
            me.$el.removeClass('opacity0');
            // // 添加分享组件
            // me.$('.TopTit').addClass('pr').append(me.shareView.$el);
        });

        return this;
    }
});

module.exports = view;