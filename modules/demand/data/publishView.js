/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./publishTemplate.html');
var detailModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'modifyDataDetail.do'
})
var addModel = Backbone.Model.extend({
    idAttribute: 'addId',
    url: mscxPage.request.demand + 'addData.do'
});
var modifyModel = Backbone.Model.extend({
    idAttribute: 'modifyId',
    url: mscxPage.request.demand + 'modifyData.do'
});


require('../publish.css');
require('validate');
require('util');


var createDemandView = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    events: {
        'click #goBack': 'backHistory'
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

        this.model = this.id ? new modifyModel() : new addModel();
        this.listenTo(this.model, 'sync', this.handleSubmit);
    },
    validateConfig: function () {
        var me = this;
        return {
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                dataDescription: {
                    required: true
                },
                dataItem: {
                    required: true
                },
                dataUsage: {
                    required: true
                }
            },
            submitHandler: function () {
                me.submitForm();
            }
        }
    },
    submitForm: function () {
        var params = this.$form.serializeObject();

        this.model.set(params);
        this.model.save();
    },
    backHistory: function (event) {
        event.preventDefault();
        history.back();
    },
    handleSubmit: function() {
        var model = this.model.toJSON();
        if(model.status == 'OK') {
            this.$('#publishBtn').attr('disabled', 'disabled');
            layer.msg((this.id ? '修改' : '创建') + '成功，请至用户中心我的需求内发布');
            setTimeout(function() {
                location.href = 'userInfo.html#demand';
            }, 2000);
        }
    },
    renderDetail: function() {
        var model = this.detailModel.toJSON();

        this.$el.html(this.template(model.result));

        this.$form = this.$('form');
        this.$form.validate(this.validateConfig());
    }
});

module.exports = createDemandView;