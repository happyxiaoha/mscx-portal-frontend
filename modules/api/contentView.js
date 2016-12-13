'use strict';

var searchView = require('searchWidget/searchView.js');
var resultView = require('./resultView.js');
var Resource = require('./resource.js');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'rightMenuWrap fl boxShadiow boxSizing bgWhite common',
    initialize: function() {
        this.searchView = new searchView({
            id: this.id,
            model: {
                title: _.find(Resource.maps, function(item){
                    return item.key == this.id 
                }.bind(this)).name,
                options: ['objects', 'range', this.id + 'Category', this.id + 'Tags', 'chargeWay']
            }
        });
        this.resultView = new resultView({
            id: this.id
        });

        this.$el.append(this.searchView.$el);
        this.$el.append(this.resultView.$el);
        
        return this;
    }
});

module.exports = view;