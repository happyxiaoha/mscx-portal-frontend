/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./demand.html');
require('./demand.css');

var userModel = Backbone.Model.extend({
    url: mscxPage.host+'/user/info.do'
});
var demandApi = '/ro/mscx-requirement-api/';
var demandListModel = Backbone.Model.extend({
    url: mscxPage.host+''+demandApi+'queryData.do'
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
    pagObj: {
        pageSize: 10,
        pageNum: 1
    },
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
        this.templete = _.template($('#resourcesDemandList').html());

        this.model = new demandListModel();
        this.model.on('change',this.render);
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum
            }
        });
        this.render();
    },
    render: function () {
        this.$el.html(this.templete({demandList:[]}));
    }
});

module.exports = demandView;