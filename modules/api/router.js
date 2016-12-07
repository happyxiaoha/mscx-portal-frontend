/**
 * Created by Kevin_gu on 2016/4/7.
 */
var Routes =  Backbone.Router.extend({
    routes: {
        'messageNotice':'messageNotice',//消息通知
        'companyInfo':'companyInfo'//企业信息
    },
    /*首页*/
    companyInfo:function () {
        var companyInfoReg = require('companyInfo/companyInfoView.js');
        smartPage.backboneViewObj['companyInfoObj'] = new companyInfoReg();
    },
    messageNotice: function() {
        var messageNoticeView = require('messageNotice/messageNoticeView.js');
        smartPage.backboneViewObj['messageNoticeObj'] = new messageNoticeView();
    },
    openPage: function(url) {
        this.navigate(url,{trigger: true});
    },
    execute: function(callback,args,name) {
        if(smartPage.backboneViewObj[name+'Obj']) {
            smartPage.backboneViewObj[name+'Obj'].initialize();
        }
        else {
            if (callback) callback.apply(this, args);
        }
    }
});

module.exports = Routes;

