'use strict';

var openDataReleaseResultTemplate = require('html!./openDataSearchResult.html');

var view = Backbone.View.extend({
    template: _.template(openDataReleaseResultTemplate, {variable: 'data'}),
    el: '#searchResult',
    initialize: function() {
        
    },
    render: function(model) {
        this.$el.html(this.template(model.toJSON()));
    }
});

module.exports = view;