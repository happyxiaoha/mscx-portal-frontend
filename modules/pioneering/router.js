/**
 * 创业园地router
 */
var Routes =  Backbone.Router.extend({
    routes: {
        '': 'apiEnvView',
        'apiEnv': 'apiEnvView',
        'serverEnv': 'serverEnvView',
        'dataVisiual': 'dataVisiualView',
        'bigData': 'bigDataView'
    },
    apiEnvView:function () {
        var view = require('pioneering/apiEnvView.js');
        mscxPage.views['apiEnvViewObj'] = new view();
    },
    serverEnvView:function () {
        var view = require('pioneering/serverEnvView.js');
        mscxPage.views['serverEnvViewObj'] = new view();
    },
    dataVisiualView: function(id) {
        var view = require('pioneering/dataVisiualView.js');
        mscxPage.views['dataVisiualViewObj'] = new view();
    },
    bigDataView: function(id) {
        var view = require('pioneering/bigDataView.js');
        mscxPage.views['bigDataViewObj'] = new view();
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

