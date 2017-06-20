/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('./publishTemplate.html');
var optionTemplate = require('./optionTemplate.html');
require('../publish.less');
require('validate');
require('util');

var detailModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'getServiceDetailOfMe.do'
})
// 微服务分类
var serviceCategory = Backbone.Model.extend({
    url: mscxPage.request.dict + 'category/getServiceCategory.do'
});
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
    optionTemplate: _.template(optionTemplate, {variable: 'data'}),
    initialize: function() {
        // 如果有ID则说明是进入修改页面
        this.detailModel = new detailModel();
        this.serviceCategory = new serviceCategory();

        this.listenTo(this.serviceCategory, 'sync', this.renderServiceCategory);

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
                    minlength: 2,
                    maxlength: 100
                },
                required: {
                    required: true
                },
                description: {
                    required: true
                },
                money: {
                    required: true,
                    maxlength: 50
                },
                endTime: {
                    required: true
                },
                contactUsername: {
                    required: true,
                    maxlength: 50
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

        var categoryName = this.$('#category').find('option:selected').text();
        params.categoryName = categoryName;

        this.model.set(params);
        this.model.save();
    },
    backHistory: function (event) {
        event.preventDefault();
        history.back();
    },
    handleSubmit: function() {
        var model = this.model.toJSON();
        if(model.status == 'OK') {
            this.$('#publishBtn').attr('disabled', 'disabled');
            layer.msg((this.id ? '修改' : '创建') + '成功，请至用户中心我的需求内发布');
            setTimeout(function() {
                location.href = 'userInfo.html#serversDemand';
            }, 2000);
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

        model.result = model.result || {};
        _.extend(model.result, {
            userInfo: mscxPage.userInfo
        });

        this.$el.html(this.template(model.result));

        this.serviceCategory.fetch();

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
    },
    renderServiceCategory: function() {
        var model = this.serviceCategory.toJSON();
        var $serviceCategory = this.$('#category');
        $serviceCategory.html(this.optionTemplate(model));

        if($serviceCategory.data('default')) {
            $serviceCategory.val($serviceCategory.data('default'));
        }
    }
});

module.exports = createDemandView;