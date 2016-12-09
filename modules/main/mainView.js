/**
 * Created by Kevin on 2016/12/6.
 */
var template = require('html!./main.html'),
    navigationView = require('./navigationView.js'),
    recommendBarView = require('./recommendBarView.js'),
    recommendView = require('./recommendView.js');
require('./main.css');
require('./../../css/swiper.css');
require('../../lib/swiper.jquery.js');
require('../../lib/jquery.SuperSlide.2.1.1.js');

var mainModel = Backbone.Model.extend({
    count: 0,
    serDaohang: function(options) {
        options = options || {};
        var coll = this;
        _.extend(options, {
            url: mscxPage.host+'/mscx-app-api/recommend/bar.do',
            success: function(res) {
                new navigationView({
                    el: '#daohangSer',
                    type: 'ser',
                    model: res.result
                })
            }
        });
        this.sync('get', this, options);
    },
    serList: function(options) {
        options = options || {};
        var coll = this;
        _.extend(options, {
            url:mscxPage.host+ '/mscx-app-api/list.do',
            success: function(res) {
                new recommendBarView({
                    el: '#serList',
                    type: 'ser',
                    model: res.result.data
                })
            }
        });
        this.sync('get', this, options);
    },
    recommendSerList: function(options) {
        options = options || {};
        _.extend(options, {
            url: mscxPage.host+'/mscx-app-api/recommend/list.do',
            success: function(res) {
                new recommendView({
                    el: '.recommendSerList',
                    type: 'ser',
                    model: res.result
                })
            }
        });
        this.sync('get', this, options);
    },
    apiDaohang: function(options) {
        options = options || {};
        _.extend(options, {
            url:mscxPage.host+ '/mscx-api-api/service/getNavigationApi.do',
            data: {areaId:'280101'},
            success: function(res) {
                new navigationView({
                    el: '#daohangAPI',
                    type: 'api',
                    model: res.result
                })
            }
        });
        this.sync('get', this, options);
    },
    apiList: function(options) {
        options = options || {};

        _.extend(options, {
            url: mscxPage.host+'/mscx-api-api/service/getSelectedNavigation.do',
            data: {areaId:'280101'},
            success: function(res) {
                new recommendBarView({
                    el: '#apiList',
                    type: 'api',
                    model: res.result
                })
            }
        });
        this.sync('get', this, options);
    },
    recommendApiList: function(options) {
        options = options || {};
        _.extend(options, {
            url: mscxPage.host+'/mscx-api-api/service/getSelectedApi.do',
            data: {areaId:'280101'},
            success: function(res) {
                new recommendView({
                    el: '.recommendApiList',
                    type: 'api',
                    model: res.result
                })
            }
        });
        this.sync('get', this, options);
    },
    initIndex: function() {
        var coll = this;
        coll.serDaohang();
        coll.serList();
        coll.recommendSerList();
        coll.apiDaohang();
        coll.apiList();
        coll.recommendApiList();
    }
});

var mainView = Backbone.View.extend({
    el: mscxPage.domEl.mainEl,
    events: {
        'blur .info-line input':'changeAttribute'
    },
    initialize: function() {

        var mainIndexModel = this.model = new mainModel(),
            coll = this;
        coll.$el.html(template);
        coll.render();
        mainIndexModel.initIndex();
    },
    render: function(){
        var galleryTop = new Swiper('.swiper-container', {
            /*        nextButton: '.swiper-button-next',
             prevButton: '.swiper-button-prev',*/
            spaceBetween: 10,
            loop:true,
            direction: 'vertical',
            loopedSlides:8
        });
        var galleryThumbs = new Swiper('.swiper-right', {
            spaceBetween: 10,
            slidesPerView:4,
            touchRatio: 0.2,
            loop:true,
            autoplay:3000,
            direction: 'vertical',
            loopedSlides:8,
            slideToClickedSlide: true
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
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
