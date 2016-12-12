/**
 * Created by Kevin on 2016/12/6.
 */
var template = require('html!./header.html');
require('./header.css');

var headerView = Backbone.View.extend({
    el: mscxPage.domEl.headerEl,
    template: _.template(template),
    events: {
        'blur .info-line input':'changeAttribute'
    },
    initialize: function() {
        this.$el.html(this.template({
            id: this.id || ''
        }));
    }
});

module.exports = headerView;