/**
 * 创业园地router
 */
var Routes =  Backbone.Router.extend({
    routes: {
        '': 'serverEnvView',
        'serverEnv': 'serverEnvView',
        'dataVisiual': 'dataVisiualView',
        'bigData': 'bigDataView'
    },
    // apiEnvView:function () {
    //     var view = require('pioneering/contentView.js');
    //     mscxPage.views['apiEnvViewObj'] = new view({
    //         id: 'apiEnv'
    //     });
    // },
    serverEnvView:function () {
        var view = require('pioneering/contentView.js');
        mscxPage.views['serverEnvViewObj'] = new view({
            id: 'serverEnv'
        });
    },
    dataVisiualView: function(id) {
        var view = require('pioneering/contentView.js');
        mscxPage.views['dataVisiualViewObj'] = new view({
            id: 'dataVisiual'
        });
    },
    bigDataView: function(id) {
        var view = require('pioneering/contentView.js');
        mscxPage.views['bigDataViewObj'] = new view({
            id: 'bigData'
        });
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

