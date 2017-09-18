/**
 * Created by Kevin on 2016/12/6.
 */
var template = require('./message.html');
var detailTemplate = require('./messageDetail.html');
require('util');

var messageModel = Backbone.Model.extend({
    url: mscxPage.request.mes + 'msg/messageInfos.do'
});

var newsView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    detailTemplate: _.template(detailTemplate, {variable: 'data'}),
    events: {
        'click .mes-li': 'messageDes'
    },
    initialize: function() {
        var that = this;
        this.model = new messageModel();
        this.model.fetch();
        this.model.on('change',function(){that.render();});
    },
    render: function () {
        var temps = _.template(template);
        this.$el.html(temps({messageList:this.model.get('result')}));
    },
    messageDes: function (e) {
        var $this = $(e.target),
            index = $this.data('index'),
            item = this.model.get('result')[index];


        var attachmentUrl;
        var rawMsgContent;
        if(item.msgContent.indexOf('attachment') > -1) {
            rawMsgContent = item.msgContent;
            item.msgContent = rawMsgContent.slice(0, rawMsgContent.indexOf('<%'))
            attachmentUrl = rawMsgContent.slice(rawMsgContent.indexOf('attachment'), -2)
            attachmentUrl = attachmentUrl.split('attachment=')[1]

            item.msgContent = item.msgContent + '附件：<a href="' + attachmentUrl + '" target="_blank">点击查看</a>'
        }

        var dialog = layer.open({
            type: 1,
            btn: ['关闭'],
            title: '消息详情',
            shade: 0.6,
            shadeClose: true,
            area: ['500px', '300px'],
            content: this.detailTemplate(item),
            btn1: function () {          //通过
                layer.close(dialog);
            }
        });
    }
});
module.exports = newsView;