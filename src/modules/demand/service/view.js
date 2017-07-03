'use strict';

var serviceModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryServiceListOfAll.do'
})
var wrapTemplate = require('./wrapTemplate.html');
var listTemplate = require('./listTemplate.html');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'ns-contentComponent',
    wrapTemplate: _.template(wrapTemplate),
    listTemplate: _.template(listTemplate, {variable: 'data'}),
    events: {
        'click .search-btn': 'searchKeyword',
        'keydown .search-input': 'pressEnter',
        'click #goServicePublish': 'goPublish',
        'click #dateFilter a': 'searchByDate'
    },
    initialize: function() {
        this.$el.html(this.wrapTemplate());

        this.searchParam = new (Backbone.Model.extend({
            defaults: {
                page: 1,
                pageSize: 10
            }
        }))

        this.serviceModel = new serviceModel();
        this.listenTo(this.serviceModel, 'sync', this.renderList);
        this.listenTo(this.searchParam, 'change', this.fetch);

        this.$dataList = this.$('.data-list');
        this.$page = this.$('.page');

        // 默认获取一次数据
        this.fetch();

        return this;
    },
    renderList: function() {
        var result = this.serviceModel.toJSON().result || {};
        var list = result.list || [];
        var pageInfo = result.page || {};
        var me = this;

        this.$dataList.addClass('animate-content padding-side').removeClass('opacity0').html(this.listTemplate(list));

        if(list.length < 1){
            this.$dataList.removeClass('animate-content padding-side');
        }

        laypage({
            cont: 'page',
            skip: true,
            curr: pageInfo.currentPage || 1,
            pages: pageInfo.totalPage,
            jump: function(obj, first) {
                if(!first) {
                    me.searchParam.set({
                        page: obj.curr
                    })
                }
            }
        })

    },
    fetch: function() {
        this.$dataList.empty().addClass('opacity0');
        this.serviceModel.fetch({
            data: this.searchParam.toJSON()
        })
    },
    searchByDate: function(event) {
        var $target = $(event.currentTarget);
        var beginTime = $target.data('start');
        var endTime = $target.data('end');

        $target.parents('dl').find('.active').removeClass('active');
        $target.addClass('active');

        this.searchParam.set({
            beginTime: beginTime,
            endTime: endTime
        })
    },
    searchKeyword: function(event) {
        var keyword = $.trim(this.$('.search-input').val());

        this.searchParam.set({
            keywords: keyword
        })
    },
    pressEnter: function(event) {
        if(event.keyCode == 13) {
            this.searchKeyword();
            event.preventDefault();
        }
    },
    goPublish: function() {
        mscxPage.isLogin() && mscxPage.isRealName() && (location.href = '#service/publish');
    }
});

module.exports = view;