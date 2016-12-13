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
        this.searchView = new searchView({
            id: this.id,
            model: {
                title: '开放数据',
                options: ['objects','orgs', 'range', this.id + 'Category', this.id + 'Tags', 'chargeWay']
            }
        });
        this.$el.append(this.searchView.$el);
        this.$el.toggleClass('loading');
       this.model = new openDataReleaseResultModel();
        this.model.fetch();
        this.listenTo(this.model,'sync', this.render)
    },
    render: function() {
        var nJson = this.model;
        new openDataReleaseResultView({
            model: nJson
        })
    }

});


module.exports = openDataReleaseContentView;
