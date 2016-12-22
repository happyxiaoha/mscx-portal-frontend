'use strict';

var template = require('html!./offlineTemplate.html');

var offlineModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'addDataOfflineMessage.do'
});

require('validate');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'offline-box hide',
    template: _.template(template, {variable: 'data'}),
    events: {
        'input input' : 'changeAttribute',
        'input textarea' : 'changeAttribute'
    },
    validateConfig: function () {
        var me = this;
        return {
            rules: {
                resReq:{
                    required: true
                },
                purpose:{
                    required: true
                },
                contact: {
                    required: true
                },
                contactNo: {
                    required: true,
                    telephone: true
                }
            },
            submitHandler: function () {
                me.save();
            }
        }
    },
    initialize: function() {
        this.$el.html(this.template());
        this.$form = this.$('form');
        this.$form.validate(this.validateConfig());

        this.offlineModel = new offlineModel();
        this.offlineModel.set('dataId', this.id);
        this.listenTo(this.offlineModel, 'sync', this.handleSubmit);
    },

    changeAttribute: function (e) {
        this.offlineModel.set(e.target.id,e.target.value);
        return false;
    },
    submit: function(index) {
        this.layerIndex = index;
        this.$form.submit();
    },
    save: function() {
        this.offlineModel.save({})
    },
    handleSubmit: function() {
        var model = this.offlineModel.toJSON();

        layer.alert('线下洽谈申请成功！');

        if(model.status == 'OK') {
            layer.close(this.layerIndex);
        }    
    }
});

module.exports = view;