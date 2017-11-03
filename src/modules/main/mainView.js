/**
 * Created by Kevin on 2016/12/6.
 */
var template = require('./main.html'),
    childTemplate = require('./child.html'),
    navigationView = require('./navigationView.js'),
    recommendBarView = require('./recommendBarView.js'),
    recommendView = require('./recommendView.js'),
    bannerView = require('./banner.js'),
    firstRecommendView = require('./firstRecommendView.js');
require('./main.css');
require('./../../css/swiper.css');
require('../../lib/swiper.jquery.js');
require('../../lib/jquery.SuperSlide.2.1.1.js');

var navigationSerModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'recommend/bar.do'
});

var navigationApiModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/getNavigationApi.do'
});

var serListModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'selection/list.do'
});

var apiListModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/getSelectedNavigation.do'
});

var recommendApiModel = Backbone.Model.extend({
    url: mscxPage.request.api + 'service/getSelectedApi.do'
});
var recommendSerModel = Backbone.Model.extend({
    url: mscxPage.request.app + 'recommend/list.do'
});
var Resource = require('../pioneering/resource.js');
var cmsUrl = Resource.cmsHost + 'static_html/datainfo/latestnews/index.html';

var mainView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    events: {
        'blur .info-line input':'changeAttribute'
    },
    initialize: function() {

        var currentCity = JSON.parse(sessionStorage.getItem('currentCity'));
        if(currentCity && currentCity.code!='440100' &&  currentCity.code!='440113'){
            require('../newThreeServices/openData.css');
            require('../newThreeServices/apiModel/api.css');
            require('../newThreeServices/servicesModel/services.css');
            this.$el.html(childTemplate);
            showDatas(currentCity.code)
        }else{
            this.$el.html(template);
            this.$list = this.$('.news-list');
            //创业资讯的配置
            window.frameUrl = 'pioneering.html?';
            window.listUrl = 'pioneering.html#news/list';
            window.portalUrl = Resource.cmsHost;
            //new bannerView();
            //new firstRecommendView();
            new navigationView({
                id: 'ser',
                el: '#daohangSer',
                model: new navigationSerModel()
            });

            new navigationView({
                id: 'api',
                el: '#daohangAPI',
                model: new navigationApiModel()
            });

            new recommendBarView({
                id: 'ser',
                el: '#serList',
                model: new serListModel()
            });


            new recommendBarView({
                id: 'api',
                el: '#apiList',
                model: new apiListModel()
            });

            new recommendView({
                id: 'api',
                el: '.recommendApiList',
                className: 'loading',
                model: new recommendApiModel()
            });

            new recommendView({
                id: 'ser',
                el: '.recommendSerList',
                model: new recommendSerModel()
            });
            //加载创业资讯(最新资讯)
            this.$list.load(cmsUrl + '?time=' + +(new Date()));
        }
        new bannerView();
        this.render();
    },
    render: function(){
        $(".partner").slide({
            mainCell:"ul",
            autoPlay:true,
            effect:"leftMarquee",
            interTime: 20,
            vis:5
        });
        $('.container').delegate('.leftTit','mouseenter',function(){
                if($(this).hasClass('moreThanTen')){
                    $(this).addClass('activeHover').parent('li').siblings('li').find('.leftTit').removeClass('activeHover');
                    $(this).parent('li').siblings('li').find('.rightTips').hide();

                    return
                }
                $(this).addClass('activeHover').siblings('.rightTips').show();
                $(this).parent('li').siblings('li').find('.leftTit').removeClass('activeHover');
                $(this).parent('li').siblings('li').find('.rightTips').hide();
            })
            .delegate('.titCons,.rightTips','mouseleave',function() {
                $(this).find('.leftTit').removeClass('activeHover');
                $(this).find('.rightTips').hide();
            })
            .delegate('.topTit span','mouseenter',function(){
                var index = $(this).index();
                if(index == 0){
                    $('.topTit').css('background','#fff')
                }
                else {
                    $('.topTit').css('background','#eff3f5')
                }
                $(this).addClass('active').siblings('span').removeClass('active');
                $('.downCons').find('.titCons').eq(index).removeClass('hide').siblings('.titCons').addClass('hide');
            });

    }
});
function showDatas(orgId, categoryId, keyword, scope, chargeType, orderBy) {
    var openDataReleaseView = require('../newThreeServices/opendataRelease/openDataReleaseView.js');
    mscxPage.views['openDataReleaseViewObj'] = new openDataReleaseView({
        id: 'catalog',
        model: {
            keyword: keyword,
            scope: scope,
            chargeType: chargeType,
            orderBy: orderBy,
            orgId: orgId,
            categoryId: categoryId
        }
    });
    var APIView = require('../newThreeServices/apiModel/APIView.js');
    mscxPage.views['dataAPIObj'] = new APIView({
        id: 'data',
        model: {
            keyword: keyword,
            scope: scope,
            chargeType: chargeType,
            orderBy: orderBy
        }
    });

    var serviceView = require('../newThreeServices/servicesModel/servicesView.js');
    mscxPage.views['servicesObj'] = new serviceView({
        id: 'service',
        model: {
            keyword: keyword,
            scope: scope,
            chargeType: chargeType,
            orderBy: orderBy
        }
    });
};
module.exports = mainView;
