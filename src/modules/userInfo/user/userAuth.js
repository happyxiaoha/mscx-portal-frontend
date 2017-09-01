/**
 * Created by Kevin on 2016/12/6.
 */
var tagView = require('tagWidget/tagItemView.js');
var commonTemplate = require('./userCommon.html');
var template = require('./userAuth.html');
require('./user.css');
require('validate');
require('formAjax');

var userInfoModel = Backbone.Model.extend({
    url: mscxPage.request.uc + 'user/info/mine.do'
});
var getPersonAuthModel = Backbone.Model.extend({
    url: mscxPage.request.uc + 'certification/person/info.do'
});
var getEnterpriseAuthModel = Backbone.Model.extend({
    url: mscxPage.request.uc + 'certification/enterprise/info.do'
});
var updateEnterpriseAuthModel = Backbone.Model.extend({
    url: mscxPage.request.uc + 'certification/enterprise/update.do'
});

var addEnterpriseAuthModel = Backbone.Model.extend({
    url: mscxPage.request.uc + 'certification/enterprise.do'
});

var personAuthModel = Backbone.Model.extend({
    url: 'certification/person.do'
});

var getCategoryModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'category/getProviderCategory.do'
});

var getCategoryTagModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'tags/getTagsInfo4pinyin.do'
});

var account = '';
var userAuthenticationView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'click #authTab':'changeTab',
        'click .identifide': 'changeAuthType',
        'change .upload-file': 'uploadFile',
        'click #chooseTag': 'showTagArea',
        'click .tag-area .remove-tags-btn': 'deleteTag',
        'change input:radio[name="category"]': 'changeCategory',
        'input #enterpriseForm input[type="text"]' : 'changeEnterpriseAttribute',
        'input #personForm input[type="text"]' : 'changePersonAttribute',
        'click .captchaImg': 'refreshCaptcha'
    },
    personValidateConfig: function () {
        var that = this;
        return {
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                idcard: {
                    required: true,
                    careId: true
                },
                bankCardNo: {
                    required: true,
                    bankCard: true
                },
                mobile: {
                    required: true,
                    telephone: true
                },
                captcha: {
                    required: true,
                    maxlength: 4,
                    number: true
                }
            },
            submitHandler: function () {
                that.doSavePerson()
            },
            invalidHandler:function() {
                that.savePersonSelf();
            }
        }
    },
    enterpriseValidateConfig: function () {
        var that = this;
        return {
            rules: {
                contractName: {
                    required: true,
                    minlength: 2
                },
                name:{
                    required: true,
                    minlength: 2
                },
                address: {
                    required: true
                },
                licenceNo: {
                    required: true,
                    bussinessCard: true
                },
                contractIdcard: {
                    required: true,
                    careId: true
                },
                contractMobile: {
                    required: true,
                    telephone: true
                },
                contractEmail: {
                    required: true,
                    email: true,
                    maxlength: 50
                }
            },
            submitHandler: function () {
                that.doEnterpriseSave()
            },
            invalidHandler:function() {
                that.saveEnterSelf();
            }
        }
    },
    refreshCaptcha: function () {
        $('.captchaImg').attr('src','/certification/captcha.do?t='+ new Date().getTime());
    },
    savePersonSelf: function () {
        if($('.identifide.active ').data('val') == 'photo' && !$('.upload-file').val()){
            $('.identifyType').find('.phone-error').removeClass('hide');
        }
    },
    saveEnterSelf: function () {
        if(!this.model.get('licencePicUrl')){
            $('.phone-error').removeClass('hide');
        }
    },
    doSavePerson: function () {
        var that = this,
            agreement = $('#agreementPer').is(':checked');
        if($('.identifide.active ').data('val') == 'photo' && !$('.upload-file').val()){
            $('.identifyType').find('.phone-error').removeClass('hide');
            return;
        }
        $('.identifyType').find('.phone-error').addClass('hide');
        if(agreement) {
            this.model.save({}, {
                success: function () {
                    //layer.msg('提交成功!');
                    var layerTag = layer.alert('认证成功!',{icon:1,yes: function () {
                        layer.close(layerTag);
                        location.href = '#info';
                    }});
                    that.$('input[type="submit"]').attr('disabled', 'disabled');
                    /*
                    setTimeout(function () {

                    }, 2000);
                    */
                },
                error: function () {
                    that.refreshCaptcha();
                }
            })
        }
        else {
                layer.alert('请确认并勾选实名认证协议！');
        }
    },
    doEnterpriseSave: function () {
        var that = this,
            agreement = $('#agreement').is(':checked');
        if(!that.model.get('licencePicUrl')){
            $('.phone-error').removeClass('hide');
            return;
        }
        $('.phone-error').addClass('hide');
        if(agreement) {
            this.model.save({},{
                success: function(){
                    layer.msg('提交成功!');
                    that.$('input[type="submit"]').attr('disabled', 'disabled');
                    setTimeout(function () {
                        location.href = '#info';
                    },2000);
                }
            });
        }
        else {
            layer.alert('请确认并勾选实名认证协议！');
        }
    },
    initialize: function() {
        var that = this;
        this.personAuthModel = new getPersonAuthModel();
        this.getEnterpriseAuthModel = new getEnterpriseAuthModel();
        this.getCategoryModel = new getCategoryModel();
        this.getCategoryTagModel = new getCategoryTagModel();
        if(!mscxPage.userInfo){
            new userInfoModel().fetch({
                success: function (model,res) {
                    account = res.result.account;
                    var useType = res.result.userType;
                    var isDis = useType == '合作伙伴'? true : false;
                    if(isDis){
                        location.href = '#user';
                    }
                    else {
                        callback();
                    }

                }
            });
        }
        else {
            account = mscxPage.userInfo.account;
            var isDis = mscxPage.userInfo.userType == 'PARTNER_ORG' || mscxPage.userInfo.userType == 'PARTNER_GOV' ? true : false;
            if(isDis){
               location.href = '#user';
            }
            else {
                callback();
            }
        }
        function callback() {
            that.getEnterpriseAuthModel.fetch({
                success: function (model,res) {
                    if(res.result && res.result.status == '02') {
                        that.buildEnterprise();
                        $('#authTab').remove();
                    }
                    else {
                        that.personAuthModel.fetch({
                            success: function () {
                                that.buidPerson();
                            }
                        });
                    }
                }
            });
        }

        this.listenTo(this.getCategoryTagModel, 'sync', this.renderCategoryTag);
        this.listenTo(this.getCategoryModel, 'sync', this.renderCategory);

        this.$el.addClass('user-center-tap');
        this.$el.html(_.template(commonTemplate)({name:'userAuth',isDisplay:false}));

        this.render();
    },
    changeAuthType: function (e) {
        var $this = e.target.tagName == 'I' ? $(e.target).parent() : $(e.target);

        if($this.hasClass('disabled')) return;

        if($this.is('label') && !$this.hasClass('active')) {
            $('.identifide.active ').removeClass('active');
            $this.addClass('active');
            var sVal = $this.data('val');
            switch (sVal) {
                case 'phone':
                    $('#ajaxUpload').hide();
                    this.model.set('certificationType','02');
                    break;
                case 'identify':
                    $('#ajaxUpload').hide();
                    this.model.set('certificationType','04');
                    break;
                case 'creditCard':
                    $('#ajaxUpload').hide();
                    this.model.set('certificationType','03');
                    break;
            }
        }
        $('.identifyType').html($('#'+sVal).html());
    },
    changeTab: function (e) {
        var $this = $(e.target),
            isActive = $this.hasClass('active'),
            index = $this.index();
        if(!$this.is('span')){
            return;
        }
        if(!isActive){
            $this.parent().find('.active').removeClass('active');
            $this.addClass('active');
            index === 0 ? this.renderPerson() : this.renderEnterprise() ;
        }
        e.stopPropagation();
        e.preventDefault();
    },
    buildCertificationType: function (isValidate,res) {
        var sVal = 'phone';
        if(res.certificationType == '04'){
            sVal = 'identify';
        }
        else if(res.certificationType == '03'){
            sVal = 'creditCard';
        }
        res = isValidate ? res : {
            mobile: '',
            bankCardNo: '',
            photoUrl: ''
        };
        $('.identifyType').html(_.template($('#'+sVal).html())(res));
    },
    renderPerson: function () {
        var that = this;
        that.personAuthModel.fetch({
            success: function () {
                that.buidPerson();
            }
        });
    },
    buidPerson: function () {
        var res = this.personAuthModel.get('result');
        res = res || {
                bankCardNo: '',
                certificationType: '04',
                mobile: '',
                idcard: '',
                name: '',
                photoUrl: ''
            };
        res.account = account;
        this.$el.find('.inputCons').html(_.template($('#userPersonAuth').html())(res));
        var isValidate = res.name ? true : false;
        this.buildCertificationType(isValidate,res);
        this.model = new personAuthModel();
        this.model.set('certificationType','04');
        isValidate ? '' : $('#personForm').validate(this.personValidateConfig());
    },
    renderEnterprise: function () {
        var that = this;
        that.getEnterpriseAuthModel.fetch({
            success: function () {
                that.buildEnterprise();
            }
        });
    },
    buildEnterprise: function () {
        var res = this.getEnterpriseAuthModel.get('result');
        res = res || {
                contractName: '',
                contractIdCard: '',
                contractMobile: '',
                contractEmail: '',
                name: '',
                address: '',
                licenceNo: '',
                taxRegisterNo: '',
                organizationCode: '',
                licenceImageId: '',
                licencePicUrl: '',
                contractIdcard: ''
            };
        res.account = account;

        this.model = res.contractName ? new updateEnterpriseAuthModel(res) : new addEnterpriseAuthModel(res);
        this.model.on('change:tags', function () {
            this.buildChooseTags();
        }.bind(this));
        
        this.$el.find('.inputCons').html(_.template($('#userEnterpriseAuth').html())(res));

        // 如果未通过审核
        if(res.name && res.status != '02') {
            this.model.set('licencePicUrl',res.licencePicUrl)
            this.chooseSelectTags(res.tagName);
            this.buildChooseTags();
            this.getCategoryModel.fetch();
        }else if(!res.name) {// 新增企业认证时
            this.getCategoryModel.fetch();
        }
        
        $('#enterpriseForm').validate(this.enterpriseValidateConfig());
    },
    uploadFile: function (e) {
        var $this = $(e.target),
            type = 0,
            uploadImgUrl = '',
            $formArea = $('#ajaxUpload');
        if(!$(e.target).val()){
            return;
        }
        if($this.parent()[0].id == 'ajaxEnterpriseUpload'){
            type = 1;
            $formArea = $('#ajaxEnterpriseUpload');
            uploadImgUrl = mscxPage.request.uc + 'certification/enterprise/upload/licence.do';
        }
        else {
            uploadImgUrl = mscxPage.request.uc + 'certification/person/upload/photo.do';
        }
        var that = this;
        $formArea.ajaxSubmit({
            url: uploadImgUrl,
            success: function(res) {
                if(typeof (res) === 'string' ){
                    res = JSON.parse(res)
                }
                if(res.status == 'ERROR'){
                    // 如果上传报错，清空input file，为了下次触发change
                    var file = $formArea.find(".upload-file");
                    file.after(file.clone().val(""));
                    file.remove();
                    layer.alert(res.message,{icon: 2});
                    return;
                }
                var src = res.result;

                if(type == 1){
                    that.model.set('licenceImageId',src.imageId);
                    that.model.set('licencePicUrl',src.imageUrl);
                    //alert(src.imageUrl);
                    //$('#licencePhoto').show().attr('src',src.imageUrl);
                    $('.upLoad').html('<img src="'+decodeURI(src.imageUrl)+'">');
                }
                else {
                    that.model.set('photoId',src.imageId);
                    $('.allInfoImg').html('<img src="'+decodeURI(src.imageUrl)+'">');
                }
            },
            error: function() {
                layer.msg('上传失败');
            }
        });
        e.stopPropagation();
    },
    render: function () {
        this.$el.find('#userInfoArea').html(template);
        this.buidPerson();
    },
    chooseSelectTags: function (chooseTags) {
        var chooseArray = [];
        if(chooseTags.indexOf(',')>=0){
            chooseArray = chooseTags.split(',');
        }
        else {
            chooseArray = [chooseTags];
        }
        for(var k = 0, kLen = chooseArray.length; k < kLen; k++){
            if(chooseArray[k]) {
                this.chooseTags.push({name:chooseArray[k]});
            }
        }
    },
    changeEnterpriseAttribute: function (e) {
        var sId = e.target.id == 'companyName' ? 'name':  e.target.id;
        this.model.set(sId,e.target.value);
        return false;
    },
    changePersonAttribute: function (e) {
        var sId = e.target.id == 'mobile1' ? 'mobile':  e.target.id;
        this.model.set(sId,e.target.value);
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
        return false;
    },
    buildChooseTags: function () {
        var cTags = this.chooseTags;
        var tagAreaTemplate = _.template($('#chooseTagArea').html());
        $('.tag-area').html(tagAreaTemplate({tags: cTags}));
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
    renderCategory: function () {
        var categoryTemplate = _.template($('#categoryList').html());
        var categoryList = this.getCategoryModel.get('result');
        $('#serverCategory').html(categoryTemplate({categoryList:categoryList}));
        if(categoryList.length > 0){
            this.model.set('categoryId',categoryList[0].categoryId);
        }
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
    }
});
module.exports = userAuthenticationView;