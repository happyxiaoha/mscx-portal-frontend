
import Vue from 'vue'
import App from 'login/App'
import store from 'store'
import { Form, FormItem, Input, Button, Dialog, Loading, Alert } from 'element-ui'
import 'assets/theme/reset.css'
import 'assets/theme/index.css'
import 'assets/less/base.less'

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Alert);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App: App }
})