/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./user.html');
require('./user.css');
require('validate');
require('formAjax');
var ucApi = '/ro/mscx-uc-api/';

var userInfoModel = Backbone.Model.extend({
    url: mscxPage.host+''+ucApi+'user/info/mine.do'
});
var getPersonAuthModel = Backbone.Model.extend({
    url: mscxPage.host+''+ucApi+'certification/person/info.do'
});
var getEnterpriseAuthModel = Backbone.Model.extend({
    url: mscxPage.host+''+ucApi+'certification/enterprise/info.do'
});
var updateEnterpriseAuthModel = Backbone.Model.extend({
    url: mscxPage.host+''+ucApi+'certification/enterprise/update.do'
});

var addEnterpriseAuthModel = Backbone.Model.extend({
    url: mscxPage.host+''+ucApi+'certification/enterprise.do'
});

var personAuthModel = Backbone.Model.extend({
    url: mscxPage.host+''+ucApi+'certification/person.do'
});

var userPasswordManagerModel = Backbone.Model.extend({
    url: mscxPage.host+''+ucApi+'change/password.do'
});

var account = '';
var userView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'click #userTabs span': 'changeTab'
    },
    changeTab: function (e) {
        var $this = $(e.target),
            isActive = $this.hasClass('active'),
            index = $this.index();
        if(!isActive) {
            $this.parent().find('.active').removeClass('active');
            $this.addClass('active');
            new this.childView[index]({el: '#userInfoArea'});
        }
    },
    initialize: function(id) {
        if(id){
            this.id = id;
        }
        var index = 0;
        this.childView = [userInfoView,userAuthenticationView,userPasswordView];
        this.$el.html(template);
        switch (this.id){
            case 'auth':
                index = 1;
                $($('#userTabs').find('span')[1]).addClass('active');
                break;
            default:
                $($('#userTabs').find('span')[0]).addClass('active');
                break;
        }
        window.history.pushState({},0,'#user');
        new this.childView[index]({el: '#userInfoArea'});
    }
});
var userInfoView = Backbone.View.extend({
    events: {
        'blur .info-line input':'changeAttribute'
    },
    initialize: function() {
        var that = this;
        this.template = _.template($('#userInfo').html());
        this.model = new userInfoModel();
        this.model.fetch();
        this.model.on('change',function () {
            that.render();
        });
        this.render();
    },
    render: function () {
        var res = this.model.get('result');
        res = res || {
                account: '-',
                apiKey: '--',
                certification: '--',
                secretKey: '--',
                mobile: '--',
                userType: '--'
            };
        account = res.account;
        this.$el.html(this.template(res));
    }
});
var userAuthenticationView = Backbone.View.extend({
    events: {
        'click #authTab':'changeTab',
        'change .identifide': 'changeAuthType',
        'change .upload-file': 'uploadFile',
        'input #enterpriseForm input[type="text"]' : 'changeEnterpriseAttribute',
        'input #personForm input[type="text"]' : 'changePersonAttribute'
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
                }
            },
            submitHandler: function () {
                that.doSavePerson()
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
            }
        }
    },
    doSavePerson: function () {
        if($('.identifide ').val() == 'photo' && !$('.upload-file').val()){
            $('.identifyType').find('.phone-error').removeClass('hide');
            return;
        }
        $('.identifyType').find('.phone-error').addClass('hide');
        this.model.save({},{
            success: function () {
                layer.msg('提交成功!');
            }
        })
    },
    doEnterpriseSave: function () {
        if($('.upload-file').val()){
            $('.phone-error').removeClass('hide');
            return;
        }
        $('.phone-error').addClass('hide');
        var that = this;
        this.model.save({},{
            success: function(){
                layer.msg('提交成功!');
                that.renderEnterprise();
            }
        });
    },
    initialize: function() {
        var that = this;
        this.personAuthModel = new getPersonAuthModel();
        this.enterpriseAuthModel = new getEnterpriseAuthModel();
        this.template = _.template($('#userAuthentication').html());
        that.enterpriseAuthModel.fetch({
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
        that.enterpriseAuthModel.fetch({
            success: function () {
                that.buildEnterprise();
            }
        });
    },
    buildEnterprise: function () {
        var res = this.enterpriseAuthModel.get('result');
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
        $('#enterpriseForm').validate(this.enterpriseValidateConfig());
    },
    uploadFile: function (e) {
        var $this = $(e.target),
            type = 0,
            $formArea = $('#ajaxUpload');
        if(!$(e.target).val()){
            return;
        }
        if($this.parent()[0].id == 'ajaxEnterpriseUpload'){
            type = 1;
            $formArea = $('#ajaxEnterpriseUpload');
            $formArea.attr('action',mscxPage.host+''+ucApi+'certification/enterprise/upload/licence.do');
        }
        else {
            $formArea.attr('action',mscxPage.host+''+ucApi+'certification/person/upload/photo.do');
        }
        var that = this;
        var options = {
            success: function (res) {
                if(res.status == 'ERROR'){
                    layer.alert(res.message,{icon: 2});
                    return;
                }
                var src = res.result;

                if(type == 1){
                    that.model.set('licenceImageId',src.imageId);
                    $('#licencePhoto').show().attr('src',src.imageUrl);
                }
                else {
                    that.model.set('photoId',src.imageId);
                    $('.allInfoImg').find('img').show().attr('src',src.imageUrl);
                }
            },
            error: function () {
                layer.alert('上传失败', {icon: 2});
            }
        };
        $formArea.ajaxForm(options);
        $formArea.find('input[type="submit"]').click();
        $formArea = null;
        e.stopPropagation();
    },
    render: function () {
        this.$el.html(this.template());
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
var userPasswordView = Backbone.View.extend({
    events: {
        'input .user-password-area input[type="password"]' : 'changeAttribute'
    },
    validateConfig: function () {
        var that = this;
        return {
            rules: {
                oldPassword: {
                    required: true,
                    password: true
                },
                password: {
                    required: true,
                    password: true
                },
                passwordConfirm: {
                    required: true,
                    equalTo: '#password'
                }
            },
            submitHandler: function () {
                that.doSave()
            }
        }
    },
    doSave: function () {
        this.model.save({},{
            type: 'POST',
            success: function () {
                layer.msg('修改密码成功!');
            }
        });
    },
    changeAttribute: function (e) {
        this.model.set(e.target.id,e.target.value);
        return false;
    },
    initialize: function() {
        this.render();
        this.model = new userPasswordManagerModel();
    },
    render: function () {
        this.$el.html($('#userPassword').html());
        $('#userPasswordForm').validate(this.validateConfig());
    }
});
module.exports = userView;