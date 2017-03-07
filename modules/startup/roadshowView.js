'use strict';

var searchView = require('searchWidget/searchView.js');
var template = require('html!./roadshowTemplate.html');

var roadshowAPI = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/getAllRoadInfo.do'
})

var view = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        // this.$el.html(this.template());
        this.searchView = new searchView({
            id: 'roadshow',
            model: {
                options: ['field'],
                defaults: this.model || {}
            }
        });
        this.$el.append(this.searchView.render().$el);

        this.searchView.delegate = this;

        this.roadshowAPI = new roadshowAPI();
        
        return this;
    }
});

module.exports = view;