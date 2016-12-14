/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./account.html');
require('./account.css');

var userModel = Backbone.Model.extend({
    url: mscxPage.host+'/user/info.do'
});

var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'click #accountTabs span': 'changeTab'

    },
    changeTab: function (e) {
        var $this = $(e.target),
            isActive = $this.hasClass('active'),
            index = $this.index();
        if(!isActive){
            $this.parent().find('.active').removeClass('active');
            $this.addClass('active');
            new this.childView[index]({el: '#accountInfo'});
        }
    },
    initialize: function() {
        this.childView = [accountSourcesView,accountApplyView];
        this.$el.html(template);
        new accountSourcesView({el: '#accountInfo'});
    }
});
var accountSourcesView = Backbone.View.extend({
    events: {
        'click #applyTab': 'changeTab'
    },
    initialize: function() {
        this.template = _.template($('#accountSources').html());
        //this.model.fetch();
        this.render();
    },
    changeTab: function (e) {
        var $this = $(e.target),
            isActive = $this.hasClass('active'),
            index = $this.index();
        if(!isActive){
            var $nowActive = $this.parent().find('.active'),
                $colsList = this.$el.find('.M-downCons'),
                nowIndex = $nowActive.index();
            $nowActive.removeClass('active');
            $this.addClass('active');
            $($colsList[nowIndex]).toggleClass('hide');
            $($colsList[index]).toggleClass('hide');
            $nowActive = null;$colsList = null;
        }
    },
    render: function () {
        var res = {
            userInfo: '1',
            status: '未认证',
            apiKey: 'dasdsa',
            secretKey: '64517dd09056a42997c36ae3a8b0d354444464517dd0905e',
            telephone: '123444333',
            userType: 'sadsa'
        };
        this.$el.html(this.template(res));
    }
});
var accountApplyView = Backbone.View.extend({
    events: {
    },
    initialize: function() {
        this.template = _.template($('#accountApply').html());
        //this.model.fetch();
        this.render();
    },
    render: function () {
        var res = {
            userInfo: '1',
            status: '未认证',
            apiKey: 'dasdsa',
            secretKey: '64517dd09056a42997c36ae3a8b0d354444464517dd0905e',
            telephone: '123444333',
            userType: 'sadsa'
        };
        this.$el.html(this.template(res));
    }
});
module.exports = accountView;