/**
 * Created by Administrator on 2016/12/14.
 */

var Routes =  Backbone.Router.extend({
    routes: {
        '': 'serviceView',
        'service': 'serviceView',
        'service(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'serviceView',
        'detail/:id': 'detailView',
        'publish': 'publishView',
        'edit/:id': 'publishView',
        'show/:id': 'showView'
    },
    serviceView: function (keyword, scope, chargeType, orderBy) {
        if(location.search) return;
        
        var serviceView = require('services/contentView.js');
        mscxPage.views['servicesObj'] = new serviceView({
            id: 'service',
            model: {
                keyword: keyword,
                scope: scope,
                chargeType: chargeType,
                orderBy: orderBy
            }
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
    publishView: function (id) {
        if(!mscxPage.isLogin() || !mscxPage.isRealName()) {
            return;
        }
        
        var view = require('services/publishView.js');

        var publishView = mscxPage.views['publishView'];
        publishView && publishView.undelegateEvents() && publishView.stopListening();

        mscxPage.views['publishView'] = new view({
            id: id
        });
    },
    showView: function (id) {
        var view = require('services/desView.js');
        
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

