/**
 * Created by Kevin on 2016/12/6.
 */
var template = require('html!./recharge.html');

var userView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {

    },
    initialize: function() {
        this.$el.html(template);
    }
});
module.exports = userView;