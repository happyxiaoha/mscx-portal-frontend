'use strict';

var commonTemplate = require('html!./common.html');
var template = require('html!./pointIncome.html');
var listTemplate = require('html!./pointList.html');

require('./point.css');
require('util');

var pointIncomeModel = Backbone.Model.extend({
    url: mscxPage.request.point + 'point/getIncomePointRecordList.do'
});

var userView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'click .point-income .btn-search': 'searchDate',
        'click .fast-search a': 'searchFastDate',
    },
    commonTemplate: _.template(commonTemplate),
    template: _.template(template, {variable: 'data'}),
    listTemplate:  _.template(listTemplate, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.commonTemplate({
            name: 'pointIncome'
        }));

        this.pointIncomeModel = new pointIncomeModel();
        this.searchParam = new Backbone.Model({
            pageSize: 5,
            pageNum: 1
        });
        this.listenToOnce(this.pointIncomeModel, 'sync', this.render);
        this.listenTo(this.searchParam, 'change', this.fullfillDatepicker);

        this.pointIncomeModel.fetch({
            data: this.searchParam.toJSON()
        })
    },
    render: function () {
        var model = this.pointIncomeModel.toJSON();
        var that = this;
        this.$('#userInfoArea').html(this.template(model.result));

        this.$datepicker = this.$('#datepicker');

        // 选择日期
        this.$datepicker.daterangepicker();

        laypage({
            cont: 'pointPage',
            pages: model.result.page.totalPage,
            skip: true,
            curr: this.searchParam.get('pageNum') || 1,
            jump: function(obj, first){
                if(!first){
                    that.searchParam.set('pageNum', obj.curr);
                    that.reloadPage();
                }
            }
        });

        this.listenTo(this.pointIncomeModel, 'sync', this.renderPartial);
    },
    searchDate: function() {
        var time = this.$datepicker.val();
        time = time.split(' - ');
        this.searchParam.set({
            startTime: time[0],
            endTime: time[1]
        })

        this.pointIncomeModel.fetch({
            data: this.searchParam.toJSON()
        })
    },
    searchFastDate: function(event) {
        var $target = this.$(event.currentTarget);
        this.searchParam.set({
            startTime: $target.data('start'),
            endTime: $target.data('end')
        })

        this.pointIncomeModel.fetch({
            data: this.searchParam.toJSON()
        })
    },
    renderPartial: function() {
        var model = this.pointIncomeModel.toJSON();
        var that = this;
        this.$('#pointList').html(this.listTemplate(model.result));

        laypage({
            cont: 'pointPage',
            pages: model.result.page.totalPage,
            skip: true,
            curr: this.searchParam.get('pageNum') || 1,
            jump: function(obj, first){
                if(!first){
                    that.searchParam.set('pageNum', obj.curr);
                    that.reloadPage();
                }
            }
        });
    },
    reloadPage: function() {
        this.pointIncomeModel.fetch({
            data: this.searchParam.toJSON()
        });
    },
    fullfillDatepicker: function() {
        var result = this.searchParam.toJSON();
        if(result.startTime == '' || result.endTime == '' || !result.startTime || !result.endTime) {
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