/**
 * Created by Kevin on 2016/12/6.
 */
var recommendBarTemplate = require('html!./recommendBar.html');

var recommendBarView = Backbone.View.extend({
    template: _.template(recommendBarTemplate),
    events: {
    },
    initialize: function(obj) {
        this.$el.html(this.template({'dataList': this.model,'type': obj.type}));
    }
});

module.exports = recommendBarView;
