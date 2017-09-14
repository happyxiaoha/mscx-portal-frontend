'use strict';

var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var Resource = require('./resource.js');
var template = '<div class="server-env rightMenuWrap fl boxShadiow boxSizing bgWhite common animate-content "></div>';

var cmsUrl = Resource.cmsHost + 'static_html/datainfo/serverdev/index.html'

require('./pioneering.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    initialize: function() {
        this.leftMenuView = new leftMenuView({
            model: {
                className: 'pioneer',
                id: 'serverEnv',
                sideBars: Resource.maps
            }
        });

        this.$el.empty().append(this.leftMenuView.$el).append(template);
        this.$wrap = this.$('.rightMenuWrap');
        var me = this;

        // this.$wrap.load(cmsUrl + '?time=' + +(new Date()), function() {
        //     me.$wrap.removeClass('opacity0');
        // });

        this.$wrap.html('<div class="tit"><h2 class="ft16 cor5">服务开发环境</h2></div><div class="envList mt16 boxSizing"><div class="top-font"><div class="left-font boxSizing"><p class="ft16 cor5">服务控制台平台提供丰富的开发资源和模板，包括测试资源申请、生产资源申请、环境配置、测试功能、上线功能、数据库功能、状态监控，以及代码托管、持续集成功能。</p><a href="javascript:;" onclick="mscxPage.jumpDevelop();">点击进入</a></div><div class="AppProcess"><em class="block ft16 mt34">服务发布流程</em><img class="block" src="./static/20161129151715_c5swk29vwx.png" /></div></div></div>')

        return this;
    }
});

module.exports = view;