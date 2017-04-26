/**
 * Created by Administrator on 2016/12/15.
 */

var Routes =  Backbone.Router.extend({
    routes: {
        '': 'loginView',
        'login': 'loginView',
        'oauthLogin/:accessToken/:phone': 'oauthLoginView'
    },
    loginView: function () {
        var loginView = require('./loginView.js');
        new loginView();
    },
    oauthLoginView: function (accessToken, phone) {
        var oauthLoginView = require('./oauthLoginView.js');
        new oauthLoginView({
            model: {
                accessToken: accessToken,
                phone: phone
            }
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

