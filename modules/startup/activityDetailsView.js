'use strict';

var template = require('html!./activityDetails.html');
require('./createStartup.css');
require('util');

var activityDesModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/getActivityById.do'
});

var createActivityView = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    initialize: function() {
        var that = this;
        this.$el.data('isLogin',1);
        this.model = new activityDesModel();
        this.model.fetch({
            data: {
                id: this.id
            }
        });
        this.model.on('change',function () {
            that.render();
        });
    },
    render: function () {
        var temps = _.template(template);
        this.$el.html(temps({res:this.model.get('result').detail}));
    }
});

module.exports = createActivityView;