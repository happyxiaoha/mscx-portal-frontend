/**
 * Created by Kevin on 2016/12/6.
 */
var recommendTemplate = require('./recommend.html');

var recommendView = Backbone.View.extend({
    template: _.template(recommendTemplate),
    events: {
    },
    typeMap: {
        '01': {
            name: 'API',
            code: 'api'
        },
        '02': {
            name: '数据',
            code: 'data'
        },
        '03': {
            name: '微服务',
            code: 'service'
        },
        '04': {
            name: 'SaaS',
            code: 'saas'
        }
    },
    initialize: function(obj) {
        this.$el.toggleClass('loading');
        this.model.fetch();


        this.listenTo(this.model,'sync',this.render);

    },
    render: function() {
        this.$el.toggleClass('loading');
        var nJson =  this.model.toJSON();
        this.$el.html(this.template({'dataList': nJson.result,'type': this.id, 'typeMap': this.typeMap}));
    }
});

module.exports = recommendView;
