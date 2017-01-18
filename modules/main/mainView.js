/**
 * Created by Kevin on 2016/12/6.
 */
var template = require('html!./main.html'),
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


var mainView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    events: {
        'blur .info-line input':'changeAttribute'
    },
    initialize: function() {
        this.$el.html(template);
        new bannerView();
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

module.exports = mainView;
