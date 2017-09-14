'use strict';

var leftMenuView = require('leftMenuWidget/leftMenuView.js');
var Resource = require('./resource.js');
var template = '<div class="rightMenuWrap fl boxShadiow boxSizing bgWhite common"><div class="common posRE animate-content" id="topPart"></div><div id="downPart" class="common posRE animate-content "></div></div>';

var cmsUrl = Resource.cmsHost + 'static_html/datainfo/pioneercoach/index.html';
var cmsPolicyUrl = Resource.cmsHost + 'static_html/datainfo/policyread/index.html';
require('./pioneering.css');

var view = Backbone.View.extend({
    el: mscxPage.domEl.pioneeringEl,
    events: {
        'click #go': 'jumpToInputPage'
    },
    initialize: function() {
        this.leftMenuView = new leftMenuView({
            model: {
                className: 'pioneer',
                id: 'coach',
                sideBars: Resource.maps
            }
        });

        this.$el.empty().append(this.leftMenuView.$el).append(template);
        this.$downPart = this.$('#downPart');
        this.$topPart = this.$('#topPart');

        var me = this;

        window.portalUrl = Resource.cmsHost;
        window.frameUrl = '?';
        window.jumpToPage = function(url) {
            me.$downPart.load(url + '?t=' + +(new Date()));
        }

        // this.$topPart.load(cmsUrl + '?time=' + +(new Date()), function() {
        //     me.$topPart.removeClass('opacity0');
        // });

        this.$topPart.html('<div class="tit"><h2 class="ft16 cor5">创新创业公开课</h2></div><div class="openClass"><ul class="clearfix DataList"><li><div class="centers"><a href="javascript:void(0);" id="url_736"><img src="./static/nopic.jpg"><p class="ft12">                        双创动态</p></a><script>                     document.getElementById("url_736").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/pioneercoach/736.html".replace("//news.gzopendata.com:80", portalUrl));</script></div></li><li><div class="centers"><a href="javascript:void(0);" id="url_735"><img src="./static/nopic.jpg"><p class="ft12">                        发现双创之星</p></a><script>                     document.getElementById("url_735").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/pioneercoach/735.html".replace("//news.gzopendata.com:80", portalUrl));</script></div></li><li><div class="centers"><a href="javascript:void(0);" id="url_733"><img src="./static/nopic.jpg"><p class="ft12">                        大粤创+公开课</p></a><script>                        document.getElementById("url_733").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/pioneercoach/733.html".replace("//news.gzopendata.com:80", portalUrl));</script></div></li><li><div class="centers"><a href="javascript:void(0);" id="url_732"><img src="./static/nopic.jpg"><p class="ft12">                        互联网创业项目推荐</p></a><script>                      document.getElementById("url_732").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/pioneercoach/732.html".replace("//news.gzopendata.com:80", portalUrl));</script></div></li></ul></div>')
        // this.$downPart.load(cmsPolicyUrl + '?time=' + +(new Date()), function() {
        //     me.$downPart.removeClass('opacity0');
        // });

        this.$downPart.html('<div class="tit"><h2 class="ft16 cor5">创新创业政策解读</h2></div><div class="table-h D_table"><table><thead><tr><th width="33%">政策标题</th><th width="23%">分类</th><th width="30%">来源</th><th width="14%">发布日期</th></tr></thead><tbody><tr><td><a href="javascript:void(0);" id="url_749" target="_blank">"创新创业一年间：“众力量”激活 中国经济“新元素” "</a></td><script>                    document.getElementById("url_749").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/policyread/749.html".replace("//news.gzopendata.com:80", portalUrl));</script><td>指导意见</td><td>http://www.gov.cn/xinwen/2016-12/30/content_5155041.htm</td><td>2017-01-06</td></tr><tr><td><a href="javascript:void(0);" id="url_748" target="_blank">发改委解读：改革先行 加快释放“双创”活力</a></td><script>                    document.getElementById("url_748").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/policyread/748.html".replace("//news.gzopendata.com:80", portalUrl));</script><td>政策措施</td><td>http://www.gov.cn/zhengce/2016-05/20/content_5074966.htm</td><td>2017-01-06</td></tr><tr><td><a href="javascript:void(0);" id="url_747" target="_blank">广东东莞创业者最高可申请20万额度创业贷款</a></td><script>                    document.getElementById("url_747").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/policyread/747.html".replace("//news.gzopendata.com:80", portalUrl));</script><td>政策措施</td><td>http://www.cnfuhuaqi.com/policy/show/6378.aspx</td><td>2017-01-06</td></tr><tr><td><a href="javascript:void(0);" id="url_746" target="_blank">广东深圳市提供双创资金扶持 完善人才激励机制</a></td><script>                    document.getElementById("url_746").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/policyread/746.html".replace("//news.gzopendata.com:80", portalUrl));</script><td>指导意见</td><td>http://www.cnfuhuaqi.com/policy/show/5887.aspx</td><td>2017-01-06</td></tr><tr><td><a href="javascript:void(0);" id="url_745" target="_blank">广州市多方位扶持科技企业 优化创新创业环境</a></td><script>                    document.getElementById("url_745").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/policyread/745.html".replace("//news.gzopendata.com:80", portalUrl));</script><td>指导意见</td><td>http://www.cnfuhuaqi.com/policy/show/6113.aspx</td><td>2017-01-06</td></tr><tr><td><a href="javascript:void(0);" id="url_744" target="_blank">国家级众创空间青年创业梦工场落户汕头 将实施五免政策</a></td><script>                    document.getElementById("url_744").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/policyread/744.html".replace("//news.gzopendata.com:80", portalUrl));</script><td>指导意见</td><td>http://www.cnfuhuaqi.com/policy/show/7509.aspx</td><td>2017-01-06</td></tr><tr><td><a href="javascript:void(0);" id="url_743" target="_blank">广东省汕头市制定落实一系列创业扶持政策</a></td><script>                    document.getElementById("url_743").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/policyread/743.html".replace("//news.gzopendata.com:80", portalUrl));</script><td>政策措施</td><td>http://www.cnfuhuaqi.com/policy/show/7070.aspx</td><td>2017-01-06</td></tr><tr><td><a href="javascript:void(0);" id="url_742" target="_blank">佛山市禅城区：新认定国家级孵化器补贴350万</a></td><script>                    document.getElementById("url_742").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/policyread/742.html".replace("//news.gzopendata.com:80", portalUrl));</script><td>政策措施</td><td>http://www.cnfuhuaqi.com/policy/show/7296.aspx</td><td>2017-01-06</td></tr><tr><td><a href="javascript:void(0);" id="url_741" target="_blank">佛山南海创新创业政策解读</a></td><script>                    document.getElementById("url_741").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/policyread/741.html".replace("//news.gzopendata.com:80", portalUrl));</script><td>政策措施</td><td>http://chuangye.yjbys.com/zhengce/586062.html</td><td>2017-01-06</td></tr><tr><td><a href="javascript:void(0);" id="url_740" target="_blank">广东出台新政策促进大众创业、万众创新</a></td><script>                    document.getElementById("url_740").href = frameUrl+encodeURIComponent("//news.gzopendata.com:80/static_html/datainfo/policyread/740.html".replace("//news.gzopendata.com:80", portalUrl));</script><td>指导意见</td><td>http://www.gov.cn/zhengce/2016-02/25/content_5045902.htm</td><td>2017-01-06</td></tr></tbody></table></div><div class="Page mt20"><ul class="clearfix"><li><a class="page">首页</a>          <script></script><a data-pageIndex="1"  class="page-curr">1</a>         <script></script><a data-pageIndex="2"  id="page_2" href="javascript:void(0);"  class="page">2</a>          <script>                $("#page_2").click(function(event) {                    jumpToPage("//news.gzopendata.com:80/static_html/datainfo/policyread/index_2.html".replace("//news.gzopendata.com:80", portalUrl));             });</script><a id="nextpage" href="javascript:void(0);" class="page">下一页</a>            <script>                $("#nextpage").click(function(event) {                  jumpToPage("//news.gzopendata.com:80/static_html/datainfo/policyread/index_2.html".replace("//news.gzopendata.com:80", portalUrl));             });</script><a id="endPage" href="javascript:void(0);"  class="page" >末页</a>            <script>                $("#endPage").click(function(event) {                   jumpToPage("//news.gzopendata.com:80/static_html/datainfo/policyread/index_2.html".replace("//news.gzopendata.com:80", portalUrl));             });</script></li><li>            共<i id="indexTotal">2</i>页，当前显示第<input type="text" id="indexNum" value="1">页<a href="javascript:void(0);" id="go">GO</a></li></ul></div>')

        return this;
    },
    jumpToInputPage: function() {
        var inputPage = this.$('#indexNum').val();

        this.$('.page').each(function(index, item) {
            var $item = $(item);
            $item.data('pageindex') == inputPage && $item.click();
        })
    }
});

module.exports = view;