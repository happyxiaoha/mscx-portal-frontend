/**
 * Created by Kevin on 2016/12/6.
 */
var stemplate = require('html!./recharge.html');

var userView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {

    },
    initialize: function() {
        console.log("name:" + mscxPage.userInfo.account);
        var url = 'webapp/recharge_index.html?userName='+mscxPage.userInfo.account;
        // var url = 'webapp/recharge_index.html?userName=admin1';
        this.$el.html(_.template(stemplate)({sUrl:url}));
    }
});
module.exports = userView;