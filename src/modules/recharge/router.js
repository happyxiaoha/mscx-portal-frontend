
var Routes =  Backbone.Router.extend({
    routes: {
        '': 'phoneView',
        'phone': 'phoneView',
        'sms': 'smsView',
        'flow': 'flowView',
        'refuel': 'refuelView',
    },
    phoneView:function () {
        var rechargeView = require('./rechargeView.js');

        var rechargeViewObj = mscxPage.views['rechargeViewObj'];
        rechargeViewObj && rechargeViewObj.undelegateEvents() && rechargeViewObj.stopListening();

        mscxPage.views['rechargeViewObj'] = new rechargeView({
            id: 'phone'
        });
    },
    smsView:function () {
        var rechargeView = require('./rechargeView.js');

        var rechargeViewObj = mscxPage.views['rechargeViewObj'];
        rechargeViewObj && rechargeViewObj.undelegateEvents() && rechargeViewObj.stopListening();

        mscxPage.views['rechargeViewObj'] = new rechargeView({
            id: 'sms'
        });
    },
    flowView:function () {
        var rechargeView = require('./rechargeView.js');

        var rechargeViewObj = mscxPage.views['rechargeViewObj'];
        rechargeViewObj && rechargeViewObj.undelegateEvents() && rechargeViewObj.stopListening();

        mscxPage.views['rechargeViewObj'] = new rechargeView({
            id: 'flow'
        });
    },
    refuelView:function () {
        var rechargeView = require('./rechargeView.js');

        var rechargeViewObj = mscxPage.views['rechargeViewObj'];
        rechargeViewObj && rechargeViewObj.undelegateEvents() && rechargeViewObj.stopListening();

        mscxPage.views['rechargeViewObj'] = new rechargeView({
            id: 'refuel'
        });
    },
    openPage: function(url) {
        this.navigate(url,{trigger: true});
    },
    execute: function(callback,args,name) {
        if(mscxPage.views[name+'Obj']) {
            mscxPage.views[name+'Obj'].initialize();
        }
        else {
            if (callback) callback.apply(this, args);
        }
    }
});
module.exports = Routes;
