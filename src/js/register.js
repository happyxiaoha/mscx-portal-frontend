
import Vue from 'vue'
import App from 'register/App'
import store from 'store'
import { Form, FormItem, Input, Button, Checkbox, Loading, Alert } from 'element-ui'
import 'assets/theme/reset.css'
import 'assets/theme/index.css'
import 'assets/less/base.less'

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Loading);
Vue.use(Alert);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App: App }
})