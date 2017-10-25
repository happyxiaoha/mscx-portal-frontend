/**
 * Created by yangzhenj on 2017/10/18.
 */
var header = require('../widget/headerWidget/headerView.js');
var footer = require('../widget/indexFooterWidget/footerView.js');
var router = require('../modules/newThreeServices/router.js');
require('../css/base.css');

$(function() {
    new header({
        id: 'sources'
    });
    new footer();
    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function() {
       /* $('html,body').animate({ scrollTop: '0' }, 100);*/

        if(location.search){
            this.openDataDetailView(location.search.split('?')[1].split('\/')[1]);
        }
    })
    Backbone.history.stop();
    Backbone.history.start();
});