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