/**
 * Created by Kevin on 2016/12/6.
 */
var template = require('./message.html');
require('./message.css');
require('util');

var messageModel = Backbone.Model.extend({
    url: mscxPage.request.mes + 'msg/messageInfos.do'
});

var newsView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
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
            messsage = $this.data('message'),
            timmes = $this.data('time');
        var dialog = layer.open({
            type: 1,
            btn: ['关闭'],
            title: '消息详情',
            shade: 0.6,
            shadeClose: true,
            area: ['500px'],
            content: '<div style="overflow:hidden;"><p class="dig-con">'+messsage+'</p><p class="dig-time">'+new Date(timmes).format('yyyy-MM-dd HH:mm')+'</p></div>', //捕获的元素
            btn1: function () {          //通过
                layer.close(dialog);
            }
        });
    }
});
module.exports = newsView;