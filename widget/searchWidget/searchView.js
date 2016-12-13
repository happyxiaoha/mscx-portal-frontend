'use strict';

var template = require('html!./search.html');

var Models = {
    // 对象
    objects: new (Backbone.Model.extend({
        url: mscxPage.host + '/mscx-dict-api/dict/getServiceObject.do'
    })),
    // 范围
    rage: new (Backbone.Model.extend({
        url: ''
    })),
    // 数据API分类
    dataCategory: new (Backbone.Model.extend({
        url: mscxPage.host + '/mscx-dict-api/catalog/getDataApiCatalog.do'
    })),
    // 模型API分类
    modelCategory: new (Backbone.Model.extend({
        url: mscxPage.host + '/mscx-dict-api/catalog/getModelApiCatalog.do'
    })),
    // 工具API分类
    toolCategory: new (Backbone.Model.extend({
        url: mscxPage.host + '/mscx-dict-api/catalog/getToolApiCatalog.do'
    })),
    // 数据API标签
    dataTags: new (Backbone.Model.extend({
        url: mscxPage.host + '/mscx-dict-api/tags/getDataApiTags.do'
    })),
    // 工具API标签
    toolTags: new (Backbone.Model.extend({
        url: mscxPage.host + '/mscx-dict-api/tags/getToolApiTags.do'
    })),
    // 模型API标签
    modelTags: new (Backbone.Model.extend({
        url: mscxPage.host + '/mscx-dict-api/tags/getModelApiTags.do'
    })),
    // 开放数据标签
    openDataTags: new (Backbone.Model.extend({
        url: mscxPage.host + '/mscx-dict-api/tags/getOpenDataTags.do'
    })),
    // 微服务标签
    serviceTags: new (Backbone.Model.extend({
        url: mscxPage.host + '/mscx-dict-api/tags/getServiceTags.do'
    })),
    // 标签详情 根据catalogId获取
    detailTags: new (Backbone.Model.extend({
        url: mscxPage.host + '/mscx-dict-api/tags/getTagsInfo.do'
    })),
    // 收费类型
    chargeWay: new (Backbone.Model.extend({
        url: mscxPage.host + '/mscx-dict-api/dict/getChargeWays.do'
    })),
    // 机构
    orgs: new (Backbone.Model.extend({
        url: mscxPage.host + '/mscx-dict-api/org/getOrganization.do'
    }))
}

require('./search.css');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'common',
    events: {
        'click .sl-e-more': 'toggleMore'
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.filterMaps = _.pick(Models, this.model.options);
        var queue = [];

        this.on('render', this.render);

        _.each(this.filterMaps, function(item) {
            queue.push(item.fetch());
        })
        
        $.when.apply($, queue).done(function() {
            this.trigger('render', this.filterMaps);
        }.bind(this))

        return this;
    },
    render: function() {
        var model = this.model.toJSON ? this.model.toJSON() : this.model;
        _.extend(model, this.filterMaps);

        // 处理一下model中的标签
        model.tags = model.dataTags || model.toolTags || model.modelTags || model.openDataTags || model.serviceTags;
        // 处理一下model中的分类
        model.category = model.dataCategory || model.modelCategory || model.toolCategory;

        this.$el.html(this.template(model));
    },
    toggleMore: function(event) {
        var $target = this.$(event.currentTarget);
        if($target.hasClass('down')){
            $target.html('收起>>').removeClass('down').parent().siblings('.sl-value').find('.J_List').css({'height':'auto'});
        }else{
            $target.html('更多>>').addClass('down').parent().siblings('.sl-value').find('.J_List').css({'height':'40px'});
        }            
    }
});

module.exports = view;