'use strict';

var template = require('html!./itemTemplate.html');

var resource = {
    stages: [
        {
            id: 1,
            name: '概念阶段'
        },{
            id: 2,
            name: '研发阶段'
        },{
            id: 3,
            name: '已发布'
        },{
            id: 4,
            name: '已盈利'
        }
    ]
}

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'ns-list-item',
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.model.projectStage = _.find(resource.stages, function(item) {
            return item.id == this.model.projectStage
        }.bind(this)).name;
        this.$el.html(this.template(this.model));
        return this;
    }
});

module.exports = view;