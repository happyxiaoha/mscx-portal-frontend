/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./demand.html');
require('./demand.css');

var userModel = Backbone.Model.extend({
    url: mscxPage.host+'/user/info.do'
});

var demandView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'click #demandTabs span': 'changeTab'

    },
    changeTab: function (e) {
        var $this = $(e.target),
            isActive = $this.hasClass('active'),
            index = $this.index();
        if(!isActive){
            $this.parent().find('.active').removeClass('active');
            $this.addClass('active');
           // new this.childView[index]({el: '#accountInfo'});
        }
    },
    initialize: function() {
        this.childView = [];
        this.$el.html(template);
        new resourcesDemandListView({el: '#demandInfo'});
    }
});

var resourcesDemandListView = Backbone.View.extend({
    events: {
    },
    changeTab: function (e) {
        var $this = $(e.target),
            isActive = $this.hasClass('active'),
            index = $this.index();
        if(!isActive){
            $this.parent().find('.active').removeClass('active');
            $this.addClass('active');
            // new this.childView[index]({el: '#accountInfo'});
        }
    },
    initialize: function() {
        this.childView = [];
        this.$el.html($('#resourcesDemandList').html());
        //new accountSourcesView({el: '#accountInfo'});
    }
});

module.exports = demandView;