/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./sources.html');
require('./sources.css');

function filterData(res,sSplit,array) {
    function parseDate(sDate) {
        var date = new Date(sDate),
            iMonth = date.getMonth()+1,
            iMonth = iMonth < 10 ? '0'+iMonth : iMonth,
            iDate = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
        return date.getFullYear()+''+sSplit+''+iMonth+''+sSplit+''+iDate;
    }
    for(var i = 0, len = res.length; i < len; i++){
        var obj = res[i];
        for(var k = 0, kLen = array.length; k < kLen; k++){
            var key = array[k];
            if(obj[key]){
                obj[key] = parseDate(obj[key]);
            }
        }
    }
    return res;
}
var focusModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'getAttentionDatum.do',
    parse: function (res) {
        filterData(res.result,'.',['updatedTime','attentionTime']);
        return res;
    }
});
var removeFocusModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'removeUserDataAttention.do'
});


var downloadModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'getAttentionDatum.do'
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
            curr: this.pagObj.pageNum || 1,
            jump: function(obj, first){
                if(!first){
                    that.pageChange(obj.curr);
                }
            }
        });
    },
    pageChange: function (curr) {
        
    },
    removeAttention: function (e) {
        var that = this,
            $this = $(e.target).closest('tr'),
            sId = $this.attr('attrId');

        new removeFocusModel().fetch({
            data: {
                dataId: sId
            },
            success: function () {
                layer.msg('取消关注成功');
                that.model.fetch({
                    data: {
                        pageSize: this.pagObj.pageSize,
                        page: this.pagObj.pageNum
                    }
                });
            }
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

    },
    initialize: function() {
        var that = this;
        this.templete = _.template($('#downloadSourcesList').html());
        this.model = new downloadModel();
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
    pageChange: function () {
        
    }
});

module.exports = sourcesView;