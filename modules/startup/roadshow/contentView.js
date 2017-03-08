'use strict';

var searchView = require('searchWidget/searchView.js');
var resultView = require('./resultView.js');

var roadshowAPI = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/getAllRoadInfo.do'
})

var view = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    initialize: function() {
        this.$el.empty();
        this.searchView = new searchView({
            id: 'roadshow',
            model: {
                options: ['fieldCategory', 'projectStages'],
                defaults: this.model || {}
            }
        });

        // 结果部分初始化
        this.resultView = new resultView();

        this.searchView.delegate = this;
        this.resultView.delegate = this;

        this.roadshowAPI = new roadshowAPI();

        this.searchView.listenTo(this.resultView, 'page', this.searchView.handlePageJump.bind(this.searchView));
        this.searchView.listenTo(this.resultView, 'sort', this.searchView.handleParams.bind(this.searchView));

        this.listenTo(this.roadshowAPI, 'sync', this.resultView.render.bind(this.resultView));

        this.$el.append(this.searchView.render().$el);
        this.$el.append(this.resultView.$el);
        
        return this;
    }
});

module.exports = view;