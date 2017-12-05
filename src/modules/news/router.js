/**
 * 新闻资讯router
 */
var Routes =  Backbone.Router.extend({
    routes: {
        '': 'newsView',
        'news': 'newsView',
        'news/detail/:url': 'newsDetailView',
        'news/list': 'newsListView'
    },
    newsView:function () {
        var view = require('news/newsView.js');
        mscxPage.views['newsViewObj'] = new view();
    },
    newsDetailView:function (url) {
        var view = require('news/newsDetailView.js');
        mscxPage.views['newsDetailView'] = new view({
            model: {
                url: url
            }
        });
    },
    newsListView:function () {
        var view = require('news/newsListView.js');
        mscxPage.views['newsListViewObj'] = new view();
    },
    openPage: function(url) {
        this.navigate(url,{trigger: true});
    },
    execute: function(callback,args,name) {
        if(mscxPage.views[name + 'Obj']) {
            mscxPage.views[name + 'Obj'].initialize();
        }
        else {
            if (callback) callback.apply(this, args);
        }
    }
});

module.exports = Routes;

