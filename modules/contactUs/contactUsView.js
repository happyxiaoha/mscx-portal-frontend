/**
 * Created by Administrator on 2016/12/24.
 */

'use strict';
var template = require('html!./contactUs.html');
require('./contactUs.less');


var mainView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    events: {

    },
    initialize: function() {
       this.$el.html(template);
    }
});

module.exports = mainView;
