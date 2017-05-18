'use strict';

var commonTemplate = require('html!./common.html');
var template = require('html!./invoice.html');

require('./account.less');
require('util');
require('formAjax');

var queryInvoicesModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'invoice/queryInvoices.do'
});
var saveInvoiceModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'invoice/insertInvoice.do'
});

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: template,
    events: {
        'click .invoice .btn-search': 'search',
        'click .invoice .btn-add': 'addInvoice',
        'keydown #taxpayerName': 'handleEnterKey',
        'change .add-invoice-form .invoice-type': 'changeInvoiceType',
        'change .btn-tax-file': 'doUploadFile',
    },
    pagObj: {
        pageSize: 10,
        pageNum: 1,
        totalPage: 0
    },
    initialize: function() {
        _.extend(this, this.model);

        this.$el.html(this.commonTemplate({
            name: this.id,
            hasAccount: this.hasAccount
        }));

        this.$('#userInfoArea').html(this.template);

        this.invoiceTemplate = _.template(this.$('#invoiceTemplate').html(), {variable: 'data'});

        this.$datepicker = this.$('#datepicker');

        // 选择日期
        this.$datepicker.daterangepicker();

        this.queryInvoicesModel = new queryInvoicesModel();
        this.saveInvoiceModel = new saveInvoiceModel();
        this.searchParam = new Backbone.Model({
            pageSize: this.pagObj.pageSize,
            page: this.pagObj.pageNum
        });
        this.listenTo(this.queryInvoicesModel, 'sync', this.render);
        this.listenTo(this.saveInvoiceModel, 'sync', this.handleSaveInvoice);

        this.queryInvoicesModel.fetch({
            data: this.searchParam.toJSON()
        })

        return this;
    },
    render: function() {
        var model = this.queryInvoicesModel.toJSON();
        var that = this;
        this.$('#invoice').html(this.invoiceTemplate(model.result));

        this.searchParam.set({
            page: model.result.page.currentPage
        })

        laypage({
            cont: 'invoicePage',
            pages: model.result.page.totalPage,
            skip: true,
            curr: this.searchParam.get('page') || 1,
            jump: function(obj, first){
                if(!first){
                    that.searchParam.set('page', obj.curr);
                    that.reloadPage();
                }
            }
        });
    },
    reloadPage: function() {
        this.queryInvoicesModel.fetch({
            data: this.searchParam.toJSON()
        });
    },
    search: function() {
        var searchStr = this.$('#taxpayerName').val();
        this.searchParam.set({
            taxpayerName: $.trim(searchStr),
            page: 1
        })

        this.queryInvoicesModel.fetch({
            data: this.searchParam.toJSON()
        })
    },
    handleEnterKey: function(event) {
        if(event.keyCode == 13) {
            this.search();
        }
    },
    addInvoice: function() {
        var that = this;
        this.dialog = layer.open({
            type: 1,
            title: '添加发票申请',
            shade: 0.6,
            shadeClose: true,
            btn: ['确认', '取消'],
            area: ['550px', '450px'],
            content: $('.add-invoice-area'), //捕获的元素
            success: function() {
                $('.add-invoice-form').validate(that.invoiceValidator());
            },
            btn1: function () {
                $('.add-invoice-form').submit();
            },
            btn2: function () {
                layer.close(that.dialog);
                $('.add-invoice-form')[0].reset();
            },
            end: function() {
                $('.add-invoice-form')[0].reset();
            }
        });
    },
    invoiceValidator: function () {
        var that = this;
        return {
            rules: {
                invoiceType: {
                    required: true
                },
                applyAmount: {
                    required: true,
                    price: true,
                    min: 0
                },
                taxpayername: {
                    required: true,
                    maxlength: 50
                },
                mailAddress: {
                    required: true,
                    maxlength: 50
                },
                taxpayerId: {
                    required: true,
                    number: true,
                    maxlength: 50
                },
                bankDeposit: {
                    required: true,
                    maxlength: 50
                },
                bankAccount: {
                    required: true,
                    number: true,
                    maxlength: 19
                },
                bankName: {
                    required: true,
                    maxlength: 50
                },
                regAddress: {
                    required: true,
                    maxlength: 50
                },
                regPhone: {
                    required: true,
                    phone: true
                }
            },
            submitHandler: function () {
                that.saveInvoice()
            }
        }
    },
    saveInvoice: function() {
        var $form = this.$('.add-invoice-form');

        var params = $form.serializeObject();

        this.saveInvoiceModel.set(params);
        this.saveInvoiceModel.save();
    },
    handleSaveInvoice: function() {
        var model = this.saveInvoiceModel.toJSON();

        if(model.status == 'OK') {
            layer.msg('添加发票申请成功！');
            layer.close(this.dialog);
            this.reloadPage();
        }else {
            layer.msg('添加发票申请失败！');
        }

    },
    changeInvoiceType: function(event) {
        var $target = this.$(event.target);

        if($target.val() == '01') {
            this.$('#moreForm').hide();
            this.$('.scanfile-form').hide();
            this.$('.scanfile-payer-form').hide();
        }else {
            this.$('#moreForm').show();
            this.$('.scanfile-form').show();
            this.$('.scanfile-payer-form').show();
        }
    },
    doUploadFile: function(event) {
        var $target = $(event.target),
            uploadImgUrl = mscxPage.request.order + 'invoice/uploadFile.do';
        var that = this;

        $target.parent().ajaxSubmit({
            url: uploadImgUrl,
            success: function(res) {
                if(typeof (res) === 'string' ){
                    res = JSON.parse(res)
                }
                if(res.status == 'ERROR'){
                    layer.alert(res.message,{icon: 2});
                    return;
                }
                var src = res.result;

                $('#' + $target.data('hidden')).val(src.OSSFileKey);
                $('#' + $target.data('showarea')).val(src.fileURL);
            },
            error: function() {
                layer.msg('上传失败');
            }
        });

        // $formArea.ajaxSubmit({
        //     url: uploadImgUrl,
        //     success: function(res) {
                // if(typeof (res) === 'string' ){
                //     res = JSON.parse(res)
                // }
                // if(res.status == 'ERROR'){
                //     $('.img-error').show();
                //     layer.alert(res.message,{icon: 2});
                //     return;
                // }
                // var src = res.result;
                // that.model.set('imageUri',src.imageUri);
                // that.model.set('imageKey',src.imageKey);
                // $('.allInfoImg').find('img').attr('src',src.imageUri);
                // $('.img-error').hide();
        //     },
        //     error: function() {
        //         $('.img-error').show();
        //         layer.msg('上传失败');
        //     }
        // });
    }
});
module.exports = accountView;