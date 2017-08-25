
import Vue from 'vue'
import App from 'main/App'
import store from 'store'
import {Row, Col, Carousel, CarouselItem, Input, Button, Loading, Tooltip} from 'element-ui'
import 'assets/theme/reset.css'
import 'assets/theme/index.css'
import 'assets/less/base.less'

Vue.use(Row)
Vue.use(Col)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Loading)
Vue.use(Tooltip)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App: App }
})
