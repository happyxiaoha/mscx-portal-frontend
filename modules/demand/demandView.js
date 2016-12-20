'use strict';

var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var dataView = require('./data/view.js');
var apiView = require('./api/view.js');
var serviceView = require('./service/view.js');

var Resource = require('./resource.js');
require('./demand.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    initialize: function() {
        this.$el.addClass('grid1000 mt16');
        this.leftMenuView = new leftMenuView({
            model: {
                className: 'demand',
                id: this.id,
                sideBars: Resource.maps
            }
        });

        this.$el.empty();
        this.$el.append(this.leftMenuView.$el);
        
        switch (this.id){
            case 'data':
                this.contentView = new dataView();
                break;
            case 'api':
                this.contentView = new apiView();
                break;
            case 'service':
                this.contentView = new serviceView();
                break;
            default:
                break;
        }
        
        this.$el.append(this.contentView.$el);

        return this;
    }
});

module.exports = view;