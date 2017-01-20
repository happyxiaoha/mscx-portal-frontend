/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./publishTemplate.html');
var optionTemplate = require('html!./optionTemplate.html');
var detailModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'modifyApiDetail.do'
});
// 数据API分类
var dataCategory = Backbone.Model.extend({
    url: mscxPage.request.dict + 'category/getDataApiCategory.do'
});
// 模型API分类
var modelCategory = Backbone.Model.extend({
    url: mscxPage.request.dict + 'category/getModelApiCategory.do'
});
// 工具API分类
var toolCategory = Backbone.Model.extend({
    url: mscxPage.request.dict + 'category/getToolApiCategory.do'
});

require('../publish.css');
require('validate');
require('formAjax');
require('util');

var demandApi = '/ro/mscx-requirement-api/';

var createDemandView = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    events: {
        'click #goBack': 'backHistory',
        'change input[type="file"]': 'changeFile',
        'click .category input[type="radio"]': 'changeCategory'
    },
    template: _.template(template, {variable: 'data'}),
    optionTemplate: _.template(optionTemplate, {variable: 'data'}),
    initialize: function() {
        // 如果有ID则说明是进入修改页面
        this.detailModel = new detailModel();
        this.dataCategory = new dataCategory();
        this.modelCategory = new modelCategory();
        this.toolCategory = new toolCategory();

        this.listenTo(this.dataCategory, 'sync', this.renderDataCategory);
        this.listenTo(this.modelCategory, 'sync', this.renderModelCategory);
        this.listenTo(this.toolCategory, 'sync', this.renderToolCategory);
        
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
                sysName: {
                    required: true,
                    maxlength: 50
                },
                sysDescription: {
                    maxlength: 1000
                },
                department: {
                    required: true,
                    maxlength: 64
                },
                ownership: {
                    required: true
                },
                netType: {
                    required: true
                },
                interfaceNum: {
                    required: true,
                    digits: true,
                    min: 1
                },
                endTime: {
                    required: true
                },
                site: {
                    url: true
                },
                contactUsername: {
                    required: true,
                    maxlength: 50
                },
                contactPhone: {
                    required: true,
                    telephone: true
                },
                matchmakeTrade: {
                    required: true
                },
                categoryId: {
                    required: true
                },
                preOffer: {
                    required: true
                }
            },
            submitHandler: function () {
                me.submitForm();
            }
        }
    },
    submitForm: function () {
        // 填充categoryName字段
        var me = this;
        var categoryName = this.$category.find('select:not(:disabled)').find('option:selected').text();
        this.$('#categoryName').val(categoryName);

        this.$('#publishBtn').attr('disabled', 'disabled');
        this.$form.ajaxSubmit({
            url: this.formAction,
            success: function(res) {
                if(res.status == 'ERROR'){
                    me.$('#publishBtn').removeAttr('disabled');
                    layer.msg(res.message);
                }else {
                    layer.msg((me.id ? '修改' : '创建') + '成功，请至用户中心我的需求内发布');
                    setTimeout(function() {
                        location.href = 'userInfo.html#apiDemand';
                    }, 2000);
                }
            }
        })
    },
    backHistory: function (event) {
        event.preventDefault();
        history.back();
    },
    changeFile: function(event) {
        var filePath = $(event.currentTarget).val();
        var arr = filePath.split('\\');
        var fileName=arr[arr.length-1];
        this.$("#showFileName").html(fileName);
    },
    renderDetail: function() {
        var model = this.detailModel && this.detailModel.toJSON() || {};
        model.result = model.result || {};
        _.extend(model.result, {
            userInfo: mscxPage.userInfo
        });

        this.$el.html(this.template(model.result));

        this.$form = this.$('form');
        this.$category = this.$('.category');
        this.$form.validate(this.validateConfig());

        this.formAction = mscxPage.host + '' + demandApi + (this.id ? 'modifyApi.do' : 'addApi.do');

        this.$endTime = this.$('.end-time');

        // 选择日期
        this.$endTime.daterangepicker({
            singleDatePicker: true,
            startDate: moment(),
            minDate: (new Date()).format('yyyy-MM-dd')
        });

        this.dataCategory.fetch();
        this.modelCategory.fetch();
        this.toolCategory.fetch();
    },
    renderDataCategory: function() {
        var model = this.dataCategory.toJSON();
        var $dataCategory = this.$('#dataCategory');
        $dataCategory.html(this.optionTemplate(_.extend(model, {type: 2})));

        if($dataCategory.data('default')) {
            $dataCategory.val('2,' + $dataCategory.data('default'));
        }
    },
    renderModelCategory: function() {
        var model = this.modelCategory.toJSON();
        var $modelCategory = this.$('#modelCategory');
        $modelCategory.html(this.optionTemplate(_.extend(model, {type: 3})));

        if($modelCategory.data('default')) {
            $modelCategory.val('3,' + $modelCategory.data('default'));
        }
    },
    renderToolCategory: function() {
        var model = this.toolCategory.toJSON();
        var $toolCategory = this.$('#toolCategory');
        $toolCategory.html(this.optionTemplate(_.extend(model, {type: 4})));

        if($toolCategory.data('default')) {
            $toolCategory.val('4,' + $toolCategory.data('default'));
        }
    },
    changeCategory: function(event) {
        var $target = this.$(event.currentTarget);
        var id = $target.data('select');

        this.$category.find('select').attr('disabled', 'disabled');
        this.$('#' + id).removeAttr('disabled');
    }
});

module.exports = createDemandView;