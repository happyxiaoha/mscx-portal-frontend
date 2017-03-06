'use strict';

var searchView = require('searchWidget/searchView.js');
var template = require('html!./bornTemplate.html');

var view = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        // this.$el.html(this.template());
        this.searchView = new searchView({
            id: this.id,
            model: {
                options: ['scopes', 'range'],
                defaults: this.model || {}
            }
        });
        this.$el.append(this.searchView.render().$el);
        
        return this;
    }
});

module.exports = view;