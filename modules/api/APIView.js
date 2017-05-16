'use strict';

// var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var contentView = require('./contentView.js');
var Resource = require('./resource.js');
var navTemplate = require('html!./navTemplate.html');

var view = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    navTemplate: _.template(navTemplate, {variable: 'data'}),
    initialize: function() {
        this.$el.addClass('grid1190');
        // this.leftMenuView = new leftMenuView({
        //     model: {
        //         className: 'api',
        //         id: this.id,
        //         sideBars: Resource.maps
        //     }
        // });

        this.$el.empty();
        this.$el.append(this.navTemplate({
            id: this.id
        }));
        
        this.contentView = new contentView({
            id: this.id,
            model: this.model || {}
        });

        this.$el.append(this.contentView.$el);

        return this;
    }
});

module.exports = view;