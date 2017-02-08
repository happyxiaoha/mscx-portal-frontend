'use strict';

var template = require('html!./tagsLayerTemplate.html');

var view = Backbone.View.extend({
    events: {
        'keyup #tagFilter': 'filterTagRes'
    },
    tagName: 'div',
    className: 'tag-list-area',
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        var filterArea = '<div class="filter-area"><input type="text" id="tagFilter"/> </div><ul class="provider-list">';
        this.model['filterVal'] = '';
        this.$el.html(filterArea + this.template(this.model)+'</ul>');
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
        this.model['filterVal'] = sVal;
        this.$el.find('.provider-list').html(this.template(this.model));
    }
});

module.exports = view;