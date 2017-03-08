'use strict';

var searchView = require('searchWidget/searchView.js');
var resultView = require('./resultView.js');

var activityAPI = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/getActivityByKeys.do'
})

require('util');

var view = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    initialize: function() {
        this.$el.empty();
        this.searchView = new searchView({
            id: 'activity',
            model: {
                options: ['activityTags', 'date'],
                defaults: {
                    date: {
                        list: [
                            {
                                name: '今天',
                                startTime: this.getDate(),
                                endTime: this.getDate()
                            },{
                                name: '明天',
                                startTime: this.getDate(1),
                                endTime: this.getDate(1)
                            },{
                                name: '最近7天',
                                startTime: this.getDate(),
                                endTime: this.getDate(7)
                            },{
                                name: '最近30天',
                                startTime: this.getDate(),
                                endTime: this.getDate(30)
                            }
                        ],
                        title: '活动时间'
                    }
                }
            }
        });

        // 结果部分初始化
        this.resultView = new resultView();

        this.searchView.delegate = this;
        this.resultView.delegate = this;

        this.activityAPI = new activityAPI();

        this.searchView.listenTo(this.resultView, 'page', this.searchView.handlePageJump.bind(this.searchView));
        this.searchView.listenTo(this.resultView, 'sort', this.searchView.handleParams.bind(this.searchView));

        this.listenTo(this.activityAPI, 'sync', this.resultView.render.bind(this.resultView));

        this.$el.append(this.searchView.render().$el);
        this.$el.append(this.resultView.$el);
        
        return this;
    },
    getDate: function(addDays) {
        var res;
        if(addDays) {
            res = new Date().addDays(addDays).format('yyyy-MM-dd');
        }else {
            res = new Date().format('yyyy-MM-dd');
        }
        return res;
    }
});

module.exports = view;