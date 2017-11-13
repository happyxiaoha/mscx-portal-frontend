'use strict';

var searchView = require('searchWidget/searchView.js');
var resultView = require('./resultView.js');
var Resource = require('lib/resource.js');

var dataAPI = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/queryDataApi.do'
})
var toolAPI = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/queryToolApi.do'
})
var modelAPI = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/queryModelApi.do'
})

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'rightMenuWrap fl boxShadiow boxSizing bgWhite common',
    initialize: function() {
        // 筛选部分初始化
        this.searchView = new searchView({
            id: this.id,
            model: {
                title: _.find(Resource.maps, function(item){
                    return item.key == this.id 
                }.bind(this)).name,
                options: ['objects', 'range', this.id + 'Category', this.id + 'Tags', 'chargeWay'],
                defaults: this.model
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

        this.apiDataAPI = new dataAPI();
        this.apiToolAPI = new toolAPI();
        this.apiModelAPI = new modelAPI();

        this.listenTo(this.apiDataAPI, 'sync', this.resultView.render.bind(this.resultView));
        this.listenTo(this.apiToolAPI, 'sync', this.resultView.render.bind(this.resultView));
        this.listenTo(this.apiModelAPI, 'sync', this.resultView.render.bind(this.resultView));

        this.$el.append(this.searchView.render().$el);
        this.$el.append(this.resultView.$el);
        
        return this;
    }
});

module.exports = view;