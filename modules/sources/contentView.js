/**
 * Created by Administrator on 2016/12/14.
 */
'use strict';

var searchView = require('searchWidget/searchView.js');
var resultView = require('./resultView.js');

var dataReportModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'getDataList.do'
});

var view = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    initialize: function() {
        // 筛选部分初始化
        this.searchView = new searchView({
            id: this.id,
            model: {
                options: [this.id + 'Category', this.id + 'Tags', 'chargeWay'],
                defaults: this.model || {}
            }
        });

        // 结果部分初始化
        this.resultView = new resultView({
            id: this.id
        });

        this.searchView.delegate = this;
        this.resultView.delegate = this;

        this.searchView.listenTo(this.resultView, 'page', this.searchView.handlePageJump.bind(this.searchView));
        this.searchView.listenTo(this.resultView, 'sort', this.searchView.handleParams.bind(this.searchView));

        this.dataAPI = new dataReportModel();

        this.listenTo(this.dataAPI, 'sync', this.resultView.render.bind(this.resultView));

        this.$el.append(this.searchView.render().$el);
        this.$el.append(this.resultView.$el);

        return this;
    }
});

module.exports = view;