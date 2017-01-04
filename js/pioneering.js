/**
 * Created by Kevin on 2016/12/7.
 */

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var router = require('pioneering/router.js');

$(function() {
    new header({
        id: 'pioneering'
    });
    new footer();

    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function() {
        $('html,body').animate({ scrollTop: '0' }, 100);

        if(location.search){
            this.newsDetailView(location.search.split('?')[1]);
        }
    })
    Backbone.history.stop();
    Backbone.history.start();
});