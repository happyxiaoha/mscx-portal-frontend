/**
 * Created by Kevin on 2016/12/6.
 */
var commonTemplate = require('html!./saasCommon.html');
var mySaasTemps = require('html!./mySaas.html');
require('./saas.css');
require('util');

var mySaaSModel = Backbone.Model.extend({
    url: mscxPage.request.saas + 'attention/list.do'
});

var mySaasView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    pagObj: {
        pageSize: 5,
        pageNum: 1,
        totalPage: 0
    },
    events: {
        'click .next-page': 'changePage'
    },
    initialize: function() {
        var that = this;
        this.$el.addClass('user-center-tap');
        this.$el.html(_.template(commonTemplate)({name:'mySaas'}));
        /*
        this.model.on('change',function () {
            that.renderCarArea();
        });
        this.model.fetch({
            data: {
                pageSize: this.pagObj.pageSize,
                page: this.pagObj.pageNum,
                t: new Date().getTime()
            }
        });
        */
        this.render();
    },
    render: function () {
        this.$el.find('#saasInfo').html(mySaasTemps);
    }
});

module.exports = mySaasView;