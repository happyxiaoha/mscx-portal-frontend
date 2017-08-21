
// require('css/swiper.css');
// require('less/base.less');
// require('main/main.less');

// require('js/ajaxBackboneManger.js');

// var header = require('headerWidget/headerView.js');
// var footer = require('footerWidget/footerView.js');
// var mainView = require('main/mainView.js');

// $(function() {
//     new header({
//         id: 'index'
//     });
//     new footer();
//     new mainView();
// });

import Vue from 'vue'
import App from 'main/App'
import store from 'store'
import {Row, Col, Carousel, CarouselItem, Input, Button, Upload, Loading} from 'element-ui'
import 'assets/theme/reset.css'
import 'assets/theme/index.css'
import 'assets/less/base.less'

Vue.use(Row)
Vue.use(Col)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Upload)
Vue.use(Loading)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App: App }
})
