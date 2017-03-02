/**
 * Created by Kevin on 2016/12/7.
 */

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var subHeader = require('subHeaderWidget/headerView.js');
var router = require('api/router.js');

var menuList = [
    {
        name: '数据报告',
        key: 'sources',
        url: 'sources.html'
    },
    {
        name: '服务接口',
        key: 'api',
        url: 'api.html'
    },
    {
        name: '微服务',
        key: 'services',
        url: 'services.html'
    }
];

$(function() {
    var headerView = new header({
        id: 'api'
    });
    new footer();

    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function(res) {
        $('html,body').animate({ scrollTop: '0' }, 100);

        var subHeaderView = mscxPage.views['subHeaderView'];
        subHeaderView && subHeaderView.remove();

        if(res == 'indexAPI' && !location.search) {
            subHeaderView = new subHeader({
                id: 'api',
                model: {
                    menuList: menuList
                }
            });
            mscxPage.views['subHeaderView'] = subHeaderView;
            
            headerView.$el.after(subHeaderView.$el);
        }

        if(location.search){
            this.detail(location.search.split('?')[1].split('\/')[1]);
        }
    })
    Backbone.history.stop();
    //Backbone.history.start({pushState: true,root: '/api/'});
    Backbone.history.start();
});