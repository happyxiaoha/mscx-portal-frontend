/**
 * Created by Administrator on 2016/12/12.
 */
var Routes =  Backbone.Router.extend({
    routes: {
        '': 'dataView',
        'view': 'dataView',
        'detail/:id':'detailView'
    },
    dataView:function () {
        if(location.search) return;
        
        var openDataView = require('./contentView.js');

        var dataView = mscxPage.views['openDataViewObj'];
        dataView && dataView.undelegateEvents() && dataView.stopListening();

        mscxPage.views['openDataViewObj'] = new openDataView({
            id: 'data'
        });
    },
    detailView: function (id) {
        var openDataDetailView = require('./detailView.js');

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
