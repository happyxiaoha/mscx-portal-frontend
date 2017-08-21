import Vue from 'vue'
import App from 'userInfo/App'
import router from 'userInfo/router'
import store from 'store'
import ElementUI from 'element-ui'
import 'assets/theme/reset.css'
import 'assets/theme/index.css'
import 'assets/less/base.less'
  
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App: App }
})
