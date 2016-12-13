/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./userInfoDefault.html');
require('./userInfoDefault.css');

var mainView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'blur .info-line input':'changeAttribute'

    },
    initialize: function() {
        this.$el.html(template);
    }
});

module.exports = mainView;