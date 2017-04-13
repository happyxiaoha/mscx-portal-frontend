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
// 最新上架的3个接口
var latestDataModel = Backbone.Model.extend({
    idAttribute: 'latestDataId',
    id: 'latestData',
    url: mscxPage.request.data + 'getLastestDataCount.do'
});
var latestAPIModel = Backbone.Model.extend({
    idAttribute: 'latestDataId',
    id: 'latestAPI',
    url: mscxPage.request.api + 'service/getLastestApiCount.do'
});
var latestServerModel = Backbone.Model.extend({
    idAttribute: 'latestServerId',
    id: 'latestServer',
    url: mscxPage.request.app + 'getLastestAppCount.do'
});
// 我的需求的3个接口
var myDataDemandCount = Backbone.Model.extend({
    idAttribute: 'dataDemandId',
    id: 'dataDemandCount',
    url: mscxPage.request.demand + 'queryAllDataCount.do'
});
var myAPIDemandCount = Backbone.Model.extend({
    idAttribute: 'apiDemandId',
    id: 'apiDemandCount',
    url: mscxPage.request.demand + 'queryAllApiCount.do'
});
var myServiceDemandCount = Backbone.Model.extend({
    idAttribute: 'serviceDemandId',
    id: 'serviceDemandCount',
    url: mscxPage.request.demand + 'queryAllServiceCount.do'
});
// 获取账户余额
var accountInfoModel = Backbone.Model.extend({
    id: 'balance',
    url: mscxPage.request.account + 'getAccountInfo.do'
});
// 获取积分规则
var pointRuleModel = Backbone.Model.extend({
    url: mscxPage.request.point + 'point/getPointRuleList.do'
});
var template = require('html!./userInfoDefault.html');
require('./userInfoDefault.css');
var apiItemView = require('apiItemWidget/apiItemView.js');
var serverItemView = require('servicesItemWidget/servicesItemView.js');

var defaultView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    events: {
        'blur .info-line input':'changeAttribute',
        'click .btn-recharge': 'goRecharge',
        'mouseenter .bonus': 'showBonusTip',
        'click .bonus': 'goPoint'
    },
    initialize: function() {
        var that = this;
        this.$el.html(template);
        this.$sdataList = this.$('.server-data-list');
        this.$adataList = this.$('.api-data-list');
        this.pointRuleTemplate = _.template($('#pointRule').html(), {variable: 'data'});
        
        this.model = new defaultModel();
        this.myApiListModel = new myApiListModel();
        this.myServerListModel = new myServerListModel();

        this.latestDataModel = new latestDataModel();
        this.latestAPIModel = new latestAPIModel();
        this.latestServerModel = new latestServerModel();

        this.myDataDemandCount = new myDataDemandCount();
        this.myAPIDemandCount = new myAPIDemandCount();
        this.myServiceDemandCount = new myServiceDemandCount();

        this.accountInfoModel = new accountInfoModel();
        this.pointRuleModel = new pointRuleModel();

        this.myApiListModel.on('change',function () {
            that.renderMyApi();
        });
        this.myServerListModel.on('change',function () {
            that.renderMyServer();
        });
        this.latestDataModel.on('change', this.renderCount);
        this.latestAPIModel.on('change', this.renderCount);
        this.latestServerModel.on('change', this.renderCount);

        this.myDataDemandCount.on('change', this.renderCount);
        this.myAPIDemandCount.on('change', this.renderCount);
        this.myServiceDemandCount.on('change', this.renderCount);

        this.listenTo(this.accountInfoModel, 'sync', this.renderBalance);
        this.listenTo(this.pointRuleModel, 'sync', this.renderPointRule);

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

        this.myDataDemandCount.fetch();
        this.myAPIDemandCount.fetch();
        this.myServiceDemandCount.fetch();

        this.accountInfoModel.fetch();
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
    // 这个方法的this指向model自身
    renderCount: function() {
        $('#' + this.id).html(this.toJSON().result);
    },
    renderBalance: function() {
        var result = this.accountInfoModel.toJSON().result;
        //未开通账户
        if(result == 'noAccount') {
            this.$('.btn-recharge').html('设置账户');
            this.$('#balanceNum').text('--');
        }else {
            this.$('#balanceNum').text(result.account_balance);
        }
    },
    renderPointRule: function() {
        var model = this.pointRuleModel.toJSON();
        var html = this.pointRuleTemplate(model.result);
        this.tipIndex = layer.tips(html, '.bonus', {
            tips: [2, '#fffeed'],
            time: 0,
            maxWidth: 300
        });
    },
    goRecharge: function() {
        location.href = '#account';
    },
    showBonusTip: function() {
        var model = this.pointRuleModel.toJSON();

        // 已经显示着了
        if(this.tipIndex) {return;}

        if(model.result) {
            this.renderPointRule();
        }else {
            this.pointRuleModel.fetch();
        }

        $(document).on('click.ruleTip', this.closeRuleTip.bind(this));
    },
    closeRuleTip: function() {
        layer.close(this.tipIndex);
        this.tipIndex = undefined;
        $(document).off('.ruleTip');
    },
    goPoint: function() {
        location.href = '#point';
    }
});

module.exports = defaultView;