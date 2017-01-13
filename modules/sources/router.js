/**
 * Created by Administrator on 2016/12/12.
 */

require('./openData.css');
var Routes =  Backbone.Router.extend({
    routes: {
        '': 'dataThemeView',
        'view': 'dataThemeView',
        // 'catalog':'openDataReleaseView',
        'catalog(/org-:orgId)(/category-:categoryId)(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'openDataReleaseView',
        'catalog/category/:categoryId':'openDataReleaseCategoryView',
        'catalog/org/:orgId':'openDataReleaseOrgView',
        'detail/:id':'openDataDetailView'
    },
    dataThemeView:function () {
        if(location.search) return;
        
        var openDataView = require('./opendata/openDataView.js');

        var dataThemeView = mscxPage.views['openDataViewObj'];
        dataThemeView && dataThemeView.undelegateEvents() && dataThemeView.stopListening();

        mscxPage.views['openDataViewObj'] = new openDataView({
            id: 'view'
        });
    },
    openDataReleaseView:function (orgId, categoryId, keyword, scope, chargeType, orderBy) {
        var openDataReleaseView = require('./opendataRelease/openDataReleaseView.js');
        mscxPage.views['openDataReleaseViewObj'] = new openDataReleaseView({
            id: 'catalog',
            model: {
                keyword: keyword,
                scope: scope,
                chargeType: chargeType,
                orderBy: orderBy,
                orgId: orgId,
                categoryId: categoryId
            }
        });
    },
    openDataReleaseCategoryView: function(categoryId) {
        var openDataReleaseView = require('./opendataRelease/openDataReleaseView.js');
        new openDataReleaseView({
            id: 'catalog',
            model: {
                categoryId: categoryId
            }
        });
    },
    openDataReleaseOrgView: function(orgId) {
        var openDataReleaseView = require('./opendataRelease/openDataReleaseView.js');
        new openDataReleaseView({
            id: 'catalog',
            model: {
                orgId: orgId
            }
        });
    },
    openDataDetailView: function (id) {
        var openDataDetailView = require('./openDataDetail/openDataDetailView.js');

        var detailView = mscxPage.views['dataDetailView'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['dataDetailView'] = new openDataDetailView({
            id: id
        });
    },
    openPage: function(url) {
        this.navigate(url,{trigger: true});
    },
    execute: function(callback,args,name) {
        if(mscxPage.views[name+'Obj']) {
            mscxPage.views[name+'Obj'].initialize();
        }
        else {
            if (callback) callback.apply(this, args);
        }
    }
});
module.exports = Routes;
