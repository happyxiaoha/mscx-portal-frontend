/**
 * Created by Kevin on 2016/12/15.
 */

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');

var router = require('demand/router.js');

$(function() {
    new header({
        id: 'demand'
    });
    new footer();
    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
});