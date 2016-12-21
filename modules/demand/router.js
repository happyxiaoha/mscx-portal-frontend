/**
 * Created by Kevin_gu on 2016/4/7.
 */
var Routes =  Backbone.Router.extend({
    routes: {
        '': 'dataDemandView',
        'data': 'dataDemandView',
        'api': 'apiDemandView',
        'service': 'serviceDemandView',
        'data/detail/:id': 'dataDetailView',
        'api/detail/:id': 'apiDetailView',
        'service/detail/:id': 'serviceDetailView',
        'data/edit/:id': 'dataPublishView',
        'api/edit/:id': 'apiPublishView',
        'service/edit/:id': 'servicePublishView',
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

        var detailView = mscxPage.views['dataDetailView'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['dataDetailView'] = new view({
            id: id
        });
    },
    apiDetailView: function(id) {
        var view = require('demand/api/detailView.js');

        var detailView = mscxPage.views['apiDetailView'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['apiDetailView'] = new view({
            id: id
        });
    },
    serviceDetailView: function(id) {
        var view = require('demand/service/detailView.js');

        var detailView = mscxPage.views['serviceDetailView'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['serviceDetailView'] = new view({
            id: id
        });
    },
    dataPublishView: function(id) {
        var dataPublishView = require('demand/data/publishView.js');
        mscxPage.views['dataPublishView'] = new dataPublishView({
            id: id
        });
    },
    apiPublishView: function(id) {
        var apiPublishView = require('demand/api/publishView.js');
        mscxPage.views['apiPublishView'] = new apiPublishView({
            id: id
        });
    },
    servicePublishView: function(id) {
        var servicePublishView = require('demand/service/publishView.js');
        mscxPage.views['servicePublishView'] = new servicePublishView({
            id: id
        });
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

