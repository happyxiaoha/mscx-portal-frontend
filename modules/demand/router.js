/**
 * Created by Kevin_gu on 2016/4/7.
 */
var Routes =  Backbone.Router.extend({
    routes: {
        '': 'dataDemandView',
        'data': 'dataDemandView',
        'api': 'apiDemandView',
        'service': 'serviceDemandView',
        'createDemand':'createDemandView',
        'data/detail/:id': 'dataDetailView',
        'api/detail/:id': 'apiDetailView',
        'service/detail/:id': 'serviceDetailView',
        'data/publish': 'dataPublishView',
        'api/publish': 'apiPublishView',
        'service/publish': 'servicePublishView'
    },
    dataDemandView: function () {
        var demandView = require('demand/demandView.js');
        mscxPage.views['dataDemandObj'] = new demandView({
            id: 'data'
        });
    },
    apiDemandView: function () {
        var demandView = require('demand/demandView.js');
        mscxPage.views['apiDemandObj'] = new demandView({
            id: 'api'
        });
    },
    serviceDemandView: function () {
        var demandView = require('demand/demandView.js');
        mscxPage.views['serviceDemandObj'] = new demandView({
            id: 'service'
        });
    },
    dataDetailView: function(id) {
        var view = require('demand/data/detailView.js');
        mscxPage.views['dataDetailView'] = new view({
            id: id
        });
    },
    apiDetailView: function(id) {
        var view = require('demand/api/detailView.js');
        mscxPage.views['apiDetailView'] = new view({
            id: id
        });
    },
    serviceDetailView: function(id) {
        var view = require('demand/service/detailView.js');
        mscxPage.views['serviceDetailView'] = new view({
            id: id
        });
    },
    createDemandView:function () {
        var createDemandView = require('demand/createDemand/createDemandView.js');
        mscxPage.views['createDemandViewObj'] = new createDemandView();
    },
    dataPublishView: function() {
        var dataPublishView = require('demand/data/publishView.js');
        mscxPage.views['dataPublishView'] = new dataPublishView();
    },
    apiPublishView: function() {
        var apiPublishView = require('demand/api/publishView.js');
        mscxPage.views['apiPublishView'] = new apiPublishView();
    },
    servicePublishView: function() {
        var servicePublishView = require('demand/service/publishView.js');
        mscxPage.views['servicePublishView'] = new servicePublishView();
    },
    openPage: function(url) {
        this.navigate(url,{trigger: true});
    },
    execute: function(callback,args,name) {
        if(mscxPage.userCenter){
            mscxPage.userCenter.leftView.initialize(name);
        }
        if(mscxPage.views[name+'Obj']) {
            mscxPage.views[name+'Obj'].initialize();
        }
        else {
            if (callback) callback.apply(this, args);
        }
    }
});

module.exports = Routes;

