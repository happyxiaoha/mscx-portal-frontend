var template = require('./confirmRecharge.html');

var updateStatusModel = Backbone.Model.extend({
    id: 'resourceId',
    url: mscxPage.request.demand + 'updateStatusBeforeRecharge.do'
});

var view = Backbone.View.extend({
    el: mscxPage.domEl.demandEl,
    events: {
        'click #nextBtn': 'goNext',
        'click #goBack': 'goBack'
    },
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.updateStatusModel = new updateStatusModel();
        this.updateStatusModel.set('id', this.model.get('id'));

        this.listenTo(this.updateStatusModel, 'sync', this.handleUpdateStatus);

        this.$el.html(this.template(this.model.toJSON()));
    },
    goNext: function() {
        this.updateStatusModel.save()
    },
    goBack: function() {
        location.href = 'userInfo.html#serversDemand';
    },
    handleUpdateStatus: function() {

    }
});

module.exports = view;