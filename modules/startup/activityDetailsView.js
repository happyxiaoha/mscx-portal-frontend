'use strict';

var template = require('html!./activityDetails.html');
require('./createStartup.css');

var activityTypeModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'tags/getAllActivity.do'
});

var createActivityView = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    initialize: function() {
        this.$el.data('isLogin',1);


        this.$el.html(template);
        this.buildDate();
        this.model = new addActivityModel();
        this.activityTypeModel = new activityTypeModel();
        this.activityTypeModel.fetch();
        this.activityTypeModel.on('change',function () {
            that.buildActivityType();
            that.renderFormLocation();
        });
        $('#publishActivity').validate(that.validateConfig());
        return this;
    }
});

module.exports = createActivityView;