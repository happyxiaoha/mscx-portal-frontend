/**
 * Created by Kevin_gu on 2016/4/7.
 */
var Routes =  Backbone.Router.extend({
    routes: {
        '': 'dataAPI',
        'data': 'dataAPI',
        'tool': 'toolAPI',
        'model': 'modelAPI',
        'detail/:id': 'detail'
    },
    dataAPI:function () {
        var APIView = require('api/APIView.js');
        mscxPage.views['dataAPIObj'] = new APIView({
            id: 'data'
        });
    },
    toolAPI:function () {
        var APIView = require('api/APIView.js');
        mscxPage.views['toolAPIObj'] = new APIView({
            id: 'tool'
        });
    },
    modelAPI:function () {
        var APIView = require('api/APIView.js');
        mscxPage.views['modelAPIObj'] = new APIView({
            id: 'model'
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

