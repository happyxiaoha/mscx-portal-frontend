'use strict';

var template = require('./offlineTemplate.html');

var offlineModel = Backbone.Model.extend({
    url: mscxPage.request.contract + 'service/offlineMeet.do'
});

require('./offline.css');
require('util');
require('validate');
require('customValidate');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'offline-box',
    template: _.template(template, {variable: 'data'}),
    validateConfig: function () {
        var me = this;
        return {
            rules: {
                resReq:{
                    required: true,
                    maxlength: 500
                },
                purpose:{
                    required: true,
                    maxlength: 500
                },
                contact: {
                    required: true,
                    maxlength: 50
                },
                contactNo: {
                    required: true,
                    contactWay: true,
                    maxlength: 20
                }
            },
            submitHandler: function () {
                me.fetch();
            }
        }
    },
    initialize: function() {
        this.$el.html(this.template({
            user: mscxPage.userInfo
        }));
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
        var params = _.extend(this.$form.serializeObject(), {
            apiServiceId: +this.model.apiServiceId,
            type: this.model.type,
            cname: this.model.cname
        });

        this.offlineModel.save(params);
    },
    handleSubmit: function() {
        var model = this.offlineModel.toJSON();

        // layer.alert(model.message);

        layer.msg('线下洽谈申请成功！');

        if(model.status == 'OK') {
            layer.close(this.layerIndex);
        }    
    }
});

module.exports = view;