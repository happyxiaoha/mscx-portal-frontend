/**
 * Created by Administrator on 2016/12/12.
 */

var header = require('../widget/headerWidget/headerView.js');
var footer = require('../widget/footerWidget/footerView.js');

var router = require('../modules/services/router.js');
require('../modules/services/services.css');

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