/**
 * Created by Administrator on 2016/12/12.
 */

var header = require('../widget/headerWidget/headerView.js');
var footer = require('../widget/footerWidget/footerView.js');
var subHeader = require('subHeaderWidget/headerView.js');
var router = require('../modules/sources/router.js');

var menuList = [
    {
        name: '数据报告',
        key: 'sources',
        url: 'sources.html'
    },
    {
        name: 'API',
        key: 'api',
        url: 'api.html'
    },
    {
        name: '微服务',
        key: 'services',
        url: 'services.html'
    },
    {
        name: 'SaaS应用',
        key: 'saas',
        url: 'saas.html'
    }
];

$(function() {
    var headerView = new header({
        id: 'sources'
    });
    new footer();
    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function(res) {
        $('html,body').animate({ scrollTop: '0' }, 100);

        var subHeaderView = mscxPage.views['subHeaderView'];
        subHeaderView && subHeaderView.remove();

        if(res == 'dataView' && !location.search) {
            subHeaderView = new subHeader({
                id: 'sources',
                model: {
                    menuList: menuList
                }
            });
            mscxPage.views['subHeaderView'] = subHeaderView;
            
            headerView.$el.after(subHeaderView.$el);
        }

        if(location.search){
            this.detailView(location.search.split('?')[1].split('\/')[1]);
        }
    })
    Backbone.history.stop();
    Backbone.history.start();
});