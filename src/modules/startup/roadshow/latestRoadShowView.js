'use strict';

var latestTemplate = require('./latestTemplate.html');

var latestModel = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/getLatestRoadInfo.do'
});

require('util');

var recommendView = Backbone.View.extend({
    tagName: 'div',
    className: 'hotTz',
    template: _.template(latestTemplate, {variable: 'data'}),
    initialize: function(obj) {
        this.latestModel = new latestModel();

        this.listenTo(this.latestModel, 'sync', this.render);

        this.latestModel.fetch();
    },
    render: function() {
        var data =  this.latestModel.toJSON();
        this.$el.html(this.template(data.result));
    }
});

module.exports = recommendView;