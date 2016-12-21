/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./createApi.html');
require('./createApi.css');
require('validate');
require('formAjax');

var dicApi = '/ro/mscx-api-api/',
    apiApi = '/ro/mscx-api-api/';

var createApiModel = Backbone.Model.extend({
    url: mscxPage.host+''+apiApi+'addData.do'
});

var getCategoryModel = Backbone.Model.extend({
    url: mscxPage.host+''+dicApi+'category/getApiCategory.do'
});
var getCategoryTagModel = Backbone.Model.extend({
    url: mscxPage.host+''+dicApi+'dict/getServiceObject.do'
});
var getServiceTypeModel = Backbone.Model.extend({
    url: mscxPage.host+''+dicApi+'dict/getServiceObject.do'
});

var createApiView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    events: {
        'input #createDemandForm input[type="text"]' : 'changeAttribute',
        'input #createDemandForm textarea' : 'changeAttribute',
        'click #chooseTag': 'chooseTag'
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
    chooseTag: function () {
        layer.open({
            type: 1,
            shade: false,
            title: false, //不显示标题
            content: $('.layer_notice'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
            cancel: function(){
                layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', {time: 5000, icon:6});
            }
        });
    },
    initialize: function() {
        var that = this;
        this.getCategoryModel = new getCategoryModel();
        this.getCategoryTagModel = new getCategoryTagModel();
        this.getServiceTypeModel = new getServiceTypeModel();
        this.getCategoryModel.on('change',function () {
            that.renderCategory();
        });
        this.getCategoryTagModel.on('change',function () {
            that.renderCategoryTag();
        });
        this.getServiceTypeModel.on('change',function () {
            that.renderServiceType();
        });
        this.getCategoryModel.fetch();
        this.getServiceTypeModel.fetch();

        this.model = new createApiModel();
        this.$el.html(template);
        //$('#createDemandForm').validate(this.validateConfig());
    },
    renderCategory: function () {
        debugger;
        this.getCategoryTagModel.fetch({

        })
    },
    renderCategoryTag: function () {
        
    },
    renderServiceType: function () {
        
    }
});

module.exports = createApiView;