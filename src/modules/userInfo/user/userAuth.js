/**
 * Created by Kevin on 2016/12/6.
 */
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

var account = '';
var userAuthenticationView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'click #authTab':'changeTab',
        'change .identifide': 'changeAuthType',
        'change .upload-file': 'uploadFile',
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
                    email: true
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
        if($('.identifide ').val() == 'photo' && !$('.upload-file').val()){
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
        if($('.identifide ').val() == 'photo' && !$('.upload-file').val()){
            $('.identifyType').find('.phone-error').removeClass('hide');
            return;
        }
        $('.identifyType').find('.phone-error').addClass('hide');
        if(agreement) {
            this.model.save({}, {
                success: function () {
                    //layer.msg('提交成功!');
                    var layerTag = layer.alert('认证成功!重新登录系统才能实名使用。',{icon:1,yes: function () {
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
        this.$el.html(_.template(commonTemplate)({name:'userAuth',isDisplay:false}));

        this.render();
    },
    changeAuthType: function (e) {
        var sVal = $(e.target).val();
        if(sVal == 'phone'){
            $('#ajaxUpload').hide();
            this.model.set('certificationType','02');
        }
        else if(sVal == 'photo'){
            $('#ajaxUpload').show();
            this.model.set('certificationType','01');
        }
        else {
            $('#ajaxUpload').hide();
            this.model.set('certificationType','03');
        }
        $('.identifyType').html($('#'+sVal).html());
        e.stopPropagation();
        e.preventDefault();
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
        var sVal = 'photo';
        $('#ajaxUpload').show();
        if(res.certificationType == '02'){
            sVal = 'phone';
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
                certificationType: '01',
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
        this.model.set('certificationType','01');
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
        this.$el.find('.inputCons').html(_.template($('#userEnterpriseAuth').html())(res));
        if(res.contractName){
            this.model.set('licencePicUrl',res.licencePicUrl)
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
    changeEnterpriseAttribute: function (e) {
        var sId = e.target.id == 'companyName' ? 'name':  e.target.id;
        this.model.set(sId,e.target.value);
        return false;
    },
    changePersonAttribute: function (e) {
        var sId = e.target.id == 'mobile1' ? 'mobile':  e.target.id;
        this.model.set(sId,e.target.value);
        return false;
    }
});
module.exports = userAuthenticationView;