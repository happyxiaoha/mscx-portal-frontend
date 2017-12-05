/**
 * ================================================
 * 作    者：Hope Chen
 * 版    本：1.0
 * 创建日期：2017/12/5 11:01
 * 描    述：双创园地
 * 修订历史：
 * ================================================
 */
require('less/base.less');
require('js/ajaxBackboneManger.js');

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var router = require('pioneering/router.js');

$(function () {
    new header({
        id: 'pioneering'
    });
    new footer();

    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function () {
        $('html,body').animate({scrollTop: '0'}, 100);

        if (location.search) {
            this.newsDetailView(location.search.split('?')[1]);
        }
    });
    Backbone.history.stop();
    Backbone.history.start();
});