'use strict';

var commonTemplate = require('html!./common.html');
var template = require('html!./consumeRecord.html');

require('./account.less');
require('util');

var consumeRecordModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getConsumeList.do'
});

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: template,
    events: {
        'click .consume .btn-search': 'searchDate',
        'click .consume .btn-reset': 'resetDate'
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
        this.consumeTemplate = _.template(this.$('#consumeTemplate').html(), {variable: 'data'});

        this.$datepicker = this.$('#datepicker');

        // 选择日期
        this.$datepicker.daterangepicker();

        this.consumeRecordModel = new consumeRecordModel();
        this.searchParam = new Backbone.Model({
            pageSize: this.pagObj.pageSize,
            page: this.pagObj.pageNum
        });
        this.listenTo(this.consumeRecordModel, 'sync', this.render);

        this.consumeRecordModel.fetch({
            data: this.searchParam.toJSON()
        })

        return this;
    },
    render: function() {
        var model = this.consumeRecordModel.toJSON();
        var that = this;
        this.$('#consumeRecord').html(this.consumeTemplate(model.result));

        this.searchParam.set({
            page: model.result.page.currentPage
        });

        laypage({
            cont: 'consumePage',
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
        this.consumeRecordModel.fetch({
            data: this.searchParam.toJSON()
        });
    },
    searchDate: function(event) {
        event.preventDefault();

        var time = this.$datepicker.val();
        time = time.split(' - ');
        this.searchParam.set({
            beginTime: time[0],
            endTime: time[1]
        })

        this.consumeRecordModel.fetch({
            data: this.searchParam.toJSON()
        })
    },
    resetDate: function() {
        this.$datepicker.val('');
    }
});
module.exports = accountView;