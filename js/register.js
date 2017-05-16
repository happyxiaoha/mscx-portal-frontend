/**
 * Created by Administrator on 2016/12/12.
 */

var header = require('register/headerView.js');

var router = require('register/router.js');
require('less/base.less');
require('register/register.less');

$(function() {
    new header();
    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
});