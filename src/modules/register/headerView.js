/**
 * Created by Administrator on 2016/12/15.
 */

var loginHeaderTemplate = require('./header.html');

var loginHeaderView = Backbone.View.extend({
    el: '.header',
    template: _.template(loginHeaderTemplate, {variable: 'data'}),
    events: {

    },
    initialize: function () {
        this.$el.html(this.template({'data': this.id}));
    }
});
module.exports = loginHeaderView;