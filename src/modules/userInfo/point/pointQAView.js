'use strict';

var commonTemplate = require('./common.html');
var template = require('./pointQA.html');

var userView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    commonTemplate: _.template(commonTemplate),
    initialize: function() {
        this.$el.html(this.commonTemplate({
            name: 'pointQA'
        }));
        this.$('#userInfoArea').html(template);
    }
});
module.exports = userView;