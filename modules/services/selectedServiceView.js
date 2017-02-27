'use strict';

var selectedTemplate = require('html!./selectedTemplate.html');

var selectedServiceModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'recommend/list.do'
});

var recommendView = Backbone.View.extend({
    tagName: 'div',
    className: 'hotTz',
    template: _.template(selectedTemplate, {variable: 'data'}),
    initialize: function(obj) {
        this.selectedServiceModel = new selectedServiceModel();

        this.listenTo(this.selectedServiceModel, 'sync', this.render);

        this.selectedServiceModel.fetch();
    },
    render: function() {
        var data =  this.selectedServiceModel.toJSON();
        this.$el.html(this.template(data.result));
    }
});

module.exports = recommendView;