/**
 * Created by Administrator on 2016/12/12.
 */
require('less/base.less');
require('login/login.css');
require('js/ajaxBackboneManger.js');

var header = require('login/loginHeaderView.js');
var router = require('login/router.js');

$(function() {
    new header({
        id: '登录'
    });
    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
});