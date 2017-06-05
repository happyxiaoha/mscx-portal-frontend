/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./desTemplate.html');
require('../publish.less');

require('util');

var detailModel = Backbone.Model.extend({
    url: mscxPage.request.demand + 'getServiceDetailOfMe.do'
});

var view = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    events: {
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {

        this.detailModel = new detailModel();

        this.detailModel.fetch({
                data: {
                    id: this.id
                }
            });
        this.listenTo(this.detailModel, 'sync', this.renderDes);
    },

    renderDes: function(res) {
        var model = res.toJSON();
        this.$el.html(this.template(model.result));
    }
});

module.exports = view;