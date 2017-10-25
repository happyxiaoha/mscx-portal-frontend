/**
 * ================================================
 * 作    者：Hope Chen
 * 版    本：1.0
 * 创建日期：2017/10/18 9:31
 * 描    述：云点餐视图
 * 修订历史：
 * ================================================
 */
'use strict';
var template = '<div id="contentPart" class="grid1190 common opacity0"></div>';

var getUserMsg = Backbone.Model.extend({
    url: mscxPage.host + '/briefInfo.do?'
});

var kuaidianModel = Backbone.Model.extend({
    url: mscxPage.request.kuaidian + 'orderLog/save.do'
});

var kuaidianView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    events: {},
    initialize: function () {
        this.$el.empty().append(template);
        /* 获取用户信息 */
        this.model = new getUserMsg();
        this.model.fetch({
            data: {
                t: new Date().getTime()
            }
        });
        this.listenTo(this.model, 'sync', this.render);

        this.kuaidianModel = new kuaidianModel();
    },

    render: function () {
        var nJson = this.model.toJSON();
        mscxPage.userInfo = nJson.result;
        if (!mscxPage.isLogin()) {
            return;
        }
        // window.location.href = mscxPage.request.kuaidian + "index.do";

        this.kuaidianModel.save({
            storeId: getUrlParam("store_id"),
            tableNo: getUrlParam("zh")
        }, {
            type: 'POST',
            success: this.kuaidianCallback
        });
    },
    kuaidianCallback: function (res) {
        var rtnData = res.toJSON();
        if (rtnData.status !== 'OK') {
            // location.href = result.result;
            layer.msg(rtnData.message);
            return;
        }
        window.location.href = rtnData.result;
    }
});

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r !== null) return unescape(r[2]);
    return null; //返回参数值
}

module.exports = kuaidianView;