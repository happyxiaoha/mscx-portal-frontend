'use strict';

var commonTemplate = require('html!./common.html');
var template = require('html!./pointOutlay.html');
var listTemplate = require('html!./pointList.html');

require('./point.css');
require('util');

var pointOutlayModel = Backbone.Model.extend({
    url: mscxPage.request.point + 'point/getExpensePointRecordList.do'
});

var userView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'click .btn-search': 'searchDate',
        'click .fast-search a': 'searchFastDate',
    },
    commonTemplate: _.template(commonTemplate),
    template: _.template(template, {variable: 'data'}),
    listTemplate:  _.template(listTemplate, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.commonTemplate({
            name: 'pointOutlay'
        }));

        this.pointOutlayModel = new pointOutlayModel();
        this.searchParam = new Backbone.Model();
        this.listenToOnce(this.pointOutlayModel, 'sync', this.render);
        this.listenTo(this.searchParam, 'change', this.fullfillDatepicker);

        this.pointOutlayModel.fetch({
            data: this.searchParam.toJSON()
        })
    },
    render: function () {
        var model = this.pointOutlayModel.toJSON();
        this.$('#userInfoArea').html(this.template(model.result));

        this.$datepicker = this.$('#datepicker');

        // 选择日期
        this.$datepicker.daterangepicker();

        this.listenTo(this.pointOutlayModel, 'sync', this.renderPartial);
    },
    searchDate: function() {
        var time = this.$datepicker.val();
        time = time.split(' - ');
        this.searchParam.set({
            startTime: time[0],
            endTime: time[1]
        })

        this.pointOutlayModel.fetch({
            data: this.searchParam.toJSON()
        })
    },
    searchFastDate: function(event) {
        var $target = this.$(event.currentTarget);
        this.searchParam.set({
            startTime: $target.data('start'),
            endTime: $target.data('end')
        })

        this.pointOutlayModel.fetch({
            data: this.searchParam.toJSON()
        })
    },
    renderPartial: function() {
        var model = this.pointOutlayModel.toJSON();
        this.$('#pointList').html(this.listTemplate(model.result));
    },
    fullfillDatepicker: function() {
        var result = this.searchParam.toJSON();
        if(result.startTime == '' || result.endTime == '') {
            this.$datepicker.val('')
        }else {
            this.$datepicker.val(result.startTime + ' - ' + result.endTime).data('daterangepicker').setOptions({
                startDate: result.startTime,
                endDate: result.endTime
            });
        }
    }
});
module.exports = userView;