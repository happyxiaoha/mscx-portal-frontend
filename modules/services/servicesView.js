/**
 * Created by Administrator on 2016/12/14.
 */
'use strict';

// var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var contentView = require('./contentView.js');
require('./services.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    initialize: function() {
        this.$el.addClass('grid1190');
        // this.leftMenuView = new leftMenuView({
        //     model: {
        //         className: 'services',
        //         id: this.id,
        //         sideBars: [
        //             {
        //                 name: '微服务',
        //                 url: '#service',
        //                 key: 'service'
        //             }
        //         ]
        //     }
        // });

        this.$el.empty();
        // this.$el.append(this.leftMenuView.$el);

        this.contentView = new contentView({
            id: this.id,
            model: this.model || {}
        });

        this.$el.append(this.contentView.$el);

        return this;
    }
});

module.exports = view;