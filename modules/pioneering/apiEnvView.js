'use strict';

var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var Resource = require('./resource.js');
var template = '<div class="api-env rightMenuWrap fl boxShadiow boxSizing bgWhite common animate-content"></div>';

var cmsUrl = Resource.cmsHost + 'static_html/datainfo/apiinfo/index.html'

require('./pioneering.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    initialize: function() {
        this.leftMenuView = new leftMenuView({
            model: {
                className: 'pioneer',
                id: 'apiEnv',
                sideBars: Resource.maps
            }
        });

        this.$el.empty().append(this.leftMenuView.$el).append(template);

        this.$wrap = this.$('.rightMenuWrap');
        var me = this;
        
        // this.$wrap.load(cmsUrl + '?time=' + +(new Date()), function() {
        //     me.$wrap.removeClass('opacity0');
        // });
        this.$wrap.html('<div class="tit"><h2 class="ft16 cor5">API开发环境</h2></div><div class="envList mt16 boxSizing"><div class="clearfix"><div class="top-font clearfix"><div class="left-font fl boxSizing"><p class="ft14 cor5 mb20">开发者通过平台提供的API开发环境可方便、快捷地实现数据API的开发。API开发环境共分为两个部分：本地IDE工具以及云编译、云打包和云部署的SaaS平台。本地IDE工具提供了一套智能化的数据API生成工具，开发者仅需少量编码甚至零编码即可完成数据API的生成和封装。本地IDE工具同时支持团队的协同开发。生成的数据API在SaaS平台中经过云编译和云打包，可最终部署到平台中对外提供数据服务，供应用开发者调用。</p><img class="l-img" src="./static/20161129133718_n4o98gjqgb.png" alt=""><img src="./static/20161129133738_g14c20740w.png" alt=""><p class="ft14 mt25">详细的开发流程可参考:<a href="http://news.gzopendata.com/uploads/8/file/public/201701/20170118092210_qwsg7e3a64.pdf" target="_blank">                 <span  class="corBlue">API开发者手册</span>                  </a>                    </p></div><div class="right-img fr"><a href="contactUs.html#contact"><img src="./static/20161129145817_twcttdu6pg.png" target="_blank"/><span>免费下载IDE</span></a></div></div></div></div>')
        return this;
    }
});

module.exports = view;