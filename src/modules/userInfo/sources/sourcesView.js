/**
 * Created by Kevin on 2016/12/6.
 */

require('util');
var template = require('./sources.html');
require('./sources.css');

var focusModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'getAttentionDatum.do'
});
var removeFocusModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'removeUserDataAttention.do'
});


var downloadModel = Backbone.Model.extend({               //下载的数据
    url: mscxPage.request.order + 'data/getSelfDataList.do'
});

var downloadDataModel = Backbone.Model.extend({           //数据下载
    url: mscxPage.request.data + 'data/download.do'
});


var sourcesView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'click #sourcesTabs span': 'changeTab'
    },
    changeTab: function (e) {
        var $this = $(e.target),
            isActive = $this.hasClass('active'),
            index = $this.index();
        if(!isActive){
            $this.parent().find('.active').removeClass('active');
            $this.addClass('active');
            new this.childView[index]({el: '#sourcesInfo'});
        }
    },
    initialize: function() {
        this.childView = [focusResourcesView,downloadSourcesListView];
        this.$el.addClass('user-center-tap');
        this.$el.html(template);
        new focusResourcesView({el: '#sourcesInfo'});
    }
});

var focusResourcesView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1,
        pageTotal: 0
    },
    events: {
        'click .removeAttention': 'removeAttention'
    },
    initialize: function() {
        this.templete = _.template($('#focusResourcesMsg').html());
        var that = this;
        this.model = new focusModel();
        this.model.on('change',function(){
            that.render();
        });
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    render: function () {
        var res = this.model.get('result'),
            focusList = res.list || [],
            page = res.page,
            that = this;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.pageTotal = page.totalSize;
        this.$el.html(this.templete({focusList:focusList}));
        laypage({
            cont: 'focusPage',
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
    removeAttention: function (e) {
        var that = this;
        var deleteLay = layer.confirm('确认取消关注这条数据需求吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var sId = parseInt($(e.target).closest('tr').attr('attrid'));
            new removeFocusModel().fetch(
                {
                    data: {dataId: sId},
                    type: 'GET',
                    success: function () {
                        layer.msg('取消关注成功');
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
        e.stopPropagation();
    }
});
var downloadSourcesListView = Backbone.View.extend({
    pagObj: {
        pageSize: 10,
        pageNum: 1,
        pageTotal: 0
    },
    events: {
        'click .down-sources': 'downLoad'
    },
    initialize: function() {
        var that = this;
        this.templete = _.template($('#downloadSourcesList').html());
        this.model = new downloadModel();
        this.downloadDataModel = new downloadDataModel();
        this.model.on('change',function(){
            that.render()
        });
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    render: function () {
        var res = this.model.get('result'),
            downloadList = res.list || [],
            page = res.page,
            that = this;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.pageTotal = page.totalSize;
        this.$el.html(this.templete({downloadList:downloadList}));
        laypage({
            cont: 'downLoadPage',
            pages: page.totalPage,
            curr: this.pagObj.pageNum || 1,
            jump: function(obj, first){
                if(!first){
                    that.pageChange(obj.curr);
                }
            }
        });
    },
    pageChange: function (curr) {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: curr || this.pagObj.pageNum
            }
        });
    },
    downLoad: function (e) {
        var sId = parseInt($(e.target).closest('tr').attr('attrId'));
        var newTarget = window.open('about:blank', '_blank'); //打开新的tab页

        this.downloadDataModel.fetch({
            data:{
                dataId: sId
            },
            success: function (res) {
                res = res.toJSON();
                newTarget.location.href = res.result; //在打开的tab页下载
                setTimeout(function(){newTarget.close()}, 1000);
            }
        });
        //download
        e.stopPropagation();
    }
});

module.exports = sourcesView;