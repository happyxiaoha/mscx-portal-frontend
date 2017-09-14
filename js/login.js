/**
 * Created by Administrator on 2016/12/12.
 */
require('./mockData.js');
var header = require('../modules/login/loginHeaderView.js');
require('../css/base.css');

var router = require('../modules/login/router.js');
require('../modules/login/login.css');

$(function() {
    new header({
        id: '登录'
    });
    mscxPage.appRouter = new router();
    Backbone.history.stop();
    Backbone.history.start();
});