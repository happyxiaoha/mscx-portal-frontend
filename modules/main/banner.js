/**
 * Created by Administrator on 2016/12/17.
 */

var bannerTemplate = require('html!./banner.html');
var currentCity = JSON.parse(sessionStorage.getItem('currentCity'));
if (currentCity && currentCity.code != '440100' && currentCity.code != '440113') {
    bannerTemplate = require('html!./childBanner.html');
}


var bannerModel = Backbone.Model.extend({
    url: 'static_html/datainfo/bannerpic/index.html?t=' + new Date().getTime()
});

var bannerView = Backbone.View.extend({
    template: _.template(bannerTemplate, {variable: 'data'}),
    el: '.banner',
    events: {},
    initialize: function () {
        this.$el.toggleClass('loading');
        this.model = new bannerModel();
        this.model.fetch({
            dataType: 'json'
        });
        this.listenTo(this.model, 'sync', this.render);

    },
    render: function () {
        this.$el.toggleClass('loading');
        var nJson = this.model.toJSON();
        this.$el.append(this.template(nJson));
        this.banner(Object.keys(nJson).length);

    },
    banner: function (size) {
        var galleryTop = new Swiper('.swiper-container', {
            /*        nextButton: '.swiper-button-next',
             prevButton: '.swiper-button-prev',*/
            spaceBetween: 10,
            loop: true,
            direction: 'vertical',
            loopedSlides: 4,
        });
        if (size > 4) {
            size = 4;
        }
        if (currentCity && currentCity.code != '440100' && currentCity.code != '440113') {
            galleryTop = new Swiper('.swiper-container', {
                /*        nextButton: '.swiper-button-next',
                 prevButton: '.swiper-button-prev',*/
                spaceBetween: 10,
                loop: true,
                direction: 'vertical',
                loopedSlides: 4,
                autoplay: 3000
            });
            //galleryTop.params.control = galleryThumbs;//需要在galleryThumbs2初始化后，galleryTop控制galleryThumbs
            //galleryThumbs.params.control = galleryTop;

            $(".swiper-container").hover(function () {
                galleryTop.stopAutoplay();
            });
        } else {
            var galleryThumbs = new Swiper('.swiper-right', {
                spaceBetween: 10,
                slidesPerView: size,
                touchRatio: 0.2,
                loop: true,
                autoplay: 3000,
                direction: 'vertical',
                // preventClicks: false,
                loopedSlides: size,
                slideToClickedSlide: true
            });
            galleryTop.params.control = galleryThumbs;
            galleryThumbs.params.control = galleryTop;

            $(".swiper-container").hover(function () {
                galleryTop.stopAutoplay();
                galleryThumbs.stopAutoplay();
            }, function () {
                galleryTop.startAutoplay();
                galleryThumbs.startAutoplay();

            });
        }
    }
});


module.exports = bannerView;
