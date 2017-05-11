/**
 * Created by Administrator on 2016/12/14.
 */

var Routes =  Backbone.Router.extend({
    routes: {
        '': 'saasView',
        'saas': 'saasView',
        'detail/:id': 'detailView',
        'publish': 'publishView',
        'edit/:id': 'publishView',
        'show/:id': 'showView'
    },
    saasView: function() {
        if(location.search) return;
        
        var saasView = require('saas/saasView.js');
        mscxPage.views['saasObj'] = new saasView({
            id: 'saas'
        });
    },
    detailView: function(id) {
        var saasDetailView = require('saas/detailView.js');
        var detailView = mscxPage.views['saasDetailView'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['saasDetailView'] = new saasDetailView({
            id: id
        });
    },
    publishView: function (id) {
        if(!mscxPage.isLogin() || !mscxPage.isRealName()) {
            return;
        }
        
        var view = require('saas/publishView.js');

        var publishView = mscxPage.views['publishView'];
        publishView && publishView.undelegateEvents() && publishView.stopListening();

        mscxPage.views['publishView'] = new view({
            id: id
        });
    },
    showView: function (id) {
        var view = require('saas/desView.js');
        
        var showView = mscxPage.views['showView'];
        showView && showView.undelegateEvents() && showView.stopListening();

        var view = new view({
            id: id
        });
        mscxPage.views['showView'] = view;
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

