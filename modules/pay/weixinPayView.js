'use strict';

var template = require('html!./weixinPayTemplate.html');
var QrCode = require('lib/qrCode.js');
require('./pay.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.payEl,
    initialize: function() {
        this.$el.removeClass().addClass('pay-content').html(template);
    },
    render: function() {
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