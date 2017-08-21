// /**
//  * Created by Administrator on 2016/12/12.
//  */

// require('less/base.less');
// require('register/register.less');
// require('js/ajaxBackboneManger.js');

// var header = require('register/headerView.js');

// var router = require('register/router.js');

// $(function() {
//     new header();
//     mscxPage.appRouter = new router();
//     Backbone.history.stop();
//     Backbone.history.start();
// });

import Vue from 'vue'
import App from 'register/App'
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
  // store: store,
  template: '<App/>',
  components: { App: App }
})