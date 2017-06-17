/**
 * Created by Kevin on 2016/12/15.
 */

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');

var router = require('demand/router.js');

require('less/base.less');
require('demand/demand.less');
require('css/datePicker/daterangepicker-bs3.css');

require('js/ajaxBackboneManger.js');
window.moment = require('moment');
require('daterangepicker');

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