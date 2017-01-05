/**
 * Created by Kevin on 2016/12/6.
 */

var commonTemplate = require('html!./apiCommon.html');
var template = require('html!./api.html');
require('./api.css');
require('util');
require('validate');

var myPublicModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/getMyPublishedApi.do'
});
var getPackageModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'charge/getMyChargeRuleByServiceId.do'
});

var savePackageModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'charge/modifyChargeRule.do'
});

var deleteApiModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/deleteServiceApi.do'
});

var offlineApiModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/offlineServiceApi.do'
});


var apiView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        'click .displayMes': 'displayMes',
        'click .changePrice': 'changePrice',
        'click .deleteApi': 'deleteApi',
        'click .addPrice': 'addPackageLay',
        'click .editCharge': 'updateCharge',
        'click .removeCharge': 'removeCharge',
        'click .downApi': 'downApi',
        'blur #price': 'limitPriceFun',
        'change .charge-type': 'doChargeType'
    },
    updateIndex: -1,
    packageValidateConfig: function () {
        var that = this;
        return {
            rules: {
                name: {
                    required: true,
                    maxlength: 50
                },
                price: {
                    required: true,
                    number: true,
                    min: 0
                },
                chargeCount: {
                    required: true,
                    number: true,
                    integers: true,
                    min: 0
                },
                monthLimit: {
                    number: true,
                    integers: true,
                    min: 0
                },
                effectDate: {
                    required: true,
                    date: true
                },
                expiryDate: {
                    date: true
                }
            },
            messages: {
                name: {
                    maxlength: '套餐名称不大于50个字符'
                },
                chargeCount: {
                    integers: '大于1的正整数'
                },
                monthLimit: {
                    integers: '大于1的正整数'
                }
            },
            submitHandler: function () {
                that.saveChargeJson()
            }
        }
    },
    initialize: function() {
        var that = this;
        this.$el.html(_.template(commonTemplate)({name:'api'}));

        this.model = new myPublicModel();
        this.getPackageModel = new getPackageModel();
        this.model.on('change',function () {
            that.render();
        });
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
        this.initRender();
    },
    render: function () {
        var that = this;
        var res = this.model.get('result');
        var publishApiList = [], page = {};
        var templates = _.template($('#publishTemps').html());
        if(res){
            publishApiList = res.list;
            var page = res.page || {totalPage:0,currentPage:0,totalPage:0};
            this.pagObj.totalPage = page.totalPage;
            this.pagObj.pageNum = page.currentPage;
        }
        this.$el.find('tbody').html(templates({publishApiList:publishApiList}));
        laypage({
            cont: 'publishPage',
            pages: page.totalPage,
            skip: true,
            curr: this.pagObj.pageNum || 1,
            jump: function(obj, first){
                if(!first){
                    that.pagObj.pageNum = obj.curr;
                    that.reloadPage();
                }
            }
        });
    },
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    initRender: function () {
        this.$el.find('#apiInfo').html(template);
    },
    displayMes: function (e) {
        var $this = $(e.target).closest('tr'),
            index = $this.index(),
            res = this.model.get('result').list;
        var sComments = res[index].comments || '-';
        layer.alert(sComments,{title:'拒绝原因'});
    },
    buildPackageTable: function () {
        var res = this.getPackageModel.get('result');
        var packageTemps = _.template($('#packageTableTemps').html());
        this.packageList = res;
        $('.package-area').html(packageTemps({packageJson:res}));
    },
    buildDateEvents: function () {
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
        if($('#effectDate').data('daterangepicker')){
            $('#effectDate').data('daterangepicker').setOptions({minDate: new Date()-1,singleDatePicker: true,startDate: moment(),format: 'YYYY-MM-DD'})
        }
        else {

            $('#effectDate').daterangepicker({
                format: 'YYYY-MM-DD',
                singleDatePicker: true,
                startDate: moment(),
                minDate: lastDay()
            }).on('apply.daterangepicker',function (ev,picker) {
                $('#expiryDate').data('daterangepicker').setOptions({'minDate': lastDay($('#effectDate').val()),singleDatePicker: true,startDate: moment()});
            });
        }
        if($('#expiryDate').data('daterangepicker')){
            $('#expiryDate').data('daterangepicker').setOptions({minDate: lastDay(),singleDatePicker: true,startDate: moment(),format: 'YYYY-MM-DD'})
        }
        else {
            $('#expiryDate').daterangepicker({
                format: 'YYYY-MM-DD',
                singleDatePicker: true,
                startDate: moment(),
                minDate: lastDay()
            }).on('apply.daterangepicker',function (ev,picker) {
                $('#effectDate').data('daterangepicker').setOptions({'maxDate': $('#expiryDate').val(),minDate: lastDay(),singleDatePicker: true,startDate: moment()});
            });
        }
    },
    changePrice: function (e) {
        var that = this,
            $this = $(e.target).closest('tr'),
            sId = $this.attr('attrid'),
            sName = $($this.find('td')[0]).html();
        this.serviceId = sId;
        this.getPackageModel.fetch({
            data: {apiServiceId: sId},
            success: function (model,res) {
                that.buildPackageTable()
                buildLay();
            }
        });
        function buildLay() {
            var dialog = layer.open({
                type: 1,
                btn: ['保存修改','关闭'],
                title: sName+'调价',
                shade: 0.6,
                shadeClose: true,
                closeBtn:'1',
                area: ['600px', '450px'],
                content: $('.package-area'), //捕获的元素
                success: function () {
                },
                btn1: function () {          //通过
                    that.saveCharge();
                },
                btn2: function () {          //通过
                    layer.close(dialog);
                }
            });
        }
    },
    saveCharge: function () {
        var that = this;
        new savePackageModel().save({params:this.packageList},{
            success: function () {
                layer.msg('保存成功,已提交审核!');
                setTimeout(function () {
                    layer.closeAll();
                    that.reloadPage();
                },2000);
            }
        });
    },
    deleteApi: function (e) {
        var that = this,
            $this = $(e.target).closest('tr'),
            sId = parseInt($this.attr('attrid'));
        var deleteLay = layer.confirm('确认删除这条API吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            new deleteApiModel().save({apiServiceId: sId},{
                type: 'POST',
                success: function () {
                    layer.msg('删除成功!');
                    if(that.model.get('result') && that.model.get('result').list && that.model.get('result').list.length == 1 && that.pagObj.pageNum != 1){
                        that.pagObj.pageNum--;
                    }
                    that.reloadPage();
                }
            });
            layer.close(deleteLay);
        }, function(){
            layer.close(deleteLay);
        });
    },
    limitPriceFun: function (e) {
        if(e.target.id == 'price'){
            var $this = $(e.target),
                sVal = parseFloat($.trim($this.val())),
                $limitInput = $('input[name="countLimit"]');
            if(sVal === 0) {
                $($limitInput[0]).attr('disabled',true);
                $($limitInput[1]).prop("checked",true)
            }
            else {
                $($limitInput[0]).attr('disabled',false);
            }
            $limitInput = null;
        }
    },
    addPackageLay: function () {
        var that = this;
        var addChargeTemplete = _.template($('#chargeManage').html());
        $('.package-manage').html(addChargeTemplete({res:{'chargeType':'05'}}));

        var dialog= layer.open({
            type: 1,
            btn: ['保存','取消'],
            title: '新增收费规则',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['500px', '550px'],
            content: $('.package-manage'), //捕获的元素
            success: function () {
                that.buildDateEvents();
                $('#addChargeForm').validate(that.packageValidateConfig());
            },
            btn1: function () {          //通过
                $('#addChargeForm').submit();
            },
            btn2: function () {         // 不通过
                layer.close(dialog);
            }
        });
        that.lays = dialog;
    },
    updateCharge: function (e) {
        var that = this;
        var packageList = this.packageList || [];
        var index = $(e.target).closest('tr').index();
        var addChargeTemplete = _.template($('#chargeManage').html());
        this.updateIndex = index;
        $('.package-manage').html(addChargeTemplete({res:packageList[index]}));
        var dialog= layer.open({
            type: 1,
            btn: ['保存','取消'],
            title: '修改收费规则',
            shade: 0.6,
            shadeClose: true,
            closeBtn:'1',
            area: ['500px', '550px'],
            content: $('.package-manage'), //捕获的元素
            success: function () {
                that.buildDateEvents();
                $('#addChargeForm').validate(that.packageValidateConfig());
            },
            cancel: function(index){
                that.updateIndex = -1;
            },
            btn1: function () {          //通过
                $('#addChargeForm').submit();
            },
            btn2: function () {         // 不通过
                layer.close(dialog);
                that.updateIndex = -1;
            }
        });
        that.lays = dialog;
    },
    removeCharge: function(e) {
        var that = this;
        var packageList = this.packageList || [];
        var deleteLay = layer.confirm('确认删除这条套餐吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var index = $(e.target).closest('tr').index();
            if(packageList[index].flag == 'C') {
                if(packageList.length == 1 && index == 0){
                    packageList = [];
                }
                else {
                    packageList.splice(index,1);
                }
            }
            else {
                packageList[index].flag = 'D';
            }
            that.packageList = packageList;
            that.getPackageModel.set('result',packageList);
            that.buildPackageTable();
            layer.close(deleteLay);
        }, function(){
            layer.close(deleteLay);
        });
        return false;
    },
    downApi: function (e) {
        var that = this,
            $this = $(e.target).closest('tr'),
            sId = parseInt($this.attr('attrid'));
        var deleteLay = layer.confirm('确认下架这条API吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            new offlineApiModel().fetch({
                data:{apiServiceId: sId},
                type: 'get',
                success: function () {
                    layer.msg('下架成功!');
                    that.reloadPage();
                }
            });
            layer.close(deleteLay);
        }, function(){
            layer.close(deleteLay);
        });
    },
    saveChargeJson: function () {
        layer.close(this.lays);
        var packageList = this.packageList || [];
        if(this.updateIndex < 0) {
            var newPackage = $('#addChargeForm').serializeObject();
            newPackage.flag = 'C';
            newPackage.serviceId = this.serviceId;
            packageList.push(newPackage);
        }
        else {
            var newPackage = $('#addChargeForm').serializeObject();
            newPackage.flag = 'U';
            packageList[this.updateIndex] = newPackage;
            this.updateIndex = -1;
        }
        this.packageList = packageList;
        this.getPackageModel.set('result',packageList);
        this.buildPackageTable();
    },
    doChargeType: function () {
        var sVal = $('.charge-type').val();
        if(sVal == '04'){
            $('.prePrice').html('月');
            $('.limitPre').html('次');
        }
        else {
            $('.limitPre').html('个月');
            $('.prePrice').html('次');
        }
    }
});

module.exports = apiView;