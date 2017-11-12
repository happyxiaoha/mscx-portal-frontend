/**
 * Created by Kevin on 2016/12/6.
 */
var commonTemplate = require('./demandCommon.html');
var template = require('./demand.html');
require('./demand.css');
require('util');

var demandListModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryData.do'
});
var deleteSourceDemandModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'deleteData.do'
});
var closeSourceDemandModel = Backbone.Model.extend({
    idAttribute: 'dataId',
    url: mscxPage.request.demand + 'closeData.do'
});
var publishDataModel = Backbone.Model.extend({
    idAttribute: 'dataId',
    url: mscxPage.request.demand + 'publishData.do'
});
var queryRefuseModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryRefusedDataCause.do'
});
var offshopModel = Backbone.Model.extend({   //下架需求
    idAttribute: 'dataId',
    url: mscxPage.request.demand + 'offShopData.do'
});

var demandView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 5,
        pageNum: 1,
        totalPage: 1
    },
    events: {
        'click .deleteSource': 'deleteSource',
        'click .closeSource': 'closeSource',
        'click .offShopSource': 'offShopSource',
        'click .dataPublish': 'publishDemand',
        'click .queryRefuse': 'showQueryRefuse'
    },
    initialize: function() {
        this.$el.addClass('user-center-tap');
        this.$el.html(_.template(commonTemplate)({name:'demand'}));

        var that = this;

        this.model = new demandListModel();
        this.publishDataModel = new publishDataModel();
        this.closeSourceDemandModel = new closeSourceDemandModel();
        this.queryRefuseModel = new queryRefuseModel();
        this.offshopModel = new offshopModel();

        this.listenTo(this.publishDataModel, 'sync', this.handlePublish);
        this.listenTo(this.closeSourceDemandModel, 'sync', this.handleCloseData);
        this.listenTo(this.queryRefuseModel, 'sync', this.handleQueryRefuse);
        this.listenTo(this.offshopModel, 'sync', this.handleOffshop);
        this.model.on('change',function () {
            that.render();
        });
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
        this.renderInitPage();
    },
    render: function () {
        var res = this.model.get('result'),
            that = this,
            sourcesList = res.list,
            page = res.page;
        var temps = _.template($('#resourcesDemandList').html());
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        this.$el.find('tbody').html(temps({demandList:sourcesList}));
        laypage({
            cont: 'sourcesPage',
            skip: true,
            pages: this.pagObj.totalPage,
            curr: this.pagObj.pageNum || 1,
            jump: function(obj, first){
                if(!first){
                    that.pagObj.pageNum = obj.curr;
                    that.reloadPage();
                }
            }
        });
    },
    renderInitPage: function () {
        this.$el.find('#demandInfo').html(template);
    },
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    closeSource: function(e) {
        var id = this.$(e.target).data('id');
        this.closeSourceDemandModel.save({
            id: id
        })
    },
    offShopSource: function(e) {
        var id = $(e.target).closest('tr').attr('attrId');
        this.offshopModel.save({
            id: +id
        })
    },
    handleOffshop: function() {
        var model = this.offshopModel.toJSON();
        if(model.status == 'OK') {
            layer.msg('下架成功');
            this.reloadPage();
        }
    },
    handleQueryRefuse: function() {
        var model = this.queryRefuseModel.toJSON();
        if(model.status == 'OK') {
            layer.alert(model.result[0].checkSuggestion, {title:'拒绝原因'});
        }
    },
    showQueryRefuse: function(e) {
        var id = $(e.target).closest('tr').attr('attrId');
        this.queryRefuseModel.fetch({
            data: {
                reqId: id
            }
        })
    },
    handleCloseData: function() {
        var model = this.closeSourceDemandModel.toJSON();
        if(model.status == 'OK') {
            layer.msg('关闭成功');
            this.reloadPage();
        }
    },
    publishDemand: function(event) {
        var id = this.$(event.currentTarget).data('id');
        this.publishDataModel.set('id', +id);
        this.publishDataModel.save();
    },
    handlePublish: function() {
        var model = this.publishDataModel.toJSON();
        if(model.status == 'OK') {
            layer.msg('发布成功，请耐心等待审核');
            this.pagObj.pageNum = 1;
            this.reloadPage();
        }
    },
    deleteSource: function (e) {
        var that = this;
        var deleteLay = layer.confirm('确认删除这条数据需求吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var sId = $(e.target).closest('tr').attr('attrid');
            new deleteSourceDemandModel().save({id: sId},{
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
    }
});
module.exports = demandView;