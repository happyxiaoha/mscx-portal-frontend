/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./publishTemplate.html');
var tagView = require('./tagsLayer.js');
require('./services.css');
require('validate');
require('formAjax');
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
    url: mscxPage.request.dict + 'tag/getTagsInfo.do'
})
// 上传图片
var uploadImgUrl = mscxPage.request.app + 'pic/upload.do';

var addModel = Backbone.Model.extend({
    idAttribute: 'addId',
    url: mscxPage.request.app + 'apply.do'
});
var modifyModel = Backbone.Model.extend({
    idAttribute: 'modifyId',
    url: mscxPage.request.app + 'modify.do'
});

var createDemandView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    events: {
        'change .upload-file': 'doUploadImg',
        'click #selectTagBtn': 'getTags',
        'change #selectCategory': 'saveCategory'
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.model = this.id ? new modifyModel() : new addModel();
        this.objectModel = new objectModel();
        this.categoryModel = new categoryModel();
        this.tagModel = new tagModel();
        // 如果有ID则说明是进入修改页面
        this.detailModel = new detailModel();

        this.tags = new Backbone.Model();
        
        this.listenTo(this.model, 'sync', this.handleSubmit);
        this.listenTo(this.tagModel, 'sync', this.showTagLayer);
        this.listenTo(this.tags, 'change', this.fillTags);
        this.on('renderDetail', this.renderDetail);

        var queue = [this.objectModel.fetch(), this.categoryModel.fetch()];

        if(this.id) {
            queue.push(this.detailModel.fetch({data: {id: this.id}}));
        }

        $.when.apply($, queue).done(function() {
            this.trigger('renderDetail');
        }.bind(this));
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

        params.serviceObject = params.serviceObject.join(',');
        params.categoryId = +params.categoryId;
        if(params.id) {
            params.id = +params.id;
        }

        this.model.set(params);
        this.model.save();
    },
    backHistory: function () {
        history.back();
    },
    handleSubmit: function() {
        var model = this.model.toJSON();
        if(model.status == 'OK') {
            layer.msg('提交成功，请等待审核', function() {
                location.href = 'userinfo.html#server';
            })
        }
    },
    renderDetail: function() {
        var params = {};
        var detail = this.detailModel.toJSON();
        var object = this.objectModel.toJSON();
        var category = this.categoryModel.toJSON();

        _.extend(params, {
            detail: detail.result,
            objects: object.result,
            category: category.result,
            showFlag: this.showFlag
        })

        this.$el.html(this.template(params));

        this.$form = this.$('#publishForm');
        this.$uploadIcon = this.$('#uploadServiceIcon');
        this.$uploadDemoIcon1 = this.$('#uploadDemoIcon1');
        this.$uploadDemoIcon2 = this.$('#uploadDemoIcon2');
        this.$uploadDemoIcon3 = this.$('#uploadDemoIcon3');
        this.$form.validate(this.validateConfig());

        this.currentCategory = this.$('#selectCategory').val();
    },
    doUploadImg: function(event) {
        var me = this;
        var id = event.target.id;
        var form;

        switch(id) {
            case 'service':
                form = this.$uploadIcon;
                break;
            case 'demo1':
                form = this.$uploadDemoIcon1;
                break;
            case 'demo2':
                form = this.$uploadDemoIcon2;
                break;
            case 'demo3':
                form = this.$uploadDemoIcon3;
                break;
        }

        form.ajaxSubmit({
            url: uploadImgUrl,
            success: function(res) {
                if(typeof (res) === 'string' ){
                    res = JSON.parse(res)
                }
                var params = res.result;
                if(res.status == 'ERROR') {
                    layer.msg(res.message);
                }else {
                    me.$('#' + id + 'Icon').attr('src', params.uri);
                    me.$('#' + id + 'Key').val(params.key);
                }
            },
            error: function() {
                layer.msg('上传失败');
            }
        })
    },
    showTagLayer: function(event) {
        var tags = this.tagModel.toJSON();
        var detail = this.detailModel.toJSON();
        var me = this;
        var param = {};

        _.extend(param, {
            tags: tags,
            detailTag: detail.result && detail.result.tags || []
        })

        this.tagView = new tagView({
            model: param
        });
        this.$el.append(this.tagView.$el);

        this.tagView.delegate = this;

        this.layer = layer.open({
            type: 1,
            btn: ['确定', '取消'],
            title: '服务标签',
            shade: 0.6,
            shadeClose: true,
            area: ['500px'],
            content: this.tagView.$el,
            btn1: function (index) {
                me.tagView.submit(index);
            },
            btn2: function (index) {
                layer.close(index);
            },
            end: function() {
                me.tagView.remove();
            }
        })
    },
    getTags: function(event) {
        event.preventDefault();
        this.tagModel.fetch({
            data: {
                categoryId: this.currentCategory
            }
        })
    },
    saveCategory: function() {
        this.currentCategory = this.$('#selectCategory').val();
    },
    fillTags: function() {
        this.$('#tagId').val(this.tags.get('tagId'));
        this.$('#tagName').val(this.tags.get('tagName'));
    }
});

module.exports = createDemandView;