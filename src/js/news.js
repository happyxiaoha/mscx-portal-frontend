/**
 * Created by Kevin on 2016/12/7.
 */
require('less/base.less');
require('js/ajaxBackboneManger.js');

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var router = require('news/router.js');

$(function() {
    new header({
        id: 'news'
    });
    new footer();

    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function() {
        $('html,body').animate({ scrollTop: '0' }, 100);

        if(location.search){
            this.newsDetailView(location.search.split('?')[1]);
        }
    });
    Backbone.history.stop();
    Backbone.history.start();
});