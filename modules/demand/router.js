/**
 * Created by Kevin_gu on 2016/4/7.
 */
var Routes =  Backbone.Router.extend({
    routes: {
        '':'defaultView',
        'info': 'defaultView',
        'user':'userView',
        'account': 'accountView',
        'demand': 'demandView'
    },
    defaultView:function () {
        var defaultView = require('userInfo/default/userInfoDefaultView.js');
        mscxPage.views['defaultViewObj'] = new defaultView();
    },
    userView: function () {
        var userView = require('userInfo/user/userView.js');
        mscxPage.views['userViewObj'] = new userView();
    },
    accountView: function () {
        var accountView = require('userInfo/account/accountView.js');
        mscxPage.views['accountViewObj'] = new accountView();
    },
    demandView: function () {
        var demandView = require('userInfo/demand/demandView.js');
        mscxPage.views['demandViewObj'] = new demandView();
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

