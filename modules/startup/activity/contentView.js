'use strict';

var searchView = require('searchWidget/searchView.js');
var resultView = require('./resultView.js');

var activityAPI = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/getActivityByContent.do?content='
})

var view = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    initialize: function() {
        this.$el.empty();
        this.searchView = new searchView({
            id: 'activity',
            model: {
                options: ['activityTags'],
                defaults: this.model || {}
            }
        });

        // 结果部分初始化
        this.resultView = new resultView();

        this.searchView.delegate = this;
        this.resultView.delegate = this;

        this.activityAPI = new activityAPI();

        this.searchView.listenTo(this.resultView, 'page', this.searchView.handlePageJump.bind(this.searchView));
        this.searchView.listenTo(this.resultView, 'sort', this.searchView.handleParams.bind(this.searchView));

        this.listenTo(this.activityAPI, 'sync', this.resultView.render.bind(this.resultView));

        this.$el.append(this.searchView.render().$el);
        this.$el.append(this.resultView.$el);
        
        return this;
    }
});

module.exports = view;