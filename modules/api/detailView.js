'use strict';

var template = require('html!./detailTemplate.html')
require('./api.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    template: _.template(template),
    events: {
        'click .tab span': 'selectTab',
        'click #applyBtn': 'apply',
        'click #followBtn': 'follow'
    },
    initialize: function() {
        this.$el.addClass('grid960');

        this.$el.html(this.template());

        this.$tabContent = this.$('.tabConsInfo');
        this.$tabWrap = this.$('.tabCons');

        // 默认选中第一个
        this.$('.tab span').eq(0).click();

        return this;
    },
    selectTab: function(event) {
        this.$tabWrap.addClass('opacity0');
        var $target = this.$(event.currentTarget);
        var index = $target.data('index');

        $target.parent().find('.active').removeClass('active');
        $target.addClass('active');

        this.$tabContent.hide().eq(index).show();

        this.$tabWrap.removeClass('opacity0');
    },
    apply: function() {
        
    },
    follow: function() {
        
    }
});

module.exports = view;