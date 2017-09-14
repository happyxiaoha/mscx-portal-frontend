/**
 * Created by Administrator on 2016/12/19.
 */
require('./mockData.js');
var header = require('../widget/headerWidget/headerView.js');
var footer = require('../widget/footerWidget/footerView.js');

var router = require('../modules/search/router.js');
require('../modules/search/search.css');

$(function() {
    new header({
        id: ''
    });
    new footer();
    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
});