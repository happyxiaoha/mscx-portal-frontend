/**
 * Created by Administrator on 2016/12/12.
 */

var Routes =  Backbone.Router.extend({
    routes: {
        '': 'dataThemeView',
        'data': 'dataThemeView',
        // 'catalog':'openDataReleaseView',
        'data/catalog(/org-:orgId)(/category-:categoryId)(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'openDataReleaseView',
        'data/catalog/category/:categoryId':'openDataReleaseCategoryView',
        'data/catalog/org/:orgId':'openDataReleaseOrgView',
        'data/detail/:id':'openDataDetailView',
        'api/data': 'dataAPI',
        'api/data(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'dataAPI',
        'api/tool(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'toolAPI',
        'api/model(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'modelAPI',
        'api/detail/:id': 'apiDetailView',
        'api/createApi': 'createApiView',
        'api/updateApi/:id': 'updateApiView',
        'api/apiDes/:id': 'apiDesView',
        'saas': 'saasView',
        'saas/detail/:id': 'saasDetailView',
        'service': 'serviceView',
        'service(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'serviceView',
        'service/detail/:id': 'serviceDetailView',
        'service/publish': 'servicePublishView',
        'service/edit/:id': 'servicePublishView',
        'service/show/:id': 'serviceShowView'
    },
    dataThemeView:function () {
        if(location.search) return;
        
        var openDataView = require('./opendata/wrapper.js');

        var dataThemeView = mscxPage.views['openDataViewObj'];
        dataThemeView && dataThemeView.undelegateEvents() && dataThemeView.stopListening();

        mscxPage.views['openDataViewObj'] = new openDataView({
            id: 'dataView'
        });
    },
    openDataReleaseView:function (orgId, categoryId, keyword, scope, chargeType, orderBy) {
        var openDataReleaseView = require('./opendataCatalog/wrapper.js');
        mscxPage.views['openDataReleaseViewObj'] = new openDataReleaseView({
            id: 'dataCatalog',
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
        var openDataReleaseView = require('./opendataCatalog/wrapper.js');
        new openDataReleaseView({
            id: 'dataCatalog',
            model: {
                categoryId: categoryId
            }
        });
    },
    openDataReleaseOrgView: function(orgId) {
        var openDataReleaseView = require('./opendataCatalog/wrapper.js');
        new openDataReleaseView({
            id: 'dataCatalog',
            model: {
                orgId: orgId
            }
        });
    },
    openDataDetailView: function (id) {
        var openDataDetailView = require('./opendata/detail.js');

        var detailView = mscxPage.views['dataDetailView'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['dataDetailView'] = new openDataDetailView({
            id: id
        });
    },
    dataAPI:function (keyword, scope, chargeType, orderBy) {
        if(location.search) return;
        
        var APIView = require('api/APIView.js');
        mscxPage.views['dataAPIObj'] = new APIView({
            id: 'apiData',
            model: {
                keyword: keyword,
                scope: scope,
                chargeType: chargeType,
                orderBy: orderBy
            }
        });
    },
    toolAPI:function (keyword, scope, chargeType, orderBy) {
        var APIView = require('api/APIView.js');
        mscxPage.views['toolAPIObj'] = new APIView({
            id: 'apiTool',
            model: {
                keyword: keyword,
                scope: scope,
                chargeType: chargeType,
                orderBy: orderBy
            }
        });
    },
    modelAPI:function (keyword, scope, chargeType, orderBy) {
        var APIView = require('api/APIView.js');
        mscxPage.views['modelAPIObj'] = new APIView({
            id: 'apiModel',
            model: {
                keyword: keyword,
                scope: scope,
                chargeType: chargeType,
                orderBy: orderBy
            }
        });
    },
    apiDetailView: function(id) {
        var view = require('api/detailView.js');

        var detailView = mscxPage.views['apiDetailView'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['apiDetailView'] = new view({
            id: id
        });
    },
    createApiView: function () {
        var createApiView = require('api/apiManage/createApiView.js');
        mscxPage.views['createApiViewObj'] = new createApiView();
    },
    updateApiView: function (id) {
        var updateApiView = require('api/apiManage/updateApiView.js');
        mscxPage.views['updateApiViewObj'] = new updateApiView({
            id: id
        });
    },
    apiDesView: function (id) {
        var apiDesView = require('api/apiManage/apiDesView.js');
        mscxPage.views['apiDesViewObj'] = new apiDesView({
            id: id
        });
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
    saasDetailView: function(id) {
        var saasDetailView = require('saas/detailView.js');
        var detailView = mscxPage.views['saasDetailView'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['saasDetailView'] = new saasDetailView({
            id: id
        });
    },
    serviceView: function (keyword, scope, chargeType, orderBy) {
        if(location.search) return;
        
        var serviceView = require('services/servicesView.js');
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
    serviceDetailView: function(id) {
        var serviceDetailView = require('services/detailView.js');
        var detailView = mscxPage.views['serDetailView'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['serDetailView'] = new serviceDetailView({
            id: id
        });
    },
    servicePublishView: function (id) {
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
    serviceShowView: function (id) {
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
        if(mscxPage.views[name+'Obj']) {
            mscxPage.views[name+'Obj'].initialize();
        }
        else {
            if (callback) callback.apply(this, args);
        }
    }
});
module.exports = Routes;
