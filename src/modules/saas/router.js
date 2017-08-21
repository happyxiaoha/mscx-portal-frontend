/**
 * saas模块的路由设置
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
          name: 'saasList',
          component: function (reslove) {
            return require(['./views/list'], reslove)
          },
          meta: {
            index: 0
          }
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: function (reslove) {
            return require(['./views/detail'], reslove)
          }
        },
        {
          path: '/create',
          name: 'create',
          component: function (reslove) {
            return require(['./views/create'], reslove)
          }
        },
        {
          path: '/update/:id',
          name: 'update',
          component: function (reslove) {
            return require(['./views/create'], reslove)
          }
        },
        {
          path: '/desc/:id',
          name: 'desc',
          component: function (reslove) {
            return require(['./views/desc'], reslove)
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