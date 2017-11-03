/**
 * Created by Administrator on 2016/12/14.
 */
'use strict';
var moreTempalte = require('./servicesMore.html');
var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var contentView = require('./contentViewService.js');
require('./services.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.threeServicesEl,
    initialize: function() {
        this.$el.addClass('grid1000');
        this.leftMenuView = new leftMenuView({
            model: {
                className: 'services',
                id: this.id,
                sideBars: [
                    {
                        name: '微服务',
                        url: '#service/scope-广州',
                        key: 'service'
                    }
                ]
            }
        });

        this.$el.empty();
        this.$el.append(this.leftMenuView.$el);

        this.contentView = new contentView({
            id: this.id,
            model: this.model || {}
        });

        this.$el.append(this.contentView.$el);
        this.$el.append(moreTempalte);

        return this;
    }
});

module.exports = view;