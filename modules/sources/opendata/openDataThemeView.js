/**
 * Created by Administrator on 2016/12/12.
 */


var openDataThemeTemplate = require('html!./openDataThemeView.html');


var openDataModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'getDataForTheme.do'
});

var openDataThemeView = Backbone.View.extend({
    template: _.template(openDataThemeTemplate),
    el: '.data-theme',
    initialize: function() {
        this.model = new openDataModel();

        this.model.fetch();
        this.listenTo(this.model,'sync',this.render);
    },
    render: function() {
        var nJson =  this.model.toJSON();
        this.$el.html(this.template({'dataList': nJson.result}));
    }
});


module.exports = openDataThemeView;
