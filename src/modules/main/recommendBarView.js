/**
 * Created by qin on 2016/12/6.
 */
var recommendBarTemplate = require('html!./recommendBar.html');

var recommendBarView = Backbone.View.extend({
    template: _.template(recommendBarTemplate),
    events: {
    },
    initialize: function() {
        this.$el.toggleClass('loading');
            this.model.fetch();
            this.listenTo(this.model,'sync',this.render);
        },
        render: function() {
            this.$el.toggleClass('loading');
            var nJson =  this.model.toJSON();
            if(this.id === 'api'){
                this.$el.html(this.template({'dataList': nJson.result,'type': 'api'}));
            }
            else {
                this.$el.html(this.template({'dataList': nJson.result,'type': 'ser'}));
            }
        }
});


module.exports = recommendBarView;
