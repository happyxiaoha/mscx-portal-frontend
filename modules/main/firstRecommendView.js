/**
 * Created by Administrator on 2016/12/17.
 */

var firstRecommendTemplate = require('html!./firstRecommend.html');
var firstRecommendModel = Backbone.Model.extend({
   url: 'home/recommendation.do'
});

var firstRecommendView = Backbone.View.extend({
    template: _.template(firstRecommendTemplate,{variable: 'data'}),
    el: '#firstRecommend',
    events: {
    },
    initialize: function() {
        this.$el.toggleClass('loading');
        this.model = new firstRecommendModel();
        this.model.fetch();
        this.listenTo(this.model,'sync',this.render);
    },
    render: function() {
        this.$el.toggleClass('loading');
        var nJson =  this.model.toJSON();
        this.$el.html(this.template(nJson.result));
        // if(!nJson.result || nJson.result.length == 0){
        //     this.$el.closest('.layer').remove();
        // }
    }
});


module.exports = firstRecommendView;