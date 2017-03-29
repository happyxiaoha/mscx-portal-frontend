'use strict';

var template = require('html!./signListTemplate.html');

var signListModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/getSignListByActivityId.do'
});

require('util');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'offline-box',
    events: {
        'click .export': 'exportExcel'
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.signListModel = new signListModel();
        this.listenTo(this.signListModel, 'sync', this.render);
        this.signListModel.fetch({
            data: {
                activityId: this.model.activityId
            }
        })
    },
    render: function() {
        this.$el.html(this.template(this.signListModel.toJSON()));
    },
    exportExcel: function() {
        window.open(mscxPage.request.activity + 'processSignExcel.do?activityId=' + this.model.activityId);
    }
});

module.exports = view;