import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      path: '',
      component: function (reslove) {
        return require(['./views/index'], reslove)
      }
    },
    {
      path: '*', redirect: '/'
    }
  ]
})

export default router

// var Routes =  Backbone.Router.extend({
//     routes: {
//         '': 'saasView',
//         'saas': 'saasView',
//         'detail/:id': 'detailView'
//     },
//     saasView: function () {
//         if(location.search) return;
        
//         var contentView = require('saas/contentView.js');
//         mscxPage.views['saasObj'] = new contentView({
//             id: 'service',
//             model: {
//             }
//         });
//     },
//     detailView: function(id) {
//         var serviceDetailView = require('saas/detailView.js');
//         var detailView = mscxPage.views['saasDetailView'];
//         detailView && detailView.undelegateEvents() && detailView.stopListening();

//         mscxPage.views['saasDetailView'] = new serviceDetailView({
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
