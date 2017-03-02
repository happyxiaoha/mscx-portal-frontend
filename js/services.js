/**
 * Created by Administrator on 2016/12/12.
 */

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var subHeader = require('subHeaderWidget/headerView.js');
var router = require('services/router.js');
// require('../modules/services/services.css');

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
        id: 'service'
    });
    new footer();

    headerView.addDidRender(function() {
        mscxPage.appRouter = new router();

        mscxPage.appRouter.on('route', function(res) {
            $('html,body').animate({ scrollTop: '0' }, 100);
            
            var subHeaderView = mscxPage.views['subHeaderView'];
            subHeaderView && subHeaderView.remove();

            if(res == 'serviceView' && !location.search) {
                subHeaderView = new subHeader({
                    id: 'services',
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
    })
});