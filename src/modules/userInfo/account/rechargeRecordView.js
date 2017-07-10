'use strict';

var commonTemplate = require('./common.html');
var template = require('./rechargeRecord.html');

require('./account.less');
require('util');

var rechargeRecordModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getRechargeList.do'
});

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: template,
    events: {
        'click .recharge .btn-search': 'searchDate',
        'click .recharge .btn-reset': 'resetDate'
    },
    pagObj: {
        pageSize: 10,
        pageNum: 1,
        totalPage: 0
    },
    initialize: function() {
        _.extend(this, this.model);

        this.$el.html(this.commonTemplate({
            name: this.id,
            hasAccount: this.hasAccount
        }));

        this.$('#userInfoArea').html(this.template);

        this.rechargeTemplate = _.template(this.$('#rechargeTemplate').html(), {variable: 'data'});

        this.$datepicker = this.$('#datepicker');

        // 选择日期
        this.$datepicker.daterangepicker();

        this.rechargeRecordModel = new rechargeRecordModel();
        this.searchParam = new Backbone.Model({
            pageSize: this.pagObj.pageSize,
            page: this.pagObj.pageNum
        });
        this.listenTo(this.rechargeRecordModel, 'sync', this.render);

        this.rechargeRecordModel.fetch({
            data: this.searchParam.toJSON()
        })

        return this;
    },
    render: function() {
        var model = this.rechargeRecordModel.toJSON();
        var that = this;
        this.$('#rechargeRecord').html(this.rechargeTemplate(model.result));

        this.searchParam.set({
            page: model.result.page.currentPage
        })

        laypage({
            cont: 'rechargePage',
            pages: model.result.page.totalPage,
            skip: true,
            curr: this.searchParam.get('page') || 1,
            jump: function(obj, first){
                if(!first){
                    that.searchParam.set('page', obj.curr);
                    that.reloadPage();
                }
            }
        });
    },
    reloadPage: function() {
        this.rechargeRecordModel.fetch({
            data: this.searchParam.toJSON()
        });
    },
    searchDate: function() {
        var time = this.$datepicker.val();
        time = time.split(' - ');
        this.searchParam.set({
            beginTime: time[0],
            endTime: time[1]
        })

        this.rechargeRecordModel.fetch({
            data: this.searchParam.toJSON()
        })
    },
    resetDate: function() {
        this.$datepicker.val('');
    }
});
module.exports = accountView;