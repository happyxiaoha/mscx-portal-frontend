var Routes =  Backbone.Router.extend({
    routes: {
        '': 'apiHelpView',
        'apiHelp': 'apiHelpView',
        'commonQue': 'commonQueView',
        'serHelp': 'serHelpView',
        'newHelp': 'newHelpView'
    },
    apiHelpView: function () {
        var apiHelpView = require('help/apiHelp/apiHelp.js');
        mscxPage.views['apiHelpViewObj'] = new apiHelpView();
    },
    commonQueView:function () {
        var commonQueView = require('help/commonQue/commonQue.js');
        mscxPage.views['commonQueViewObj'] = new commonQueView();
    },
    serHelpView: function () {
        var serHelpView = require('help/serviceHelp/serviceHelp.js');
        mscxPage.views['serHelpViewObj'] = new serHelpView();
    },
    newHelpView: function () {
        var newHelpView = require('help/newHelpView/newHelpView.js');
        mscxPage.views['newHelpViewObj'] = new newHelpView();
    },
    openPage: function(url) {
        this.navigate(url,{trigger: true});
    },
    execute: function(callback,args,name) {
        mscxPage.views['helpLeftSideView'].initialize(name);
        if(mscxPage.views[name + 'Obj']) {
            mscxPage.views[name + 'Obj'].initialize();
        }
        else {
            if (callback) callback.apply(this, args);
        }
    }
});

module.exports = Routes;

