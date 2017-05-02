/**
 * Created by Kevin_gu on 2016/4/7.
 */
var Routes =  Backbone.Router.extend({
    routes: {
        '':'defaultView',
        'info': 'defaultView',
        'user':'userView',
        'userAuth':'userAuthView',
        'userPassword':'userPasswordView',
        'account': 'accountView',
        'demand': 'apiDemandView',
        'apiDemand': 'apiDemandView',
        'serversDemand': 'serversDemandView',
        'followDemand': 'followDemandView',
        'acceptDemand': 'acceptDemandView',
        'sources': 'sourcesView',
        'api': 'apiView',
        'myApi': 'myApiView',
        'follow': 'followView',
        'server': 'serverView',
        'serverFollow': 'serverFollowView',
        'serverApply': 'serverApplyView',
        'order': 'orderView',
        'shop': 'shopView',
        'recharge': 'rechargeView',
        'saas': 'saasView',
        'saasApply': 'saasApplyView',
        'saasFollow': 'saasFollowView'
    },
    defaultView:function () {
        var defaultView = require('userInfo/default/userInfoDefaultView.js');
        mscxPage.views['defaultViewObj'] = new defaultView();
    },
    userView: function (id) {
        var userView = require('userInfo/user/userView.js');
        mscxPage.views['userViewObj'] = new userView();
    },
    userAuthView: function () {
        var userAuthView = require('userInfo/user/userAuth.js');
        mscxPage.views['userAuthViewObj'] = new userAuthView();
    },
    userPasswordView: function () {
        var userPasswordView = require('userInfo/user/userPassword.js');
        mscxPage.views['userPasswordViewObj'] = new userPasswordView();
    },
    accountView: function () {
        var accountView = require('userInfo/account/accountView.js');
        mscxPage.views['accountViewObj'] = new accountView();
    },
    demandView: function (id) {
        var demandView = require('userInfo/demand/demandView.js');
        mscxPage.views['demandViewObj'] = new demandView();
    },
    apiDemandView: function () {
        var apiDemandView = require('userInfo/demand/demandApiView.js');
        mscxPage.views['apiDemandViewObj'] = new apiDemandView();
    },
    serversDemandView: function (id) {
        var serversDemandView = require('userInfo/demand/demandServersView.js');
        mscxPage.views['serversDemandViewObj'] = new serversDemandView();
    },
    followDemandView: function () {
        var followDemandView = require('userInfo/demand/demandFollowView.js');
        mscxPage.views['followDemandViewObj'] = new followDemandView();
    },
    acceptDemandView: function () {
        var acceptDemandView = require('userInfo/demand/demandAcceptView.js');
        mscxPage.views['acceptDemandViewObj'] = new acceptDemandView();
    },
    sourcesView: function () {
        var sourcesView = require('userInfo/sources/sourcesView.js');
        mscxPage.views['sourcesViewObj'] = new sourcesView();
    },
    serverView: function () {
        var serverView = require('userInfo/servers/serversView.js');
        mscxPage.views['serverViewObj'] = new serverView();
    },
    serverFollowView: function () {
        var serverFollowView = require('userInfo/servers/serversFollowView.js');
        mscxPage.views['serverFollowViewObj'] = new serverFollowView();
    },
    serverApplyView: function () {
        var serverApplyView = require('userInfo/servers/serversApplyView.js');
        mscxPage.views['serverApplyViewObj'] = new serverApplyView();
    },
    apiView: function () {
        var apiView = require('userInfo/api/apiView.js');
        mscxPage.views['apiViewObj'] = new apiView();
    },
    myApiView: function () {
        var myApiView = require('userInfo/api/myApiView.js');
        mscxPage.views['myApiViewObj'] = new myApiView();
    },
    followView: function () {
        var followView = require('userInfo/api/followView.js');
        mscxPage.views['followViewObj'] = new followView();
    },
    orderView: function () {
        var orderView = require('userInfo/orders/ordersView.js');
        mscxPage.views['orderViewObj'] = new orderView();
    },
    shopView: function () {
        var shopView = require('userInfo/orders/shopCarView.js');
        mscxPage.views['shopViewObj'] = new shopView();
    },
    openPage: function(url) {
        this.navigate(url,{trigger: true});
    },
    rechargeView: function () {
        var rechargeView = require('userInfo/recharge/rechargeView.js');
        mscxPage.views['rechargeViewObj'] = new rechargeView();
    },
    saasView: function() {
        var saasView = require('userInfo/saas/saasView.js');
        mscxPage.views['saasViewObj'] = new saasView();
    },
    saasApplyView: function() {
        var saasView = require('userInfo/saas/applyView.js');
        mscxPage.views['saasApplyViewObj'] = new saasView();
    },
    saasFollowView: function() {
        var saasView = require('userInfo/saas/followView.js');
        mscxPage.views['saasFollowViewObj'] = new saasView();
    },
    execute: function(callback,args,name) {
        if(mscxPage.userCenter){
            mscxPage.userCenter.leftView.initialize(name);
        }
        if(mscxPage.views[name+'Obj']) {
            mscxPage.views[name+'Obj'].initialize(args[0]);
        }
        else {
            if (callback) callback.apply(this, args);
        }
    }
});

module.exports = Routes;

