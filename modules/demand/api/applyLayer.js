'use strict';

var template = require('html!./applyTemplate.html');
var model = Backbone.Model.extend({
    idAttribute: 'apiId',
    url: mscxPage.request.demand + 'addApiOrder.do'
})

require('validate');
require('formAjax');

var view = Backbone.View.extend({
    tagName: 'form',
    className: 'apply-box orderDiv hide',
    template: _.template(template, {variable: 'data'}),
    events: {
        'input input[type="text"]' : 'changeAttribute',
        'input textarea' : 'changeAttribute',
        'change input[type="file"]': 'changeFile'
    },
    initialize: function() {
        this.$el.html(this.template({id: this.id})).attr({
            onsubmit: 'return false;',
            method: 'post',
            enctype: 'multipart/form-data'
        });

        this.model = new model();

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
        this.$el.ajaxSubmit({
            url: this.model.url,
            success: function(res) {
                layer.msg('接单成功！');
                setTimeout(function() {
                    location.href = 'userInfo.html#acceptDemand';
                }, 2000);
            }
        })
    },
    submitForm: function(index) {
        this.layerIndex = index;
        this.$el.submit();
    }
    changeFile: function(event) {
        var filePath = $(event.currentTarget).val();
        var arr = filePath.split('\\');
        var fileName = arr[arr.length-1];
        this.$("#showFileName").html(fileName);
    }
});

module.exports = view;