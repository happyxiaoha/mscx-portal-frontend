/**
 * Created by Administrator on 2016/12/12.
 */

var header = require('../widget/headerWidget/headerView.js');
var footer = require('../widget/footerWidget/footerView.js');
require('../css/base.css');

var router = require('../modules/sources/router.js');
require('../modules/sources/openData.css');

$(function() {
    new header({
        id: 'source'
    });
    new footer();
    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
});