/**
 * Created by Administrator on 2016/12/12.
 */
require('less/base.less');
require('recharge/recharge.less');

var header = require('widget/headerWidget/headerView.js');
var footer = require('widget/footerWidget/footerView.js');
var router = require('modules/recharge/router.js');

$(function() {
    new header({
        id: 'recharge'
    });
    new footer();
    mscxPage.appRouter = new router();
    
    Backbone.history.stop();
    Backbone.history.start();
});