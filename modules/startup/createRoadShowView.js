'use strict';

var template = require('html!./createRoadShow.html');
require('./createStartup.css');
require('validate');
require('formAjax');
require('util');

var tagView = require('tagWidget/tagItemView.js');
var projectStageTypeModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'tags/getAllProjectStages.do'
});
var projectTypeModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'category/getRoadShowCategory.do'
});
var addRoadShowModel = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/AddRoadInfo.do'
});
var updateRoadShowModel = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/changeRoadInfo.do',
    idAttribute: '_id'
});
var getCategoryTagModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'tags/getTagsInfo4pinyin.do'
});
var roadDetailsModel = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/getRoadInfoByRoadId.do'
});

var createActivityView = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    events: {
        'change .upload-file': 'doUploadImg',
        'click #chooseTag' : 'doChooseTags',
        'click .tradeField': 'fetTags',
        'mousedown input[type="submit"]': 'setSubType'
    },
    validateConfig: function () {
        var that = this;
        return {
            rules: {
                roadName: {
                    required: true,
                    maxlength: 200
                },
                roadDescription: {
                    required: true,
                    maxlength: 1000
                },
                financingType: {
                    required: true,
                    maxlength: 100
                },
                financingLimit: {
                    required: true,
                    price: true,
                    maxlength: 10
                }
            },
            messages: {
                financingLimit:{
                    digits: '请输入合理融资额度'
                }
            },
            submitHandler: function () {
                that.doPublish();
            },
            invalidHandler:function() {
                that.checkValidateSelf();
            }
        }
    },
    checkValidateSelf: function () {
        this.model.get('thumbnailImg') ?  $($('.img-error')[0]).hide() : $($('.img-error')[0]).show();
        this.model.get('projectDescription') ?  $($('.img-error')[1]).hide() : $($('.img-error')[1]).show();
        this.model.get('teamImg') ?  $($('.img-error')[2]).hide() : $($('.img-error')[2]).show();
        this.model.get('operationImg') ?  $($('.img-error')[3]).hide() : $($('.img-error')[3]).show();
        this.model.get('tags') ?  $('.tag-error').hide() : $('.tag-error').show();
    },
    initialize: function() {
        this.$el.data('isLogin',1);
        var that = this;
        this.$el.html(template);
        if(this.id){
            new roadDetailsModel().fetch({
                data: {
                    roadId: this.id
                },
                success: function (model) {
                    that.render(model.get('result'));
                }
            });
        }
        else {
            that.render({});
        }
    },
    render: function (res) {
        var that = this;
        if(this.id) {
            this.$el.find('#publishRoadShow').html(_.template($('#addFormTemplate').html())({res:res}));
            this.model = new updateRoadShowModel();
            this.model.set('thumbnailImg',res.thumbnailImg);
            this.model.set('teamImg',res.teamImg);
            this.model.set('projectDescription',res.projectDescription);
            this.model.set('operationImg',res.operationImg);
            this.model.set('tags',res.tagIds.replace('，',','));
            this.model.set('id',this.id);
        }
        else {
            this.model = new addRoadShowModel();
        }
        this.projectStageTypeModel = new projectStageTypeModel();
        this.projectStageTypeModel.fetch();
        this.projectStageTypeModel.on('change',function () {
            that.buildStageType(res.projectStage);
        });
        this.projectTypeModel = new projectTypeModel();
        this.projectTypeModel.fetch();
        this.projectTypeModel.on('change',function () {
            that.buildProjectType(res.tags,res.tradeField,res.tradeFieldId);
        });
        this.getCategoryTagModel = new getCategoryTagModel();
        $('#publishRoadShow').validate(that.validateConfig());
    },
    buildStageType: function (sProjectStage) {
        var res = this.projectStageTypeModel.get('result');
        if(res.length>0) {
            res[0].checked = true;
        }
        var stageTemps = _.template($('#stageType').html());
        $('#projectDeadLineRadio').html(stageTemps({'stageTypeList': res,'sProjectStage':sProjectStage}));
    },
    buildProjectType: function (stags,sProjectType,tradeFieldId) {
        var res = this.projectTypeModel.get('result');
        if(res.length>0) {
            res[0].checked = true;
            var sId = tradeFieldId ? tradeFieldId : res[0].categoryId;
            this.getCategoryTagModel.fetch({
                data: {
                    categoryId:sId
                }
            });
        }
        var typeTemps = _.template($('#projectType').html());
        $('#projectTypeRadio').html(typeTemps({'proTypeList': res,'sProjectType': sProjectType}));
    },
    doChooseTags: function () {
        this.renderCategoryTag();
        var that = this;
        var dialog = layer.open({
            type: 1,
            btn: ['保存','取消'],
            title: '选择标签',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['350px', '450px'],
            content: $('.tag-list-area'), //捕获的元素
            btn1: function () {
                that.saveTag();
                layer.close(dialog);
                $('.tag-list-area').remove();
            },
            btn2: function () {
                layer.close(dialog);
            }
        });
    },
    chooseTags: [],
    saveTag: function () {
        var cTags = [],
            aTags = [],
            asTags = [];
        $('input[name="tagGroup"]:checked').each(function() {
            var $this = $(this),
                sId = this.id.replace('tag',''),
                sName = $this.data('name');
            cTags.push({id:sId,name: sName});
            aTags.push(sId);
            asTags.push(sName);
        });
        $('.tag-area').find('span').html(asTags.join(','));
        this.chooseTags = cTags;
        if(asTags.length > 0) {
            $('.tag-error').hide();
        }
        this.model.set('tags',aTags.join('，'));
        return false;
    },
    fetTags: function (e) {
        this.chooseTags = '';
        this.model.set('tags','');
        $('.tag-area').find('span').html('未选择任何标签');

        var $this = $(e.target),
            cid = $this.val();
        this.getCategoryTagModel.fetch({
            data: {
                categoryId: cid
            }
        });
        e.stopPropagation();
    },
    renderCategoryTag: function () {
        var tagList = this.getCategoryTagModel.get('result');
        var sChooseTags = '';
        if(this.model.get('tags')){
            sChooseTags = '*&'+this.model.get('tags').split('，').join('*&')+'*&';
        }
        $('.tag-list-area').remove();
        var tagsView = new tagView({
            model: {tagList: tagList,sChooseTags:sChooseTags}
        });
        this.$el.append(tagsView.$el);
    },
    doUploadImg: function (e) {
        var $formArea = $(e.target).closest('.imgForm'),
            index = $formArea.index('.imgForm'),
            uploadImgUrl = mscxPage.request.activity+'uploadFile.do';
        var that = this;
        $formArea.ajaxSubmit({
            url: uploadImgUrl,
            success: function(res) {
                if(typeof (res) === 'string' ){
                    res = JSON.parse(res)
                }
                if(res.status == 'ERROR'){
                    $formArea.find('.img-error').show();
                    layer.alert(res.message,{icon: 2});
                    return;
                }
                var src = res.result;
                switch (index) {
                    case 0:
                        that.model.set('thumbnailImg',src.imageUri);
                        break;
                    case 1:
                        that.model.set('projectDescription',src.imageUri);
                        break;
                    case 2:
                        that.model.set('teamImg',src.imageUri);
                        break;
                    case 3:
                        that.model.set('operationImg',src.imageUri);
                        break;
                }
                // that.model.set('thumbnailImg',src.imageUri);
                //that.model.set('imageKey',src.imageKey);
                $('.allInfoImg').eq(index).find('img').attr('src',src.imageUri)
                    .parents('.ReleaseList').find('.img-error').hide();
                // $formArea.find('.img-error').hide();
            },
            error: function() {
                $formArea.find('.img-error').show();
                layer.msg('上传失败');
            }
        });
    },
    doPublish: function () {
        this.checkValidateSelf();
        if(!$('.img-error').is(":visible") && !$('.tag-error').is(":visible")) {
            var obj = $('#publishRoadShow').serializeObject();
            var status = this.model.get('status');
            var msg = status == 2 ? '已提交审核！' : '已提交暂存！';
            var tags = this.model.get('tags').replace(',','，');
            this.model.set('tags',tags);
            this.model.set('financingLimit', +obj.financingLimit);
            this.model.set('financingType',obj.financingType);
            this.model.set('projectStage',obj.projectStage);
            this.model.set('roadDescription',obj.roadDescription);
            this.model.set('roadName',obj.roadName);
            this.model.set('tradeField',obj.tradeField);
            this.model.save({},{
                success: function () {
                    layer.msg(msg);
                    setTimeout(function () {
                        location.href = 'userInfo.html#incubator';
                    }, 1000);
                }
            });
        }
    },
    setSubType: function (e) {
        var $this = $(e.target),
            isSubmit = $this.is('input');
        if(isSubmit){
            var sStu = $this.val() == '发布' || $this.val() == '修改' ? 2 : 5;
            this.model.set('status',sStu);
        }
    }
});

module.exports = createActivityView;