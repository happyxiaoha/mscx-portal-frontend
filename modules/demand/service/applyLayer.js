'use strict';

var template = require('html!./applyTemplate.html');
var model = Backbone.Model.extend({
    idAttribute: 'serviceId',
    url: mscxPage.request.demand + 'addServiceOrder.do'
});

require('validate');
require('customValidate');

var view = Backbone.View.extend({
    tagName: 'form',
    className: 'apply-box orderDiv hide',
    template: _.template(template),
    events: {
        'input input[type="text"]' : 'changeAttribute',
        'input textarea' : 'changeAttribute'
    },
    initialize: function() {
        this.$el.html(this.template()).attr('onsubmit', 'return false;');

        this.model = new model();

        this.listenTo(this.model, 'sync', this.handleSubmit);

        this.$el.validate(this.validateConfig());
    },
    validateConfig: function () {
        var me = this;
        return {
            rules: {
                price: {
                    required: true,
                    number: true
                },
                planIntro: {
                    required: true
                },
                contactUsername: {
                    required: true
                },
                contactPhone: {
                    required: true,
                    contactWay: true
                }
            },
            submitHandler: function () {
                me.submit();
            }
        }
    },
    changeAttribute: function (e) {
        this.model.set(e.target.name, e.target.value);
    },
    submit: function() {
        this.model.set('reqId', +this.id);
        this.model.save();
    },
    submitForm: function(index) {
        this.layerIndex = index;
        this.$el.submit();
    },
    handleSubmit: function() {
        var model = this.model.toJSON(),
            me = this;

        layer.close(me.layerIndex);
        if(model.status == 'OK') {
            layer.msg('接单申请提交成功，等待发布人审核');
            setTimeout(function() {
                me.delegate.fetchDetail();
            }, 2000);
        }
    }
});

module.exports = view;