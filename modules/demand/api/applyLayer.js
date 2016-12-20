'use strict';

var template = require('html!./applyTemplate.html');
var model = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-requirement-api/addApiOrder.do'
})

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'apply-box orderDiv hide',
    template: _.template(template),
    initialize: function() {
        this.$el.html(this.template());

        this.model = new model();
    },
    render: function() {
        
    },
    submit: function(index) {
        layer.close(index);
    }
});

module.exports = view;