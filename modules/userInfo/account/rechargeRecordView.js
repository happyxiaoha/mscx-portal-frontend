'use strict';

var commonTemplate = require('html!./common.html');
var template = require('html!./rechargeRecord.html');

require('./account.css');
require('util');

var rechargeRecordModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getRechargeList.do'
});

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: template,
    events: {
        'click .recharge .btn-search': 'searchDate'
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
        this.searchParam = new Backbone.Model();
        this.listenTo(this.rechargeRecordModel, 'sync', this.render);

        this.rechargeRecordModel.fetch({
            data: this.searchParam.toJSON()
        })

        return this;
    },
    render: function() {
        var model = this.rechargeRecordModel.toJSON();
        this.$('#rechargeRecord').html(this.rechargeTemplate(model.result));
    },
    searchDate: function() {
        var time = this.$datepicker.val();
        time = time.split(' - ');
        this.searchParam.set({
            startTime: time[0],
            endTime: time[1]
        })

        this.rechargeRecordModel.fetch({
            data: this.searchParam.toJSON()
        })
    }
});
module.exports = accountView;