/**
 * Created by Kevin_gu on 2016/4/7.
 */
var Routes =  Backbone.Router.extend({
    routes: {
        '':'defaultView',
        'info': 'defaultView',
        'user':'userView',
        'user/:id':'userView',
        'account': 'accountView',
        'demand': 'demandView',
        'demand/:id': 'demandView',
        'sources': 'sourcesView',
        'api': 'apiView',
        'server': 'serverView',
        'order': 'orderView',
        'shop': 'shopView',
        'sale': 'saleView'
    },
    defaultView:function () {
        var defaultView = require('userInfo/default/userInfoDefaultView.js');
        mscxPage.views['defaultViewObj'] = new defaultView();
    },
    userView: function (id) {
        var userView = require('userInfo/user/userView.js');
        mscxPage.views['userViewObj'] = new userView({
            id: id
        });
    },
    accountView: function () {
        var accountView = require('userInfo/account/accountView.js');
        mscxPage.views['accountViewObj'] = new accountView();
    },
    demandView: function (id) {
        var demandView = require('userInfo/demand/demandView.js');
        mscxPage.views['demandViewObj'] = new demandView({
            id: id
        });
    },
    sourcesView: function () {
        var sourcesView = require('userInfo/sources/sourcesView.js');
        mscxPage.views['sourcesViewObj'] = new sourcesView();
    },
    serverView: function () {
        var serverView = require('userInfo/servers/serversView.js');
        mscxPage.views['serverViewObj'] = new serverView();
    },
    apiView: function () {
        var apiView = require('userInfo/api/apiView.js');
        mscxPage.views['apiViewObj'] = new apiView();
    },
    orderView: function () {
        var orderView = require('userInfo/orders/ordersView.js');
        mscxPage.views['orderViewObj'] = new orderView();
    },
    shopView: function () {
        var shopView = require('userInfo/orders/shopCarView.js');
        mscxPage.views['shopViewObj'] = new shopView();
    },
    saleView: function () {
        var saleView = require('userInfo/orders/saleView.js');
        mscxPage.views['saleViewObj'] = new saleView();
    },
    openPage: function(url) {
        this.navigate(url,{trigger: true});
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

