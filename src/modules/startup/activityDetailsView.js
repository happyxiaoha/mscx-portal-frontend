'use strict';

var template = require('./activityDetails.html');
require('./createStartup.css');
require('util');

var activityDesModel = Backbone.Model.extend({
    url: mscxPage.request.activity + 'activity/getActivityById.do'
});
var activityDictModel = Backbone.Model.extend({
    url: mscxPage.request.dict + 'tags/getAllActivity.do'
});

var createActivityView = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    initialize: function() {
        var that = this;
        this.$el.data('isLogin',1);
        this.model = new activityDesModel();
        this.dictModel = new activityDictModel();

        this.model.fetch({
            data: {
                id: this.id
            }
        });
        this.model.on('change',function () {
            that.dictModel.fetch();
        });
        this.dictModel.on('change', function() {
            that.render();
        })
    },
    render: function () {
        var temps = _.template(template);
        var result = this.model.get('result').detail;

        result.typeName = _.find(this.dictModel.toJSON().result, function(item) {
            return +item.dictCode == result.type
        }).dictName;

        this.$el.html(temps({res:result}));
    }
});

module.exports = createActivityView;