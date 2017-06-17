/**
 * Created by Administrator on 2016/12/12.
 */

require('less/base.less');
require('sources/openData.less');
require('js/ajaxBackboneManger.js');

var header = require('../widget/headerWidget/headerView.js');
var footer = require('../widget/footerWidget/footerView.js');
var router = require('../modules/sources/router.js');


$(function() {
    new header({
        id: 'sources'
    });
    new footer();
    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function() {
        $('html,body').animate({ scrollTop: '0' }, 100);

        if(location.search){
            this.openDataDetailView(location.search.split('?')[1].split('\/')[1]);
        }
    })
    Backbone.history.stop();
    Backbone.history.start();
});