'use strict';

var template = require('html!./template.html');
var detailModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-requirement-api/apiDetail.do'
})
require('../demand.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.addClass('ReleaseMainCons grid960 clearfix bgWhite boxShadiow').html(this.template());
        
        this.detailModel = new detailModel();

        this.detailModel.fetch({
            data: {
                id: this.id
            }
        })
    }
});

module.exports = view;