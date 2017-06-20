/**
 * Created by Administrator on 2016/12/12.
 */

require('less/base.less');
require('register/register.less');
require('js/ajaxBackboneManger.js');

var header = require('register/headerView.js');

var router = require('register/router.js');

$(function() {
    new header();
    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
});