var Routes =  Backbone.Router.extend({
    routes: {
        '': 'coachView',
        'coach': 'coachView'
    },
    coachView: function () {
        // if(location.search) return;
        
        var coachView = require('startup/coachView.js');
        mscxPage.views['coachViewObj'] = new coachView();
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

