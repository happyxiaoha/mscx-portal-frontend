/**
 * Created by Kevin on 2016/12/6.
 */
var formatPrice = require('lib/util').formatPrice;
var template = require('./publishTemplate.html');
var optionTemplate = '<% data && data.result.forEach(function(item) { %><option value="<%= item.categoryId %>"><%= item.categoryName %></option><% }) %>';
var detailModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'modifyDataDetail.do'
})
var addModel = Backbone.Model.extend({
    idAttribute: 'addId',
    url: mscxPage.request.demand + 'addData.do'
});
var modifyModel = Backbone.Model.extend({
    idAttribute: 'modifyId',
    url: mscxPage.request.demand + 'modifyData.do'
});
var serviceCategory = Backbone.Model.extend({
    url: mscxPage.request.dict + 'category/getProviderCategory.do'
});


require('../publish.css');
require('../demand.css');
require('validate');
require('util');


var createDemandView = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    events: {
        'click .data-publish #goBack': 'backHistory',
        'click .contact button': 'goContact',
        'focus #dataReward': 'handleFocus',
        'blur #dataReward': 'handleFormat'
    },
    template: _.template(template, {variable: 'data'}),
    optionTemplate: _.template(optionTemplate, {variable: 'data'}),
    initialize: function() {
        // 如果有ID则说明是进入修改页面
        this.$el.addClass('grid1190');
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
                dataDescription: {
                    required: true,
                    maxlength: 500
                },
                dataItem: {
                    maxlength: 1000
                },
                dataReward: {
                    required: true,
                    maxlength: 20,
                    price: true
                },
                dataClosing: {
                    required: true
                },
                reqContact: {
                    telephone: true
                }
            },
            submitHandler: function () {
                me.submitForm();
            }
        }
    },
    submitForm: function () {
        var params = this.$form.serializeObject();

        params.dataReward = this.$('#dataReward').data('realval');

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
                location.href = 'userInfo.html#demand';
            }, 2000);
        }
    },
    renderServiceCategory: function() {
        var model = this.serviceCategory.toJSON();
        var $serviceCategory = this.$('#category');
        $serviceCategory.html(this.optionTemplate(model));

        this.model.set('categoryId', $serviceCategory.val());

        if($serviceCategory.data('default')) {
            $serviceCategory.val($serviceCategory.data('default'));
        }
    },
    renderDetail: function() {
        var model = this.detailModel.toJSON();
        model.result = model.result || {};
        _.extend(model.result, {
            userInfo: mscxPage.userInfo
        });

        this.$el.html(this.template(model.result));

        this.$form = this.$('form');
        this.$form.validate(this.validateConfig());

        this.$endTime = this.$('.end-time');

        // 选择日期
        this.$endTime.daterangepicker({
            singleDatePicker: true,
            startDate: moment(),
            minDate: (new Date()).format('yyyy-MM-dd')
        }).on('apply.daterangepicker',function (ev,picker) {
            $(ev.target).trigger('blur');
        });

        this.serviceCategory.fetch();
    },
    goContact: function(event) {
        event.preventDefault();
        location.href = 'contactUs.html#contact';
    },
    handleFormat: function(event) {
        var $target = this.$(event.currentTarget);
        var price = $target.val();

        var isValid = this.$form.validate().element($('#dataReward'))

        if(isValid) {
            $target.data('realval', price).val(formatPrice(price));
        }
    },
    handleFocus: function(event) {
        var $target = this.$(event.currentTarget);
        var price = $target.val();

        $target.val(price.replace(/,/g, ''))
    }
});

module.exports = createDemandView;