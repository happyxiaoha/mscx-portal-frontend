/**
 * API模块的路由设置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import API from 'common/api'
Vue.use(VueRouter)

var router = new VueRouter({
  mode: 'history',
  base: '/api/',
  routes: [
    {
      path: '/',
      component: function (reslove) {
        return require(['./views/index'], reslove)
      },
      children: [
        {
          path: '',
          name: 'dataList',
          component: function (reslove) {
            return require(['./views/list'], reslove)
          },
          meta: {
            index: 0
          }
        },
        {
          path: 'data',
          name: 'dataList',
          component: function (reslove) {
            return require(['./views/list'], reslove)
          },
          meta: {
            index: 0
          }
        },
        {
          path: 'data/category-:category/',
          name: 'dataApiCategoryList',
          component: function (reslove) {
            return require(['./views/list'], reslove)
          },
          meta: {
            index: 0
          }
        },
        {
          path: 'data/category-:category/tag-:tag',
          name: 'dataApiTagList',
          component: function (reslove) {
            return require(['./views/list'], reslove)
          },
          meta: {
            index: 0
          }
        },
        {
          path: 'tool',
          name: 'toolList',
          component: function (reslove) {
            return require(['./views/toolList'], reslove)
          },
          meta: {
            index: 1
          }
        },
        {
          path: 'tool/category-:category/',
          name: 'toolApiCategoryList',
          component: function (reslove) {
            return require(['./views/toolList'], reslove)
          },
          meta: {
            index: 1
          }
        },
        {
          path: 'tool/category-:category/tag-:tag',
          name: 'toolApiTagList',
          component: function (reslove) {
            return require(['./views/toolList'], reslove)
          },
          meta: {
            index: 1
          }
        },
        {
          path: 'model',
          name: 'modelList',
          component: function (reslove) {
            return require(['./views/modelList'], reslove)
          },
          meta: {
            index: 2
          }
        },
        {
          path: 'model/category-:category/',
          name: 'modelApiCategoryList',
          component: function (reslove) {
            return require(['./views/modelList'], reslove)
          },
          meta: {
            index: 2
          }
        },
        {
          path: 'model/category-:category/tag-:tag',
          name: 'modelApiTagList',
          component: function (reslove) {
            return require(['./views/modelList'], reslove)
          },
          meta: {
            index: 2
          }
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: function (reslove) {
            return require(['./views/detail'], reslove)
          }
        },
        {
          path: 'desc/:id',
          name: 'desc',
          component: function (reslove) {
            return require(['./views/desc'], reslove)
          }
        },
        {
          path: 'create',
          name: 'create',
          component: function (reslove) {
            return require(['./views/create'], reslove)
          },
          meta: {
            auth: true
          }
        },
        {
          path: 'update/:id',
          name: 'update',
          component: function (reslove) {
            return require(['./views/create'], reslove)
          },
          meta: {
            auth: true
          }
        }
      ]
    },
    {
      path: '*', redirect: '/'
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
