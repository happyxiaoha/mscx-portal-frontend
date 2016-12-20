/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./createDemand.html');
require('./createDemand.css');
require('validate');

var demandApi = '/ro/mscx-requirement-api/';
var createDemandModel = Backbone.Model.extend({
    url: mscxPage.host+''+demandApi+'addData.do'
});

var createDemandView = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
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
                    required: true
                },
                endTime: {
                    required: true
                },
                contactUsername: {
                    required: true
                },
                contactPhone: {
                    required: true
                },
                preOffer: {
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

module.exports = createDemandView;