/**
 * Created by Kevin on 2016/12/7.
 */

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var subHeader = require('subHeaderWidget/headerView.js');
var router = require('pioneering/router.js');

var menuList = [
    {
        name: 'API开发环境',
        key: 'apiEnv',
        url: '#apiEnv'
    },
    {
        name: '服务开发环境',
        key: 'serverEnv',
        url: '#serverEnv'
    }
];

$(function() {
    var headerView = new header({
        id: 'pioneering'
    });
    new footer();

    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function(res) {
        $('html,body').animate({ scrollTop: '0' }, 100);

        var subHeaderView = mscxPage.views['subHeaderView'];
        var id;
        subHeaderView && subHeaderView.remove();
        switch (res) {
            case 'apiEnvView':
                id = 'apiEnv';
                break;
            case 'serverEnvView':
                id = 'serverEnv';
                break;
            default:
                break;
        }

        if(id && !location.search) {
            subHeaderView = new subHeader({
                id: id,
                model: {
                    menuList: menuList
                }
            });
            mscxPage.views['subHeaderView'] = subHeaderView;

            headerView.$el.after(subHeaderView.$el);
        }

        if(location.search){
            this.newsDetailView(location.search.split('?')[1]);
        }
    });
    Backbone.history.stop();
    Backbone.history.start();
});