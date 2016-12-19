/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./user.html');
require('./user.css');
require('validate');
require('formAjax');
var ucApi = '/ro/mscx-uc-api/';
var getPersonAuthModel = Backbone.Model.extend({
    url: mscxPage.host+''+ucApi+'certification/person/info.do'
});
var getEnterpriseAuthModel = Backbone.Model.extend({
    url: mscxPage.host+''+ucApi+'certification/enterprise/info.do'
});
var userPasswordManagerModel = Backbone.Model.extend({
    url: mscxPage.host+''+ucApi+'change/password.do'
});

var userView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'click #userTabs span': 'changeTab'
    },
    changeTab: function (e) {
        var $this = $(e.target),
            isActive = $this.hasClass('active'),
            index = $this.index();
        if(!isActive){
            $this.parent().find('.active').removeClass('active');
            $this.addClass('active');
            new this.childView[index]({el: '#userInfoArea'});
        }

    },
    initialize: function() {
        this.childView = [userInfoView,userAuthenticationView,userPasswordView];
        this.$el.html(template);
        new userInfoView({el: '#userInfoArea'});
    }
});
var userInfoView = Backbone.View.extend({
    events: {
        'blur .info-line input':'changeAttribute'
    },
    initialize: function() {
        this.template = _.template($('#userInfo').html());
        //this.model.fetch();
        this.render();
    },
    render: function () {
        var res = {
            userInfo: '1',
            status: '未认证',
            apiKey: 'dasdsa',
            secretKey: '64517dd09056a42997c36ae3a8b0d354444464517dd0905e',
            telephone: '123444333',
            userType: 'sadsa'
        };
        this.$el.html(this.template(res));
    }
});
var userAuthenticationView = Backbone.View.extend({
    events: {
        'click #authTab':'changeTab',
        'change .identifide': 'changeAuthType',
        'change .upload-file': 'uploadFile'
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
                bankCard: {
                    required: true,
                    bankCard: true
                },
                telephone: {
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
                contractIdCard: {
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


    },
    doEnterpriseSave: function () {

    },
    initialize: function() {
        var that = this;
        this.personAuthModel = new getPersonAuthModel();
        this.enterpriseAuthModel = new getEnterpriseAuthModel();
        this.template = _.template($('#userAuthentication').html());
        this.personAuthModel.fetch({
            success: function (model,res) {
                if(res.result){
                    that.renderPerson();
                }
                else {
                    that.enterpriseAuthModel.fetch({
                        success: function () {
                            that.render();
                        }
                    });
                }
            }
        });
        that.render();
    },
    changeAuthType: function (e) {
        var sVal = $(e.target).val();
        if(sVal == 'photo'){
            $('#ajaxUpload').show();
        }
        else {
            $('#ajaxUpload').hide();
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
    renderPerson: function () {
        this.$el.find('.inputCons').html($('#userPersonAuth').html());
        $('#personForm').validate(this.personValidateConfig());
    },
    renderEnterprise: function () {
        this.$el.find('.inputCons').html($('#userEnterpriseAuth').html());
        $('#enterpriseForm').validate(this.enterpriseValidateConfig());
    },
    uploadFile: function (e) {
        var $this = $(e.target).parent(),
            $formArea = $('#ajaxUpload');
        if($this[0].id == 'ajaxEnterpriseUpload'){
            $formArea = $('#ajaxEnterpriseUpload');
            $formArea.attr('action',mscxPage.host+''+ucApi+'certification/person/upload/photo.do');
        }
        else {
            $formArea.attr('action',mscxPage.host+''+ucApi+'enterprise/upload/licence.do');
        }
        var that = this;
        var options = {
            success: function (res) {
                var src = res.result;
                debugger;
            },
            error: function () {
                layer.alert('上传失败', {icon: 2});
            }
        };
        $formArea.ajaxForm(options);
        $formArea.find('input[type="submit"]').click();
        $formArea = null;
    },
    render: function () {
        this.$el.html(this.template());

        this.renderPerson();
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
                console.log(1);
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