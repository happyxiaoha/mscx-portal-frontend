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
    template: _.template(openDataDetailTemplate,{variable: 'data'}),
    events: {
        'click span.attention': 'attentionData'
    },
    initialize: function() {
        this.$el.html();
        this.$el.toggleClass('loading');
        this.model = new openDataDetailModel();
        this.model.fetch({
           data: {
               dataId: this.id
           }
        });
        this.listenTo(this.model, 'sync', this.render);
    },
    render: function () {
        console.log(this.model.toJSON().result);
        this.$el.toggleClass('loading');
        this.$el.html(this.template( this.model.toJSON().result))
    },
    attentionData: function(e){
        var $target = $(e.currentTarget),
            dataId = $target.attr('attrid');

    }
});


module.exports = openDataDetailView;
