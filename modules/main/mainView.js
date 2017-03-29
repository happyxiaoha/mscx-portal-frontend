/**
 * Created by Kevin on 2016/12/6.
 */
var template = require('html!./main.html'),
    navigationView = require('./navigationView.js'),
    recommendView = require('./recommendView.js'),
    bannerView = require('./banner.js');
require('./main.css');
require('../../lib/swiper.jquery.js');
require('../../lib/jquery.SuperSlide.2.1.1.js');

/*
var apiListModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/getSelectedNavigation.do'
});
*/
var recommendApiModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/getSelectedApi.do'
});
var recommendSerModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'recommend/list.do'
});


var mainView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    events: {
        'blur .info-line input':'changeAttribute'
    },
    initialize: function() {
        this.$el.html(template);
        new bannerView();
        /*
        new recommendBarView({
            id: 'ser',
            el: '#serList',
            model: new serListModel()
        });


        new recommendBarView({
            id: 'api',
            el: '#apiList',
            model: new apiListModel()
        });
         */
        new recommendView({
            id: 'api',
            el: '.recommendApiList',
            className: 'loading',
            model: new recommendApiModel()
        });

        new recommendView({
            id: 'ser',
            el: '.recommendSerList',
            model: new recommendSerModel()
        });
        this.render();
    },
    render: function(){

    }
});

module.exports = mainView;
