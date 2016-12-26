/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./publishTemplate.html');
require('../publish.css');
require('validate');
require('util');

var detailModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'getServiceDetailOfMe.do'
})
var addModel = Backbone.Model.extend({
    idAttribute: 'addId',
    url: mscxPage.request.demand + 'addService.do'
});
var modifyModel = Backbone.Model.extend({
    idAttribute: 'modifyId',
    url: mscxPage.request.demand + 'modifyService.do'
});

var createDemandView = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    events: {
        'click #goBack': 'backHistory'
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        // 如果有ID则说明是进入修改页面
        this.detailModel = new detailModel();
        if(this.id) {
            this.listenTo(this.detailModel, 'sync', this.renderDetail);
            this.detailModel.fetch({
                data: {
                    id: this.id
                }
            })
        }else {
            this.renderDetail();
        }

        this.model = this.id ? new modifyModel() : new addModel();
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
                    required: true
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
        var params = this.$form.serializeObject();

        this.model.set(params);
        this.model.save();
    },
    backHistory: function () {
        history.back();
    },
    handleSubmit: function() {
        var model = this.model.toJSON();
        if(model.status == 'OK') {
            layer.msg('提交成功,请耐心等待审核！', function() {
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
    },
    renderDetail: function() {
        var model = this.detailModel.toJSON();

        this.$el.html(this.template(model.result));

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
    }
});

module.exports = createDemandView;