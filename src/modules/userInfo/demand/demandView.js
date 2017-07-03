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
var publishDataModel = Backbone.Model.extend({
    idAttribute: 'dataId',
    url: mscxPage.request.demand + 'publishData.do'
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
        'click .dataPublish': 'publishDemand'
    },
    initialize: function() {
        this.$el.addClass('user-center-tap');
        this.$el.html(_.template(commonTemplate)({name:'demand'}));

        var that = this;

        this.model = new demandListModel();
        this.publishDataModel = new publishDataModel();

        this.listenTo(this.publishDataModel, 'sync', this.handlePublish);
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