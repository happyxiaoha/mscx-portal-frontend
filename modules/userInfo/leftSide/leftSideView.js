/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./leftSide.html');
require('./leftSide.css');

var mainView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    events: {
        'blur .info-line input':'changeAttribute'

    },
    initialize: function() {
        this.$el.html(template);
    }
});

module.exports = mainView;