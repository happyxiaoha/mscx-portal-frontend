'use strict';

var commonTemplate = require('html!./common.html');
var template = require('html!./pointQA.html');

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    initialize: function() {
        this.$el.html(this.commonTemplate({
            name: 'account'
        }));
        this.$('#userInfoArea').html(template);
    }
});
module.exports = accountView;