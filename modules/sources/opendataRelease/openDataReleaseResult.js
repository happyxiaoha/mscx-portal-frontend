'use strict';

var openDataReleaseResultTemplate = require('html!./openDataSearchResult.html');

var view = Backbone.View.extend({
    template: _.template(openDataReleaseResultTemplate),
    el: '#searchResult',
    initialize: function() {
        var nJson = this.model.toJSON();
        this.$el.html(this.template({'data': nJson.result.data}))
    }
});

module.exports = view;