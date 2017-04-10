/**
 * Created by Kevin on 2016/12/6.
 */
var commonTemplate = require('html!./saasCommon.html');
var mySaasTemps = require('html!./mySaas.html');
require('./saas.css');
require('util');

var mySaaSModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'saas/getSaaSList.do'
});

var mySaasView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 10,
        pageNum: 1,
        totalPage: 0
    },
    events: {},
    initialize: function() {
        var that = this;
        this.$el.addClass('user-center-tap');
        this.$el.html(_.template(commonTemplate)({name:'mySaas'}));
        this.model = new mySaaSModel();
        this.model.on('change',function () {
            that.render();
        });
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum,
                t: new Date().getTime()
            }
        });
        this.$el.find('#saasInfo').html(mySaasTemps);
    },
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    render: function () {
        var res = this.model.get('result'),
            that = this,
            mySaaSList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        var temps = _.template($('#mySaaSListTemps').html());
        this.$el.find('tbody').html(temps({mySaaSList: mySaaSList}));
        laypage({
            cont: 'mySaaSPages',
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
    }
});

module.exports = mySaasView;