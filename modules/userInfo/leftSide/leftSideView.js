/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./leftSide.html');
require('./leftSide.css');

var mainView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterLeft,
    events: {
    },
    initialize: function(name) {
        console.log(name);
        var sName = name || '';
        console.log(_.template(template)({
            name: sName
        }));
        this.$el.addClass('bod').html(_.template(template)({
            name: sName
        }));
    }
});

module.exports = mainView;