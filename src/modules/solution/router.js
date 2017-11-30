/**
 * ================================================
 * 作    者：Hope Chen
 * 版    本：1.0
 * 创建日期：2017/11/29 11:22
 * 描    述：
 * 修订历史：
 * ================================================
 */
var Routes =  Backbone.Router.extend({
    routes: {
        '': 'solutionView',
        'solution': 'solutionView',
        'solution/detail/:url': 'solutionDetailView',
        'solution/list': 'solutionListView'
    },
    solutionView:function () {
        var view = require('solution/solutionView.js');
        mscxPage.views['solutionViewObj'] = new view();
    },
    solutionDetailView:function (url) {
        var view = require('solution/solutionDetailView.js');
        mscxPage.views['solutionDetailView'] = new view({
            model: {
                url: url
            }
        });
    },
    solutionListView:function () {
        var view = require('solution/solutionListView.js');
        mscxPage.views['solutionListViewObj'] = new view();
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
