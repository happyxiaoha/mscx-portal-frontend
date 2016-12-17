/**
 * Created by Administrator on 2016/12/12.
 */

var header = require('../modules/register/headerView.js');
require('../css/base.css');

var router = require('../modules/register/router.js');
require('../modules/register/register.css');

$(function() {
    new header();
    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
});