/**
 * Created by Kevin on 2016/12/7.
 */
require('less/base.less');
require('css/datePicker/daterangepicker-bs3.css');
require('js/ajaxBackboneManger.js');

window.moment = require('moment');
require('daterangepicker');

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');

var router = require('userInfo/router.js');
var userCenterLeft = require('userInfo/leftSide/leftSideView.js');

$(function() {
    new header();
    new footer();
    mscxPage.userCenter = {leftView: new userCenterLeft()};
    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
    $(mscxPage.domEl.userCenterLeft).data('isLogin',1);
});