/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./publishTemplate.html');
require('./services.css');
require('validate');
require('util');

// 获取微信详情
var detailModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'publish/get.do'
})
// 服务对象
var objectModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'dict/getServiceObject.do'
})
// 微服务分类
var categoryModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'category/getServiceCategory.do'
})
// 微服务标签
var tagModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'category/getServiceCategory.do'
})
// 上传图片
var uploadImgModle = Backbone.Model.extend({
    url: mscxPage.request.app + '/pic/upload.do'
});
var addModel = Backbone.Model.extend({
    idAttribute: 'addId',
    url: mscxPage.request.app + 'apply.do'
});
var modifyModel = Backbone.Model.extend({
    idAttribute: 'modifyId',
    url: mscxPage.request.demand + 'modify.do'
});

var createDemandView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    events: {
        
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
        this.objectModel = new objectModel();
        this.categoryModel = new categoryModel();
        this.tagModel = new tagModel();
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
                categoryId: {
                    required: true
                },
                tags: {
                    required: true
                },
                imageUri: {
                    required: true
                },
                imageKey: {
                    required: true
                },
                serviceObject: {
                    required: true
                },
                scope: {
                    required: true,
                },
                demoUri: {
                    required: true
                },
                uri: {
                    required: true
                },
                description: {
                    required: true
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
    },
    renderDetail: function() {
        var model = this.detailModel.toJSON();

        this.$el.html(this.template(model.result));

        this.$form = this.$('form');
        this.$form.validate(this.validateConfig());

    }
});

module.exports = createDemandView;