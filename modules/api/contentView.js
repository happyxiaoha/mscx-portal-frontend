'use strict';

var searchView = require('searchWidget/searchView.js');
var resultView = require('./resultView.js');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'rightMenuWrap fl boxShadiow boxSizing bgWhite common',
    initialize: function() {
        this.searchView = new searchView({
            id: this.id
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