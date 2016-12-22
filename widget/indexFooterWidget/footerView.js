/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./footer.html');
var float = require('../floatWidget/floatView.js');
require('./footer.css');

var footerView = Backbone.View.extend({
    el: mscxPage.domEl.footerEl,
    events: {
        'blur .info-line input':'changeAttribute'

    },
    initialize: function() {
        this.$el.html(template);
        new float();
    }
});

module.exports = footerView;