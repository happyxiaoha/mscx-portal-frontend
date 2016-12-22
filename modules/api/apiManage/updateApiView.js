/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./createApi.html');
require('./createApi.css');
require('validate');

var createApiModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'addData.do'
});

var createApiView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    events: {
        'input #createDemandForm input[type="text"]' : 'changeAttribute',
        'input #createDemandForm textarea' : 'changeAttribute',
        'click #goBack': 'backHistory'
    },
    validateConfig: function () {
        var that = this;
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
                that.doCreate()
            }
        }
    },
    changeAttribute: function (e) {
        this.model.set(e.target.id,e.target.value);
        return false;
    },
    doCreate: function () {
        var dataFormat = this.$el.find('input[name="system-network"]').filter(':checked').val();
        this.model.set('dataFormat',dataFormat);
        this.model.save({},{
            success: function (model,res) {
                layer.msg('添加成功!');
                location.href = './userinfo.html#demand';
            }
        })
    },
    backHistory: function () {
        history.back();
    },
    initialize: function() {
        this.model = new createDemandModel();
        this.$el.html(template);
        $('#createDemandForm').validate(this.validateConfig());
    }
});

module.exports = createApiView;