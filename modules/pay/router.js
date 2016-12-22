var Routes =  Backbone.Router.extend({
    routes: {
        '': 'selectPayView',
        'result': 'resultView'
    },
    selectPayView: function () {
        var view = require('pay/selectPayView.js');
        mscxPage.views['selectPayViewObj'] = new view();
    },
    resultView:function () {
        var view = require('pay/resultView.js');
        mscxPage.views['resultViewObj'] = new view();
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

