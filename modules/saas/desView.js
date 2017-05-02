/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./desTemplate.html');
var packageTabletemplate = require('html!./packageTableTemplate.html');
require('./saas.css');

require('util');

var detailModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'publish/get.do'
});
// 获取套餐信息
var detailChargeModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'publish/chargeRule/get.do'
});
var view = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    events: {
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.detailModel = new detailModel();

        this.detailModel.fetch({
                data: {
                    id: this.id
                }
            });
        this.listenTo(this.detailModel, 'sync', this.renderDes);
    },
    renderPackageUpdate: function (appId) {
        var that = this;
        new detailChargeModel().fetch({
            data: {
                'appId': appId
            },
            'success': function (model) {
                that.chargeRule = model.get('result');
                that.buildChargeTable();
            }
        })
    },
    buildChargeTable: function () {
        var chargeSetJson = this.chargeRule || [];
        if(chargeSetJson.length > 0){
            $('.package-error').hide();
        }
        var packageTableTemps = _.template(packageTabletemplate);
        $('#packageTable').html(packageTableTemps({chargeSetJson: chargeSetJson,isUpdate: true}));
    },
    renderDes: function(res) {
        var model = res.toJSON(),
            res = model.result;
        if(res.chargeType == '02'){
            this.renderPackageUpdate(res.id);
        }
        this.$el.html(this.template(res));
    }
});

module.exports = view;