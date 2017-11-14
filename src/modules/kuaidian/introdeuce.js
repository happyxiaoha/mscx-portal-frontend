/**
 * ================================================
 * 作    者：Hope Chen
 * 版    本：1.0
 * 创建日期：2017/11/14 17:04
 * 描    述：
 * 修订历史：
 * ================================================
 */
var introdeuceTemplate = require('./introdeuce.html');
require('./kuaidian.css');

var introdeuceView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    template: _.template(introdeuceTemplate, {variable: 'data'}),

    initialize: function () {
        this.$el.html(this.template());
    }
});

module.exports = introdeuceView;