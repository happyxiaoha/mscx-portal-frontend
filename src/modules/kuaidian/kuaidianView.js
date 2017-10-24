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

var kuaidianModel = Backbone.Model.extend({
    url: mscxPage.request.kuaidian + 'orderLog/save'
});

var kuaidianView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    events: {},
    initialize: function () {
        this.$el.empty().append(template);
        this.kuaidianModel = new kuaidianModel();
        this.kuaidianModel.fetch({});
        this.listenTo(this.kuaidianModel, 'sync', this.render);
    },

    render: function () {
        var result = this.kuaidianModel.toJSON();
        if (result.code !== 200) {
            layer.msg(result.message);
            return;
        }
        var base = new Base64;
        var kuaidianParam = "channel=scy" +
            "&store_id=" + getUrlParam("store_id") +
            "&zh=" + getUrlParam("zh") +
            "&uid=" + mscxPage.userInfo.userId +
            "&uname=" + mscxPage.userInfo.account +
            "&mobile=" + mscxPage.userInfo.mobile;

        window.location.href = "http://kuaidian.bizsov.com/index.php/wap/passport-scy_login.html" +
            "?sign=" + encodeURI(base.encode(kuaidianParam));
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