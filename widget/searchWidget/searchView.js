'use strict';

var template = require('html!./search.html');
var tagTemplate = require('html!./tagTemplate.html');

var Models = {
    // 对象
    objects: new (Backbone.Model.extend({
        url: mscxPage.host + '/ro/mscx-dict-api/dict/getServiceObject.do'
    })),
    // 范围
    rage: new (Backbone.Model.extend({
        url: ''
    })),
    // 数据API分类
    dataCategory: new (Backbone.Model.extend({
        url: mscxPage.host + '/ro/mscx-dict-api/catalog/getDataApiCatalog.do'
    })),
    // 模型API分类
    modelCategory: new (Backbone.Model.extend({
        url: mscxPage.host + '/ro/mscx-dict-api/catalog/getModelApiCatalog.do'
    })),
    // 工具API分类
    toolCategory: new (Backbone.Model.extend({
        url: mscxPage.host + '/ro/mscx-dict-api/catalog/getToolApiCatalog.do'
    })),
    // 开放数据分类
    openDataCategory: new (Backbone.Model.extend({
        url: mscxPage.host + '/ro/mscx-dict-api/catalog/getOpenDataCatalog.do'
    })),
    // 微服务分类
    serviceCategory: new (Backbone.Model.extend({
        url: mscxPage.host + '/ro/mscx-dict-api/catalog/getServiceCatalog.do'
    })),
    // 数据API标签
    dataTags: new (Backbone.Model.extend({
        url: mscxPage.host + '/ro/mscx-dict-api/tags/getDataApiTags.do'
    })),
    // 工具API标签
    toolTags: new (Backbone.Model.extend({
        url: mscxPage.host + '/ro/mscx-dict-api/tags/getToolApiTags.do'
    })),
    // 模型API标签
    modelTags: new (Backbone.Model.extend({
        url: mscxPage.host + '/ro/mscx-dict-api/tags/getModelApiTags.do'
    })),
    // 开放数据标签
    openDataTags: new (Backbone.Model.extend({
        url: mscxPage.host + '/ro/mscx-dict-api/tags/getOpenDataTags.do'
    })),
    // 微服务标签
    serviceTags: new (Backbone.Model.extend({
        url: mscxPage.host + '/ro/mscx-dict-api/tags/getServiceTags.do'
    })),
    // 标签详情 根据catalogId获取
    detailTags: new (Backbone.Model.extend({
        url: mscxPage.host + '/ro/mscx-dict-api/tag/getTagsInfo.do'
    })),
    // 收费类型
    chargeWay: new (Backbone.Model.extend({
        url: mscxPage.host + '/ro/mscx-dict-api/dict/getChargeWays.do'
    })),
    // 机构
    orgs: new (Backbone.Model.extend({
        url: mscxPage.host + '/ro/mscx-dict-api/org/getOrganization.do'
    }))
}

require('./search.css');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'animate-content search-loading',
    events: {
        'click .sl-e-more': 'toggleMore',
        'click li a': 'searchData',
        'click input[type="checkbox"]': 'handleCheckbox',
        'click .search-btn': 'handleQueryStr',
        'keydown .search-input': 'pressEnterSearch'
    },
    template: _.template(template, {variable: 'data'}),
    tagTemplate: _.template(tagTemplate, {variable: 'data'}),
    initialize: function() {
        this.filterMaps = _.pick(Models, this.model.options);

        // 标签详情 根据catalogId获取
        this.detailTags = Models.detailTags;

        this.listenTo(this.detailTags, 'sync', this.renderDetailTags);
        this.listenTo(Models.dataTags, 'sync', this.renderDetailTags);
        this.listenTo(Models.toolTags, 'sync', this.renderDetailTags);
        this.listenTo(Models.modelTags, 'sync', this.renderDetailTags);
        this.listenTo(Models.openDataTags, 'sync', this.renderDetailTags);
        this.listenTo(Models.serviceTags, 'sync', this.renderDetailTags);

        this.searchParams = {};
        this.on('renderBox', this.renderBox);

        return this;
    },
    render: function() {
        var queue = [];
        _.each(this.filterMaps, function(item) {
            // 如果已经获取过，就无需获取
            if(typeof item.toJSON().result == 'undefined') {
                queue.push(item.fetch());
            }
        })
        
        $.when.apply($, queue).done(function() {
            this.trigger('renderBox', this.filterMaps);
        }.bind(this));

        return this;
    },
    renderBox: function() {
        this.$el.toggleClass('search-loading');
        var model = this.model.toJSON ? this.model.toJSON() : this.model;
        var params = {};

        _.extend(model, this.filterMaps);

        // 处理一下model中的标签
        model.tags = model.dataTags || model.toolTags || model.modelTags || model.openDataTags || model.serviceTags;
        // 处理一下model中的分类
        model.category = model.dataCategory || model.modelCategory || model.toolCategory || model.openDataCategory || model.serviceCategory;

        for(var key in model) {
            if(model[key].toJSON) {
                params[key] = model[key].toJSON();
            }else {
                params[key] = model[key];
            }
        }

        this.$el.html(this.template(params));

        // 默认触发查询
        this.searchData();
    },
    toggleMore: function(event) {
        var $target = this.$(event.currentTarget);
        if($target.hasClass('down')){
            $target.html('收起>>').removeClass('down').parent().siblings('.sl-value').find('.J_List').toggleClass('expand');
        }else{
            $target.html('更多>>').addClass('down').parent().siblings('.sl-value').find('.J_List').toggleClass('expand');
        }            
    },
    searchData: function(event) {
        if(event) {
            var $target = this.$(event.currentTarget);
            var type = $target.data('type');

            $target.parents('ul').find('.active').removeClass('active');
            $target.parent().toggleClass('active');

            this.searchParams[type] = type && $target.data(type.toLowerCase()) || '';

            // 如果选中的是分类，则获取该分类下的标签明细, 不做查询操作
            if(type == 'categoryId') {
                if(this.searchParams[type]) {
                    this.detailTags.fetch({
                        data: {
                            catalogId: this.searchParams[type]
                        }
                    })
                }else {
                    Models[this.id + 'Tags'].fetch({data: {}});
                }
                return;
            }
        }
        
        this.queryAPI = this.delegate[this.id + 'API'];
        this.queryAPI.fetch({
            data: this.searchParams
        });
    },
    renderDetailTags: function(model) {
        this.$('.tag-ul').html(this.tagTemplate(model.toJSON()));

        var $moreWrap = this.$('.tag-wrap .sl-ext');
        // 处理 更多 按钮是否出现
        if(model.toJSON().result.length > 7) {
            $moreWrap.show();
        }else {
            $moreWrap.hide();
        }   
    },
    handleCheckbox: function(event) {
        var $target = this.$(event.currentTarget);
        var type = $target.data('type');
        var value = $target.val();

        var params = [];

        $target.parents('ul').find('input[type="checkbox"]:checked').each(function(index, item) {
            params.push(item.value);
        })

        if(type == 'objects') {
            this.searchParams['serviceObject'] = params.join(',');
        }else if(type == 'chargeType') {
            this.searchParams['chargeType'] = params.length > 1 ? '' : params[0];
        }

        this.searchData();
    },
    handleQueryStr: function() {
        var searchText = $.trim(this.$('.search-input').val());

        this.searchParams['searchText'] = searchText;
        this.searchData();
        
    },
    handlePageJump: function(params) {
        this.searchParams['page'] = params.page || 0;
        this.searchParams['pageSize'] = params.pageSize || 20;

        this.searchData();
    },
    handleSort: function(params) {
        _.extend(this.searchParams, params);

        this.searchData();
    },
    pressEnterSearch: function(event) {
        if(event.keyCode == 13) {
            this.handleQueryStr();
        }
    }
});

module.exports = view;