/**
 * Created by Administrator on 2016/12/14.
 */
'use strict';

var searchView = require('searchWidget/searchView.js');
var resultView = require('./resultView.js');

require('./saas.css');
require('util');

var servicesModel = Backbone.Model.extend({
    url: mscxPage.request.saas + 'list.do'
});

var view = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    initialize: function() {
        this.id = 'saas';
        // 筛选部分初始化
        this.searchView = new searchView({
            id: this.id,
            model: {
                options: [this.id + 'Category', this.id + 'Tags', 'chargeWay', 'date'],
                defaults: {
                    date: {
                        list: [
                            {
                                name: '7天内',
                                startTime: this.getDate(-7),
                                endTime: this.getDate()
                            },{
                                name: '一个月内',
                                startTime: this.getDate(-30),
                                endTime: this.getDate()
                            },{
                                name: '三个月内',
                                startTime: this.getDate(-90),
                                endTime: this.getDate()
                            },{
                                name: '半年内',
                                startTime: this.getDate(-180),
                                endTime: this.getDate()
                            },{
                                name: '一年内',
                                startTime: this.getDate(-365),
                                endTime: this.getDate()
                            },{
                                name: '一年前',
                                startTime: '',
                                endTime: this.getDate(-365)
                            }
                        ],
                        title: '发布日期'
                    },
                    pageSize: 12,
                    orderBy: 1
                }
            }
        });

        // 结果部分初始化
        this.resultView = new resultView({
            id: this.id
        });

        this.searchView.delegate = this;
        this.resultView.delegate = this;

        this.searchView.listenTo(this.resultView, 'page', this.searchView.handlePageJump.bind(this.searchView));
        this.searchView.listenTo(this.resultView, 'sort', this.searchView.handleParams.bind(this.searchView));

        this.saasAPI = new servicesModel();

        this.listenTo(this.saasAPI, 'sync', this.resultView.render.bind(this.resultView));

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