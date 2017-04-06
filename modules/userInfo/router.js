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
        // 'account': 'accountView',
        'demand': 'demandView',
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
        // 我的积分
        'point': 'pointView',
        'pointIncome': 'pointIncomeView',
        'pointOutlay': 'pointOutlayView',
        'pointRule': 'pointRuleView',
        'pointQA': 'pointQAView',
        // 账户管理
        'account': 'accountView',
        'setPayPassword': 'setPayPasswordView',
        'rechargeRecord': 'rechargeRecordView',
        'paymentRecord': 'paymentRecordView',
        'forgetPayPassword': 'forgetPayPasswordView'

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
    // accountView: function () {
    //     var accountView = require('userInfo/account/accountView.js');
    //     mscxPage.views['accountViewObj'] = new accountView();
    // },
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
    pointView: function() {
        var pointView = require('userInfo/point/pointView.js');
        mscxPage.views['pointViewObj'] = new pointView();
    },
    pointIncomeView: function() {
        var pointView = require('userInfo/point/pointIncomeView.js');
        mscxPage.views['pointIncomeViewObj'] = new pointView();
    },
    pointOutlayView: function() {
        var pointView = require('userInfo/point/pointOutlayView.js');
        mscxPage.views['pointOutlayViewObj'] = new pointView();
    },
    pointRuleView: function() {
        var pointView = require('userInfo/point/pointRuleView.js');
        mscxPage.views['pointRuleViewObj'] = new pointView();
    },
    pointQAView: function() {
        var pointView = require('userInfo/point/pointQAView.js');
        mscxPage.views['pointQAViewObj'] = new pointView();
    },
    // 账户充值
    accountView: function() {
        var accountView = require('userInfo/account/accountView.js');
        mscxPage.views['accountViewObj'] = new accountView({
            id: 'recharge'
        });
    },
    // 支付密码设置
    setPayPasswordView: function() {
        var accountView = require('userInfo/account/accountView.js');
        mscxPage.views['setPayPasswordViewObj'] = new accountView({
            id: 'setPayPassword'
        });
    },
    // 忘记密码
    forgetPayPasswordView: function() {
        var accountView = require('userInfo/account/accountView.js');
        mscxPage.views['forgetPayPasswordViewObj'] = new accountView({
            id: 'forgetPayPassword'
        });
    },
    // 充值记录
    rechargeRecordView: function() {
        var accountView = require('userInfo/account/accountView.js');
        mscxPage.views['rechargeRecordViewObj'] = new accountView({
            id: 'rechargeRecord'
        });
    },
    // 支出记录
    paymentRecordView: function() {
        var accountView = require('userInfo/account/accountView.js');
        mscxPage.views['paymentRecordViewObj'] = new accountView({
            id: 'paymentRecord'
        });
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

