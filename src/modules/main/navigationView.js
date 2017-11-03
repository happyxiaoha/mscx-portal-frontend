/**
 * Created by Kevin on 2016/12/6.
 */
var navigationTemplate = require('./navigation.html');

var navigationApiView = Backbone.View.extend({
    template: _.template(navigationTemplate),
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
        this.$el.html(this.template({'dataList': nJson.result,'type': this.id}));
    }
});


module.exports = navigationApiView;
