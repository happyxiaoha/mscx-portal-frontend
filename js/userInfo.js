/**
 * Created by Kevin on 2016/12/7.
 */

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var router = require('userInfo/router.js');

$(function() {
    new header();
    new footer();

    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
});