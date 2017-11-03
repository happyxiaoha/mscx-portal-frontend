/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('./leftSide.html');
require('./leftSide.css');

var mainView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterLeft,
    events: {
    },
    initialize: function(name) {
        var sName = name || '';
        this.$el.addClass('bod').html(_.template(template)({
            name: sName
        }));
    }
});

module.exports = mainView;