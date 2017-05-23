'use strict';

var dataModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'queryAllData.do'
})
var wrapTemplate = require('html!./wrapTemplate.html');
var listTemplate = require('html!./listTemplate.html');

require('util');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'rightMenuWrap grid1190 fl boxShadiow boxSizing bgWhite common',
    wrapTemplate: _.template(wrapTemplate),
    listTemplate: _.template(listTemplate, {variable: 'data'}),
    events: {
        'click .search-btn': 'searchKeyword',
        'keydown .search-input': 'pressEnter',
        'click #goDataPublish': 'goPublish'
    },
    initialize: function() {
        this.$el.html(this.wrapTemplate());

        this.searchParam = new (Backbone.Model.extend({
            defaults: {
                page: 1,
                pageSize: 5
            }
        }))

        this.dataModel = new dataModel();
        this.listenTo(this.dataModel, 'sync', this.renderList);
        this.listenTo(this.searchParam, 'change', this.fetch);

        this.$publishDate = this.$('#publishDate');

        // 选择日期
        this.$publishDate.on('apply.daterangepicker', this.changeDate.bind(this));
        this.$publishDate.daterangepicker().data('loaded', 1);

        this.$dataList = this.$('.data-list');
        this.$page = this.$('.page');

        // 默认获取一次数据
        this.fetch();

        return this;
    },
    renderList: function() {
        var result = this.dataModel.toJSON().result || {};
        var list = result.list || [];
        var pageInfo = result.page || {};
        var me = this;

        this.$dataList.addClass('animate-content').removeClass('opacity0').html(this.listTemplate(list));

        if(list.length < 1){
            this.$dataList.removeClass('animate-content');
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
        this.dataModel.fetch({
            data: this.searchParam.toJSON()
        })
    },
    changeDate: function(event) {
        var $target = $(event.currentTarget);
        var date = $target.val();

        date = date.split(' - ');

        this.searchParam.set({
            beginTime: date[0],
            endTime: date[1]
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
            event.preventDefault();
            this.searchKeyword();
        }
    },
    goPublish: function() {
        mscxPage.isLogin() && mscxPage.isRealName() && (location.href = '#data/publish');
    }
});

module.exports = view;