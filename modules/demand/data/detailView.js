'use strict';

var template = require('html!./detailTemplate.html');
var detailModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-requirement-api/dataDetail.do'
})
var followModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-requirement-api/addFocus.do'
})
require('../demand.css');
require('util');

var view = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    events: {
        'click #follow': 'follow'
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.addClass('ReleaseMainCons grid960 clearfix bgWhite boxShadiow animate-content opacity0');
        
        this.detailModel = new detailModel();
        this.followModel = new followModel();

        this.detailModel.fetch({
            data: {
                id: this.id
            }
        })

        this.listenTo(this.detailModel, 'sync', this.render);
        this.listenTo(this.followModel, 'sync', this.handleFollow);
    },
    render: function() {
        var model = this.detailModel.toJSON();

        this.$el.html(this.template(model.result)).removeClass('opacity0');
    },
    follow: function() {
        this.followModel.fetch({
            data: {
                id: this.id
            }
        })
    },
    handleFollow: function() {
        var model = this.followModel.toJSON();
        if(mode.result.status == 'OK') {
            layer.msg('关注成功');
        }
    }
});

module.exports = view;