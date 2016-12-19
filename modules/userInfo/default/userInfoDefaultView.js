/**
 * Created by Kevin on 2016/12/6.
 */
var defaultModel = Backbone.Model.extend({
    url: mscxPage.host+'/personal/dashboard.do'
});

var template = require('html!./userInfoDefault.html');
require('./userInfoDefault.css');

var defaultView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'blur .info-line input':'changeAttribute'

    },
    initialize: function() {
        var that = this;
        this.$el.html(template);
        this.model = new defaultModel();
        this.model.fetch();
        this.model.on('change',function () {
            that.render();
        })
    },
    render: function () {
        var dasTemplate = _.template($('#userDefault').html());
        $('#dashboardAll').html(dasTemplate(this.model.get('result')));
    }
});

module.exports = defaultView;