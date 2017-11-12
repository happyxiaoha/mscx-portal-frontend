/**
 * Created by Administrator on 2016/12/17.
 */

var bannerTemplate = require('./banner.html');
var bannerModel = Backbone.Model.extend({
    url: 'static_html/datainfo/gy_banner/index.html?t='+new Date().getTime()
});

var bannerView = Backbone.View.extend({
    template: _.template(bannerTemplate, {variable: 'data'}),
    el: '.banner',
    events: {
    },
    initialize: function() {
        this.$el.toggleClass('loading');
        this.model = new bannerModel();
        this.model.fetch({
            dataType: 'json'
        });
        this.listenTo(this.model,'sync',this.render);

    },
    render: function() {
        this.$el.toggleClass('loading');
        var nJson =  this.model.toJSON();
        this.$el.append(this.template(nJson));
        this.banner(Object.keys(nJson).length);

    },
    banner: function (size) {
        new Swiper('.swiper-container', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 10,
            loop: true,
            pagination : '.swiper-pagination',
            paginationElement : 'li',
            direction: 'horizontal',
            loopedSlides:8
        });
        /*
        if(size>4){
            size = 4;
        }
        var galleryThumbs = new Swiper('.swiper-right', {
            spaceBetween: 10,
            slidesPerView: size,
            touchRatio: 0.2,
            loop:true,
            autoplay: 3000,
            direction: 'vertical',
            loopedSlides: size *2,
            slideToClickedSlide: true
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
        */
    }
});


module.exports = bannerView;