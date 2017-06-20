/**
 * Created by Administrator on 2016/12/24.
 */

'use strict';
var template = require('./contactUs.html');
require('./contactUs.less');

var sentMessageModel = Backbone.Model.extend({
    url: mscxPage.request.mes + 'message/resMsg.do'
});

var mainView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    events: {
        'click #subMessage': 'addMessage',
        'click #clearMessage': 'clearMessage'
    },
    initialize: function() {
       this.$el.html(template);
    },
    clearMessage: function () {
        $('#name').val('');
        $('#email').val('');
        $('#phone').val('');
        $('#messageArea').val('');
    },
    addMessage: function () {
        var sName = $.trim($('#name').val()),
            sEmail = $.trim($('#email').val()),
            sPhone = $.trim($('#phone').val()),
            messageArea = $.trim($('#messageArea').val()),
            me = this;
        if(!sName) {
            layer.alert('姓名不能为空',{icon:2});
        }
        else if(!sEmail) {
            layer.alert('邮箱不能为空',{icon:2});
        }
        else if(!/^[\d,a-z]([\w\.\-]+)@([a-z0-9\-]+).([a-z\.]+[a-z])$/i .test( sEmail )){
            layer.alert('请输入正确的邮箱',{icon:2});
        }
        else if(!sPhone) {
            layer.alert('电话不能为空', {icon: 2});
        }
        else if(!/^1[34578]\d{9}$/.test( sPhone )){
            layer.alert('请输入正确的手机号码',{icon:2});
        }
        else if(!messageArea) {
            layer.alert('留言内容不能为空',{icon:2});
        }
        else if(messageArea.length > 500) {
            layer.alert('留言内容长度不能超过500',{icon:2});
        }
        else {
            new sentMessageModel().save(
                {
                    tel: sPhone,
                    email: sEmail,
                    userName: sName,
                    content: messageArea
                },{
                    success: function () {
                        layer.msg('留言成功!');
                        me.clearMessage();
                    }
                });
        }
    }
});

module.exports = mainView;