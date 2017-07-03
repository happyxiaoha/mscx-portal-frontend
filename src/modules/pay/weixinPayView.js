'use strict';

var template = require('./weixinPayTemplate.html');
var QrCode = require('lib/qrCode.js');

var view = Backbone.View.extend({
    el: mscxPage.domEl.payEl,
    template: _.template(template, {variable: 'data'}),
    initialize: function() {
        this.$el.removeClass().addClass('pay-content');
    },
    render: function() {
        this.$el.html(this.template(this.model.order));
        this.$qrcode = this.$('#qrCode');

        var qrcode = new QrCode(this.$qrcode[0], {
            width : 200,
            height : 200
        });
        qrcode.makeCode(this.model.url);
        return this;
    }
});

module.exports = view;