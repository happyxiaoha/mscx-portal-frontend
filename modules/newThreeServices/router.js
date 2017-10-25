/**
 * Created by Administrator on 2016/12/12.
 */

require('./openData.css');
window.three = false;
var Routes =  Backbone.Router.extend({
    routes: {
        '':'openDataReleaseView',
        'detail/:id':'openDataDetailView',
        'view(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'dataThemeView',
        'data(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'dataAPI',
        'catalog(/org-:orgId)(/category-:categoryId)(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'openDataReleaseView',
        'tool(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'toolAPI',
        'model(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'modelAPI',
        'service(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'serviceView'
    },
    dataThemeView:function (orgId, categoryId,keyword, scope, chargeType, orderBy) {
        if(location.search) return;

        var openDataView = require('./opendata/openDataView.js');

        var dataThemeView = mscxPage.views['openDataViewObj'];
        dataThemeView && dataThemeView.undelegateEvents() && dataThemeView.stopListening();

        mscxPage.views['openDataViewObj'] = new openDataView({
            id: 'view'
        });
        if(!three){
            var APIView = require('./apiModel/APIView.js');
            mscxPage.views['dataAPIObj'] = new APIView({
                id: 'data',
                model: {
                    keyword: keyword,
                    scope: scope,
                    chargeType: chargeType,
                    orderBy: orderBy
                }
            });
            var serviceView = require('./servicesModel/servicesView.js');
            mscxPage.views['servicesObj'] = new serviceView({
                id: 'service',
                model: {
                    keyword: keyword,
                    scope: scope,
                    chargeType: chargeType,
                    orderBy: orderBy
                }
            });
        }
    },
    openDataDetailView: function (id) {
        var openDataDetailView = require('./opendataDetail/openDataDetailView.js');

        var detailView = mscxPage.views['dataDetailView'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['dataDetailView'] = new openDataDetailView({
            id: id
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
        var APIView = require('./apiModel/APIView.js');
        mscxPage.views['dataAPIObj'] = new APIView({
            id: 'data',
            model: {
                keyword: keyword,
                scope: scope,
                chargeType: chargeType,
                orderBy: orderBy
            }
        });

        var serviceView = require('./servicesModel/servicesView.js');
        mscxPage.views['servicesObj'] = new serviceView({
            id: 'service',
            model: {
                keyword: keyword,
                scope: scope,
                chargeType: chargeType,
                orderBy: orderBy
            }
        });
        window.three = true;
    },
    dataAPI:function (keyword, scope, chargeType, orderBy) {
        if(location.search) return;

        var APIView = require('./apiModel/APIView.js');
        mscxPage.views['dataAPIObj'] = new APIView({
            id: 'data',
            model: {
                keyword: keyword,
                scope: scope,
                chargeType: chargeType,
                orderBy: orderBy
            }
        });
        if(!three){
            var openDataReleaseView = require('./opendataRelease/openDataReleaseView.js');
            mscxPage.views['openDataReleaseViewObj'] = new openDataReleaseView({
                id: 'catalog',
                model: {
                    keyword: keyword,
                    scope: scope,
                    chargeType: chargeType,
                    orderBy: orderBy,
                }
            });
            var serviceView = require('./servicesModel/servicesView.js');
            mscxPage.views['servicesObj'] = new serviceView({
                id: 'service',
                model: {
                    keyword: keyword,
                    scope: scope,
                    chargeType: chargeType,
                    orderBy: orderBy
                }
            });
        }
    },
    toolAPI:function (keyword, scope, chargeType, orderBy) {
        var APIView = require('./apiModel/APIView.js');
        mscxPage.views['toolAPIObj'] = new APIView({
            id: 'tool',
            model: {
                keyword: keyword,
                scope: scope,
                chargeType: chargeType,
                orderBy: orderBy
            }
        });
        if(!three){
            var openDataReleaseView = require('./opendataRelease/openDataReleaseView.js');
            mscxPage.views['openDataReleaseViewObj'] = new openDataReleaseView({
                id: 'catalog',
                model: {
                    keyword: keyword,
                    scope: scope,
                    chargeType: chargeType,
                    orderBy: orderBy,
                }
            });
            var serviceView = require('./servicesModel/servicesView.js');
            mscxPage.views['servicesObj'] = new serviceView({
                id: 'service',
                model: {
                    keyword: keyword,
                    scope: scope,
                    chargeType: chargeType,
                    orderBy: orderBy
                }
            });
        }
    },
    modelAPI:function (keyword, scope, chargeType, orderBy) {
        var APIView = require('./apiModel/APIView.js');
        mscxPage.views['modelAPIObj'] = new APIView({
            id: 'model',
            model: {
                keyword: keyword,
                scope: scope,
                chargeType: chargeType,
                orderBy: orderBy
            }
        });
        if(!three){
            var openDataReleaseView = require('./opendataRelease/openDataReleaseView.js');
            mscxPage.views['openDataReleaseViewObj'] = new openDataReleaseView({
                id: 'catalog',
                model: {
                    keyword: keyword,
                    scope: scope,
                    chargeType: chargeType,
                    orderBy: orderBy,
                }
            });
            var serviceView = require('./servicesModel/servicesView.js');
            mscxPage.views['servicesObj'] = new serviceView({
                id: 'service',
                model: {
                    keyword: keyword,
                    scope: scope,
                    chargeType: chargeType,
                    orderBy: orderBy
                }
            });
        }
    },

    serviceView: function (keyword, scope, chargeType, orderBy) {
        if(location.search) return;

        var serviceView = require('./servicesModel/servicesView.js');
        mscxPage.views['servicesObj'] = new serviceView({
            id: 'service',
            model: {
                keyword: keyword,
                scope: scope,
                chargeType: chargeType,
                orderBy: orderBy
            }
        });
        if(!three){
            var openDataReleaseView = require('./opendataRelease/openDataReleaseView.js');
            mscxPage.views['openDataReleaseViewObj'] = new openDataReleaseView({
                id: 'catalog',
                model: {
                    keyword: keyword,
                    scope: scope,
                    chargeType: chargeType,
                    orderBy: orderBy,
                }
            });
            var APIView = require('./apiModel/APIView.js');
            mscxPage.views['dataAPIObj'] = new APIView({
                id: 'data',
                model: {
                    keyword: keyword,
                    scope: scope,
                    chargeType: chargeType,
                    orderBy: orderBy
                }
            });
        }
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
