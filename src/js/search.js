/**
 * Created by Administrator on 2016/12/19.
 */
require('less/base.less');
require('search/search.css');

var header = require('widget/headerWidget/headerView.js');
var footer = require('widget/footerWidget/footerView.js');

var router = require('modules/search/router.js');

$(function() {
    new header({
        id: ''
    });
    new footer();
    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
});