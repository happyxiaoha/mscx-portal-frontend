'use strict';

var selectedTemplate = require('html!./selectedTemplate.html');

var selectedModel = Backbone.Model.extend({
    url: mscxPage.request.saas + 'recommend/list.do'
});

var recommendView = Backbone.View.extend({
    tagName: 'div',
    className: 'hotTz bgWhite',
    template: _.template(selectedTemplate, {variable: 'data'}),
    initialize: function(obj) {
        this.selectedModel = new selectedModel();

        this.listenTo(this.selectedModel, 'sync', this.render);

        this.selectedModel.fetch();
    },
    render: function() {
        var data =  this.selectedModel.toJSON();
        this.$el.html(this.template(data.result));
    }
});

module.exports = recommendView;