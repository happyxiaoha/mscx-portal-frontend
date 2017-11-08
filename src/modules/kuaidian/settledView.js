/**
 * ================================================
 * 作    者：Hope Chen
 * 版    本：1.0
 * 创建日期：2017/11/7 16:21
 * 描    述：商户入驻
 * 修订历史：
 * ================================================
 */
var settledTemplate = require('./settled.html');
require('validate');
require('customValidate');
require('./kuaidian.css');

var settledModel = Backbone.Model.extend({   // 商户入驻
    url: 'ro/mscx-kuaidian-api/merchant/settled.do?t=' + new Date().getTime()
});

var settledView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    template: _.template(settledTemplate, {variable: 'data'}),
    events: {
          "click #shopAddress" : "cityPicker"
    },

    initialize: function () {
        this.model = new settledModel();
        this.$el.html(this.template());
        this.render();
    },
    render: function () {
        this.cityPicker();
        $('#shopRegistForm').validate(this.registerValidateConfig());
    },
    settled: function () {
        var that = this;
        var agreement = $("#readRule").is(":checked");
        if (!agreement) {
            layer.alert('请阅读并勾选协议！');
            return;
        }
        var districtArr = $("#shopAddress").val().split("/");
        that.model.save({
            province: districtArr[0],
            city: districtArr[1],
            district: districtArr[2],
            address: $('#shopAddressInput').val(),
            industry_code: $('#shopType').val(),
            store_idcard: $('#IDCard').val(),
            store_idcardname: $('#shopHost').val(),
            store_name: $('#shopName').val(),
            phone: $('#phoneNumber').val()
        }, {
            type: 'POST',
            success: function (res) {
                res = res.toJSON();
                if (res.message === 'success') {
                    layer.msg('入驻成功');
                    window.open('userInfo.html', '_self');
                }
            },
            error: function () {
            }
        })
    },
    cityPicker: function () {
          $("#shopAddress").citypicker();
    },
    registerValidateConfig: function () {
        var that = this;
        return {
            rules: {
                shopType: {
                    required: true
                },
                shopName: {
                    required: true
                },
                shopAddress: {
                    required: true
                },
                shopHost: {
                    required: true,
                    //letterStart: true,
                    //account: true,
                    minlength: 2,
                    maxlength: 20
                },
                phoneNumber: {
                    required: true,
                    telephone: true
                },
                IDCard: {
                    required: true,
                    isIdCardNo:true
                },
                shopRange: {
                    required: true
                },
                readRule: {
                    required: true
                }
            },
            messages: {
                shopType: {
                    required: "请选择一个类型"
                },
                shopName: {
                    required: '请输入您的爱店的名字'
                },
                shopAddress: {
                    required: '请填写您的地址'
                },
                shopHost: {
                    required: "请输入用户名",
                    minlength: "用户名最少6个字符",
                    maxlength: "用户名最多20个字符",
                    letterStart: '用户名必须以字母开头',
                    account: '用户名只能包含数字字母下划线',
                    remote: '用户名已注册'
                },
                phoneNumber: {
                    required: "请输入手机号码",
                    telephone: "请输入正确的手机号码"
                },
                IDCard: {
                    required: "请输入身份证号",
                    isIdCardNo: "请输入正确的身份证号码"
                },
                shopRange: {
                    required: "请填写您的经营范围"
                },
                readRule: {
                    required: '请阅读并勾选协议！'
                }
            },
            submitHandler: function () {
                that.settled()
            },
            ignore: '.ignore'
        }
    }
});

module.exports = settledView;