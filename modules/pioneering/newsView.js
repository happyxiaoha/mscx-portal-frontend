'use strict';

var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var Resource = require('./resource.js');
var template = '<div class="layLeft common clearfix fl bgBoxShodow animate-content"></div>';

var cmsUrl = Resource.cmsHost + 'static_html/datainfo/latestnews/index.html';

require('./pioneering.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    initialize: function() {
        this.leftMenuView = new leftMenuView({
            model: {
                className: 'pioneer',
                id: 'news',
                sideBars: Resource.maps
            }
        });

        this.$el.empty().append(this.leftMenuView.$el).append(template);

        this.$layLeft = this.$('.layLeft');
        var me = this;

        window.frameUrl = '?';
        window.listUrl = '#news/list';
        window.portalUrl = Resource.cmsHost;

        // this.$layLeft.load(cmsUrl + '?time=' + +(new Date()), function() {
        //     me.$layLeft.removeClass('opacity0');
        // });

        this.$layLeft.html('<div class="tit"><h2 class="ft16 cor5">最新资讯</h2><a href="" id="moreBtn" class="more">更多>></a>       <script>            document.getElementById("moreBtn").href = listUrl;</script></div><ul class="zixun"><li><a href="" id="url_752"><script>                document.getElementById("url_752").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/businessinfo/752.html".replace("//news.gzopendata.com:80", portalUrl));</script><img src="./static/20170109095020_d7ksairabd.jpg"><span>                福建重视大学生创新创业教育 校园创业或“弯道超车”<span class="time">2017-01-09</span></span></a></li><li><a href="" id="url_751"><script>                document.getElementById("url_751").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/businessinfo/751.html".replace("//news.gzopendata.com:80", portalUrl));</script><img src="./static/20170109094859_mlmxuvbc67.jpg"><span>                创业大赛不是免费路演 培养企业家任重道远<span class="time">2017-01-09</span></span></a></li><li><a href="" id="url_727"><script>                document.getElementById("url_727").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/businessinfo/727.html".replace("//news.gzopendata.com:80", portalUrl));</script><img src="./static/20170109094803_i919si838n.png"><span>                千名创业大咖云集广州 十大双创平台为青年创客保驾护航<span class="time">2017-01-06</span></span></a></li></ul><div class="tabChange fl mt10"><ul class="clearfix" style="width: 860px;"><li><a href="javascript:void(0);" id="url_726">广州市委举办第四届青年创新创业大赛<span class="fr">2017-01-06</span></a></li><script>                    document.getElementById("url_726").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/businessinfo/726.html".replace("//news.gzopendata.com:80", portalUrl));</script><li><a href="javascript:void(0);" id="url_725">广州重视人才引进 5年35亿元支持百个创新创业领军团队<span class="fr">2017-01-06</span></a></li><script>                    document.getElementById("url_725").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/businessinfo/725.html".replace("//news.gzopendata.com:80", portalUrl));</script><li><a href="javascript:void(0);" id="url_724">“青创杯”第四届广州青年创新创业大赛启动 明年3月初赛<span class="fr">2017-01-06</span></a></li><script>                    document.getElementById("url_724").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/businessinfo/724.html".replace("//news.gzopendata.com:80", portalUrl));</script><li><a href="javascript:void(0);" id="url_723">上海：国际创新港正式揭牌 吸引全球优秀项目 张江形成四大创新创业集聚区<span class="fr">2017-01-06</span></a></li><script>                    document.getElementById("url_723").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/businessinfo/723.html".replace("//news.gzopendata.com:80", portalUrl));</script><li><a href="javascript:void(0);" id="url_721">“小车轮”转动“大经济”：创新路上的“共享经济”将驶向何方？<span class="fr">2017-01-06</span></a></li><script>                    document.getElementById("url_721").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/businessinfo/721.html".replace("//news.gzopendata.com:80", portalUrl));</script><li><a href="javascript:void(0);" id="url_719">创新创业教育，亟需“升级版”<span class="fr">2017-01-06</span></a></li><script>                    document.getElementById("url_719").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/businessinfo/719.html".replace("//news.gzopendata.com:80", portalUrl));</script><li><a href="javascript:void(0);" id="url_718">重庆沙坪坝区“四个一批”释放创新创业活力<span class="fr">2017-01-06</span></a></li><script>                    document.getElementById("url_718").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/businessinfo/718.html".replace("//news.gzopendata.com:80", portalUrl));</script></ul></div></div>')

        return this;
    }
});

module.exports = view;