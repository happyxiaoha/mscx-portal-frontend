/**
 * Created by Administrator on 2016/12/13.
 */

'use strict';

var searchView = require('searchWidget/searchView.js');
var openDataReleaseResultView = require('./openDataReleaseResult.js');

var openDataReleaseResultModel = Backbone.Model.extend({
    url: mscxPage.host+'/ro/mscx-data-api/getDataList.do'
});


var openDataReleaseContentView = Backbone.View.extend({
    el: '.openDataReleaseSearch',
    events: {
    },
    initialize: function() {
        this.$el.toggleClass('loading');
        // 筛选部分初始化
        this.searchView = new searchView({
            id: 'openData',
            model: {
                title: '开放数据',
                options: ['objects','orgs', 'range', 'openDataCategory', 'openDataTags', 'chargeWay']
            }
        });

        // 结果部分初始化
        this.resultView = new openDataReleaseResultView();

        this.searchView.delegate = this;
        this.resultView.delegate = this;

        this.$el.append(this.searchView.render().$el);
        this.$el.toggleClass('loading');

        this.openDataAPI = new openDataReleaseResultModel();

        this.listenTo(this.openDataAPI, 'sync', this.resultView.render.bind(this.resultView));
    
        return this;
    }
});


module.exports = openDataReleaseContentView;
