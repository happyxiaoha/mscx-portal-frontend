'use strict';

var template = require('html!./roadShowDetails.html');
require('./createStartup.css');

var roadDetailsModel = Backbone.Model.extend({
    url: mscxPage.request.roadshow + 'roadshow/getRoadInfoByRoadId.do'
});

var createActivityView = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    initialize: function(){
        var that = this;
        this.$el.data('isLogin',1);
        this.model = new roadDetailsModel();
        this.model.fetch({
            data: {
                roadId: this.id
            },
            success: function () {
                that.render();
            }
        });
    },
    render: function () {
        var temps = _.template(template);
        this.$el.html(temps({res:this.model.get('result')}));
    }
});

module.exports = createActivityView;