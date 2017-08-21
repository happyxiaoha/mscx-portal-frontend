/**
 * 支付模块的路由设置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      path: '/',
      component: function (reslove) {
        return require(['./views/index'], reslove)
      },
      children: [
        {
          path: '',
          name: 'selectPay',
          component: function (reslove) {
            return require(['./views/selectPay'], reslove)
          }
        }, {
          path: '/result/:orderNum',
          name: 'payResult',
          component: function (reslove) {
            return require(['./views/result'], reslove)
          }
        }, {
          path: '/error/:msg',
          name: 'payError',
          component: function (reslove) {
            return require(['./views/error'], reslove)
          }
        }, {
          path: '/weixin/:url/:order',
          name: 'weixinPay',
          component: function (reslove) {
            return require(['./views/weixin'], reslove)
          }
        }, {
          path: '/account/:order',
          name: 'accountPay',
          component: function (reslove) {
            return require(['./views/account'], reslove)
          }
        }
      ]
    },
    {
      path: '*', redirect: '/'
    }
  ]
})

router.beforeEach(function (to, from, next) {
  next()
})

router.afterEach(function (route) {
})

export default router
// var Routes =  Backbone.Router.extend({
//     routes: {
//         '': 'selectPayView',
//         'result/:id': 'resultView',
//         'error/:msg': 'errorView',
//         'weixin/:url/:order': 'weixinView',
//         'account/:order': 'accountPayView'
//     },
//     selectPayView: function () {
//         var view = require('pay/selectPayView.js');
//         mscxPage.views['selectPayViewObj'] = new view();
//     },
//     weixinView: function (url, order) {
//         var view = require('pay/weixinPayView.js');
//         mscxPage.views['weixinPayViewObj'] = new view({
//             model: {
//                 url: url,
//                 orderNum: order
//             }
//         });
//     },
//     // 账户支付
//     accountPayView: function(order) {
//         var view = require('pay/accountPayView.js');
//         mscxPage.views['accountPayViewObj'] = new view({
//             model: {
//                 orderNum: order
//             }
//         });
//     },
//     resultView:function (id) {
//         var view = require('pay/resultView.js');
//         mscxPage.views['resultView'] = new view({
//             id: id
//         });
//     },
//     errorView: function(msg) {
//         var view = require('pay/errorView.js');
//         mscxPage.views['errorView'] = new view({
//             model: {
//                 msg: msg
//             }
//         });
//     },
//     openPage: function(url) {
//         this.navigate(url,{trigger: true});
//     },
//     execute: function(callback,args,name) {
//         if(mscxPage.views[name + 'Obj']) {
//             mscxPage.views[name + 'Obj'].initialize();
//         }
//         else {
//             if (callback) callback.apply(this, args);
//         }
//     }
// });

// module.exports = Routes;