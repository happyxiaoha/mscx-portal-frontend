var Routes =  Backbone.Router.extend({
    routes: {
        '': 'coachView',
        'coach': 'coachView',
        'roadshow': 'roadshowView',
        'activity': 'activityView',
        'roadshow/detail/:id': 'roadshowDetailView',
        'activity/detail/:id': 'activityDetailView'
    },
    coachView: function () {
        // if(location.search) return;
        
        var coachView = require('startup/coachView.js');
        mscxPage.views['coachViewObj'] = new coachView();
    },
    roadshowView: function() {
        var roadshowView = require('startup/roadshowView.js');
        mscxPage.views['bornViewObj'] = new roadshowView();
    },
    roadshowDetailView: function(id) {
        var view = require('startup/roadshowDetailView.js');

        var detailView = mscxPage.views['roadshowDetailViewObj'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['roadshowDetailViewObj'] = new view({
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
    // newsView:function () {
    //     var view = require('startup/newsView.js');
    //     mscxPage.views['newsViewObj'] = new view();
    // },
    // newsDetailView:function (url) {
    //     var view = require('startup/newsDetailView.js');
    //     mscxPage.views['newsDetailView'] = new view({
    //         model: {
    //             url: url
    //         }
    //     });
    // },
    // newsListView:function () {
    //     var view = require('startup/newsListView.js');
    //     mscxPage.views['newsListViewObj'] = new view();
    // },
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

