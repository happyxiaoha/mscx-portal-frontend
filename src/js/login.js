/**
 * Created by Administrator on 2016/12/12.
 */
// require('less/base.less');
// require('login/login.less');
// require('js/ajaxBackboneManger.js');

// var header = require('../modules/login/loginHeaderView.js');

// var router = require('../modules/login/router.js');

// $(function() {
//     new header({
//         id: '登录'
//     });
//     mscxPage.appRouter = new router();
//     Backbone.history.stop();
//     Backbone.history.start();
// });

import Vue from 'vue'
import App from 'login/App'
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
  // store: store,
  template: '<App/>',
  components: { App: App }
})