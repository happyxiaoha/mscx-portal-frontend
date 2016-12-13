/**
 * Created by Administrator on 2016/12/13.
 */

'use strict';

var openDataDetailTemplate = require('html!./openDataDetailView.html');

var openDataDetailModel = Backbone.Model.extend({
    url: mscxPage.host+'/ro/mscx-data-api/getDataDetail.do'
});

var openDataDetailView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    template: _.template(openDataDetailTemplate),
    events: {

    },
    initialize: function() {
        this.$el.toggleClass('loading');
        this.model = new openDataDetailModel();
        this.model.fetch({
           data: {
               dataId: this.id
           }
        });

        this.listenTo(this.model, 'sync', this.render());

    },
    render: function () {
        this.$el.toggleClass('loading');
        this.$el.html(this.template())
    }
});


module.exports = openDataDetailView;
