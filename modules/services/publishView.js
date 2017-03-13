/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./publishTemplate.html');
var packageTabletemplate = require('html!./packageTableTemplate.html');
var serverUrlTemplate = require('html!./serverUrlTemplate.html');
var serverUrlTableTemplate = require('html!./serverUrlTableTemplate.html');
var tagView = require('tagWidget/tagItemView.js');
require('./services.css');
require('validate');
require('formAjax');
require('util');
require('customValidate');

var packageWidgetView = require('packageWidget/packageItemView.js');
// 获取微信详情
var detailModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'publish/get.do'
});
// 服务对象
var objectModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'dict/getServiceObject.do'
});
// 微服务分类
var categoryModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'category/getServiceCategory.do'
});
// 微服务标签
var tagModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'tags/getTagsInfo4pinyin.do'
});
// 上传图片
var uploadImgUrl = mscxPage.request.app + 'pic/upload.do';

// 获取套餐信息
var detailChargeModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'publish/chargeRule/get.do'
});

var addModel = Backbone.Model.extend({
    idAttribute: 'addId',
    url: mscxPage.request.app + 'apply.do'
});
var modifyModel = Backbone.Model.extend({
    idAttribute: 'modifyId',
    url: mscxPage.request.app + 'modify.do'
});

var checkUnique = Backbone.Model.extend({
    url: mscxPage.request.app + 'checkUnique.do'
});

var createDemandView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    events: {
        'change .upload-file': 'doUploadImg',
        'click #selectTagBtn': 'getTags',
        'change #selectCategory': 'saveCategory',
        'keydown input': 'cancelSubmit',
        'blur #identify': 'checkIdentify',
        'click input:radio[name="chargeType"]': 'changeChargeType',
        'click .addPrice': 'addChargePackage',
        'click .editCharge': 'updateChargeLay',
        'click .removeCharge': 'removeCharge',
        'click .add-server-url': 'addServerLay',
        'click .editServerUrl': 'updateServerLay',
        'click .deleteServerUrl': 'deleteServerUrl'
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
            ignore: '.ignore',
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 20
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
                    chineseAndSplit: true,
                    maxlength: 50
                },
                demoUri: {
                    required: true,
                    maxlength: 255
                },
                uri: {
                    required: true,
                    isUrl: true,
                    maxlength: 255
                },
                description: {
                    required: true,
                    maxlength: 500
                },
                identify: {
                    required: true,
                    identify: true
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
    checkIdentify: function () {
        var me = this;
        var identify = $.trim($('#identify').val());
        var check = this.$form.validate().element($("#identify"));
        $('.server-identify-error').remove();
        if(check){
            new checkUnique().fetch({
                data: {identify: identify},
                success: function (model,res) {
                    if(res.result){
                        $('.server-identify-error').remove();
                        $('#identify').removeClass('error');
                    }
                    else {
                        $('#identify').addClass('error');
                        $('<span class="server-identify-error">'+res.message+'</span>').insertAfter('#identify');
                    }
                }
            });
        }
    },
    checkValidateSelf: function () {
        if(this.chargeType == '02'){
            if(this.model.idAttribute=='addId'){
                if(!this.chargeRule || this.chargeRule.length == 0){
                    $('.package-error').show();
                }
            }
            if(!this.serverUrlList || this.serverUrlList.length == 0){
                $('.url-error').show();
                return;
            }
        }
    },
    submitForm: function () {
        var me = this;
        if(this.chargeType == '02'){
            if(this.model.idAttribute=='addId') {
                if (!this.chargeRule || this.chargeRule.length == 0) {
                    $('.package-error').show();
                    return;
                }
            }
            if(!this.serverUrlList || this.serverUrlList.length == 0){
                $('.url-error').show();
                return;
            }
        }
        var app = this.$form.serializeObject();
        var agreement = $('#agreementCheckbox').is(':checked');
        if(agreement) {
            app.serviceObject = _.isArray(app.serviceObject) ? app.serviceObject.join(',') : app.serviceObject;
            app.categoryId = +app.categoryId;
            if (app.id) {
                app.id = +app.id;
            }
            if(this.model.idAttribute == 'modifyId'){
                //this.model.set(app);
                this.model.set({
                    app: app,
                    url: this.serverUrlList
                });
                var conf = layer.confirm('将重新审核，请确认！', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    me.model.save();
                }, function(){
                    layer.close(conf);
                });
            }
            else {
                this.model.set({
                    app: app,
                    chargeRule: this.chargeRule,
                    url: this.serverUrlList
                });
                this.model.save();
            }
        }
        else {
            layer.alert('请阅读并勾选协议！');
        }
    },
    backHistory: function () {
        history.back();
    },
    handleSubmit: function() {
        var model = this.model.toJSON();
        if(model.status == 'OK') {
            layer.msg('已提交审核，请等待审核');
            setTimeout(function() {
                location.href = 'userInfo.html#server';
            }, 1000);
        }
    },
    renderPackageUpdate: function (appId) {
        var that = this;
        new detailChargeModel().fetch({
            data: {
                'appId': appId
            },
            'success': function (model) {
                that.chargeRule = model.get('result');
                that.buildChargeTable();
            }
        });
    },
    renderDetail: function() {
        var params = {};
        var detail = this.detailModel.toJSON();
        var object = this.objectModel.toJSON();
        var category = this.categoryModel.toJSON();
        this.chargeType = '01';
        if(detail.result && detail.result.chargeType){
            this.chargeType = detail.result.chargeType;
            this.appId = detail.result.id;
        }
        if(this.chargeType == '02'){
            this.renderPackageUpdate(detail.result.id);
        }
        _.extend(params, {
            detail: detail.result,
            objects: object.result,
            category: category.result,
            showFlag: this.showFlag
        });

        this.$el.html(this.template(params));

        this.$form = this.$('#publishForm');
        this.$uploadIcon = this.$('#uploadServiceIcon');
        this.$uploadDemoIcon1 = this.$('#uploadDemoIcon1');
        this.$uploadDemoIcon2 = this.$('#uploadDemoIcon2');
        this.$uploadDemoIcon3 = this.$('#uploadDemoIcon3');
        $.validator.addMethod('isUrl', function(value, element) {
            return this.optional(element) || (value.substring(0,1) == '/');
        }, '接入URL必须以“/”开头');
        this.$form.validate(this.validateConfig());
        this.serverUrlList = detail.result ? detail.result.url : [];
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
                    me.$('#' + id + 'Key-error').text('')
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
        var sChooseTags = '';
        if(this.tags.get('tagId')){
            sChooseTags =  '*&'+this.tags.get('tagId').split(',').join('*&')+'*&';
        }
        else if(detail.result && detail.result.tags) {
            sChooseTags =  '*&'+detail.result.tags.split(',').join('*&')+'*&';
        }
        _.extend(param, {
            tagList: tags.result || [],
            sChooseTags: sChooseTags
        });
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
            area: ['350px', '450px'],
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
        this.tags.set({
            tagId: '',
            tagName: ''
        })
    },
    fillTags: function() {
        this.$('#tagId').val(this.tags.get('tagId'));
        this.$('#tagName').val(this.tags.get('tagName'));
        this.$('#tagId-error').text('');
    },
    cancelSubmit: function(event) {
        if(event.keyCode == 13) {
            event.preventDefault();
        }
    },
    updateIndex: -1,
    buildChargeTable: function () {
        var chargeSetJson = this.chargeRule || [];
        if(chargeSetJson.length > 0){
            $('.package-error').hide();
        }
        var isUpdate = this.model.idAttribute == 'modifyId' ? true : false;
        var packageTableTemps = _.template(packageTabletemplate);
        $('#packageTable').html(packageTableTemps({chargeSetJson: chargeSetJson,isUpdate:isUpdate}));
    },
    saveCharge: function () {
        layer.closeAll();
        var chargeRule = this.chargeRule || [];
        if(this.updateIndex < 0){
            chargeRule.push($('#serverChargePackage').serializeObject());
        }
        else {
            chargeRule[this.updateIndex] = $('#serverChargePackage').serializeObject();
            this.updateIndex = -1;
        }
        this.chargeRule = chargeRule;
        this.buildChargeTable();
    },
    changeChargeType: function (e) {
        var sId = e.target.id.replace('ct','');
        this.chargeType = sId;
        sId == '01' ?  ($('.server-package').hide(),$('.server-url').hide()) : ($('.server-package').show(),$('.server-url').show(),this.buildChargeTable());
        e.stopPropagation();
    },
    addChargePackage: function () {
        var that = this;
        new packageWidgetView({
            el: '.server-package-area',
            attributes : {callbackFun:function(){that.saveCharge()}},
            model: {}
        });
        var dialog = layer.open({
            type: 1,
            btn: ['保存','取消'],
            title: '新增收费规则',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['500px', '550px'],
            content: $('.server-package-area'), //捕获的元素
            btn1: function () {          //通过
                $('#serverChargePackage').submit();
            },
            btn2: function () {         // 不通过
                layer.close(dialog);
            }
        });
        return false;
    },
    updateChargeLay: function (e) {
        var that = this;
        var chargeSetJson = that.chargeRule;
        var index = $(e.target).closest('tr').index();
        this.updateIndex = index;
        new packageWidgetView({
            el: '.server-package-area',
            attributes : {callbackFun:function(){that.saveCharge()}},
            model: chargeSetJson[index]
        });
        var dialog = layer.open({
            type: 1,
            btn: ['保存','取消'],
            title: '修改收费规则',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['500px', '550px'],
            content: $('.server-package-area'), //捕获的元素
            btn1: function () {          //通过
                $('#serverChargePackage').submit();
            },
            btn2: function () {         // 不通过
                layer.close(dialog);
            }
        });
        return false;
    },
    removeCharge: function (e) {
        var that = this;
        var deleteLay = layer.confirm('确认删除这条套餐吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var chargeSetJson = that.chargeRule;
            var index = $(e.target).closest('tr').index();
            if(chargeSetJson.length == 1 && index == 0){
                chargeSetJson = [];
            }
            else {
                chargeSetJson.splice(index,1);
            }
            that.chargeRule = chargeSetJson;
            that.buildChargeTable();
            layer.close(deleteLay);
        }, function(){
            layer.close(deleteLay);
        });
        return false;
    },
    serverUrlConfig: function () {
        var me = this;
        return {
            ignore: '.ignore',
            rules: {
                url: {
                    required: true,
                    maxlength: 255
                },
                description: {
                    required: true,
                    maxlength:50
                }
            },
            messages: {
                url: {
                    maxlength: '服务URL最大长度255'
                },
                description: {
                    maxlength: '服务描述最大长度50'
                }
            },
            submitHandler: function () {
                me.saveServerIrl();
            }
        }
    },
    buildServerUrlTable: function () {
        var serverList = this.serverUrlList || [];
        if(serverList.length > 0){
            $('.url-error').hide();
        }
        $('#serverTable').html(_.template(serverUrlTableTemplate)({serverUrlList:serverList}));
    },
    saveServerIrl: function () {
        var res = $('#serverUrlForm').serializeObject();
        var serverList = this.serverUrlList || [];

        if(this.model.idAttribute == 'modifyId'){
            if(this.updateIndex < 0){
                res.flag = 'C';
                res.appId = this.appId;
                serverList.push(res);
            }
            else {
                var nowRes = serverList[this.updateIndex];
                nowRes.url = res.url;
                nowRes.description = res.description;
                nowRes.flag = nowRes.flag || 'U';
                serverList[this.updateIndex] = nowRes;
            }
        }
        else {
            if(this.updateIndex < 0){
                serverList.push(res);
            }
            else {
                serverList[this.updateIndex] = res;
            }
        }
        this.serverUrlList = serverList;
        this.buildServerUrlTable();
        layer.close(this.serDig);
    },
    addServerLay: function () {
        var me = this;
        $('.server-url-area').html(_.template(serverUrlTemplate)({res:{}}));
        var dialog = layer.open({
            type: 1,
            btn: ['保存','取消'],
            title: '新增服务URL',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['500px', '350px'],
            content: $('.server-url-area'), //捕获的元素
            success: function(){
                $('#serverUrlForm').validate(me.serverUrlConfig());
            },
            btn1: function () {          //通过
                $('#serverUrlForm').submit();
            },
            btn2: function () {         // 不通过
                layer.close(dialog);
            }
        });
        this.serDig = dialog;
        return false;
    },
    updateServerLay: function (e) {
        var me = this;
        var serverUrlList = me.serverUrlList;
        var index = $(e.target).closest('tr').index();
        this.updateIndex = index;
        $('.server-url-area').html(_.template(serverUrlTemplate)({res:serverUrlList[index]}));
        var dialog = layer.open({
            type: 1,
            btn: ['保存','取消'],
            title: '新增服务URL',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['500px', '350px'],
            content: $('.server-url-area'), //捕获的元素
            success: function(){
                $('#serverUrlForm').validate(me.serverUrlConfig());
            },
            btn1: function () {          //通过
                $('#serverUrlForm').submit();
            },
            btn2: function () {         // 不通过
                layer.close(dialog);
            }
        });
        this.serDig = dialog;
        return false;
    },
    deleteServerUrl: function (e) {
        var that = this;
        var deleteLay = layer.confirm('确认删除这条服务URL吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var serverUrlList = that.serverUrlList;
            var index = $(e.target).closest('tr').index();
            if(that.model.idAttribute == 'modifyId' && serverUrlList[index].flag != 'C'){
                serverUrlList[index].flag = 'D';
            }
            else {
                if(serverUrlList.length == 1 && index == 0){
                    serverUrlList = [];
                }
                else {
                    serverUrlList.splice(index,1);
                }
            }
            that.serverUrlList = serverUrlList;
            that.buildServerUrlTable();
            layer.close(deleteLay);
        }, function(){
            layer.close(deleteLay);
        });
        return false;
    }
});

module.exports = createDemandView;