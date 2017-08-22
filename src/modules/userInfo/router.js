/**
 * 用户中心模块的路由设置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
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
          name: 'userDefault',
          component: function (reslove) {
            return require(['./views/default'], reslove)
          }
        },
        {
          path: '/user',
          component: function (reslove) {
            return require(['./views/user/index'], reslove)
          },
          children: [
            {
              path: '',
              name: 'centerBasic',
              component: function (reslove) {
                return require(['./views/user/basic'], reslove)
              },
              meta: {
                subIndex: 0
              }
            },
            {
              path: 'auth',
              name: 'centerAuth',
              component: function (reslove) {
                return require(['./views/user/auth'], reslove)
              },
              meta: {
                subIndex: 2
              }
            },
            {
              path: 'password',
              name: 'centerPassword',
              component: function (reslove) {
                return require(['./views/user/password'], reslove)
              },
              meta: {
                subIndex: 1
              }
            }
          ]
        }, {
          path: '/demand',
          component: function (reslove) {
            return require(['./views/demand/index'], reslove)
          },
          children: [
            {
              path: '',
              name: 'demandApi',
              component: function (reslove) {
                return require(['./views/demand/api'], reslove)
              },
              meta: {
                subIndex: 0
              }
            },
            {
              path: 'service',
              name: 'demandService',
              component: function (reslove) {
                return require(['./views/demand/service'], reslove)
              },
              meta: {
                subIndex: 1
              }
            },
            {
              path: 'follow',
              name: 'demandFollow',
              component: function (reslove) {
                return require(['./views/demand/follow'], reslove)
              },
              meta: {
                subIndex: 2
              }
            },
            {
              path: 'accept',
              name: 'demandAccept',
              component: function (reslove) {
                return require(['./views/demand/accept'], reslove)
              },
              meta: {
                subIndex: 3
              }
            }
          ]
        }, {
          path: '/api',
          component: function (reslove) {
            return require(['./views/api/index'], reslove)
          },
          children: [
            {
              path: '',
              name: 'apiPublished',
              component: function (reslove) {
                return require(['./views/api/published'], reslove)
              },
              meta: {
                subIndex: 0
              }
            },
            {
              path: 'ordered',
              name: 'apiOrdered',
              component: function (reslove) {
                return require(['./views/api/ordered'], reslove)
              },
              meta: {
                subIndex: 1
              }
            },
            {
              path: 'follow',
              name: 'apiFollow',
              component: function (reslove) {
                return require(['./views/api/follow'], reslove)
              },
              meta: {
                subIndex: 2
              }
            }
          ]
        }, {
          path: '/saas',
          component: function (reslove) {
            return require(['./views/saas/index'], reslove)
          },
          children: [
            {
              path: '',
              name: 'saasPublished',
              component: function (reslove) {
                return require(['./views/saas/published'], reslove)
              },
              meta: {
                subIndex: 0
              }
            },
            {
              path: 'follow',
              name: 'saasFollow',
              component: function (reslove) {
                return require(['./views/saas/follow'], reslove)
              },
              meta: {
                subIndex: 1
              }
            },
            {
              path: 'record',
              name: 'saasRecord',
              component: function (reslove) {
                return require(['./views/saas/record'], reslove)
              },
              meta: {
                subIndex: 2
              }
            },
          ]
        }, {
          path: '/service',
          component: function (reslove) {
            return require(['./views/service/index'], reslove)
          },
          children: [
            {
              path: '',
              name: 'servicePublished',
              component: function (reslove) {
                return require(['./views/service/published'], reslove)
              },
              meta: {
                subIndex: 0
              }
            },
            {
              path: 'follow',
              name: 'serviceFollow',
              component: function (reslove) {
                return require(['./views/service/follow'], reslove)
              },
              meta: {
                subIndex: 1
              }
            },
            {
              path: 'record',
              name: 'serviceRecord',
              component: function (reslove) {
                return require(['./views/service/record'], reslove)
              },
              meta: {
                subIndex: 2
              }
            },
          ]
        }, {
          path: '/point',
          component: function (reslove) {
            return require(['./views/point/index'], reslove)
          },
          children: [
            {
              path: '',
              name: 'pointList',
              component: function (reslove) {
                return require(['./views/point/list'], reslove)
              },
              meta: {
                subIndex: 0
              }
            },
            {
              path: 'income',
              name: 'pointIncome',
              component: function (reslove) {
                return require(['./views/point/income'], reslove)
              },
              meta: {
                subIndex: 1
              }
            },
            {
              path: 'outlay',
              name: 'pointOutlay',
              component: function (reslove) {
                return require(['./views/point/outlay'], reslove)
              },
              meta: {
                subIndex: 2
              }
            },
            {
              path: 'rule',
              name: 'pointRule',
              component: function (reslove) {
                return require(['./views/point/rule'], reslove)
              },
              meta: {
                subIndex: 3
              }
            },
            {
              path: 'qa',
              name: 'pointQA',
              component: function (reslove) {
                return require(['./views/point/qa'], reslove)
              },
              meta: {
                subIndex: 4
              }
            },
          ]
        }, {
          path: '/orders',
          component: function (reslove) {
            return require(['./views/orders/index'], reslove)
          },
          children: [
            {
              path: '',
              name: 'shopcart',
              component: function (reslove) {
                return require(['./views/orders/shopcart'], reslove)
              },
              meta: {
                subIndex: 0
              }
            },
            {
              path: 'list',
              name: 'orderList',
              component: function (reslove) {
                return require(['./views/orders/list'], reslove)
              },
              meta: {
                subIndex: 1
              }
            },
            {
              path: 'sales',
              name: 'orderSales',
              component: function (reslove) {
                return require(['./views/orders/sales'], reslove)
              },
              meta: {
                subIndex: 2
              }
            }
          ]
        }, {
          path: '/recharge',
          name: 'recharge',
          component: function (reslove) {
            return require(['./views/recharge/index'], reslove)
          }
        }, {
          path: '/account',
          component: function (reslove) {
            return require(['./views/account/index'], reslove)
          },
          children: [
            {
              path: '',
              name: 'accountIndex',
              component: function (reslove) {
                return require(['./views/account/recharge'], reslove)
              },
              meta: {
                subIndex: 0
              }
            },
            {
              path: 'recharge/result/:orderNum',
              name: 'rechargeResult',
              component: function (reslove) {
                return require(['./views/account/recharge'], reslove)
              },
              meta: {
                subIndex: 0
              }
            },
            {
              path: 'setPayPassword',
              name: 'accountPassword',
              component: function (reslove) {
                return require(['./views/account/setPayPassword'], reslove)
              },
              meta: {
                subIndex: 1
              }
            },
            {
              path: 'rechargeRecord',
              name: 'rechargeRecord',
              component: function (reslove) {
                return require(['./views/account/rechargeRecord'], reslove)
              },
              meta: {
                subIndex: 2
              }
            },
            {
              path: 'consumeRecord',
              name: 'consumeRecord',
              component: function (reslove) {
                return require(['./views/account/consumeRecord'], reslove)
              },
              meta: {
                subIndex: 3
              }
            },
            {
              path: 'invoice',
              name: 'accountInvoice',
              component: function (reslove) {
                return require(['./views/account/invoice'], reslove)
              },
              meta: {
                subIndex: 4
              }
            }
          ]
        }
      ]
    },
    {
      path: '*', redirect: '/'
    }
  ]
})

router.beforeEach(function (to, from, next) {
  // console.log(store.getters.user)
  // if(!store.getters.user.userId) {
  //   location.href = 'login.html'
  // }else {
    next()
  // }
})

router.afterEach(function (route) {
})

export default router