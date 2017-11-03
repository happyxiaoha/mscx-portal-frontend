/**
 * Created by Administrator on 2016/12/19.
 */

'use strict';
var Routes =  Backbone.Router.extend({
    routes: {
        '': 'searchView',
        'search': 'searchView'
    },
    searchView: function (id) {
        var searchView = require('./searchView.js');
        new searchView();
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

