/**
 * Created by Administrator on 2016/12/12.
 */

var header = require('../widget/headerWidget/headerView.js');
var footer = require('../widget/footerWidget/footerView.js');

var router = require('../modules/sources/router.js');
require('../modules/sources/openData.css');

$(function() {
    new header({
        id: 'sources'
    });
    new footer();
    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
});