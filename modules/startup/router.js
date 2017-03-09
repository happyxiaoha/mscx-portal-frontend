var Routes =  Backbone.Router.extend({
    routes: {
        '': 'coachView',
        'coach': 'coachView',
        'roadshow': 'roadshowView',
        'activity': 'activityView',
        'roadshow/detail/:id': 'roadshowDetailView',
        'activity/detail/:id': 'activityDetailView',
        'createRoadShow': 'createRoadShowView',
        'createActivity': 'createActivityView',
        'createRoadShow/:id': 'createRoadShowView',
        'createActivity/:id': 'createActivityView',
        'news/detail/:url': 'newsDetailView',
        'news/:section/list': 'newsListView',
        'roadShowDes/:id': 'roadShowDesView',
        'activityDes/:id': 'activityDesView'
    },
    coachView: function () {
        // if(location.search) return;
        
        var coachView = require('startup/coachView.js');
        mscxPage.views['coachViewObj'] = new coachView();
    },
    roadshowView: function() {
        var roadshowView = require('startup/roadshow/contentView.js');
        mscxPage.views['bornViewObj'] = new roadshowView();
    },
    roadshowDetailView: function(id) {
        var view = require('startup/roadshow/detailView.js');

        var detailView = mscxPage.views['roadshowDetailViewObj'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['roadshowDetailViewObj'] = new view({
            id: id
        });
    },
    activityDetailView: function(id) {
        var view = require('startup/activity/detailView.js');

        var detailView = mscxPage.views['activityDetailViewObj'];
        detailView && detailView.undelegateEvents() && detailView.stopListening();

        mscxPage.views['activityDetailViewObj'] = new view({
            id: id
        });
    },
    activityView: function() {
        var activityView = require('startup/activity/contentView.js');
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
    newsListView:function (section) {
        var view = require('startup/newsListView.js');
        mscxPage.views['newsList' + section + 'ViewObj'] = new view({
            model: {
                section: section
            }
        });
    },
    createRoadShowView:function (id) {
       var roadShowView = require('startup/createRoadShowView.js');
        mscxPage.views['createRoadShowViewObj'] = new roadShowView({
            id: id
        });
    },
    createActivityView:function (id) {
        var activityView = require('startup/createActivityView.js');
        mscxPage.views['createActivityViewObj'] = new activityView({
            id: id
        });
    },
    roadShowDesView: function (id) {
        var roadShowDesView = require('startup/roadShowDetailsView.js');
        mscxPage.views['roadShowDesViewObj'] = new roadShowDesView({
            id: id
        });
    },
    activityDesView: function (id) {
        var avDesView = require('startup/activityDetailsView.js');
        mscxPage.views['activityDesViewObj'] = new avDesView({
            id: id
        });
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

