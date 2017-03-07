var Routes =  Backbone.Router.extend({
    routes: {
        '': 'coachView',
        'coach': 'coachView',
        'born': 'bornView',
        'activity': 'activityView',
        'born/detail/:id': 'bornDetailView',
        'activity/detail/:id': 'activityDetailView',

        'createRoadShow': 'createRoadShowView',
        'createActivity': 'createActivityView'
    },
    coachView: function () {
        // if(location.search) return;
        
        var coachView = require('startup/coachView.js');
        mscxPage.views['coachViewObj'] = new coachView();
    },
    bornView: function() {
        var bornView = require('startup/bornView.js');
        mscxPage.views['bornViewObj'] = new bornView();
    },
    bornDetailView: function(id) {
        var view = require('startup/bornDetailView.js');

        var detailView = mscxPage.views['bornDetailViewObj'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['bornDetailViewObj'] = new view({
            id: id
        });
    },
    activityDetailView: function(id) {
        var view = require('startup/activityDetailView.js');

        var detailView = mscxPage.views['activityDetailViewObj'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['activityDetailViewObj'] = new view({
            id: id
        });
    },
    activityView: function() {
        var activityView = require('startup/activityView.js');
        mscxPage.views['activityViewObj'] = new activityView();
    },
    newsDetailView:function (url) {
        var view = require('startup/newsDetailView.js');
        mscxPage.views['newsDetailView'] = new view({
            model: {
                url: url
            }
        });
    },
    createRoadShowView:function () {
        var roadShowView = require('startup/createRoadShowView.js');
        mscxPage.views['roadShowViewObj'] = new roadShowView();
    },
    createActivityView:function () {
        var activityView = require('startup/createActivityView.js');
        mscxPage.views['activityViewObj'] = new activityView();
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

