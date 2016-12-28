/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./updateApi.html');
require('./createApi.css');
require('validate');
require('formAjax');
require('util');

var apiDesModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/getMyApiServiceDetailById.do'
});

var updateApiModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/modifyServiceApi.do'
});
var checkServerId = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/checkApiByIdentification.do'
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
var getPackageModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'charge/getMyChargeRuleByServiceId.do'
});

var updateApiView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    events: {
        'input #createDemandForm input[type="text"]' : 'changeAttribute',
        'input #createDemandForm textarea' : 'changeAttribute',
        'click #chooseTag': 'showTagArea',
        'click .tag-list-area li': 'chooseTag',
        'click .tag-area span': 'deleteTag',
        'change input:radio[name="category"]': 'changeCategory',
        'change input:radio[name="chargeType"]': 'changeChargeType',
        'change input:checkbox[name="serverTypes"]': 'chooseServerTypes',
        'click .addApi': 'addApiLay',
        'click .editApi': 'updateApi',
        'click .deleteApi': 'removeApi',
        'change .upload-file': 'doUploadImg',
        'blur #apiServerId': 'checkServerId',
        'blur #apiName': 'checkApiName'
    },
    updateIndex: -1,
    apiName: '',
    initialize: function() {
        var that = this;
        this.$el.html(template);
        this.apiDesModel = new apiDesModel();
        this.getCategoryModel = new getCategoryModel();
        this.getCategoryTagModel = new getCategoryTagModel();
        this.getServiceTypeModel = new getServiceTypeModel();
        this.getPackageModel = new getPackageModel();
        this.model = new updateApiModel();

        this.apiDesModel.fetch({
            data: {
                apiServiceId: this.id
            }
        });
        this.apiDesModel.on('change',function (model,res) {
            that.renderInit();
        });
        this.getPackageModel.fetch({
            data: {
                apiServiceId: this.id
            }
        });
        this.getPackageModel.on('change',function (model,res) {
            that.buildChargeTable();
        });
        this.temps = _.template($('#updateFormMes').html());
        this.$el.find('#publishApi').html(this.temps({res:{}}));
    },
    renderInit: function () {
        var that = this;
        var res = this.apiDesModel.get('result');
        this.$el.find('#publishApi').html(this.temps({res:res}));
        this.getCategoryModel.on('change',function () {
            that.renderCategory(res.categoryId);
        });
        this.getCategoryTagModel.on('change',function () {
            that.renderCategoryTag();
        });
        this.getServiceTypeModel.on('change',function () {
            that.renderServiceType(res.serviceObject);
        });
        this.getCategoryModel.fetch();
        this.getServiceTypeModel.fetch();
        this.model.on('change:tags',function () {
            that.buildChooseTags();
        });
        this.model.on('change:chargeSetJson',function () {
            that.buildChargeTable();
        });
        this.model.on('change:apiListJson',function () {
            that.buildApiTable();
        });
        this.model.on('change:chargeType',function () {
            if(that.model.get('chargeType') == '01' && that.model.get('chargeSetJson')){
                that.model.set('chargeSetJson',null);
            }
            else {
                that.buildChargeTable();
            }
        });
        this.model.set('chargeType',res.chargeType);
        this.model.set('tags',res.tags);
        this.model.set('apiListJson',res.apiListJson);
        this.model.set('name',res.name);
        this.model.set('imageUri',res.imageUri);
        this.model.set('serviceObject',res.serviceObject);
        $('#publishApi').validate(this.validateConfig());
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
    checkValidateSelf: function () {
        var res = true;
        if(!this.model.get('imageUri')) {
            $('.img-error').show();
            res = false;
        }
        else {
            $('.img-error').hide();
        }

        if(!this.model.get('tags')) {
            $('.tag-error').show();
            res = false;
        }
        else {
            $('.tag-error').hide();
        }

        if(!this.model.get('tags')) {
            $('.tag-error').show();
            res = false;
        }
        else {
            $('.tag-error').hide();
        }

        if(!this.model.get('serviceObject')) {
            $('.server-error').show();
            res = false;
        }
        else {
            $('.server-error').hide();
        }

        if(!this.model.get('apiListJson')) {
            $('.api-error').show();
            res = false;
        }
        else {
            $('.api-error').hide();
        }

        if(!this.model.get('name')) {
            if(!$('.api-server-error').is(':visible')){
                $('.api-server-error').html('不能为空').show();
            }
            res = false;
        }
        else {
            $('.api-server-error').remove();
        }
        return res;
    },
    apiValidateConfig: function () {
        var that = this;
        return {
            rules: {
                cname: {
                    required: true
                },
                uri: {
                    required: true
                },
                testPacket: {
                    required: true
                },
                directions: {
                    required: true
                }
            },
            submitHandler: function () {
                that.saveApiJson()
            },
            invalidHandler:function() {
                that.checkApiName();
            }
        }
    },
    changeAttribute: function (e) {
        this.model.set(e.target.id,e.target.value);
        return false;
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
    changeCategory: function (e) {
        var sId = parseInt(e.target.id.replace('c',''));
        this.renderTagWithCategory(sId);
        this.model.set('categoryId',sId);
        this.model.set('tags','');
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
            this.renderTagWithCategory(defaultCategoryId);
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
    renderServiceType: function (serviceObject) {
        var categoryTemplate = _.template($('#serverTypeList').html());
        var serverTypeList = this.getServiceTypeModel.get('result'),
            chooseS = serviceObject.split(',');
        for(var i =0, len = serverTypeList.length; i < len; i++ ){
            var types = serverTypeList[i],
                id = types.id;
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
            $('#packageTable').html(packageTableTemps({chargeSetJson: chargeSetJson}));
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
    },
    removeApi: function (e) {
        var that = this;
        var deleteLay = layer.confirm('确认删除这条API吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var apiListJson = _.clone(that.model.get('apiListJson') || []);
            var index = $(e.target).closest('tr').index();
            if(apiListJson[index].flag == 'C'){  //当为修改的时候新增数据直接删除
                if(apiListJson.length == 1 && index == 0){
                    apiListJson = [];
                }
                else {
                    apiListJson.splice(index,1);
                }
            }
            else {  //初始化的时候带过来的数据
                apiListJson[index].flag = 'D';
            }
            that.model.set('apiListJson',apiListJson);
            that.model.trigger('change:apiListJson');
            layer.close(deleteLay);
        }, function(){
            layer.close(deleteLay);
        });
        return false;
    },
    updateApi: function (e) {
        var that = this;
        var apiListJson = _.clone(this.model.get('apiListJson') || []);
        var index = $(e.target).closest('tr').index();
        var apiManageTemps = _.template($('#apiManageTemps').html());
        this.updateIndex = index;
        this.updateApiName = apiListJson[index].name;
        $('.add-api-list').html(apiManageTemps({res:apiListJson[index]}));
        var dialog= layer.open({
            type: 1,
            btn: ['保存','取消'],
            title: '修改API',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['500px', '550px'],
            content: $('.add-api-list'), //捕获的元素
            success: function () {
                $('#addApiForm').validate(that.apiValidateConfig());
            },
            cancel: function(index){
                that.updateIndex = -1;
            },
            btn1: function () {          //通过
                $('#addApiForm').submit();
            },
            btn2: function () {         // 不通过
                layer.close(dialog);
                that.updateIndex = -1;
            }
        });
        that.lays = dialog;
    },
    doUpdate: function () {
        var isCheck = this.checkValidateSelf();
        if(isCheck){
            var obj = $('#publishApi').serializeObject();
            this.model.set('apiServiceId',this.id);
            this.model.set('scope',obj.scope);
            this.model.set('cname',obj.cname);
            this.model.set('description',obj.description);
            this.model.set('rtnCode',obj.rtnCode || '');
            this.model.save({},{
                success: function () {
                    layer.msg('修改成功!');
                    setTimeout(function () {
                        location.href = 'userInfo.html#api';
                    },1000);
                }
            })
        }
    },
    doUploadImg: function () {
        var $formArea = $('#ajaxUpload'),
            uploadImgUrl = mscxPage.request.api+'uploadFile.do';
        var that = this;
        $formArea.ajaxSubmit({
            url: uploadImgUrl,
            success: function(res) {
                if(typeof (res) === 'string' ){
                    res = JSON.parse(res)
                }
                if(res.status == 'ERROR'){
                    $('.img-error').show();
                    layer.alert(res.message,{icon: 2});
                    return;
                }
                var src = res.result;
                that.model.set('imageUri',src.imageUri);
                that.model.set('imageKey',src.imageKey);
                $('.allInfoImg').find('img').attr('src',src.imageUri);
                $('.img-error').hide();
            },
            error: function() {
                $('.img-error').show();
                layer.msg('上传失败');
            }
        });
    },
    checkServerId: function () {
        var that = this;
        var sName = $.trim($('#apiServerId').val());
        if(!sName){
            $('.api-server-error').html('不能为空').show();
            return;
        }
        new checkServerId().fetch({
            data: {name: sName},
            success: function (model,res) {
                if(res.result){
                    $('.api-server-error').hide();
                    that.model.set('name',sName);
                }
                else {
                    that.model.set('name','');
                    $('.api-server-error').html(res.message).show();
                }
            }
        })
    },
    checkApiName: function () {
        var name = $.trim($('#apiName').val());
        if(!name){
            $('.api-name-error').html('不能为空').show();
            return;
        }
        if(this.apiName.indexOf('**'+name+'&&')>= 0 && this.updateApiName != name){
            $('.api-name-error').html('API标示重复').show();
        }
        else {
            $('.api-name-error').hide();
        }
    }
});

module.exports = updateApiView;