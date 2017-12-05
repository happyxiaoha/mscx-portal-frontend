var commonTemplate = require('./common.html');
var template = require('./invoice.html');
require('./account.css');
require('validate');
require('customValidate');
require('formAjax');
require('util');

var enableAccountModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'invoice/enableAccount.do'
});
var queryInvoicesModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'invoice/queryInvoices.do'
});
var insertInvoiceModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'invoice/insertInvoice.do'
});

var invoiceView = Backbone.View.extend({
    commonTemplate: _.template(commonTemplate),
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 5,
        pageNum: 1,
        totalPage: 1
    },
    events: {
        'click #addInvoice': 'addInvoice',
        'change .invoice-type': 'toggleType',
        'change .upload-file': 'doUploadImg',
        'keydown #searchIpt': 'handleEnterKey',
        'click #searchInvoice': 'search',
    },
    initialize: function() {
        this.pagObj.pageNum = 1;
        this.$el.html(this.commonTemplate({
            name: this.id,
            hasAccount: this.hasAccount
        }));

        var that = this;

        this.model = new queryInvoicesModel();
        this.enableAccountModel = new enableAccountModel();
        this.insertInvoiceModel = new insertInvoiceModel();

        this.listenTo(this.enableAccountModel, 'sync', this.handleEnableAccount);
        this.model.on('change',function () {
            that.render();
        });
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
        this.enableAccountModel.fetch();
        this.renderInitPage();
    },
    render: function () {
        var res = this.model.get('result'),
            that = this,
            invoiceList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        this.$el.find('tbody').html(this.template({
            invoiceList: invoiceList,
            startIndex: page.startIndex
        }));
        laypage({
            cont: 'apiPage',
            skip: true,
            pages: this.pagObj.totalPage,
            curr: this.pagObj.pageNum || 1,
            jump: function(obj, first){
                if(!first){
                    that.pagObj.pageNum = obj.curr;
                    that.reloadPage();
                }
            }
        });
    },
    renderInitPage: function () {
        this.$('#userInfoArea').html(template);
        this.template = _.template(this.$('#invoiceList').html(), {variable: 'data'});
    },
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum,
                taxpayerName: this.taxpayerName
            }
        });
    },
    toggleType: function(e) {
        var $target = this.$(e.target);
        if($target.val() === '02') {
            this.$('#moreInvoiceForm').show();
            this.$('#pic1Upload').show();
            this.$('#pic2Upload').show();
        }else {
            this.$('#moreInvoiceForm').hide();
            this.$('#pic1Upload').hide();
            this.$('#pic2Upload').hide();
        }
    },
    invoiceValidateConfig: function () {
        var that = this;
        return {
            rules: {
                applyAmount: {
                    required: true,
                    price: true,
                    min: 0,
                    max: this.amountLimit
                },
                taxpayerName: {
                    required: true,
                    maxlength: 50
                },
                taxpayerIdentify: {
                    letterAndNumber: true,
                    maxlength: 30
                },
                mailAddress: {
                    required: true,
                    maxlength: 50
                },
                taxpayerId: {
                    required: true,
                    maxlength: 50,
                    letterAndNumber: true
                },
                bankDeposit: {
                    required: true,
                    maxlength: 50
                },
                bankAccount: {
                    required: true,
                    digits: true,
                    maxlength: 19,
                    minlength: 19
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
                    landlinePhone: true
                }
            },
            // messages: {
            //     name: {
            //         maxlength: '套餐名称不大于50个字符'
            //     },
            //     chargeCount: {
            //         integers: '大于1的正整数',
            //         max: '输入超过最大限制'
            //     },
            //     monthLimit: {
            //         integers: '大于1的正整数',
            //         max: '输入超过最大限制'
            //     }
            // },
            submitHandler: function () {
                that.submit()
            }
        }
    },
    addInvoice: function() {
        var that = this;
        this.dialog = layer.open({
            type: 1,
            btn: ['保存','取消'],
            title: '添加发票申请',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['500px', '450px'],
            content: $('#invoiceWrapper'),
            success: function () {
                $('#invoiceForm').validate(that.invoiceValidateConfig());
            },
            btn1: function () {
                $('#invoiceForm').submit();
            },
            btn2: function () {
                $('#invoiceForm').resetForm();
                layer.close(that.dialog);
            }
        });
    },
    handleEnableAccount: function() {
        var model = this.enableAccountModel.toJSON();
        this.amountLimit = model.result;
        this.$('#amountLimit').html(this.amountLimit);
        // $('#applyAmount').rules('add', {max: this.amountLimit});
    },
    doUploadImg: function (e) {
        var $target = this.$(e.target);
        var index = $target.data('index');
        var $formArea = $target.parent();
        var uploadImgUrl = mscxPage.request.order + 'invoice/uploadFile.do';
        var that = this;
        $formArea.ajaxSubmit({
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
                if(index === 0) {
                    that.insertInvoiceModel.set('taxScannFile', src.OSSFileKey);
                    that.insertInvoiceModel.set('taxScannUrl', src.fileURL);
                }else {
                    that.insertInvoiceModel.set('taxpayerScannFile', src.OSSFileKey);
                    that.insertInvoiceModel.set('taxpayerScannUrl', src.fileURL);
                }
                $('.file-wrapper').eq(index).find('img').attr('src', src.fileURL);
            },
            error: function() {
                layer.msg('上传失败');
            }
        });
    },
    submit: function() {
        var obj = this.$('#invoiceForm').serializeObject();
        var that = this;
        obj.tokenType = '20';
        this.insertInvoiceModel.save(obj, {
            success: function(res) {
                if(res.toJSON().status === 'OK') {
                    layer.msg('添加发票申请成功！')
                    layer.close(that.dialog)
                    that.reloadPage()
                }
            }
        })
    },
    handleEnterKey: function(e) {
        if(e.keyCode === 13) {
            this.search();
        }
    },
    search: function() {
        var val = this.$('#searchIpt').val();
        val = $.trim(val);

        this.taxpayerName = val;
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum,
                taxpayerName: this.taxpayerName
            }
        });
    }
});
module.exports = invoiceView;