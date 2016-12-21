'use strict';

var template = require('html!./detailTemplate.html');
var detailModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-requirement-api/dataDetail.do'
})
var pvModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-requirement-api/addPV.do'
})
var followModel = Backbone.Model.extend({
    idAttribute: 'dataId',
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
        this.pvModel = new pvModel();
        this.followModel = new followModel({
            id: this.id
        });

        this.fetchDetail();
        this.pvModel.fetch({
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
    fetchDetail: function() {
        this.detailModel.fetch({
            data: {
                id: this.id
            }
        })
    },
    follow: function() {
        this.followModel.set('id', this.id);
        this.followModel.save();
    },
    handleFollow: function() {
        var model = this.followModel.toJSON();
        if(model.result.status == 'OK') {
            layer.msg('关注成功');
        }
    }
});

module.exports = view;