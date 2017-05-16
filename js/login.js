/**
 * Created by Administrator on 2016/12/12.
 */

var header = require('../modules/login/loginHeaderView.js');

var router = require('../modules/login/router.js');

require('less/base.less');
require('login/login.less');

$(function() {
    new header({
        id: '登录'
    });
    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
});