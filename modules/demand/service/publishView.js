/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./publishTemplate.html');
require('../publish.css');
require('validate');
require('util');

var demandApi = '/ro/mscx-requirement-api/';
var model = Backbone.Model.extend({
    url: mscxPage.host + '' + demandApi + 'addService.do'
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

        this.$endTime = this.$('.end-time');

        // 选择日期
        this.$endTime.daterangepicker({
            singleDatePicker: true,
            startDate: moment(),
            minDate: (new Date()).format('yyyy-MM-dd')
        });
        this.$endTime.on('apply.daterangepicker', this.changeDate.bind(this));

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
                required: {
                    required: true
                },
                description: {
                    required: true
                },
                money: {
                    required: true,
                    number: true
                },
                endTime: {
                    required: true
                },
                contactUsername: {
                    required: true
                },
                contactPhone: {
                    required: true,
                    telephone: true
                },
                contactEmail: {
                    email: true
                }
            },
            submitHandler: function () {
                me.submitForm();
            }
        }
    },
    submitForm: function () {
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
                location.href = 'userinfo.html#demand/server';
            })
        }
    },
    changeDate: function(event) {
        var $target = this.$(event.currentTarget);
        var date = $target.val();

        $target.trigger('keyup');

        this.model.set({
            endTime: date
        })
    }
});

module.exports = createDemandView;