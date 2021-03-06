'use strict';

var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var contentView = require('./contentView.js');
var Resource = require('./resource.js');
require('./api.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    initialize: function() {
        this.$el.addClass('grid1000');
        this.leftMenuView = new leftMenuView({
            model: {
                className: 'api',
                id: this.id,
                sideBars: Resource.maps
            }
        });

        this.$el.empty();
        this.$el.append(this.leftMenuView.$el);
        
        this.contentView = new contentView({
            id: this.id,
            model: this.model || {}
        });

        this.$el.append(this.contentView.$el);

        return this;
    }
});

module.exports = view;