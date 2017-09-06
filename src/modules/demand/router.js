/**
 * 需求定制模块的路由设置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import API from 'common/api'
Vue.use(VueRouter)

var router = new VueRouter({
  // mode: 'history',
  // base: '/demand/',
  routes: [
    {
      path: '/',
      component: function (reslove) {
        return require(['./views/index'], reslove)
      },
      children: [
        {
          path: '',
          name: 'apiEnv',
          component: function (reslove) {
            return require(['./views/apiEnv'], reslove)
          },
          meta: {
            index: 0
          }
        },
        {
          path: 'serverEnv',
          name: 'serverEnv',
          component: function (reslove) {
            return require(['./views/serverEnv'], reslove)
          },
          meta: {
            index: 1
          }
        },
        {
          path: 'api',
          name: 'apiList',
          component: function (reslove) {
            return require(['./views/apiList'], reslove)
          },
          meta: {
            index: 2
          }
        },
        {
          path: 'service',
          name: 'serviceList',
          component: function (reslove) {
            return require(['./views/serviceList'], reslove)
          },
          meta: {
            index: 3
          }
        },
        {
          path: 'api/detail/:id',
          name: 'apiDetail',
          component: function (reslove) {
            return require(['./views/apiDetail'], reslove)
          },
          meta: {
            index: 2
          }
        },
        {
          path: 'service/detail/:id',
          name: 'serviceDetail',
          component: function (reslove) {
            return require(['./views/serviceDetail'], reslove)
          },
          meta: {
            index: 3
          }
        },
        {
          path: 'api/create',
          name: 'apiCreate',
          component: function (reslove) {
            return require(['./views/createApi'], reslove)
          },
          meta: {
            auth: true
          }
        },
        {
          path: 'service/create',
          name: 'serviceCreate',
          component: function (reslove) {
            return require(['./views/createService'], reslove)
          },
          meta: {
            auth: true
          }
        },
        {
          path: 'api/update/:id',
          name: 'apiUpdate',
          component: function (reslove) {
            return require(['./views/createApi'], reslove)
          },
          meta: {
            auth: true
          }
        },
        {
          path: 'api/desc/:id',
          name: 'apiDesc',
          component: function (reslove) {
            return require(['./views/apiDesc'], reslove)
          }
        },
        {
          path: 'service/update/:id',
          name: 'serviceUpdate',
          component: function (reslove) {
            return require(['./views/createService'], reslove)
          },
          meta: {
            auth: true
          }
        },
        {
          path: 'service/desc/:id',
          name: 'serviceDesc',
          component: function (reslove) {
            return require(['./views/serviceDesc'], reslove)
          }
        }
      ]
    },
    {
      path: '*', redirect: '/demand/'
    }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach(function (to, from, next) {
  if(to.meta && to.meta.auth) {
    API.Common.getLoginInfo().then((res) => {
      if(!res.result) {
        location.href = '/login.html' + '?service='+ encodeURIComponent(location.href)
      }else if(res.result.userType === 'REGISTER') {
        location.href = '/userInfo.html#user/auth'
      }else {
        next()
      }
    })
  }else {
    next()
  }
})

router.afterEach(function (route) {
})

export default router
