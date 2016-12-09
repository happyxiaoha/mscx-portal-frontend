/**
 * Created by Kevin on 2016/12/6.
 */
var recommendTemplate = require('html!./recommend.html');

var recommendView = Backbone.View.extend({
    template: _.template(recommendTemplate),
    events: {
    },
    initialize: function(obj) {
        this.$el.html(this.template({'dataList': this.model,'type': obj.type}));
    }
});

module.exports = recommendView;
