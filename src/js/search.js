/**
 * Created by Administrator on 2016/12/19.
 */

require('less/base.less');
require('search/search.less');

require('js/ajaxBackboneManger.js');

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');

var router = require('search/router.js');

$(function() {
    new header({
        id: ''
    });
    new footer();
    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
});