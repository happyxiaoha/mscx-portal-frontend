/**
 * Created by Administrator on 2016/12/12.
 */

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var router = require('services/router.js');
// require('../modules/services/services.css');

$(function() {
    new header({
        id: 'sources'
    });
    new footer();

    mscxPage.appRouter = new router();

    Backbone.history.stop();
    Backbone.history.start();
});