/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./createApi.html');
require('./createApi.css');
require('validate');
require('formAjax');

var createApiModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/publishServiceApi.do'
});

var getCategoryModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'category/getApiCategory.do'
});
var getCategoryTagModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'tag/getTagsInfo.do'
});
var getServiceTypeModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'dict/getServiceObject.do'
});

var createApiView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    events: {
        'input #createDemandForm input[type="text"]' : 'changeAttribute',
        'input #createDemandForm textarea' : 'changeAttribute',
        'click #chooseTag': 'showTagArea',
        'click .tag-list-area li': 'chooseTag',
        'click .tag-area span': 'deleteTag',
        'change input:radio[name="category"]': 'changeCategory',
        'click .addPrice': 'addChargeLay'
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
        /*
        var dataFormat = this.$el.find('input[name="system-network"]').filter(':checked').val();
        this.model.set('dataFormat',dataFormat);
        this.model.save({},{
            success: function (model,res) {
                layer.msg('添加成功!');
                location.href = './userinfo.html#demand';
            }
        })*/
    },
    chooseTag: function (e) {
        var $this = $(e.target),
            sVal = $this.text();
        var tags = this.model.get('tags') || '';
        if(tags.indexOf(sVal) < 0){
            tags = tags ? tags+','+sVal : sVal;
            this.model.set('tags',tags);
            layer.closeAll();
        }
        else {
            layer.alert('已经选择该标签',{icon:2});
        }
        return false;
    },
    deleteTag: function (e) {
        var $this = $(e.target),
            sVal = $this.text();
        if(!$this.hasClass('un-select')){
            var tags = this.model.get('tags') || '';
            if(tags.indexOf(',') < 0){
                tags = '';
                this.model.set('tags',tags);
            }
            else if(tags.indexOf(sVal) > 0){
                tags = tags.replace(','+sVal,'');
                this.model.set('tags',tags);
            }
            else if(tags.indexOf(sVal) == 0){
                tags = tags.replace(sVal+',','');
                this.model.set('tags',tags);
            }
        }
    },
    showTagArea: function () {
        var dialog = layer.open({
            type: 1,
            btn: ['取消'],
            title: '选择标签',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['350px', '450px'],
            content: $('.tag-list-area'), //捕获的元素
            btn1: function () {
                layer.close(dialog);
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
        this.model.on('change:tags',function () {
            that.buildChooseTags();
        });
        this.model.on('change:chargeSetJson',function () {
            that.buildChargeTable();
        });
        this.$el.html(template);
        this.buildDateEvents();
        //$('#createDemandForm').validate(this.validateConfig());
    },
    changeCategory: function (e) {
        var sId = parseInt(e.target.id.replace('c',''));
        this.renderTagWithCategory(sId);
        this.model.set('tags','');
        this.model.set('categoryId',sId);
        return false;
    },
    renderCategory: function () {
        var categoryTemplate = _.template($('#categoryList').html());
        var categoryList = this.getCategoryModel.get('result');
        $('#serverCategory').html(categoryTemplate({categoryList:categoryList}));
        if(categoryList.length > 0){
            this.model.set('categoryId',categoryList[0].categoryId);
            this.renderTagWithCategory(categoryList[0].categoryId);
        }
    },
    renderTagWithCategory: function (cid) {
        this.getCategoryTagModel.fetch({
            data: {
                categoryId: cid
            }
        });
    },
    renderCategoryTag: function () {
        var tagTemplate = _.template($('#tagList').html());
        var tagList = this.getCategoryTagModel.get('result');
        this.$el.find('.tag-list-area').html(tagTemplate({tagList: tagList}))
    },
    renderServiceType: function () {
        var categoryTemplate = _.template($('#serverTypeList').html());
        var serverTypeList = this.getServiceTypeModel.get('result');
        $('.server-dist').html(categoryTemplate({serverTypeList: serverTypeList}));
    },
    buildChooseTags: function () {
        var tags = this.model.get('tags'),
            tagArray = [];
        if(tags.indexOf(',') > 0){
            tagArray = tags.split(',');
        }
        else if(tags != '') {
            tagArray = [tags];
        }
        var tagAreaTemplate = _.template($('#chooseTagArea').html());
        $('.tag-area').html(tagAreaTemplate({tags: tagArray}));
    },
    buildDateEvents: function () {
        $('#effectDate').daterangepicker({
            format: 'YYYY-MM-DD',
            singleDatePicker: true,
            startDate: moment(),
            minDate: new Date()
        }).on('apply.daterangepicker',function (ev,picker) {
            $('#expiryDate').data('daterangepicker').setOptions({'minDate': new Date($('#effectDate').val()),singleDatePicker: true,startDate: moment()});
        });
        $('#expiryDate').daterangepicker({
            format: 'YYYY-MM-DD',
            singleDatePicker: true,
            startDate: moment()
        }).on('apply.daterangepicker',function (ev,picker) {
            $('#effectDate').data('daterangepicker').setOptions({'maxDate': new Date($('#expiryDate').val()),singleDatePicker: true,startDate: moment()});
        });
    },
    addChargeLay: function () {
        var dialog= layer.open({
            type: 1,
            btn: ['保存','取消'],
            title: '新增收费规则',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['500px', '550px'],
            content: $('.add-price-list'), //捕获的元素
            success: function () {
            },
            btn1: function () {          //通过
                layer.close(dialog);
            },
            btn2: function () {         // 不通过
                layer.close(dialog);
            }
        });
    },
    buildChargeTable: function () {
        var chargeSetJson = this.model.get('chargeSetJson');
        var packageTableTemps = _.template($('#packageTableTemps').html());
        $('#packageTable').html(packageTableTemps({chargeSetJson: chargeSetJson}));
    }
});

module.exports = createApiView;