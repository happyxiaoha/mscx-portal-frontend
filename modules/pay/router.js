var Routes =  Backbone.Router.extend({
    routes: {
        '': 'selectPayView',
        'weixin': 'weixinPayView'
    },
    selectPayView: function () {
        var APIView = require('pay/selectPayView.js');
        mscxPage.views['dataAPIObj'] = new APIView({
            id: 'data'
        });
    },
    weixinPayView:function () {
        var APIView = require('pay/weixinPayView.js');
        mscxPage.views['toolAPIObj'] = new APIView({
            id: 'tool'
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

