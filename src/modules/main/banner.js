/**
 * Created by Administrator on 2016/12/17.
 */

var bannerTemplate = require('./banner.html');
var currentCity = JSON.parse(sessionStorage.getItem('currentCity'));
if (currentCity && currentCity.code != '440100' && currentCity.code != '440113') {
    bannerTemplate = require('./childBanner.html');
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
            spaceBetween: 10,
            loop: true,
            pagination : '.swiper-pagination',
            paginationClickable: true,
            loopedSlides: 4,
            autoplay: 3000
        });
        if (size > 4) {
            size = 4;
        }
        if (currentCity && currentCity.code != '440100' && currentCity.code != '440113') {
            galleryTop = new Swiper('.swiper-container', {
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
            $(".swiper-container").hover(function () {
                galleryTop.stopAutoplay();
            }, function () {
                galleryTop.startAutoplay();

            });
        }
    }
});


module.exports = bannerView;
