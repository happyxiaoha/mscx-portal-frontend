'use strict';

var commonTemplate = require('html!./common.html');
var template = require('html!./consumeRecord.html');

require('./account.css');
require('util');

var consumeRecordModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getConsumeList.do'
});

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    template: template,
    events: {
        'click .consume .btn-search': 'searchDate'
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
        this.searchParam = new Backbone.Model();
        this.listenTo(this.consumeRecordModel, 'sync', this.render);

        this.consumeRecordModel.fetch({
            data: this.searchParam.toJSON()
        })

        return this;
    },
    render: function() {
        var model = this.consumeRecordModel.toJSON();
        this.$('#consumeRecord').html(this.consumeTemplate(model.result));
    },
    searchDate: function(event) {
        event.preventDefault();

        var time = this.$datepicker.val();
        time = time.split(' - ');
        this.searchParam.set({
            startTime: time[0],
            endTime: time[1]
        })

        this.consumeRecordModel.fetch({
            data: this.searchParam.toJSON()
        })
    }
});
module.exports = accountView;