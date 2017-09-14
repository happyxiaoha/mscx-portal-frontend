'use strict';

var template = '<div class="ns-contentComponent animate-content"></div>';

var developCheck = Backbone.Model.extend({
    url: mscxPage.host+'/developer/portal.do'
});
var ethinkCheck = Backbone.Model.extend({
    url: mscxPage.host+'/ethink/redirectToEthink.do'
});

var resource = {
    // apiEnv: {
    //     url: '/static_html/datainfo/gy_apiEnv/index.html'
    // },
    bigData: {
        param: 2,
        url: '/static_html/datainfo/gy_bigData/index.html',
        html: '<div class="ns-content"><div class="ns-content-head">            服务开发环境</div><div class="ns-article"><div class="container-fluid"><div class="col-md-12"><div class="ns-articleText"><p>应用控制台平台提供丰富的开发资源和模板，包括测试资源申请、生产资源申请、环境配置、测试功能、上线功能、数据 库功能、状态监控，以及代码托管、持续集成功能。</p></div><div class="ns-articleText"><h4>应用发布流程</h4></div><div class="row"><div class="col-md-9"><div class="ns-articleImgWrap"><img src="./static/20170515181623_blcyjnn4j5.png"></div><p class="ft14 mt25">详细的开发流程可参考:<a href="./static/20170508140916_sakn61vm1q.docx" target="_blank">                  <span  class="corBlue">操作手册</span>                  </a>                    </p></div><div class="col-md-2"><div class="ns-article-sider"><div class="siderLink">                       <a href="javascript:;" class="toDevelop"><div class="imgWrap"><img src="./static/20170412143239_22j7d9r6ea.jpg"></div><span>点击进入</span>                        </a></div></div></div></div></div></div></div></div>'
    },
    dataVisiual: {
        param: 1,
        url: '/static_html/datainfo/gy_dataVisiual/index.html',
        html: '<div class="ns-content"><div class="ns-content-head">            数据可视化开发</div><div class="ns-article"><div class="container-fluid"><div class="col-md-12"><div class="ns-articleText"><p>商务智能是利用数据仓库、数据挖掘技术对数据迚行系统的储存和管理，幵通过各种数据统计分析工具迚行分析，提 供各种分析报告，如客户价值评价、客户满意度评价、服务质量评价、营销效果评价、未来市场需求等，为企业的经 营活劢提供决策信息。大数据双创成果交易平台是业界唯一的端到端的 hadoop、spark 平台上的大数据商务智能平台平台。目标是简化大 数据分析的过程，让人人都能够快速从数据获得决策智慧。</p><hr/></div><div class="row"><div class="col-md-9"><div class="ns-articleImgWrap"><img src="./static/20170412143411_uas2c6fkw6.jpg"></div></div><div class="col-md-2"><div class="ns-article-sider">                              <a href="javascript:;" class="toEthink"><div class="siderLink">                             <div class="imgWrap"><img src="./static/20170412143422_fjdux3q3kj.jpg"></div><span>点击进入</span></div></a></div></div></div><div class="row"><div class="col-md-9"><div class="ns-articleImgWrap"><img src="http://news.shuchuangyi.com/uploads/8/image/public/201704/20170412143419_n3732v2v4h.jpg"></div><p class="ft14 mt25">详细的开发流程可参考:<a href="http://news.shuchuangyi.com/uploads/8/file/public/201705/20170508142009_eia0990aic.pdf" target="_blank">                 <span  class="corBlue">操作手册</span>                  </a>                    </p></div></div></div></div></div></div>'
    },
    serverEnv: {
        url: '/static_html/datainfo/gy_serverEnv/index.html',
        html: '<div class="ns-content"><div class="ns-content-head">            大数据分析建模</div><div class="ns-article"><div class="container-fluid"><div class="col-md-12"><div class="ns-articleText"><p>                           建模工具是大数据双创成果交易平台的核心能力，平台提供丰富的建模方式以及灵活的操作方法，数据可视化是建模工具的成果体现</p><hr/></div><div class="row"><div class="col-md-9"><div class="ns-articleImgWrap"><img src="./static/20170412143510_1yo6lar7wy.jpg"></div><p class="ft14 mt25">详细的开发流程可参考:<a href="http://news.shuchuangyi.com/uploads/8/file/public/201705/20170508142028_2ml0sefjc9.pdf" target="_blank">                    <span  class="corBlue">操作手册</span>                  </a>                    </p></div><div class="col-md-2"><div class="ns-article-sider"><div class="siderLink">                       <a href="javascript:;" class="toEthink"><div class="imgWrap"><img src="./static/20170412143512_mvgnak6raa.jpg"></div><span>点击进入</span>                         </a></div></div></div></div></div></div></div></div>'
    }
}

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    events: {
        'click .toDevelop': 'jumpDevelop',
        'click .toEthink': 'jumpEThink'
    },
    initialize: function() {
        this.$el.html(template);
        this.$wrap = this.$('.ns-contentComponent');
        var me = this;

        this.$wrap.html(resource[this.id].html)

        return this;
    },
    jumpDevelop: function() {
        new developCheck().fetch({
            async: false,
            success: function(model) {
                var res = model.toJSON();
                if(res.status == 'OK') {
                    // location.href = res.result;
                    window.open(res.result);
                }
            }
        });
    },
    jumpEThink: function() {
        new ethinkCheck().fetch({
            data: {
                action: resource[this.id].param
            },
            async: false,
            success: function(model) {
                var res = model.toJSON();
                if(res.status == 'OK') {
                    // location.href = res.result;
                    window.open(res.result);
                }
            }
        });
    }
});

module.exports = view;