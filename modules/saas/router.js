/**
 * Created by Administrator on 2016/12/14.
 */

var Routes =  Backbone.Router.extend({
    routes: {
        '': 'saasView',
        'saas': 'saasView',
        // 'service(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'serviceView',
        'detail/:id': 'detailView',
        // 'publish': 'publishView',
        // 'edit/:id': 'publishView',
        // 'show/:id': 'showView'
    },
    saasView: function (keyword, scope, chargeType, orderBy) {
        if(location.search) return;
        
        var saasView = require('saas/saasView.js');
        mscxPage.views['saasObj'] = new saasView({
            id: 'saas',
            model: {
                keyword: keyword,
                scope: scope,
                chargeType: chargeType,
                orderBy: orderBy
            }
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

