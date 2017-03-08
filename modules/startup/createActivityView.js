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

var createActivityView = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    events: {
        'change .upload-file': 'doUploadImg'
    },
    validateConfig: function () {
        var that = this;
        return {
            rules: {
                name: {
                    required: true
                },
                description: {
                    required: true
                },
                initiator: {
                    required: true
                },
                signAddress: {
                    required: true
                },
                signTime: {
                    required: true
                },
                holdAddress: {
                    required: true
                },
                holdTime: {
                    required: true
                },
                detail: {
                    required: true
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
    buildDate: function () {
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
        $('#signTime').daterangepicker({
            minDate: lastDay(),
            startDate: lastDay()
        }).on('apply.daterangepicker',function (ev,picker) {
            $('#holdTime').data('daterangepicker').setOptions({'minDate': picker.endDate,'startDate':picker.endDate});
        });
        $('#holdTime').daterangepicker({
            minDate: lastDay(),
            startDate: lastDay()
        }).on('apply.daterangepicker',function (ev,picker) {
            $('#signTime').data('daterangepicker').setOptions({'maxDate': picker.startDate,'endDate':picker.startDate});
        });
    },
    initialize: function() {
        var that = this;
        this.$el.html(template);
        this.buildDate();
        this.model = new addActivityModel();
        this.activityTypeModel = new activityTypeModel();
        this.activityTypeModel.fetch();
        this.activityTypeModel.on('change',function () {
            that.buildActivityType();
        });
        $('#publishActivity').validate(that.validateConfig());
        return this;
    },
    buildActivityType: function () {
        var res = this.activityTypeModel.get('result');
        if(res.length > 0){
            res[0].checked = true;
        }
        var activityTemps = _.template($('#activityType').html());
        $('#activityTypeRadio').html(activityTemps({'activityTypeList': res}))
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
                console.log(src);
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
            console.log(obj);

        }

    }
});

module.exports = createActivityView;