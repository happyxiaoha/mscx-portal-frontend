/**
 * Created by Kevin on 2016/12/6.
 */

var tagView = require('tagWidget/tagItemView.js');
var confirmRechargeView = require('./confirmRecharge.js');
var template = require('./publishTemplate.html');
var optionTemplate = require('./optionTemplate.html');
var tagTemplate = require('./tagTemplate.html');
require('../publish.css');
require('validate');
require('util');

var detailModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'getServiceDetailOfMe.do'
})
var getCategoryTagModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'tags/getTagsInfo4pinyin.do'
});
var serviceCategory = Backbone.Model.extend({
    url: mscxPage.request.dict + 'category/getProviderCategory.do'
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
        'click #goBack': 'backHistory',
        'click #chooseTag': 'showTagArea',
        'click .tag-area .remove-tags-btn': 'deleteTag',
        'click #category': 'changeCategory',
        'input #taskMoney': 'handleTaskMoney',
        'change #ensurePercent': 'handleEnsurePercent',
    },
    template: _.template(template, {variable: 'data'}),
    optionTemplate: _.template(optionTemplate, {variable: 'data'}),
    tagTemplate: _.template(tagTemplate, {variable: 'data'}),
    initialize: function() {
        // 如果有ID则说明是进入修改页面
        this.detailModel = new detailModel();
        this.serviceCategory = new serviceCategory();
        this.getCategoryTagModel = new getCategoryTagModel();

        this.listenTo(this.serviceCategory, 'sync', this.renderServiceCategory);
        this.listenTo(this.getCategoryTagModel, 'sync', this.renderCategoryTag);

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

        this.model.on('change:tags',function () {
            this.buildChooseTags();
        }.bind(this));
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
                    integers: true
                },
                endTime: {
                    required: true
                },
                contactUsername: {
                    maxlength: 50
                },
                contactPhone: {
                    telephone: true
                },
                contactEmail: {
                    email: true
                }
            },
            messages: {
                money: {
                    integers: '金额为大于0的整数'
                }
            },
            submitHandler: function () {
                me.submitForm();
            },
            invalidHandler:function() {
                me.checkValidateSelf();
            }
        }
    },
    checkValidateSelf: function () {
        var res = true;

        if(!this.model.get('tags')) {
            $('.tag-error').show();
            res = false;
        } else {
            $('.tag-error').hide();
        }
        return res;
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
            
            // 保证金是否为0，是->用户中心，否->确认充值页面
            if(this.model.get('ensureMoney') == 0) {
                layer.msg((this.id ? '修改' : '创建') + '成功，请至用户中心我的需求内发布');
                setTimeout(function() {
                    location.href = 'userInfo.html#serversDemand';
                }, 2000);
            }else {
                this.model.set('id', model.result);
                this.$el.replaceWith(new confirmRechargeView({
                    model: this.model
                }).$el);
            }
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

        this.model.set('categoryId', $serviceCategory.val());

        if($serviceCategory.data('default')) {
            $serviceCategory.val($serviceCategory.data('default'));
        }
    },
    showTagArea: function () {
        this.getCategoryTagModel.fetch({
            data: {
                categoryId: this.model.get('categoryId')
            }
        });
    },
    changeCategory: function (e) {
        var $this = this.$(e.target);
        
        this.model.set('categoryId', $this.val());
        this.chooseTags = [];
        this.model.set('tags', '');
        return false;
    },
    chooseTags: [],
    saveTag: function () {
        var cTags = [],
            aTags = [];
        $('input[name="tagGroup"]:checked').each(function() {
            var $this = $(this),
                sId = this.id.replace('tag',''),
                sName = $this.data('name');
            cTags.push({id:sId,name: sName});
            aTags.push(sId);
        });
        this.chooseTags = cTags;
        this.model.set('tags', aTags.join(','));
        this.model.set('tagsName', cTags)
        return false;
    },
    buildChooseTags: function () {
        var cTags = this.chooseTags;

        $('.tag-area').html(this.tagTemplate({tags: cTags}));
    },
    deleteTag: function (e) {
        var $this = $(e.target).closest('p').find('span'),
            newTags = [],
            newChooseTags = [],
            sVal = $this.text();
        if(!$this.hasClass('un-select')){
            for(var i = 0,len = this.chooseTags.length; i < len; i++){
                if(this.chooseTags[i].name != sVal){
                    newTags.push(this.chooseTags[i].id);
                    newChooseTags.push(this.chooseTags[i]);
                }
            }
        }
        this.chooseTags = newChooseTags;
        this.model.set('tags',newTags.join(','));
    },
    renderCategoryTag: function () {
        var tagList = this.getCategoryTagModel.get('result');
        var sChooseTags = '';
        if(this.model.get('tags')){
            sChooseTags = '*&'+this.model.get('tags').split(',').join('*&')+'*&';
        }
        $('.tag-list-area').remove();
        var tagsView = new tagView({
            model: {tagList: tagList,sChooseTags:sChooseTags}
        });
        this.$el.append(tagsView.$el);

        var that = this;
        var dialog = layer.open({
            type: 1,
            btn: ['保存','取消'],
            title: '选择标签',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['350px', '450px'],
            content: $('.tag-list-area'), //捕获的元素
            btn1: function () {
                that.saveTag();
                layer.close(dialog);
                $('.tag-list-area').remove();
            },
            btn2: function () {
                layer.close(dialog);
            }
        });
    },
    handleTaskMoney: function(e) {
        var $target = this.$(e.target);

        this.taskMoney = $target.val();
        this.$('#ensurePercent').trigger('change');
    },
    handleEnsurePercent: function(e) {
        var $target = this.$(e.target);
        var percent = $target.val();

        this.$('#ensureMoney').val((this.taskMoney * percent).toFixed(2));
    }
});

module.exports = createDemandView;