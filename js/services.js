/**
 * Created by Administrator on 2016/12/12.
 */

var header = require('../widget/headerWidget/headerView.js');
var footer = require('../widget/footerWidget/footerView.js');

var router = require('../modules/services/router.js');
require('../modules/services/services.css');

$(function() {
    new header({
        id: 'service'
    });
    new footer();
    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function() {
        $('body').animate({ scrollTop: '0' }, 100)
    })
    Backbone.history.stop();
    Backbone.history.start();
});