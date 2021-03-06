/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./apiDes.html');
var showdown = require('showdown');

require('./createApi.css');
require('util');

var apiDesModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/getMyApiServiceDetailById.do',
    parse: function (res) {
        return res.result
    }
});


var getCategoryModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'category/getApiCategory.do'
});
var getCategoryTagModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'tags/getTagsInfo.do'
});
var getServiceTypeModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'dict/getServiceObject.do'
});
var getPackageModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'charge/getMyChargeRuleByServiceId.do'
});

var apiView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    updateIndex: -1,
    apiName: '',
    initialize: function() {
        this.$el.data('isLogin',1);
        var that = this;
        this.$el.html(template);
        this.model = new apiDesModel();
        this.getCategoryModel = new getCategoryModel();
        this.getCategoryTagModel = new getCategoryTagModel();
        this.getServiceTypeModel = new getServiceTypeModel();
        this.getPackageModel = new getPackageModel();
        //this.model = new updateApiModel();
        this.temps = _.template($('#updateFormMes').html());
        this.$el.find('#publishApi').html(this.temps({res:{}}));
        this.model.fetch({
            data: {
                apiServiceId: this.id
            }
        });
        this.model.on('change',function (model,res) {
            that.renderInit();
        });
    },
    renderInit: function () {
        var that = this;
        var res = this.model.toJSON();

        var converter = new showdown.Converter();

        res.rtnCode = converter.makeHtml(res.rtnCode);

        this.$el.find('#publishApi').html(this.temps({res:res}));
        this.getPackageModel.fetch({
            data: {
                apiServiceId: this.id
            },
            success: function () {
                that.buildChargeTable();
            }
        });
        this.getCategoryModel.on('change',function () {
            that.renderCategory(res.categoryId);
        });
        this.getServiceTypeModel.on('change',function () {
            that.renderServiceType(res.serviceObject);
        });
        this.getCategoryModel.fetch();
        this.getServiceTypeModel.fetch();
        /*
        this.model.on('change:chargeSetJson',function () {
            that.buildChargeTable();
        });
         */

        this.model.on('change:chargeType',function () {
            if(that.model.get('chargeType') == '01'){
                $('.api-package').hide();
            }
            else {
                $('.api-package').show();
            }
        });
        this.model.set('chargeType',res.chargeType);
        this.model.set('apiListJson',res.apiListJson);
        this.model.set('name',res.name);
        this.model.set('imageUri',res.imageUri);
        this.model.set('serviceObject',res.serviceObject);
        that.buildApiTable();
        if(res.chargeType == '01'){
            $('.api-package').hide();
        }
    },
    validateConfig: function () {
        var that = this;
        return {
            rules: {
                scope: {
                    required: true
                },
                cname: {
                    required: true
                },
                rtnCode: {
                    required: true
                }
            },
            submitHandler: function () {
                that.doUpdate();
            },
            invalidHandler:function() {
                that.checkValidateSelf();
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
    changeCategory: function (e) {
        var sId = parseInt(e.target.id.replace('c',''));
        //this.renderTagWithCategory(sId);
        this.model.set('categoryId',sId);
        //this.model.set('tags','');
        return false;
    },
    changeChargeType: function (e) {
        var sId = e.target.id.replace('ct','');
        this.model.set('chargeType',sId);
        return false;
    },
    chooseServerTypes: function () {
        var aServerType = [];
        $('input[name="serverTypes"]:checked').each(function() {
            aServerType.push(this.id.replace('t',''));
            $('.server-error').hide();
        });
        this.model.set('serviceObject',aServerType.join(','));
    },
    renderCategory: function (defaultCategoryId) {
        var categoryTemplate = _.template($('#categoryList').html());
        var categoryList = this.getCategoryModel.get('result');
        $('#serverCategory').html(categoryTemplate({categoryList:categoryList,defCid: defaultCategoryId}));
        if(categoryList.length > 0){
            this.model.set('categoryId',defaultCategoryId);
            //this.renderTagWithCategory(defaultCategoryId);
        }
    },
    renderServiceType: function (serviceObject) {
        var categoryTemplate = _.template($('#serverTypeList').html());
        var serverTypeList = this.getServiceTypeModel.get('result'),
            chooseS = serviceObject.split(',');
        for(var i =0, len = serverTypeList.length; i < len; i++ ){
            var types = serverTypeList[i],
                id = types.dictCode;
            for(var k = 0, klen = chooseS.length;k<klen; k++){
                if(id == chooseS[k]){
                    types.isSelect = true;
                }
            }
        }
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
            $('.tag-error').hide();
        }
        var tagAreaTemplate = _.template($('#chooseTagArea').html());
        $('.tag-area').html(tagAreaTemplate({tags: tagArray}));
    },
    buildDateEvents: function () {
        if($('#effectDate').data('daterangepicker')){
            $('#effectDate').data('daterangepicker').setOptions({minDate: new Date(),singleDatePicker: true,startDate: moment(),format: 'YYYY-MM-DD'})
        }
        else {
            $('#effectDate').daterangepicker({
                format: 'YYYY-MM-DD',
                singleDatePicker: true,
                startDate: moment(),
                minDate: new Date()
            }).on('apply.daterangepicker',function (ev,picker) {
                $('#expiryDate').data('daterangepicker').setOptions({'minDate': new Date($('#effectDate').val()),singleDatePicker: true,startDate: moment()});
            });
        }
        if($('#expiryDate').data('daterangepicker')){
            $('#expiryDate').data('daterangepicker').setOptions({minDate: new Date(),singleDatePicker: true,startDate: moment(),format: 'YYYY-MM-DD'})
        }
        else {
            $('#expiryDate').daterangepicker({
                format: 'YYYY-MM-DD',
                singleDatePicker: true,
                startDate: moment(),
                minDate: new Date()
            }).on('apply.daterangepicker',function (ev,picker) {
                $('#effectDate').data('daterangepicker').setOptions({'maxDate': new Date($('#expiryDate').val()),minDate: new Date(),singleDatePicker: true,startDate: moment()});
            });
        }
    },
    buildChargeTable: function () {
        var chargeSetJson = this.getPackageModel.get('result');
        if(!chargeSetJson && this.model.get('chargeType') == '01'){
            $('.api-package').hide();
        }
        else {
            chargeSetJson = chargeSetJson || [];
            if(chargeSetJson.length > 0){
                $('.package-error').hide();
            }
            $('.api-package').show();
            var packageTableTemps = _.template($('#packageTableTemps').html());
            $('.package-table').html(packageTableTemps({chargeSetJson: chargeSetJson}));
        }
    },
    addApiLay: function () {
        var that = this;
        var addApiTemplete = _.template($('#apiManageTemps').html());
        $('.add-api-list').html(addApiTemplete({res:{}}));
        var dialog= layer.open({
            type: 1,
            btn: ['保存','取消'],
            title: '新增API',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['500px', '550px'],
            content: $('.add-api-list'), //捕获的元素
            success: function () {
                $('#addApiForm').validate(that.apiValidateConfig());
            },
            btn1: function () {          //通过
                $('#addApiForm').submit();
            },
            btn2: function () {         // 不通过
                $('#addApiForm').resetForm();
                layer.close(dialog);
            }
        });
        that.lays = dialog;
    },
    saveApiJson: function () {
        var res = $('#addApiForm').serializeObject();
        if(this.apiName.indexOf('**'+res.name+'&&')>= 0 && this.updateApiName != res.name){
            $('.api-name-error').html('不能为空').show();
            return;
        }
        layer.close(this.lays);
        var apiListJson = _.clone(this.model.get('apiListJson') || []);
        if(this.updateIndex < 0){
            res.flag = 'C';
            apiListJson.push(res);
        }
        else {
            res.flag = 'U';
            apiListJson[this.updateIndex] = res;
            this.updateIndex = -1;
        }

        this.model.set('apiListJson',apiListJson);
        $('#addApiForm').resetForm();
    },
    reBuildApiName: function () {
        var apiListJson = this.model.get('apiListJson');
        this.apiName = '';
        for(var i = 0, len = apiListJson.length; i < len; i++){
            if(apiListJson[i].flag !=  'D'){
                this.apiName += '**'+apiListJson[i].name+'&&';
            }
        }
    },
    buildApiTable: function () {
        this.reBuildApiName();
        var apiListJson = this.model.get('apiListJson');
        apiListJson = apiListJson || [];
        if(apiListJson.length > 0){
            $('.api-error').hide();
        }
        var apiTableTemps = _.template($('#apiTableTemps').html());
        $('#apiTable').html(apiTableTemps({apiList: apiListJson}));
    }
});

module.exports = apiView;