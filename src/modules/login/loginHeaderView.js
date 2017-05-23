/**
 * Created by Administrator on 2016/12/15.
 */
'use strict';
var loginHeaderTemplate = require('html!./loginHeader.html');

var loginHeaderView = Backbone.View.extend({
    el: '.header',
    template: _.template(loginHeaderTemplate),
    events: {

    },
    initialize: function () {
        this.$el.html(this.template({'data': this.id}));
    }
});
module.exports = loginHeaderView;