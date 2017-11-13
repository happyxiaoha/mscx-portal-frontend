/**
 * ================================================
 * 作    者：Hope Chen
 * 版    本：1.0
 * 创建日期：2017/11/7 16:39
 * 描    述：
 * 修订历史：
 * ================================================
 */
var Routes = Backbone.Router.extend({
    routes: {
        '': 'settledView',
        'settled': 'settledView'
    },
    settledView: function () {
        if (!mscxPage.isLogin()) {
            return;
        }
        var view = require('./settledView.js');
        new view();
    },
    openPage: function (url) {
        this.navigate(url, {trigger: true});
    },
    execute: function (callback, args, name) {
        if (mscxPage.views[name + 'Obj']) {
            mscxPage.views[name + 'Obj'].initialize();
        } else {
            if (callback) callback.apply(this, args);
        }
    }
});

module.exports = Routes;
