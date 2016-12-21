'use strict';

var template = require('html!./applyTemplate.html');
var model = Backbone.Model.extend({
    idAttribute: 'serviceId',
    url: mscxPage.host + '/ro/mscx-requirement-api/addServiceOrder.do'
})

require('validate');

var view = Backbone.View.extend({
    tagName: 'form',
    className: 'apply-box orderDiv hide',
    template: _.template(template),
    events: {
        'input input[type="text"]' : 'changeAttribute',
        'input textarea' : 'changeAttribute',
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
                    telephone: true
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
        this.model.set('reqId', this.id);
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
            layer.msg('接单成功！', function() {
                me.delegate.fetchDetail();
            });
        }
    }
});

module.exports = view;