/**
 * 创业园地router
 */
var Routes =  Backbone.Router.extend({
    routes: {
        '': 'newsView',
        'news': 'newsView',
        'news/detail/:url': 'newsDetailView',
        'news/list': 'newsListView',
        'apiEnv': 'apiEnvView',
        'serverEnv': 'serverEnvView',
        'coach': 'coachView'
    },
    newsView:function () {
        var view = require('pioneering/newsView.js');
        mscxPage.views['newsViewObj'] = new view();
    },
    newsDetailView:function (url) {
        var view = require('../news/newsDetailView.js');
        mscxPage.views['newsDetailView'] = new view({
            model: {
                url: url
            }
        });
    },
    newsListView:function () {
        var view = require('pioneering/newsListView.js');
        mscxPage.views['newsListViewObj'] = new view();
    },
    apiEnvView:function () {
        var view = require('pioneering/apiEnvView.js');
        mscxPage.views['apiEnvViewObj'] = new view();
    },
    serverEnvView:function () {
        var view = require('pioneering/serverEnvView.js');
        mscxPage.views['serverEnvViewObj'] = new view();
    },
    coachView: function() {
        var view = require('pioneering/coachView.js');
        mscxPage.views['coachViewObj'] = new view();
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

