/**
 * Created by Administrator on 2016/12/12.
 */

require('less/base.less');
require('services/services.less');
require('js/ajaxBackboneManger.js');
require('css/datePicker/daterangepicker-bs3.css');

window.moment = require('moment');
require('daterangepicker');

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');

var router = require('services/router.js');

$(function() {
    var headerView = new header({
        id: 'service'
    });
    new footer();

    headerView.addDidRender(function() {
        mscxPage.appRouter = new router();

        mscxPage.appRouter.on('route', function(res) {
            $('html,body').animate({ scrollTop: '0' }, 100);
            
            if(location.search){
                this.detailView(location.search.split('?')[1].split('\/')[1]);
            }
        })
        Backbone.history.stop();
        Backbone.history.start();
    })
});