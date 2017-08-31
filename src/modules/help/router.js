/**
 * 帮助中心的路由设置
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
          path: '/api',
          name: 'apiHelp',
          component: function (reslove) {
            return require(['./views/api'], reslove)
          }
        }, {
          path: '/question',
          name: 'apiQuestion',
          component: function (reslove) {
            return require(['./views/question'], reslove)
          }
        }, {
          path: '/service',
          name: 'serviceHelp',
          component: function (reslove) {
            return require(['./views/service'], reslove)
          }
        }, {
          path: '/guidance',
          alias: '/',
          name: 'guidanceHelp',
          component: function (reslove) {
            return require(['./views/guidance'], reslove)
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