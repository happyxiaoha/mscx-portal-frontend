/**
 * ================================================
 * 作    者：Hope Chen
 * 版    本：1.0
 * 创建日期：2017/11/7 16:40
 * 描    述：
 * 修订历史：
 * ================================================
 */
require('js/ajaxBackboneManger.js');
require('kuaidian/kuaidian.css');
require('lib/cityPicker/css/city-picker.css');
require('citypicker');

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var router = require('kuaidian/router.js');

$(function() {
    var headerView = new header({
        id: 'kuaidianSettled'
    });
    new footer();

    headerView.addDidRender(function() {
        mscxPage.appRouter = new router();
        Backbone.history.stop();
        Backbone.history.start();
    });
});