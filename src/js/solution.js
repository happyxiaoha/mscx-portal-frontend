require('less/base.less');
require('solution/solution.less');
require('js/ajaxBackboneManger.js');

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var router = require('solution/router.js');

$(function() {
    new header({
        id: 'solution'
    });
    new footer();

    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function() {
        $('html,body').animate({ scrollTop: '0' }, 100);

        if(location.search){
            this.solutionDetailView(location.search.split('?')[1]);
        }
    });
    Backbone.history.stop();
    Backbone.history.start();
});