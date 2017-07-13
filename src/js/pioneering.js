/**
 * Created by Kevin on 2016/12/7.
 */
require('less/base.less');
require('css/main.css');
require('js/ajaxBackboneManger.js');

var header = require('headerWidget/headerView.js');
var footer = require('footerWidget/footerView.js');
var subHeader = require('subHeaderWidget/headerView.js');
var router = require('pioneering/router.js');

var menuList = [
    // {
    //     name: 'API开发环境',
    //     key: 'apiEnv',
    //     url: '#apiEnv'
    // },
    {
        name: '实验室',
        key: 'serverEnv',
        url: '#serverEnv'
    },
    {
        name: '知识库',
        key: 'dataVisiual',
        url: '#dataVisiual'
    },
    {
        name: '专家',
        key: 'bigData',
        url: '#bigData'
    },
    {
        name: 'API',
        key: 'api',
        url: '#api'
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
            case 'dataVisiualView':
                id = 'dataVisiual';
                break;
            case 'bigDataView':
                id = 'bigData';
                break;
            case 'apiView':
                id = 'api';
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
    })
    Backbone.history.stop();
    Backbone.history.start();
});