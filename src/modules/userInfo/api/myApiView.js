/**
 * Created by Kevin on 2016/12/6.
 */

var commonTemplate = require('./apiCommon.html');
var template = require('./myApi.html');
require('./api.css');
require('util');

var applyApiListModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'api/getSelfApiList.do'
});


var myApiView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {},
    initialize: function() {
        var that = this;
        this.$el.addClass('user-center-tap');
        this.$el.html(_.template(commonTemplate)({name:'myApi'}));

        this.model = new applyApiListModel();
        this.model.on('change',function () {
            that.render()
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
        var that = this,
            res = this.model.get('result') || {},
            applyApiList = res.list|| [],
            page = res.page || {currentPage:1,totalSize:1,totalPage:1};
        var temps = _.template($('#apiApplyList').html());
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.pageTotal = page.totalSize;
        this.$el.find('tbody').html(temps({applyApiList:applyApiList}));
        laypage({
            cont: 'applyApiPages',
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
    initRender: function () {
        this.$el.find('#apiInfo').html(template);
    },
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    }
});
module.exports = myApiView;