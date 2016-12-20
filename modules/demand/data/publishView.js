/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./publishTemplate.html');
require('../publish.css');
require('validate');

var demandApi = '/ro/mscx-requirement-api/';
var model = Backbone.Model.extend({
    url: mscxPage.host + '' + demandApi + 'addData.do'
});

var createDemandView = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    events: {
        'input form input[type="text"]' : 'changeAttribute',
        'input form textarea' : 'changeAttribute',
        'click #goBack': 'backHistory'
    },
    template: _.template(template),
    initialize: function() {
        this.$el.html(this.template());

        this.$form = this.$('form');
        this.$form.validate(this.validateConfig());

        this.model = new model();
        this.listenTo(this.model, 'sync', this.handleSubmit);
    },
    validateConfig: function () {
        var me = this;
        return {
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                dataDescription: {
                    required: true
                },
                dataItem: {
                    required: true
                },
                dataUsage: {
                    required: true
                }
            },
            submitHandler: function () {
                me.submitForm();
            }
        }
    },
    submitForm: function () {
        var dataFormat = this.$el.find('input[name="dataFormat"]').filter(':checked').val();
        this.model.set('dataFormat', dataFormat);
        this.model.save();
    },
    changeAttribute: function (e) {
        this.model.set(e.target.name, e.target.value);
    },
    backHistory: function () {
        history.back();
    },
    handleSubmit: function() {
        var model = this.model.toJSON();
        if(model.status == 'OK') {
            layer.msg('发布成功', function() {
                location.href = '#data';
            })
        }
    }
});

module.exports = createDemandView;