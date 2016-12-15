/**
 * Created by Administrator on 2016/12/15.
 */

var Routes =  Backbone.Router.extend({
    routes: {
        '': 'loginView',
        'login': 'loginView',
        'register': 'registerView'
    },
    loginView: function () {
        var loginView = require('./loginView.js');
        new loginView();
    },
    registerView: function(id) {

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

