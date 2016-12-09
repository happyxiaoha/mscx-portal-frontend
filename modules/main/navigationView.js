/**
 * Created by Kevin on 2016/12/6.
 */
var navigationTemplate = require('html!./navigation.html');

var navigationView = Backbone.View.extend({
    template: _.template(navigationTemplate),
    events: {
    },
    initialize: function(obj) {
        this.$el.html(this.template({'dataList': this.model,'type': obj.type}));
    }
});

module.exports = navigationView;
