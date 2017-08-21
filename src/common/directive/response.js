import Vue from 'vue';
import { addClass, removeClass } from 'common/utils/dom';

Vue.directive('loading-response', {
  bind: function(el, binding) {
    
  },

  update: function(el, binding) {
    var response = binding.value;
    var loadingMaskEl = el.querySelector('.el-loading-spinner');
    if (binding.oldValue !== binding.value) {
      if(response.status === 'OK') {
        addClass(el, 'loading-success');
        addClass(loadingMaskEl, 'el-icon-circle-check');
      }else {
        addClass(el, 'loading-fail');
        addClass(loadingMaskEl, 'el-icon-information');
      }
    }
  },

  unbind: function(el, binding) {
    if (el.domInserted) {
      var loadingMaskEl = el.querySelector('.el-loading-spinner');
      removeClass(el, 'loading-success');
      removeClass(el, 'loading-fail');
      removeClass(loadingMaskEl, 'el-icon-circle-check');
      removeClass(loadingMaskEl, 'el-icon-information');
    }
  }
});