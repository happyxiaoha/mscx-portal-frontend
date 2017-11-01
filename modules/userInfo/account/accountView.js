'use strict';

var accountInfoModel = Backbone.Model.extend({
    url: mscxPage.request.account + 'getAccountInfo.do'
});

var rechargeView = require('./rechargeView.js');
var paymentRecordView = require('./consumeRecordView.js');
var rechargeRecordView = require('./rechargeRecordView.js');
var setPayPasswordView = require('./setPayPasswordView.js');


var accountView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterRight,
    initialize: function() {
        // 获取账户余额信息，同时更重要的是校验账户是否存在
        this.accountInfoModel = new accountInfoModel();

        this.listenTo(this.accountInfoModel, 'sync', this.render);

        this.accountInfoModel.fetch();
        // 账户是否存在标识，默认不存在
        this.hasAccount = false;
    },
    render: function() {
        var accountInfo = this.accountInfoModel.toJSON();

        var accountSubView = mscxPage.views['accountSubView'];
        accountSubView && accountSubView.undelegateEvents() && accountSubView.stopListening();

        // 如果账户不存在，那么跳转支付密码设置页面。同时，账户充值/充值记录/支出记录tab标签隐藏
        if(accountInfo.result == 'noAccount') {
            this.id = 'setPayPassword';
            this.currentView = new setPayPasswordView({
                model: _.pick(this, ['id', 'hasAccount'])
            });
        }else {
            this.hasAccount = true;
            switch(this.id) {
                case 'recharge':
                    this.currentView = new rechargeView({
                        model: _.extend(_.pick(this, ['id', 'hasAccount', 'accountInfoModel']), {
                            order: this.model.order,
                            serviceId: this.model.serviceId,
                            transferId: this.model.transferId
                        })
                    });
                    break;
                case 'setPayPassword':
                case 'forgetPayPassword':
                    this.currentView = new setPayPasswordView({
                        model: _.pick(this, ['id', 'hasAccount'])
                    });
                    break;
                case 'rechargeRecord':
                    this.currentView = new rechargeRecordView({
                        model: _.pick(this, ['id', 'hasAccount'])
                    });
                    break;
                case 'consumeRecord':
                    this.currentView = new paymentRecordView({
                        model: _.pick(this, ['id', 'hasAccount'])
                    });
                    break;
            }
        }
        mscxPage.views['accountSubView'] = this.currentView;
        this.$el.replaceWith(this.currentView.$el);
    }
});
module.exports = accountView;