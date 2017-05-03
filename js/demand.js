/**
 * Created by Kevin on 2016/12/15.
 */

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var subHeader = require('subHeaderWidget/headerView.js');

var router = require('demand/router.js');

var menuList = [
    {
        name: '数据供给需求',
        key: 'data',
        url: '#data'
    },
    // {
    //     name: 'API开发需求',
    //     key: 'api',
    //     url: '#api'
    // },
    {
        name: '服务开发需求',
        key: 'service',
        url: '#service'
    }
];

$(function() {
    var headerView = new header({
        id: 'demand'
    });
    new footer();

    headerView.addDidRender(function() {
        mscxPage.appRouter = new router();

        mscxPage.appRouter.on('route', function(res) {
            var subHeaderView = mscxPage.views['subHeaderView'];
            var id;
            subHeaderView && subHeaderView.remove();
            switch (res) {
                case 'dataDemandView':
                    id = 'data';
                    break;
                case 'apiDemandView':
                    id = 'api';
                    break;
                case 'serviceDemandView':
                    id = 'service';
                    break;
                default:
                    break;
            }

            if(id) {
                subHeaderView = new subHeader({
                    id: id,
                    model: {
                        menuList: menuList
                    }
                });
                mscxPage.views['subHeaderView'] = subHeaderView;
                
                headerView.$el.after(subHeaderView.$el);
            }
            
            $('html,body').animate({ scrollTop: '0' }, 100);
        })
        Backbone.history.stop();
        Backbone.history.start();
    })

});