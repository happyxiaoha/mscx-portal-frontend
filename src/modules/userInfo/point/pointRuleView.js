'use strict';

var commonTemplate = require('./common.html');
var template = require('./pointRule.html');

var pointRuleModel = Backbone.Model.extend({
    url: mscxPage.request.point + 'point/getPointRuleList.do'
});

var userView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {

    },
    commonTemplate: _.template(commonTemplate),
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.html(this.commonTemplate({
            name: 'pointRule'
        }));

        this.pointRuleModel = new pointRuleModel();
        this.listenTo(this.pointRuleModel, 'sync', this.render);

        this.pointRuleModel.fetch();
    },
    render: function () {
        var model = this.pointRuleModel.toJSON();
        this.$('#userInfoArea').html(this.template(model.result));
    }
});
module.exports = userView;