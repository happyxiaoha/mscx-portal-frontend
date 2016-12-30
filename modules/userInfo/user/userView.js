/**
 * Created by Kevin on 2016/12/6.
 */
var commonTemplate = require('html!./userCommon.html');
var template = require('html!./user.html');
require('./user.css');
require('validate');
require('formAjax');

var userInfoModel = Backbone.Model.extend({
    url: mscxPage.request.uc + 'user/info/mine.do'
});

var account = '';
var userView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {

    },
    renderUserCommon: function (isDisplay) {
        this.$el.html(_.template(commonTemplate)({name:'user',isDisplay:isDisplay}));
    },
    initialize: function() {
        var that = this;
        if(mscxPage.userInfo){
            var isDis = mscxPage.userInfo.userType == 'PARTNER_ORG' || mscxPage.userInfo.userType == 'PARTNER_GOV' ? true : false;
            that.renderUserCommon(isDis);
            that.initRender();
        }
        this.model = new userInfoModel();
        this.model.fetch();
        this.model.on('change',function () {
            var useType = that.model.get('result').userType;
            var isDis = useType == '合作伙伴'? true : false;
            that.renderUserCommon(isDis);
            that.initRender();
            that.render();
        });
    },
    render: function () {
        var temps = _.template($('#userInfo').html());
        var res = this.model.get('result');
        res = res || {
                account: '-',
                apiKey: '--',
                certification: '--',
                secretKey: '--',
                mobile: '--',
                userType: '--'
            };
        account = res.account;
        this.$el.find('#userInfoArea').html(temps(res));
    },
    initRender: function () {
        this.$el.find('#userInfoArea').html(template);
    }
});
module.exports = userView;