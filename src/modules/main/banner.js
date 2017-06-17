/**
 * Created by Administrator on 2016/12/17.
 */

var bannerTemplate = require('./banner.html');
// var bannerModel = Backbone.Model.extend({
//     url: 'static_html/datainfo/' + mscxPage.city.abbr + '_bannerpic/index.html?t='+new Date().getTime()
// });

var bannerView = Backbone.View.extend({
    template: _.template(bannerTemplate, {variable: 'data'}),
    el: '.banner',
    events: {
    },
    initialize: function() {
        this.$el.toggleClass('loading');
        this.model = new (Backbone.Model.extend({
            url: 'static_html/datainfo/' + mscxPage.city.abbr + '_bannerpic/index.html?t='+new Date().getTime()
        }));
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
        var galleryTop = new Swiper('.swiper-container', {
            /*        nextButton: '.swiper-button-next',
             prevButton: '.swiper-button-prev',*/
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 10,
            autoplay:3000,
            loop:true,
            direction: 'horizontal',
            loopedSlides:8
        });
        // if(size>4){
        //     size = 4;
        // }
        // var galleryThumbs = new Swiper('.swiper-right', {
        //     spaceBetween: 10,
        //     slidesPerView: size,
        //     touchRatio: 0.2,
        //     loop:true,
        //     autoplay:3000,
        //     direction: 'vertical',
        //     loopedSlides: size *2,
        //     slideToClickedSlide: true
        // });
        // galleryTop.params.control = galleryThumbs;
        // galleryThumbs.params.control = galleryTop;
    }
});


module.exports = bannerView;
