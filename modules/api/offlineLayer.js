'use strict';

var template = require('html!./offlineTemplate.html');

var offlineModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-api-api/service/apiOfflineMeet.do'
});

require('validate');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'offline-box hide',
    template: _.template(template, {variable: 'data'}),
    events: {
    },
    validateConfig: function () {
        var me = this;
        return {
            rules: {
                resReq:{
                    required: true,
                },
                purpose:{
                    required: true,
                },
                contact: {
                    required: true,
                },
                contactNo: {
                    required: true,
                    telephone: true
                }
            },
            submitHandler: function () {
                me.fetch();
            }
        }
    },
    initialize: function() {
        this.$el.html(this.template());
        this.$form = this.$('form');
        this.$form.validate(this.validateConfig());

        this.offlineModel = new offlineModel();
        this.listenTo(this.offlineModel, 'sync', this.handleSubmit);
    },
    submit: function(index) {
        this.layerIndex = index;
        this.$form.submit();
    },
    fetch: function() {
        var params = this.$form.serialize();
        params += '&apiServiceId=' + this.delegate.id;
        
        this.offlineModel.fetch({
            data: params
        })
    },
    handleSubmit: function() {
        var model = this.offlineModel.toJSON();

        // layer.alert(model.message);

        layer.alert('线下洽谈申请成功！');

        if(model.status == 'OK') {
            layer.close(this.layerIndex);
        }    
    }
});

module.exports = view;