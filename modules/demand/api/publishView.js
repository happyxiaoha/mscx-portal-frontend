/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./publishTemplate.html');
var detailModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-requirement-api/modifyApiDetail.do'
})
require('../publish.css');
require('validate');
require('formAjax');
require('util');

var demandApi = '/ro/mscx-requirement-api/';

var createDemandView = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    events: {
        'click #goBack': 'backHistory',
        'change .beauty-file input[type="file"]': 'changeFile'
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        // 如果有ID则说明是进入修改页面
        this.detailModel = new detailModel();
        if(this.id) {
            this.listenTo(this.detailModel, 'sync', this.renderDetail);
            this.detailModel.fetch({
                data: {
                    id: this.id
                }
            })
        }else {
            this.renderDetail();
        }
    },
    validateConfig: function () {
        var me = this;
        return {
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                sysName: {
                    required: true
                },
                department: {
                    required: true
                },
                ownership: {
                    required: true
                },
                netType: {
                    required: true
                },
                interfaceNum: {
                    required: true,
                    number: true
                },
                endTime: {
                    required: true
                },
                contactUsername: {
                    required: true
                },
                contactPhone: {
                    required: true,
                    telephone: true
                },
                preOffer: {
                    required: true,
                    number: true
                }
            },
            submitHandler: function () {
                me.submitForm();
            }
        }
    },
    submitForm: function () {
        this.$form.ajaxSubmit({
            url: this.formAction,
            success: function(res) {
                layer.msg('发布成功！', function() {
                    location.href = 'userinfo.html#demand/api';
                });
            }
        })
    },
    backHistory: function () {
        history.back();
    },
    changeFile: function(event) {
        var filePath = $(event.currentTarget).val();
        var arr = filePath.split('\\');
        var fileName=arr[arr.length-1];
        this.$("#showFileName").html(fileName);
    },
    renderDetail: function() {
        var model = this.detailModel && this.detailModel.toJSON();

        this.$el.html(this.template(model.result));

        this.$form = this.$('form');
        this.$form.validate(this.validateConfig());

        this.formAction = mscxPage.host + '' + demandApi + (this.id ? 'modifyApi.do' : 'addApi.do');

        this.$endTime = this.$('.end-time');

        // 选择日期
        this.$endTime.daterangepicker({
            singleDatePicker: true,
            startDate: moment(),
            minDate: (new Date()).format('yyyy-MM-dd')
        });
    }
});

module.exports = createDemandView;