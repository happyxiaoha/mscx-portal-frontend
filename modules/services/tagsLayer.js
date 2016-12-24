'use strict';

var template = require('html!./tagsLayerTemplate.html');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'tag-list-area',
    template: _.template(template, {variable: 'data'}),
    events: {
        'click .provider-list li': 'chooseTag'
    },
    initialize: function() {
        this.$el.html(this.template(this.model));
    },
    chooseTag: function(event) {
        var $target = this.$(event.currentTarget);

        this.delegate.tags.set({
            tagId: $target.data('id'),
            tagName: $target.text()
        });
        
        layer.close(this.delegate.layer);
    }
});

module.exports = view;