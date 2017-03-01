var template = require('html!./header.html');

var headerView = Backbone.View.extend({
    tag: 'div',
    className: 'ns-nav',
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template({
            id: this.id,
            menuList: this.model.menuList
        }));
    }
});

module.exports = headerView;