'use strict';

var template = require('html!./coachTemplate.html');
// var template = '<div class="server-env rightMenuWrap fl boxShadiow boxSizing bgWhite common animate-content opacity0"></div>';

// var cmsUrl = Resource.cmsHost + 'static_html/datainfo/serverdev/index.html'

var view = Backbone.View.extend({
    el: mscxPage.domEl.startupEl,
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.template());
        return this;
    }
});

module.exports = view;