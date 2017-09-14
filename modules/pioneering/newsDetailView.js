'use strict';

var shareView = require('shareWidget/shareView.js');
require('./pioneering.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    initialize: function() {
        this.$el.empty();

        var me = this;

        this.shareView = new shareView({
            className: 'share posAB'
        });

        // this.$el.load(decodeURIComponent(this.model.url) + '?time=' + +(new Date()), function() {
        //     me.$el.removeClass('opacity0');
        //     // 添加分享组件
        //     me.$('.TopTit').addClass('pr').append(me.shareView.$el);
        // });

        this.$el.html('<div class="noticeListCons grid960 bgWhite"><div class="TopTit"><h2>广州市委举办第四届青年创新创业大赛</h2><div class="clearfix titList posRE"><p class="fl article"><a href="http://news.sina.com.cn/o/2016-12-26/doc-ifxyxqsk6697195.shtml" target="_blank">中国青年报</a>|                发布时间：2017-01-06 16:38</p></div></div><div class="downCons mt30" style="min-height:300px"><p class="tit2">本报讯</p><p>本报讯&#xff08;中国青年报·中青在线记者 章正&#xff09;“通过青创大赛平台&#xff0c;我参加各种项目路演和风投对接会&#xff0c;得到广州青年创业导师团指导。目前&#xff0c;项目在反复打磨中。”第三届广州青年创业大赛初创组一等奖获得者李济帆表示。</p><p><br /></p><p>　　12月20日&#xff0c;“青创杯”第四届广州青年创新创业大赛启动仪式暨国际青年创新创业广州高峰论坛在广州塔举行&#xff0c;该赛事在广州设立11个分赛场&#xff0c;单独设立互联网、电子商务、高新技术&#xff08;生物医药&#xff09;、文化创意、涉农等6个专项赛。</p><p><br /></p><p>　　今年12月至2017年2月&#xff0c;个人或团体均可在大赛官方网站&#xff08;http&#xff1a;//gzcy.youths.org.cn&#xff09;选择相应的分赛场或专项赛&#xff0c;按照要求填写报名表及规划书进行报名参赛。2017年3月&#xff0c;各分赛场及各专项赛举行初赛&#xff0c;3&#xff5e;4月举行复赛&#xff0c;5月举行总决赛&#xff0c;之后为成果展示及落地孵化服务阶段。</p><p><br /></p><p>　　本届大赛提供奖金及各项政策补贴逾280万元。此外&#xff0c;还有来自政府各部门提供的政策支持&#xff0c;整合孵化基地、媒体、技术、企业、导师等资源的“大礼包”以及青年创新创业服务券&#xff0c;用于场地、培训、招聘、政务服务的服务兑换。</p><p><br /></p><p>　　团广州市委依托青创大赛&#xff0c;进一步完善“大赛&#43;基地&#43;资金&#43;导师&#43;培训”的办赛模式&#xff0c;搭建“青创广州”十大青年创新创业培育平台&#xff0c;为创业青年提供“知识、人脉、资源、舞台、社区”等五大专业性、基础性服务&#xff0c;构建“培训提升—展示交流—要素对接”一站式广州青年创新创业服务链&#xff0c;不断优化青年创业生态&#xff0c;提升青年的创业能力。</p><p><br /></p><p>　　团广州市委自2013年起先后举办三届广州青年创业大赛&#xff0c;共吸引来自国内外院校、青年创业社区等近100个单位的4402个创业项目参赛&#xff0c;线上线下共覆盖超过10万青年&#xff0c;促成青年创业项目投资金额逾1.837亿元。</p><p><br /></p><p >（责任编辑： datainfo）</p></div></div>')
        this.$('.TopTit').addClass('pr').append(me.shareView.$el);


        return this;
    }
});

module.exports = view;