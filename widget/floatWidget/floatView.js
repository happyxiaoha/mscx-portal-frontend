/**
 * Created by Administrator on 2016/12/19.
 */

var template = require('html!./float.html');
require('./float.css');


var floatView = Backbone.View.extend({
    tagName: 'div',
    events: {
        'click #gotoTop':'gotoTop'
    },
    initialize: function() {
        $('body').append(this.$el.html(template));
        $('a.showercode').hover(//为返回顶部增加鼠标进入的反馈效果，用添加删除css类实现
            function(){$('#erCode').fadeIn(100);},
            function(){$('#erCode').fadeOut(100);
            });
        this.init();
    },
    init: function () {
        $(window).scroll(function(){         //获取窗口的滚动条的垂直位置
            var s = $(window).scrollTop();   //当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
            if( s > 200){
                $("#gotoTop").fadeIn(100);

            }else{
                $("#gotoTop").fadeOut(200);

            }
        });
    },
    gotoTop: function() {
        $('html,body').animate({scrollTop:0},700);
    }
});

module.exports = floatView;