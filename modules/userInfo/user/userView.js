/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('html!./user.html');
require('./user.css');

var userModel = Backbone.Model.extend({
    url: mscxPage.host+'/user/info.do'
});

var userView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'click .topTab span': 'changeTab'

    },
    changeTab: function (e) {
        var $this = $(e.target),
            index = $this.index();
        new this.childView[index]({el: '#userInfoArea',model: this.userInfoModel})
    },
    initialize: function() {
        this.childView = [userInfoView,userAuthenticationView,userPasswordView];
        this.userInfoModel = new userModel();
        this.$el.html(template);
        debugger;
        new userInfoView({el: '#userInfoArea',model: this.userInfoModel});
    }
});
var userInfoView = Backbone.View.extend({
    events: {
        'blur .info-line input':'changeAttribute'
    },
    initialize: function() {
        this.template = _.template($('#userInfo').html());
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
var userAuthenticationView = Backbone.View.extend({
    events: {
        'blur .info-line input':'changeAttribute'
    },
    initialize: function() {
        this.template = _.template($('#userAuthentication').html());
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
var userPasswordView = Backbone.View.extend({
    events: {
        'blur .info-line input':'changeAttribute'
    },
    initialize: function() {
        this.template = _.template($('#userPassword').html());
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
module.exports = userView;