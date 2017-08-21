/**
 * 需求定制模块的路由设置
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
          name: 'apiEnv',
          component: function (reslove) {
            return require(['./views/apiEnv'], reslove)
          },
          meta: {
            index: 0
          }
        },
        {
          path: '/serverEnv',
          name: 'serverEnv',
          component: function (reslove) {
            return require(['./views/serverEnv'], reslove)
          },
          meta: {
            index: 1
          }
        },
        {
          path: '/api',
          name: 'apiList',
          component: function (reslove) {
            return require(['./views/apiList'], reslove)
          },
          meta: {
            index: 2
          }
        },
        {
          path: '/service',
          name: 'serviceList',
          component: function (reslove) {
            return require(['./views/serviceList'], reslove)
          },
          meta: {
            index: 3
          }
        },
        {
          path: '/api/detail/:id',
          name: 'apiDetail',
          component: function (reslove) {
            return require(['./views/apiDetail'], reslove)
          },
          meta: {
            index: 2
          }
        },
        {
          path: '/service/detail/:id',
          name: 'serviceDetail',
          component: function (reslove) {
            return require(['./views/serviceDetail'], reslove)
          },
          meta: {
            index: 3
          }
        },
        {
          path: '/api/create',
          name: 'apiCreate',
          component: function (reslove) {
            return require(['./views/createApi'], reslove)
          }
        },
        {
          path: '/service/create',
          name: 'serviceCreate',
          component: function (reslove) {
            return require(['./views/createService'], reslove)
          }
        },
        {
          path: '/api/update/:id',
          name: 'apiUpdate',
          component: function (reslove) {
            return require(['./views/createApi'], reslove)
          }
        },
        {
          path: '/api/desc/:id',
          name: 'apiDesc',
          component: function (reslove) {
            return require(['./views/apiDesc'], reslove)
          }
        },
        {
          path: '/service/update/:id',
          name: 'serviceUpdate',
          component: function (reslove) {
            return require(['./views/createService'], reslove)
          }
        },
        {
          path: '/service/desc/:id',
          name: 'serviceDesc',
          component: function (reslove) {
            return require(['./views/serviceDesc'], reslove)
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
//         '': 'dataAPI',
//         'data': 'dataAPI',
//         'data(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'dataAPI',
//         'tool(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'toolAPI',
//         'model(/keyword-:keyword)(/scope-:scope)(/chargeType-:chargeType)(/orderBy-:orderBy)': 'modelAPI',
//         'detail/:id': 'detail',
//         'createApi': 'createApiView',
//         'updateApi/:id': 'updateApiView',
//         'apiDes/:id': 'apiDesView'
//     },
//     dataAPI:function (keyword, scope, chargeType, orderBy) {
//         if(location.search) return;
        
//         var APIView = require('api/APIView.js');
//         mscxPage.views['dataAPIObj'] = new APIView({
//             id: 'data',
//             model: {
//                 keyword: keyword,
//                 scope: scope,
//                 chargeType: chargeType,
//                 orderBy: orderBy
//             }
//         });
//     },
//     toolAPI:function (keyword, scope, chargeType, orderBy) {
//         var APIView = require('api/APIView.js');
//         mscxPage.views['toolAPIObj'] = new APIView({
//             id: 'tool',
//             model: {
//                 keyword: keyword,
//                 scope: scope,
//                 chargeType: chargeType,
//                 orderBy: orderBy
//             }
//         });
//     },
//     modelAPI:function (keyword, scope, chargeType, orderBy) {
//         var APIView = require('api/APIView.js');
//         mscxPage.views['modelAPIObj'] = new APIView({
//             id: 'model',
//             model: {
//                 keyword: keyword,
//                 scope: scope,
//                 chargeType: chargeType,
//                 orderBy: orderBy
//             }
//         });
//     },
//     detail: function(id) {
//         var view = require('api/detailView.js');

//         var detailView = mscxPage.views['apiDetailView'];
//         detailView && detailView.undelegateEvents() && detailView.stopListening();

//         mscxPage.views['apiDetailView'] = new view({
//             id: id
//         });
//     },
//     createApiView: function () {
//         var createApiView = require('api/apiManage/createApiView.js');
//         mscxPage.views['createApiViewObj'] = new createApiView();
//     },
//     updateApiView: function (id) {
//         var updateApiView = require('api/apiManage/updateApiView.js');
//         mscxPage.views['updateApiViewObj'] = new updateApiView({
//             id: id
//         });
//     },
//     apiDesView: function (id) {
//         var apiDesView = require('api/apiManage/apiDesView.js');
//         mscxPage.views['apiDesViewObj'] = new apiDesView({
//             id: id
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

