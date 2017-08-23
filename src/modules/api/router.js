/**
 * API模块的路由设置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

var router = new VueRouter({
  // mode: 'history',
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
          path: '/data',
          name: 'dataList',
          component: function (reslove) {
            return require(['./views/list'], reslove)
          },
          meta: {
            index: 0
          }
        },
        {
          path: '/data/category-:category/',
          name: 'dataApiCategoryList',
          component: function (reslove) {
            return require(['./views/list'], reslove)
          },
          meta: {
            index: 0
          }
        },
        {
          path: '/data/category-:category/tag-:tag',
          name: 'dataApiTagList',
          component: function (reslove) {
            return require(['./views/list'], reslove)
          },
          meta: {
            index: 0
          }
        },
        {
          path: '/tool',
          name: 'toolList',
          component: function (reslove) {
            return require(['./views/toolList'], reslove)
          },
          meta: {
            index: 1
          }
        },
        {
          path: '/tool/category-:category/',
          name: 'toolApiCategoryList',
          component: function (reslove) {
            return require(['./views/list'], reslove)
          },
          meta: {
            index: 1
          }
        },
        {
          path: '/tool/category-:category/tag-:tag',
          name: 'toolApiTagList',
          component: function (reslove) {
            return require(['./views/list'], reslove)
          },
          meta: {
            index: 1
          }
        },
        {
          path: '/model',
          name: 'modelList',
          component: function (reslove) {
            return require(['./views/modelList'], reslove)
          },
          meta: {
            index: 2
          }
        },
        {
          path: '/model/category-:category/',
          name: 'modelApiCategoryList',
          component: function (reslove) {
            return require(['./views/list'], reslove)
          },
          meta: {
            index: 2
          }
        },
        {
          path: '/model/category-:category/tag-:tag',
          name: 'modelApiTagList',
          component: function (reslove) {
            return require(['./views/list'], reslove)
          },
          meta: {
            index: 2
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
          path: '/desc/:id',
          name: 'desc',
          component: function (reslove) {
            return require(['./views/desc'], reslove)
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

