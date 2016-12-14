/**
 * Created by Administrator on 2016/12/14.
 */

'use strict';

var serviceDetailModelTemplate = require('html!./detailTemplate.html');

var serviceDetailModel = Backbone.Model.extend({
    url: mscxPage.host + '/ro/mscx-app-api/get.do'
});
require('./services.css');
require('../../lib/jquery.SuperSlide.2.1.1.js');

var openDataDetailView = Backbone.View.extend({
    el: mscxPage.domEl.apiEl,
    template: _.template(serviceDetailModelTemplate,{variable: 'data'}),
    events: {
        'click span.attention': 'attentionData'
    },
    initialize: function() {
        this.$el.html();
        this.$el.toggleClass('loading');
        this.model = new serviceDetailModel();
        this.model.fetch({
            data: {
                id: this.id
            }
        });
        this.listenTo(this.model, 'sync', this.render);
    },
    render: function () {
        console.log(this.model.toJSON().result);
        this.$el.toggleClass('loading');
        this.$el.html(this.template( this.model.toJSON().result));
        $(".picScroll-left").slide({
            titCell:".hd ul",
            mainCell:".bd ul",
            autoPage:true,
            effect:"left",
            autoPlay:false,
            vis:2,
            trigger:"click"
        });
    },
    attentionData: function(e){
        var $target = $(e.currentTarget),
            dataId = $target.attr('attrid');

    }
});


module.exports = openDataDetailView;
