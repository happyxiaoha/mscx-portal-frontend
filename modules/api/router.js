/**
 * Created by Kevin_gu on 2016/4/7.
 */
var Routes =  Backbone.Router.extend({
    routes: {
        '': 'dataAPI',
        'data': 'dataAPI',
        'data(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'dataAPI',
        'tool(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'toolAPI',
        'model(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'modelAPI',
        'detail/:id': 'detail',
        'createApi': 'createApiView',
        'updateApi/:id': 'updateApiView',
        'apiDes/:id': 'apiDesView'
    },
    dataAPI:function (keyword, scope, chargeType, orderBy) {
        if(location.search) return;
        
        var APIView = require('api/APIView.js');
        mscxPage.views['dataAPIObj'] = new APIView({
            id: 'data',
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
            id: 'tool',
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
            id: 'model',
            model: {
                keyword: keyword,
                scope: scope,
                chargeType: chargeType,
                orderBy: orderBy
            }
        });
    },
    detail: function(id) {
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

