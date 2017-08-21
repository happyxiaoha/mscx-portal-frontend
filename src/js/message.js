import Vue from 'vue'
import App from 'message/App'
import store from 'store'
import ElementUI from 'element-ui'
import 'assets/theme/reset.css'
import 'assets/theme/index.css'
import 'assets/less/base.less'

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App: App }
})
