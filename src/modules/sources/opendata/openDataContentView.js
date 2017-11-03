'use strict';
var openDataThemeListTemplate = require('./openDataContentView.html');


var openDataThemeListModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'getDataForOrg.do'
});

var openDataThemeView = Backbone.View.extend({
    el: '#openDataList',
    template: _.template(openDataThemeListTemplate),
    events: {

    },
    initialize: function() {
        this.model = new openDataThemeListModel();
        this.model.fetch();
        this.listenTo(this.model,'sync',this.render);
    },
    render: function() {
        var nJson = this.model.toJSON();
        this.$el.html(this.template(nJson.result));
    }
});

module.exports = openDataThemeView;