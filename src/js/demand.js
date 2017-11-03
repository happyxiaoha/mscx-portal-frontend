/**
 * Created by Kevin on 2016/12/15.
 */
require('less/base.less');
require('css/datePicker/daterangepicker-bs3.css');
require('js/ajaxBackboneManger.js');

window.moment = require('moment');
require('daterangepicker');

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');

var router = require('demand/router.js');

$(function() {
    var headerView = new header({
        id: 'demand'
    });
    new footer();

    headerView.addDidRender(function() {
        mscxPage.appRouter = new router();

        mscxPage.appRouter.on('route', function(res) {
            $('html,body').animate({ scrollTop: '0' }, 100);
        })
        Backbone.history.stop();
        Backbone.history.start();
    })

});