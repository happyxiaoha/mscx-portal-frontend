/**
 * Created by Kevin on 2016/12/6.
 */
var defaultModel = Backbone.Model.extend({
    url: mscxPage.host+'/personal/dashboard.do'
});
var myApiListModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'api/getSelfApiList.do'
});

var myServerListModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'attention/list.do'
});
var latestDataModel = Backbone.Model.extend({
    url: mscxPage.request.data + 'getLastestDataCount.do'
});
var latestAPIModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/getLastestApiCount.do'
});
var latestServerModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'getLastestAppCount.do'
});
var template = require('html!./userInfoDefault.html');
require('./userInfoDefault.css');
var apiItemView = require('apiItemWidget/apiItemView.js');
var serverItemView = require('servicesItemWidget/servicesItemView.js');

var defaultView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'blur .info-line input':'changeAttribute'
    },
    initialize: function() {
        var that = this;
        this.$el.html(template);
        this.$sdataList = this.$('.server-data-list');
        this.$adataList = this.$('.api-data-list');
        this.model = new defaultModel();
        this.myApiListModel = new myApiListModel();
        this.myServerListModel = new myServerListModel();

        this.latestDataModel = new latestDataModel();
        this.latestAPIModel = new latestAPIModel();
        this.latestServerModel = new latestServerModel();

        this.myApiListModel.on('change',function () {
            that.renderMyApi();
        });
        this.myServerListModel.on('change',function () {
            that.renderMyServer();
        });
        this.latestDataModel.on('change', this.renderDataCount.bind(this));
        this.latestAPIModel.on('change', this.renderAPICount.bind(this));
        this.latestServerModel.on('change', this.renderServerCount.bind(this));

        this.model.fetch();
        this.myApiListModel.fetch({
            data: {
                page: 1,
                pageSize: 4
            }
        });
        this.myServerListModel.fetch({
            data: {
                page: 1,
                pageSize: 2
            }
        });
        this.model.on('change',function () {
            that.render();
        });

    },
    renderMyApi: function () {
        var apiList = this.myApiListModel.get('result').list;
        if(apiList.length > 0){
            this.$adataList.html('');
            $('.R-myServerList').css('border','1px solid #CCC');
            _.each(apiList, function(item) {
                var chargeType = item.typeStatus;
                var newItem = {
                    apiServiceId : item.sourceId,
                    iconUrl: item.logoUrl,
                    apiServiceName: item.apiName,
                    viewCnt: item.viewCnt || 0,
                    applyCnt: item.applyCnt || 0,
                    accessCnt: item.accessCnt || 0,
                    price: item.price || 0,
                    chargeCount: item.chargeCount || 0,
                    chargeType: chargeType,
                    chargeTypeDesc: item.chargeType
                };
                var view = new apiItemView({
                    model: newItem
                });
                this.$adataList.append(view.$el);
            }.bind(this));
        }
    },
    render: function () {
        var dasTemplate = _.template($('#userDefault').html());
        $('#dashboardAll').html(dasTemplate({'res':this.model.get('result')}));
        this.latestDataModel.fetch();
        this.latestAPIModel.fetch();
        this.latestServerModel.fetch();
    },
    renderMyServer: function () {
        var apiServiceList = this.myServerListModel.get('result').list;
        if(apiServiceList.length > 0){
            this.$sdataList.html('');
            $('.R-myServerList').css('border','1px solid #CCC');
            _.each(apiServiceList, function(item) {
                var view = new serverItemView({
                    model: item
                });
                this.$sdataList.append(view.$el);
            }.bind(this));
        }
    },
    renderDataCount: function() {
        var model = this.latestDataModel.toJSON();
        this.$('#latestData').html(model.result);
    },
    renderAPICount: function() {
        var model = this.latestAPIModel.toJSON();
        this.$('#latestAPI').html(model.result);
    },
    renderServerCount: function() {
        var model = this.latestServerModel.toJSON();
        this.$('#latestServer').html(model.result);
    }
});

module.exports = defaultView;