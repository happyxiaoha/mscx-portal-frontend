'use strict';

var template = require('./tagsLayerTemplate.html');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'tag-list-area',
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template(this.model));
    },
    submit: function() {
        var $target = this.$('input[type="checkbox"]:checked'),
            tagId = '',
            tagName = '';

        $target.each(function(i, item) {
            var $item = $(item);
            tagId += $item.val() + ',';
            tagName += $item.data('name') + ',';
        })

        tagId = tagId.indexOf(',') > -1 ? tagId.slice(0, -1) : tagId;
        tagName = tagName.indexOf(',') > -1 ? tagName.slice(0, -1) : tagName;

        this.delegate.tags.set({
            tagId: tagId,
            tagName: tagName
        });
        
        layer.close(this.delegate.layer);
    }
});

module.exports = view;