'use strict';

var dataReportTemplate = require('html!./dataReportTemplate.html');

var hotDataReportModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'getRecommendDatum.do'
});

var recommendView = Backbone.View.extend({
    tagName: 'div',
    className: 'hotTz bgWhite',
    template: _.template(dataReportTemplate, {variable: 'data'}),
    initialize: function(obj) {
        this.hotDataReportModel = new hotDataReportModel();

        this.listenTo(this.hotDataReportModel, 'sync', this.render);

        this.hotDataReportModel.fetch();
    },
    render: function() {
        var data =  this.hotDataReportModel.toJSON();
        this.$el.html(this.template(data.result));
    }
});

module.exports = recommendView;