'use strict';

var selectedTemplate = require('./selectedTemplate.html');

var selectedApiModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/getSelectedApi.do'
});

var recommendView = Backbone.View.extend({
    tagName: 'div',
    className: 'hotTz',
    template: _.template(selectedTemplate, {variable: 'data'}),
    initialize: function(obj) {
        this.selectedApiModel = new selectedApiModel();

        this.listenTo(this.selectedApiModel, 'sync', this.render);

        this.selectedApiModel.fetch();
    },
    render: function() {
        var data =  this.selectedApiModel.toJSON();
        this.$el.html(this.template(data.result));
    }
});

module.exports = recommendView;