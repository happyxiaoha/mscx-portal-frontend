/**
 * Created by Kevin on 2016/12/7.
 */

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var subHeader = require('subHeaderWidget/headerView.js');
var router = require('startup/router.js');

var menuList = [
    {
        name: '创业辅导',
        key: 'coach',
        url: '#coach'
    },
    {
        name: '项目孵化',
        key: 'roadshow',
        url: '#roadshow'
    },
    {
        name: '活动',
        key: 'activity',
        url: '#activity'
    }
];

$(function() {
    var headerView = new header({
        id: 'startup'
    });
    new footer();

    mscxPage.appRouter = new router();
    mscxPage.appRouter.on('route', function(res) {
        $('html,body').animate({ scrollTop: '0' }, 100);

        var subHeaderView = mscxPage.views['subHeaderView'];
        var id;
        subHeaderView && subHeaderView.remove();
        switch (res) {
            case 'coachView':
                id = 'coach';
                break;
            case 'roadshowView':
                id = 'roadshow';
                break;
            case 'activityView':
                id = 'activity';
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

        if(location.search){
            this.detail(location.search.split('?')[1].split('\/')[1]);
        }
    })
    Backbone.history.stop();
    //Backbone.history.start({pushState: true,root: '/api/'});
    Backbone.history.start();
});