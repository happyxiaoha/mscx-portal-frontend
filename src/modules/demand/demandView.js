'use strict';

var dataView = require('./data/view.js');
var apiView = require('./api/view.js');
var serviceView = require('./service/view.js');

var Resource = require('./resource.js');
require('./demand.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    initialize: function() {
        this.$el.empty();
        
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