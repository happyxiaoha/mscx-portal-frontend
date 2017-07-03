var Routes =  Backbone.Router.extend({
    routes: {
        '': 'selectPayView',
        'result/:id': 'resultView'
    },
    selectPayView: function () {
        var view = require('pay/selectPayView.js');
        mscxPage.views['selectPayViewObj'] = new view();
    },
    resultView:function (id) {
        var view = require('pay/resultView.js');
        mscxPage.views['resultView'] = new view({
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

