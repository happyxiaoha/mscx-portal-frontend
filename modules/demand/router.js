/**
 * Created by Kevin_gu on 2016/4/7.
 */
var Routes =  Backbone.Router.extend({
    routes: {
        'createDemand':'createDemandView'
    },
    createDemandView:function () {
        var createDemandView = require('demand/createDemand/createDemandView.js');
        mscxPage.views['createDemandViewObj'] = new createDemandView();
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

