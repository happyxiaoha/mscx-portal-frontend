/**
 * Created by Kevin on 2016/12/7.
 */

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var router = require('api/router.js');

require('less/base.less');
require('api/api.less');

$(function() {
    new header({
        id: 'api'
    });
    new footer();

    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function() {
        $('html,body').animate({ scrollTop: '0' }, 100);

        if(location.search){
            this.detail(location.search.split('?')[1].split('\/')[1]);
        }
    })
    Backbone.history.stop();
    //Backbone.history.start({pushState: true,root: '/api/'});
    Backbone.history.start();
});