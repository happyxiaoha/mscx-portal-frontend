'use strict';

var commonTemplate = require('html!./common.html');
var template = require('html!./pointQA.html');

var pointListModel = Backbone.Model.extend({
    url: mscxPage.request.point + 'point/getAllPointRecordList.do'
});

var userView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {

    },
    commonTemplate: _.template(commonTemplate),
    initialize: function() {
        this.$el.html(this.commonTemplate({
            name: 'point'
        }));
    },
    render: function () {
        
    },
    initRender: function () {
        // this.$('#userInfoArea').html(template);
    }
});
module.exports = userView;