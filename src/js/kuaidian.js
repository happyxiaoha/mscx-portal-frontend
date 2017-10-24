/**
 * ================================================
 * 作    者：Hope Chen
 * 版    本：1.0
 * 创建日期：2017/10/18 10:02
 * 描    述：云点餐业务
 * 修订历史：
 * ================================================
 */
require('less/base.less');
var header = require('headerWidget/headerView.js');
var router = require('kuaidian/router.js');

$(function() {
    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function() {
        $('html,body').animate({ scrollTop: '0' }, 100);
    });
    Backbone.history.stop();
    Backbone.history.start();
});