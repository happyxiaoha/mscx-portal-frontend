/**
 * Created by Administrator on 2016/12/12.
 */

require('less/base.less');
require('register/register.css');
require('js/ajaxBackboneManger.js');

var header = require('modules/register/headerView.js');
var router = require('modules/register/router.js');

$(function() {
    new header();
    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
});