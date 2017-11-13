'use strict';

var formatPrice = require('lib/util').formatPrice;
var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var template = require('./portalTemplate.html');
var optionTemplate = '<% data && data.result.forEach(function(item) { %><option value="<%= item.categoryId %>"><%= item.categoryName %></option><% }) %>';

var Resource = require('./resource.js');
var addModel = Backbone.Model.extend({
    idAttribute: 'addId',
    url: mscxPage.request.demand + 'addData.do'
});
var serviceCategory = Backbone.Model.extend({
    url: mscxPage.request.dict + 'category/getProviderCategory.do'
});

require('./demand.css');
require('validate');
require('util');

var view = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    template: _.template(template, {variable: 'data'}),
    optionTemplate: _.template(optionTemplate, {variable: 'data'}),
    events: {
        'click .portal #goBack': 'backHistory',
        'click .contact button': 'goContact',
        'focus #dataReward': 'handleFocus',
        'blur #dataReward': 'handleFormat'
    },
    initialize: function() {
        this.$el.removeClass('boxShadiow bgWhite').addClass('grid1190 mt16');
        this.leftMenuView = new leftMenuView({
            model: {
                className: 'demand',
                id: this.id,
                sideBars: Resource.maps
            }
        });

        this.serviceCategory = new serviceCategory();

        this.listenTo(this.serviceCategory, 'sync', this.renderServiceCategory);

        this.$el.empty();
        this.$el.append(this.leftMenuView.$el);
        this.$el.append(this.template({
            userInfo: mscxPage.userInfo
        }));

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

        this.model = new addModel();
        this.listenTo(this.model, 'sync', this.handleSubmit);

        return this;
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
                dataReward: {
                    required: true,
                    maxlength: 20
                },
                dataItem: {
                    maxlength: 1000
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
    renderServiceCategory: function() {
        var model = this.serviceCategory.toJSON();
        var $serviceCategory = this.$('#category');
        $serviceCategory.html(this.optionTemplate(model));

        this.model.set('categoryId', $serviceCategory.val());

        if($serviceCategory.data('default')) {
            $serviceCategory.val($serviceCategory.data('default'));
        }
    },
    handleSubmit: function() {
        var model = this.model.toJSON();
        if(model.status == 'OK') {
            this.$('#publishBtn').attr('disabled', 'disabled');
            layer.msg('创建成功，请至用户中心我的需求内发布');
            setTimeout(function() {
                location.href = 'userInfo.html#demand';
            }, 2000);
        }
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

module.exports = view;