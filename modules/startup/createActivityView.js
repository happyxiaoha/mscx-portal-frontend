'use strict';

var template = require('html!./createActivity.html');
require('./createStartup.css');
require('validate');
require('formAjax');
require('util');

var activityTypeModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'tags/getAllActivity.do'
});
var addActivityModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/publishOrTemSaveActivity.do'
});
var updateActivityModel =Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/updateActivity.do',
    idAttribute: '_id'
});

var activityDesModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/getActivityById.do'
});

var createActivityView = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    events: {
        'change .upload-file': 'doUploadImg',
        'mousedown input[type="submit"]': 'setSubType'
    },
    validateConfig: function () {
        var that = this;
        return {
            rules: {
                name: {
                    required: true,
                    maxlength: 50
                },
                description: {
                    required: true,
                    maxlength: 1000
                },
                initiator: {
                    required: true,
                    maxlength: 30
                },
                signAddress: {
                    required: true,
                    maxlength: 50
                },
                signTime: {
                    required: true
                },
                holdAddress: {
                    required: true,
                    maxlength: 50
                },
                holdTime: {
                    required: true
                },
                detail: {
                    required: true,
                    maxlength: 1000
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
        if(!this.model.get('image')) {
            $('.img-error').show();
        }
        else {
            $('.img-error').hide();
        }
    },
    buildDate: function (res) {
        function lastDay(sdata){
            var resDate = new Date(),
                newData = new Date();
            if(sdata){
                resDate = new Date(sdata);
                newData = new Date(sdata)
            }
            resDate.setDate(newData.getDate()-1);
            return resDate;
        }
        var sinOptions = {
            minDate: lastDay(),
            startDate: lastDay()
        };
        if(this.id){
            sinOptions = {
                minDate: lastDay(),
                maxDate: new Date(res.holdStartTime),
                startDate: new Date(res.signStartTime),
                endDate: new Date(res.signEndTime)
            };
        }

        var holdOptions = {
            minDate: lastDay(),
            startDate: lastDay()
        };
        if(this.id){
            holdOptions = {
                minDate: new Date(res.signEndTime),
                startDate: new Date(res.holdStartTime),
                endDate: new Date(res.holdEndTime)
            };
        }
        $('#signTime').daterangepicker(sinOptions).on('apply.daterangepicker',function (ev,picker) {
            $('#holdTime').data('daterangepicker').setOptions({'minDate': picker.endDate,'startDate':picker.endDate,'endDate': picker.endDate});
        });
        $('#holdTime').daterangepicker(holdOptions).on('apply.daterangepicker',function (ev,picker) {
            $('#signTime').data('daterangepicker').setOptions({'maxDate': picker.startDate,'endDate':picker.startDate,minDate:lastDay()});
        });
    },
    initialize: function() {
        this.$el.data('isLogin',1);
        var that = this;
        this.$el.html(template);
        if(this.id){
            new activityDesModel().fetch({
                data: {
                    id: this.id
                },
                success: function (model) {
                    that.render(model.get('result').detail);
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
            this.$el.find('#publishActivity').html(_.template($('#activityTemps').html())({res:res}));
            this.buildDate(res);
            this.model = new updateActivityModel();
            this.model.set('image',res.image );
            this.model.set('id',this.id);
        }
        else {
            this.buildDate(res);
            this.model = new addActivityModel();
        }
        this.activityTypeModel = new activityTypeModel();
        this.activityTypeModel.fetch();
        this.activityTypeModel.on('change',function () {
            that.buildActivityType(res.type);
            that.renderFormLocation();
        });
        $('#publishActivity').validate(that.validateConfig());
    },
    renderFormLocation: function () {
        var sTop = $('.allInfoImg').position().top;
        $('#ajaxUpload').css('top',sTop);
    },
    buildActivityType: function (typeId) {
        var res = this.activityTypeModel.get('result');
        if(res.length > 0){
            res[0].checked = true;
        }
        var activityTemps = _.template($('#activityType').html());
        $('#activityTypeRadio').html(activityTemps({'activityTypeList': res,typeId:typeId}))
    },
    doUploadImg: function () {
        var $formArea = $('#ajaxUpload'),
            uploadImgUrl = mscxPage.request.activity+'uploadFile.do';
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
                that.model.set('image',src.imageUri);
                //that.model.set('imageKey',src.imageKey);
                $('.allInfoImg').find('img').attr('src',src.imageUri);
                $('.img-error').hide();
            },
            error: function() {
                $('.img-error').show();
                layer.msg('上传失败');
            }
        });
    },
    doPublish: function () {
        if(!this.model.get('image')) {
            $('.img-error').show();
        }
        else {
            $('.img-error').hide();
            var obj = $('#publishActivity').serializeObject();
            var status = this.model.get('status');
            var msg = status == 2 ? '已提交审核！' : '已提交暂存！';
            var holdTimeSplit = $('#holdTime').val().split(' - ');
            var signTimeSplit = $('#signTime').val().split(' - ');

            this.model.set('name',obj.name);
            this.model.set('description',obj.description);
            this.model.set('detail',obj.detail);
            this.model.set('holdAddress',obj.holdAddress);
            this.model.set('initiator',obj.initiator);
            this.model.set('signAddress',obj.signAddress);
            this.model.set('type',obj.type);
            this.model.set('holdStartTime',holdTimeSplit[0]);
            this.model.set('holdEndTime',holdTimeSplit[1]);
            this.model.set('signStartTime',signTimeSplit[0]);
            this.model.set('signEndTime',signTimeSplit[1]);

            this.model.save({},{
                type: 'POST',
                success: function () {
                    layer.msg(msg);
                    setTimeout(function () {
                        location.href = 'userInfo.html#myActivity';
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