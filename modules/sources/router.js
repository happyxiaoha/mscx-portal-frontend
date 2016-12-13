/**
 * Created by Administrator on 2016/12/12.
 */

require('./openData.css');
var Routes =  Backbone.Router.extend({
    routes: {
        '': 'dataThemeView',
        'dataview': 'dataThemeView',
        'datarelease':'openDataReleaseView',
        'detail/:id':'openDataDetailView'
    },
    dataThemeView:function () {
        var openDataView = require('./opendata/openDataView.js');
        mscxPage.views['openDataViewObj'] = new openDataView({
            id: 'dataview'
        });
    },
    openDataReleaseView:function () {
        var openDataReleaseView = require('./opendataRelease/openDataReleaseView.js');
        mscxPage.views['openDataReleaseViewObj'] = new openDataReleaseView({
            id: 'dataRelease'
        });
    },
    openDataDetailView: function (id) {
        var openDataDetailView = require('./openDataDetail/openDataDetailView.js');
        mscxPage.views['openDataDetailViewObj'] = new openDataDetailView({
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
