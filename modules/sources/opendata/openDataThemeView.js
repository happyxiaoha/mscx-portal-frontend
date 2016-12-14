/**
 * Created by Administrator on 2016/12/12.
 */


var openDataThemeTemplate = require('html!./openDataThemeView.html');


var openDataModel = Backbone.Model.extend({
    url: mscxPage.host+'/ro/mscx-data-api/getDataForTheme.do'
});

var openDataThemeView = Backbone.View.extend({
    template: _.template(openDataThemeTemplate),
    el: '.data-theme',
    initialize: function() {
        this.model = new openDataModel();

        this.$el.toggleClass('loading');
        this.model.fetch();
        this.listenTo(this.model,'sync',this.render);
    },
    render: function() {
        this.$el.toggleClass('loading');
        var nJson =  this.model.toJSON();
        this.$el.html(this.template({'dataList': nJson.result}));
    }
});


module.exports = openDataThemeView;
