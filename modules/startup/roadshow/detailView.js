'use strict';

var template = require('html!./detailTemplate.html');

var detailModel = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/getRoadInfoByRoadId.do'
});

var view = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    events: {
        'click .nav-tabs a': 'selectTab',
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.model = new detailModel();

        this.listenTo(this.model, 'sync', this.render);

        this.model.fetch({
            data: {
                roadId: this.id
            }
        });

        return this;
    },
    render: function () {
        this.nJson = this.model.toJSON().result;

        this.$el.html(this.template( this.nJson ));

        this.$tabContent = this.$('.tab-pane');
        this.$tabWrap = this.$('.tab-content');
    },
    selectTab: function(event) {
        event.preventDefault();
        this.$tabWrap.addClass('fade');
        var $target = this.$(event.currentTarget);
        var index = $target.data('index');

        $target.parents('.nav-tabs').find('.active').removeClass('active');
        $target.parent().addClass('active');

        this.$tabContent.hide().eq(index).show();

        this.$tabWrap.removeClass('fade');
    },
});

module.exports = view;