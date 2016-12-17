/**
 * Created by Administrator on 2016/12/15.
 */

var Routes =  Backbone.Router.extend({
    routes: {
        '': 'registerView',
        'register': 'registerView'
    },
    registerView: function() {
        var registerView = require('./registerView.js');
        new registerView();
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

