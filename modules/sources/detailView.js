/**
 * Created by Administrator on 2016/12/14.
 */

'use strict';

var detailTemplate = require('html!./detailTemplate.html');
var selectedView = require('hotDataReportWidget/dataReportView.js');

var dataDetailModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'getDataDetail.do'
});

require('util');

var detailView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    template: _.template(detailTemplate,{variable: 'data'}),
    initialize: function() {
        this.$el.html();
        this.$el.toggleClass('loading');
        this.model = new dataDetailModel();
        this.model.fetch({
            data: {
                dataId: this.id
            }
        });
        this.selectedView = new selectedView();

        this.listenTo(this.model, 'sync', this.render);
    },
    render: function () {
        this.nJson = this.model.toJSON().result;

        this.$el.toggleClass('loading');
        this.$el.html(this.template( this.nJson ));

        // 热门数据报告区域
        this.$hotDataReport = this.$('#hotDataReport');

        this.$hotDataReport.append(this.selectedView.$el).addClass('in');

    }
});


module.exports = detailView;
