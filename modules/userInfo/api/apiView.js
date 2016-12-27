/**
 * Created by Kevin on 2016/12/6.
 */

var commonTemplate = require('html!./apiCommon.html');
var template = require('html!./api.html');
require('./api.css');
require('util');

var myPublicModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/getMyPublishedApi.do'
});


var apiView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
    events: {
        'click .displayMes': 'displayMes',
        'click .changePrice': 'changePrice'
    },
    initialize: function() {
        var that = this;
        this.$el.html(_.template(commonTemplate)({name:'api'}));

        this.model = new myPublicModel();
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
    changePrice: function (e) {
        
    }
});

module.exports = apiView;