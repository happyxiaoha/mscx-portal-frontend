/**
 * Created by Administrator on 2016/12/12.
 */

require('./openData.css');
var Routes =  Backbone.Router.extend({
    routes: {
        '': 'dataThemeView',
        'view': 'dataThemeView',
        'catalog':'openDataReleaseView',
        'catalog/category/:id':'openDataReleaseCategoryView',
        'catalog/org/:id':'openDataReleaseOrgView',
        'detail/:id':'openDataDetailView'
    },
    dataThemeView:function () {
        var openDataView = require('./opendata/openDataView.js');
        mscxPage.views['openDataViewObj'] = new openDataView({
            id: 'view'
        });
    },
    openDataReleaseView:function () {
        var openDataReleaseView = require('./opendataRelease/openDataReleaseView.js');
        mscxPage.views['openDataReleaseViewObj'] = new openDataReleaseView({
            id: 'catalog'
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
