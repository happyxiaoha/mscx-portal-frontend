'use strict';

var template = require('html!./search.html');
var tagTemplate = require('html!./tagTemplate.html');
var scopeTemplate = require('html!./scopeTemplate.html');
var Resource = require('./city.json');

var Models = {
    // 对象
    objects: new (Backbone.Model.extend({
        url: mscxPage.request.dict + 'dict/getServiceObject.do'
    })),
    // 范围
    rage: new (Backbone.Model.extend({
        url: ''
    })),
    // 数据API分类
    dataCategory: new (Backbone.Model.extend({
        url: mscxPage.request.dict + 'category/getDataApiCategory.do'
    })),
    // 模型API分类
    modelCategory: new (Backbone.Model.extend({
        url: mscxPage.request.dict + 'category/getModelApiCategory.do'
    })),
    // 工具API分类
    toolCategory: new (Backbone.Model.extend({
        url: mscxPage.request.dict + 'category/getToolApiCategory.do'
    })),
    // 开放数据分类
    openDataCategory: new (Backbone.Model.extend({
        url: mscxPage.request.dict + 'category/getOpenDataCategory.do'
    })),
    // 微服务分类
    serviceCategory: new (Backbone.Model.extend({
        url: mscxPage.request.dict + 'category/getServiceCategory.do'
    })),
    // 数据API标签
    dataTags: new (Backbone.Model.extend({
        url: mscxPage.request.dict + 'tags/getDataApiTags.do'
    })),
    // 工具API标签
    toolTags: new (Backbone.Model.extend({
        url: mscxPage.request.dict + 'tags/getToolApiTags.do'
    })),
    // 模型API标签
    modelTags: new (Backbone.Model.extend({
        url: mscxPage.request.dict + 'tags/getModelApiTags.do'
    })),
    // 开放数据标签
    openDataTags: new (Backbone.Model.extend({
        url: mscxPage.request.dict + 'tags/getOpenDataTags.do'
    })),
    // 微服务标签
    serviceTags: new (Backbone.Model.extend({
        url: mscxPage.request.dict + 'tags/getServiceTags.do'
    })),
    // 标签详情 根据categoryId获取
    detailTags: new (Backbone.Model.extend({
        url: mscxPage.request.dict + 'tags/getTagsInfo.do'
    })),
    // 收费类型
    chargeWay: new (Backbone.Model.extend({
        url: mscxPage.request.dict + 'dict/getChargeWays.do'
    })),
    // 机构
    orgs: new (Backbone.Model.extend({
        url: mscxPage.request.dict + 'org/getOrganization.do'
    }))
}

require('./search.css');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'animate-content search-loading',
    events: {
        'click .sl-e-more': 'toggleMore',
        'click li a': 'selectOption',
        'click input[type="checkbox"]': 'handleCheckbox',
        'click .search-btn': 'handleQueryStr',
        'keydown .search-input': 'pressEnterSearch',
        'change #provinceSel': 'changeProvinces',
        'change #citySel': 'changeCities',
        'change #areaSel': 'changeAreas'
    },
    template: _.template(template, {variable: 'data'}),
    tagTemplate: _.template(tagTemplate, {variable: 'data'}),
    scopeTemplate: _.template(scopeTemplate, {variable: 'data'}),
    initialize: function() {
        this.filterMaps = _.pick(Models, this.model.options);

        // 标签详情 根据categoryId获取
        this.detailTags = Models.detailTags;

        this.listenTo(this.detailTags, 'sync', this.renderDetailTags);
        this.listenTo(Models.dataTags, 'sync', this.renderDetailTags);
        this.listenTo(Models.toolTags, 'sync', this.renderDetailTags);
        this.listenTo(Models.modelTags, 'sync', this.renderDetailTags);
        this.listenTo(Models.openDataTags, 'sync', this.renderDetailTags);
        this.listenTo(Models.serviceTags, 'sync', this.renderDetailTags);

        this.searchParams = new Backbone.Model();

        this.listenTo(this.searchParams, 'change', this.searchData);

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
        this.searchParamSilent = {silent: true};
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

        // 如果带地区查询条件，需要默认选中相应的省市区联动
        if(model.defaults && model.defaults.scope) {
            model.defaults.defaultCity = this.getDefaultCity(model.defaults.scope);
        }
        _.extend(params.defaults, model.defaults);

        this.$el.html(this.template(params));
        // 省市区联动
        this.$provinceSel = this.$('#provinceSel');
        this.$citySel = this.$('#citySel');
        this.$areaSel = this.$('#areaSel');

        this.$provinceSel.append(this.scopeTemplate(Resource.provinces));

        var defaultProvince = this.$provinceSel.data('default');

        if(defaultProvince) {
            this.$provinceSel.val(defaultProvince).trigger('change');
        }

        // 如果自带默认查询条件
        if(model.defaults) {
            this.searchParams.set(_.pick(model.defaults, ['keyword', 'scope', 'chargeType', 'orderBy', 'categoryId', 'tagId', 'orgId']), {silent: true});
            
            model.defaults.orderBy && this.delegate.$el.find('.sort a').removeClass('active').filter('[data-type="' + model.defaults.orderBy + '"]').addClass('active');
            model.defaults.categoryId && this.fetchTags();
        }
        
        // param准备阶段结束
        this.searchParamSilent.silent = false;
        // 默认触发查询
        this.searchData();
    },
    toggleMore: function(event) {
        var $target = this.$(event.currentTarget);
        if($target.hasClass('down')){
            $target.html('收起>>').removeClass('down').parent().siblings('.sl-value').find('.J_List').scrollTop(0).toggleClass('expand');
        }else{
            $target.html('更多>>').addClass('down').parent().siblings('.sl-value').find('.J_List').scrollTop(0).toggleClass('expand');
        }            
    },
    selectOption: function(event) {
        var $target = this.$(event.currentTarget);
        var type = $target.data('type');
        var param = {};

        $target.parents('ul').find('.active').removeClass('active');
        $target.parent().toggleClass('active');

        // 如果选中的是分类，则获取该分类下的标签明细, 然后做查询操作
        if(type == 'categoryId') {
            this.searchParams.set({
                page: 1,
                categoryId: $target.data('categoryid'),
                tagId: ''
            })
            this.fetchTags();
        }else {
            param.page = 1;
            param[type] = type && $target.data(type.toLowerCase()) || '';

            this.searchParams.set(param);
        }
    },
    searchData: function() {
        this.queryAPI = this.delegate[this.id + 'API'];
        this.queryAPI.fetch({
            data: this.searchParams.toJSON()
        });
    },
    fetchTags: function() {
        // 具体某个分类下的标签
        if(this.searchParams.get('categoryId')) {
            this.detailTags.fetch({
                data: {
                    categoryId: this.searchParams.get('categoryId')
                }
            })
        }else {
            // 不限 所有分类的标签
            Models[this.id + 'Tags'].fetch({data: {}});
        }
    },
    renderDetailTags: function(model) {
        this.$('.tag-ul').html(this.tagTemplate(model.toJSON()));

        var $moreWrap = this.$('.tag-wrap .sl-ext');
        // 处理 更多 按钮是否出现
        if(model.toJSON().result.length > 5) {
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
            this.searchParams.set({
                page: 1,
                serviceObject: params.join(',')
            });
        }else if(type == 'chargeType') {
            this.searchParams.set({
                page: 1,
                chargeType: params.length > 1 ? '' : params[0]
            });
        }
    },
    handleQueryStr: function() {
        var searchText = $.trim(this.$('.search-input').val());

        this.searchParams.set({
            page: 1,
            keyword: searchText
        });
    },
    handlePageJump: function(params) {
        this.searchParams.set({
            page: params.page || 0,
            pageSize: params.pageSize || 20
        })
    },
    handleSort: function(params) {
        _.extend(params, {
            page: 1
        })
        this.searchParams.set(params);
    },
    pressEnterSearch: function(event) {
        if(event.keyCode == 13) {
            this.handleQueryStr();
        }
    },
    changeProvinces: function(event) {
        var code = this.$provinceSel.val();
        var defaultCity = this.$citySel.data('default');

        this.$provinceSel.attr('title', this.$provinceSel.find('option:selected').text());

        this.province = _.find(Resource.provinces, function(item) {
            return item.code == code;
        });

        this.$citySel.html(this.scopeTemplate(this.province && this.province.cities || []));
        this.$areaSel.html(this.scopeTemplate([]));

        if(defaultCity) {
            this.$citySel.val(defaultCity).data('default', '').trigger('change');
        }

        this.searchParams.set({
            page: 1,
            scope: code == 0 ? '' : this.$provinceSel.find(':selected').text()
        }, this.searchParamSilent);
    },
    changeCities: function(event) {
        var code = this.$citySel.val();

        this.$citySel.attr('title', this.$citySel.find('option:selected').text());

        this.city = _.find(this.province.cities, function(item) {
            return item.code == code;
        });

        this.$areaSel.html(this.scopeTemplate(this.city && this.city.areas || []));

        this.searchParams.set({
            page: 1,
            scope: code == 0 ? this.$provinceSel.find(':selected').text() : this.$citySel.find(':selected').text()
        }, this.searchParamSilent);
    },
    changeAreas: function(event) {
        var code = this.$areaSel.val();

        this.$areaSel.attr('title', this.$areaSel.find('option:selected').text());

        this.searchParams.set({
            page: 1,
            scope: code == 0 ? this.$citySel.find(':selected').text() : this.$areaSel.find(':selected').text()
        });
    },
    getDefaultCity: function(scope) {
        var city, province;

        for(var m = 0, n = Resource.provinces.length; m < n; m++) {
            province = Resource.provinces[m];

            for(var i = 0, l = province.cities.length; i < l; i++) {
                city = province.cities[i];

                if(city.name.indexOf(scope) > -1) {
                    return {
                        province: province,
                        city: city
                    }
                }
            }
        }
    }
});

module.exports = view;