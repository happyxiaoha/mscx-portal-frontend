'use strict';
require('./tagItem.css');
var template = require('html!./tagItem.html');
var innerTemplate = require('html!./tagItemInner.html');
var view = Backbone.View.extend({
    events: {
        'input #tagFilter': 'filterTagRes',
        'click .filter-a a': 'toTag',
        'click #addTag': 'addTag'
    },
    tagName: 'div',
    className: 'tag-list-area',
    template: _.template(template),
    initialize: function() {
        //var filterArea = '<div class="filter-area"><input type="text" id="tagFilter"/> </div><ul class="provider-list">';
        this.model['filterVal'] = '';
        this.$el.html(this.template(this.model));
        // this.$('#tagFilter').on('change', this.filterTagRes);
    },
    submit: function() {
        var $target = this.$('input[type="checkbox"]:checked'),
            tagId = '',
            tagName = '';

        $target.each(function(i, item) {
            var $item = $(item);
            tagId += $item.val() + ',';
            tagName += $item.data('name') + ',';
        });

        tagId = tagId.indexOf(',') > -1 ? tagId.slice(0, -1) : tagId;
        tagName = tagName.indexOf(',') > -1 ? tagName.slice(0, -1) : tagName;

        this.delegate.tags.set({
            tagId: tagId,
            tagName: tagName
        });

        layer.close(this.delegate.layer);
    },
    filterTagRes: function (e) {
        var $this = $(e.target),
            sVal = $.trim($this.val());
        var tagTemplate = _.template(innerTemplate);
        this.model['filterVal'] = sVal;
        this.model.filterResult = (sVal == '' ? this.model.tagList : _.filter(this.model.tagList, function(tagitem){
            return tagitem.name.toLocaleUpperCase().indexOf(sVal.toLocaleUpperCase()) >= 0
        }))
        this.$el.find('.provider-list').html(tagTemplate(this.model));
    },
    toTag: function (e) {
        var $this = $(e.target),
            sVal = $.trim($this.html());
        if($('.tagPinyin'+sVal)[0]){
            var iTop = $('.tagPinyin'+sVal).first().parent().position().top;
            $('.layui-layer-content').stop().animate({'scrollTop':(iTop-10)});
        }
        return false;
    },
    addTag: function() {

    }
});

module.exports = view;