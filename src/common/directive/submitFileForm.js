import Vue from 'vue';
import Axios from 'axios'
import _ from 'lodash'
import { addClass, removeClass } from 'common/utils/dom';

Vue.directive('submit-file-form', {
  bind: function(el, binding) {
  },

  update: function(el, binding) {
    var submitOption = binding.value || {}
    if(!submitOption.submitFlag || _.isEqual(submitOption, binding.oldValue)) { return }

    if(window.FormData !== undefined) {
      var formData = new FormData();
      var params = submitOption.params
      for(var key in params) {
        formData.append(key, params[key]);
      }
      Axios({
        method: 'POST',
        url : submitOption.url,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      }).then(function(res) {
        return submitOption.callBack(res)
      }).catch(function(res) {
        return submitOption.callBack(res)
      })
    }else {
      var iframeId = 'MscxFormIO' + (new Date().getTime());
      var iframe;

      el.setAttribute('target', iframeId)
      el.setAttribute('action', submitOption.url)
      el.setAttribute('method', 'POST')
      el.setAttribute('enctype', 'multipart/form-data')
      
      iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.name = iframeId;

      document.body.appendChild(iframe);

      iframe.onload = function(){
        var data = this.contentWindow.document.body.innerHTML;
        submitOption.callBack(JSON.parse(data));

        iframe.parentNode.removeChild(iframe);
        el.removeAttribute('target')
        el.removeAttribute('action')
        el.removeAttribute('method')
        el.removeAttribute('enctype')
      }

      el.submit();
    }
  },

  unbind: function(el, binding) {
    
  }
});