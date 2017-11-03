'use strict';
var template = require('./packageItem.html');
require('validate');
var getFeeModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'calEarning.do'
});
require('./packageItem.css');

var view = Backbone.View.extend({
    events: {
        'blur #price': 'limitPriceFun',
        'blur #chargeCount': 'disChargeCount',
        'change .charge-type': 'doChooseType'
    },
    packageValidateConfig: function () {
        var that = this;
        return {
            rules: {
                name: {
                    required: true,
                    maxlength: 50
                },
                price: {
                    required: true,
                    price: true,
                    min: 0
                },
                chargeCount: {
                    required: true,
                    number: true,
                    integers: true,
                    min: 0
                },
                monthLimit: {
                    number: true,
                    integers: true,
                    min: 0
                },
                invokeLimit: {
                    min:1
                },
                effectDate: {
                    required: true,
                    date: true
                },
                expiryDate: {
                    date: true
                }
            },
            messages: {
                name: {
                    maxlength: '套餐名称不大于50个字符'
                },
                chargeCount: {
                    integers: '大于1的正整数',
                    max: '输入超过最大限制'
                },
                monthLimit: {
                    integers: '大于1的正整数',
                    max: '输入超过最大限制'
                }
            },
            submitHandler: function () {
                if(that.callbackSave){
                    that.callbackSave();
                }
            }
        }
    },
    template: _.template(template),
    buildData: function () {
        function lastDay(sdata){
            var resDate = new Date(),
                newData = new Date();
            if(sdata){
                resDate = new Date(sdata);
                newData = new Date(sdata)
            }
            resDate.setDate(newData.getDate()-1);
            return resDate;
        }

        if($('#effectDate').data('daterangepicker')){
            $('#effectDate').data('daterangepicker').setOptions({minDate: lastDay(),singleDatePicker: true,startDate: moment(),format: 'YYYY-MM-DD'})
        }
        else {
            if($('#expiryDate').val()){
                $('#effectDate').daterangepicker({
                    format: 'YYYY-MM-DD',
                    singleDatePicker: true,
                    startDate: moment(),
                    minDate: lastDay(),
                    maxDate: lastDay($('#expiryDate').val())
                }).on('apply.daterangepicker',function (ev,picker) {
                    $('#expiryDate').data('daterangepicker').setOptions({'minDate': lastDay($('#effectDate').val()),singleDatePicker: true,startDate: moment()});
                });
            }
            else {
                $('#effectDate').daterangepicker({
                    format: 'YYYY-MM-DD',
                    singleDatePicker: true,
                    startDate: moment(),
                    minDate: lastDay()
                }).on('apply.daterangepicker',function (ev,picker) {
                    $('#expiryDate').data('daterangepicker').setOptions({'minDate': lastDay($('#effectDate').val()),singleDatePicker: true,startDate: moment()});
                });
            }
        }
        if($('#expiryDate').data('daterangepicker')){
            $('#expiryDate').data('daterangepicker').setOptions({minDate: lastDay(),singleDatePicker: true,startDate: moment(),format: 'YYYY-MM-DD'})
        }
        else {
            $('#expiryDate').daterangepicker({
                format: 'YYYY-MM-DD',
                singleDatePicker: true,
                startDate: moment(),
                minDate: lastDay($('#effectDate').val())
            }).on('apply.daterangepicker',function (ev,picker) {
                if($('#effectDate').length > 0) {
                    $('#effectDate').data('daterangepicker').setOptions({
                        'maxDate': $('#expiryDate').val(),
                        minDate: lastDay(),
                        singleDatePicker: true,
                        startDate: moment()
                    });
                }
            });
        }
    },
    displayFeeMes: function (sVal) {
        new getFeeModel().fetch({
            type:'GET',
            data: {
                price: sVal
            },
            success: function(model){
                var res = model.get('result');
                $('.earning-count').html(res.earningCount);
                $('.fee-count').html(res.feeCount);
                $('.earning-percent').html(res.earningPercent*100);
                $('.fee-percent').html(res.feePercent*100);
            }
        });
    },
    limitPriceFun: function (e) {
        if(e.target.id == 'price'){
            var $this = $(e.target),
                sVal = parseFloat($.trim($this.val())),
                $limitInput = $('input[name="boughtLimit"]');
            if(sVal === 0) {
                $($limitInput[0]).attr('disabled',true);
                $($limitInput[1]).prop("checked",true)
            }
            else {
                $($limitInput[0]).attr('disabled',false);
            }
            if(!$this.hasClass('error') && sVal > 0){
                this.displayFeeMes(sVal);
            }
            $this = null;
            $limitInput = null;
        }
    },
    disChargeCount: function(e) {
        if(e.target.id == 'chargeCount'){
            var $this = $(e.target),
                sVal = parseFloat($.trim($this.val()));
            if(!$this.hasClass('error') && sVal > 0){
                $('.charge-count').html(sVal);
            }
        }
    },
    doChooseType: function () {
        var sVal = $('.charge-type').val();
        if(sVal == '04'){
            $('.prePrice').html('天');
            $('.limitPre').html('次');
            $('.price-per').html('天');
        }
        else {
            $('.limitPre').html('天');
            $('.prePrice').html('次');
            $('.price-per').html('次');
        }
        this.setValidateWithCharge(sVal);
    },
    setValidateWithCharge: function (sChargeType) {
        if(sChargeType == '05'){
            $('#chargeCount').rules('remove');
            $('#chargeCount').rules('add',{min:0,max:999999999});
            $('#invokeLimit').rules('remove');
            $('#invokeLimit').rules('add',{min:1,max:36000});
        }
        else {
            $('#chargeCount').rules('remove');
            $('#chargeCount').rules('add',{min:0,max:99});
            $('#invokeLimit').rules('remove');
            $('#invokeLimit').rules('add',{min:1,max:999999999});
        }
    },
    initialize: function() {
        this.callbackSave = this.attributes ? this.attributes.callbackFun : null;
        var res = this.model;
        this.$el.addClass('server-package-manage').html(this.template({'res':res}));
        if(res.price){
            this.displayFeeMes(res.price);
            if(res.price == 0) {
                var $limitInput = $('input[name="boughtLimit"]');
                $($limitInput[0]).attr('disabled',true);
                $($limitInput[1]).prop("checked",true)
            }
        }
        $('#serverChargePackage').validate(this.packageValidateConfig());
        var sChargeType = res && res.chargeType ? res.chargeType : '05';
        this.setValidateWithCharge(sChargeType);
        this.buildData();
    }
});

module.exports = view;