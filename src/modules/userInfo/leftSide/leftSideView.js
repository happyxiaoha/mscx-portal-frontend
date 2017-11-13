/**
 * Created by Kevin on 2016/12/6.
 */

var template = require('./leftSide.html');
require('./leftSide.css');

var applyApiListModel = Backbone.Model.extend({
    url: mscxPage.request.order + 'api/getSelfApiList.do'
});

var leftSideView = Backbone.View.extend({
    el: mscxPage.domEl.userCenterLeft,
    events: {},
    initialize: function (name) {
        this.name = name;
        this.myApiModel = new applyApiListModel();

        this.listenTo(this.myApiModel, 'sync', this.doCheck);

        if (!mscxPage.isCheckPhone) {
            this.myApiModel.fetch({
                data: {
                    pageSize: 200010,
                    page: 1
                }
            });
        }
        else {
            this.render();
        }
    },
    doCheck: function () {
        var aRes = this.myApiModel.get('result');
        if (aRes) {
            if (aRes.list.length > 0) {
                for (var i = 0, len = aRes.list.length; i < len; i++) {
                    var obj = aRes.list[i],
                        sourceId = obj.sourceId;
                    if (sourceId == 529569) {//529569
                        mscxPage.isPhoto = true;
                        break;
                    }
                }
            }
            mscxPage.isCheckPhone = true;
            this.render();
        }
        else {
            this.render();
        }
    },
    render: function () {
        var sName = this.name || '';
        this.$el.addClass('bod').html(_.template(template)({
            name: sName,
            isDisPhone: mscxPage.isPhoto
        }));
        console.log("mscxPage.userInfo.flagMerchant=" + mscxPage.userInfo.flagMerchant);
        if (mscxPage.userInfo.flagMerchant === "1") {
            $("#merchantMrgBtn").show();
        }
    }
});

module.exports = leftSideView;