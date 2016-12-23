/**
 * Created by Administrator on 2016/12/14.
 */

var Routes =  Backbone.Router.extend({
    routes: {
        '': 'serviceView',
        'service': 'serviceView',
        'detail/:id': 'detailView',
        'publish': 'publishView'
    },
    serviceView: function () {
        var serviceView = require('services/servicesView.js');
        mscxPage.views['servicesObj'] = new serviceView({
            id: 'service'
        });
    },
    detailView: function(id) {
        var serviceDetailView = require('services/detailView.js');
        var detailView = mscxPage.views['serDetailView'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['serDetailView'] = new serviceDetailView({
            id: id
        });
    },
    publishView: function () {
        var publishView = require('services/publishView.js');
        mscxPage.views['servicesPublishObj'] = new publishView();
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

