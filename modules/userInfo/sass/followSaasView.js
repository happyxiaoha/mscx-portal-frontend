/**
 * Created by Kevin on 2016/12/6.
 */


var commonTemplate = require('html!./saasCommon.html');
var followTemplate = require('html!./followSaas.html');
require('./saas.css');
require('util');
var saasFollowListModel = Backbone.Model.extend({
    url: mscxPage.request.saas + 'attention/list.do'
});

var followSaasView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 5,
        pageNum: 1,
        totalPage: 1
    },
    events: {
        'click .cancelFollow': 'cancelFollow'
    },
    initialize: function() {
        var that = this;
        this.$el.addClass('user-center-tap');
        this.$el.html(_.template(commonTemplate)({name:'followSaas'}));
        this.model = new saasFollowListModel();
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
        var res = this.model.get('result'),
            that = this,
            followList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;
        var temps = _.template($('#SaaSFollowList').html());
        this.$el.find('tbody').html(temps({followSaaSList: followList}));
        laypage({
            cont: 'SaaSFollowPages',
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
    reloadPage: function () {
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
    },
    initRender: function () {
        this.$el.find('#saasInfo').html(followTemplate);
    },
    cancelFollow: function (e) {
        
    }
});

module.exports = followSaasView;