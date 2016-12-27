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
        'click .downApi': 'downApi'
    },
    updateIndex: -1,
    packageValidateConfig: function () {
        var that = this;
        return {
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                price: {
                    required: true,
                    number: true,
                    min: 0
                },
                chargeCount: {
                    required: true,
                    number: true,
                    min: 0
                },
                countLimit: {
                    number: true,
                    min: 0
                },
                monthLimit: {
                    number: true,
                    min: 0
                },
                effectDate: {
                    required: true,
                    date: true
                },
                expiryDate: {
                    required: true,
                    date: true
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
        layer.alert(res[index].comments);

    },
    buildPackageTable: function () {
        var res = this.getPackageModel.get('result');
        var packageTemps = _.template($('#packageTableTemps').html());
        this.packageList = res;
        $('.package-area').html(packageTemps({packageJson:res}));
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
            this.dig = dialog;
        }
    },
    saveCharge: function () {
        var that = this;
        new savePackageModel().save({params:this.packageList},{
            success: function () {
                layer.msg('保存成功',function () {
                    layer.close(that.dig);
                });
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
    addPackageLay: function () {
        var that = this;
        var addChargeTemplete = _.template($('#chargeManage').html());
        $('.package-manage').html(addChargeTemplete({res:{}}));

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
    downApi: function () {
        var that = this,
            $this = $(e.target).closest('tr'),
            sId = parseInt($this.attr('attrid'));
        var deleteLay = layer.confirm('确认下架这条API吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            new offlineApiModel().save({apiServiceId: sId},{
                type: 'POST',
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
    }
});

module.exports = apiView;