/**
 * Created by Administrator on 2016/12/12.
 */
require('less/base.less');
require('sources/openData.css');
require('js/ajaxBackboneManger.js');

window.moment = require('moment');
require('daterangepicker');

var header = require('widget/headerWidget/headerView.js');
var footer = require('widget/footerWidget/footerView.js');
var router = require('modules/sources/router.js');

$(function() {
    var headerView = new header({
        id: 'sources'
    });
    new footer();

    headerView.addDidRender(function() {
        mscxPage.appRouter = new router();
        mscxPage.appRouter.on('route', function(routeName, x) {
            $('html,body').animate({ scrollTop: '0' }, 100);
            
            if(location.search){
                var param = location.search.split('?')[1].split('\/')[2];
                if(location.search.indexOf('data/detail') > -1) {
                    this.openDataDetailView(param);
                }else if(location.search.indexOf('api/detail') > -1) {
                    this.apiDetailView(param);
                }else if(location.search.indexOf('saas/detail') > -1) {
                    this.saasDetailView(param);
                }else if(location.search.indexOf('service/detail') > -1) {
                    this.serviceDetailView(param);
                }
            }
        })
        
        Backbone.history.stop();
        Backbone.history.start();
    })
    
});