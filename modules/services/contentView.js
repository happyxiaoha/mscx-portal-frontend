/**
 * Created by Administrator on 2016/12/14.
 */
'use strict';

var searchView = require('searchWidget/searchView.js');
var resultView = require('./resultView.js');

var servicesModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'list.do'
});

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'rightMenuWrap fl boxShadiow boxSizing bgWhite common',
    initialize: function() {
        // 筛选部分初始化
        this.searchView = new searchView({
            id: this.id,
            model: {
                title: '微服务',
                options: ['objects', 'range', this.id + 'Category', this.id + 'Tags', 'chargeWay']
            }
        });

        // 结果部分初始化
        this.resultView = new resultView({
            id: this.id
        });

        this.searchView.delegate = this;
        this.resultView.delegate = this;

        this.searchView.listenTo(this.resultView, 'page', this.searchView.handlePageJump.bind(this.searchView));
        this.searchView.listenTo(this.resultView, 'sort', this.searchView.handleSort.bind(this.searchView));

        this.serviceAPI = new servicesModel();

        this.listenTo(this.serviceAPI, 'sync', this.resultView.render.bind(this.resultView));

        this.$el.append(this.searchView.render().$el);
        this.$el.append(this.resultView.$el);

        return this;
    }
});

module.exports = view;