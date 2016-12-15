'use strict';

var template = require('html!./share.html');
var QrCode = require('./qrCode.js');

require('./share.css');

var view = Backbone.View.extend({
    tagName: 'div',
    className: 'share posAB',
    events: {
        'click #shareWeixin': 'shareWeixin',
        'click #shareQzone': 'shareQzone',
        'click #shareWeibo': 'shareWeibo'
    },
    template: _.template(template),
    initialize: function() {
        this.$el.html(this.template(this.model));
        
        this.url = encodeURIComponent(location.href);
        this.title = document.title;
        this.desc = '欢迎访问广州大数据共创服务平台';
        this.pic = '';

        this.$qrcode = this.$('#qrcode');

        this.sinaAppkey = '';

        return this;
    },
    shareQzone: function() {
        var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ this.url +'&site=' + this.url + '&title=' + this.title + '&desc='+ this.desc + "&pics=" + this.pic;  
        this.open(url);
    },
    shareWeibo: function() {
        var url = 'http://service.weibo.com/share/share.php?url=' + this.url + '&appkey=' + this.sinaAppkey + '&site=' + this.url + '&title=' + this.title + "&pic=" + this.pic;  
        this.open(url)
    },
    shareWeixin: function() {
        if(this.$qrcode.data('loaded')) {
            this.$qrcode.toggleClass('hide');
            return;
        }

        var qrcode = new QrCode(this.$qrcode[0], {
            width : 90,
            height : 90
        });
        qrcode.makeCode(this.url);
        this.$qrcode.data('loaded', 'loaded');
    },
    open: function(url) {
        window.open(url, '', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
    }
});

module.exports = view;