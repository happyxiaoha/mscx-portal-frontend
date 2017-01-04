/**
 * Created by Kevin on 2016/12/7.
 */

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var router = require('api/router.js');

$(function() {
    new header({
        id: 'api'
    });
    new footer();

    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function() {
        $('html,body').animate({ scrollTop: '0' }, 100);

        if(location.search){
            mscxPage.views['dataAPIObj'] && mscxPage.views['dataAPIObj'].remove();
            this.detail(location.search.split('?')[1].split('\/')[1]);
        }
    })
    Backbone.history.stop();
    Backbone.history.start();
});