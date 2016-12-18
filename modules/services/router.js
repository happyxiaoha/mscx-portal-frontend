/**
 * Created by Administrator on 2016/12/14.
 */

var Routes =  Backbone.Router.extend({
    routes: {
        '': 'serviceView',
        'service': 'serviceView',
        'detail/:id': 'detailView'
    },
    serviceView: function () {
        var serviceView = require('services/servicesView.js');
        mscxPage.views['servicesObj'] = new serviceView({
            id: 'service'
        });
    },
    detailView: function(id) {
        var detailView = require('services/detailView.js');
        new detailView({
            id: id
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
