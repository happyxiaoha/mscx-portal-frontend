/**
 * Created by Administrator on 2016/12/19.
 */

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');

var router = require('search/router.js');

require('less/base.less');
require('search/search.less');

$(function() {
    new header({
        id: ''
    });
    new footer();
    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
});