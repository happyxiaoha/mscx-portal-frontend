'use strict';

var commonTemplate = require('html!./common.html');
var offlineTemplate = require('html!./offlineMeet.html');

require('util');

var offlineModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'service/getOfflineMeetByUserId.do'
});


var offlineMeetView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 5,
        pageNum: 1,
        totalPage: 1
    },
    events: {
        'click .toOrderPay': 'toPay'
    },
    initialize: function() {
        this.$el.addClass('user-center-tap');
        this.$el.html(_.template(commonTemplate));
        
        this.model = new offlineModel();

        this.listenTo(this.model, 'sync', this.render);

        
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
            // offlineList = res.list,
            page = res.page;
        this.pagObj.pageNum = page.currentPage;
        this.pagObj.totalPage = page.totalPage;


        this.$el.find('tbody').html(this.listTemplate(res));

        laypage({
            cont: 'offlinePages',
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
        this.$el.find('#offlineMeetArea').html(offlineTemplate);

        this.listTemplate = _.template($('#offlineList').html(), {variable: 'data'});
    }
});

module.exports = offlineMeetView;