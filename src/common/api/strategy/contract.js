import Axios from '../http'
import _ from 'lodash'

var baseUrl = 'ro/mscx-contract-api/'

var apiAPI = {
  // 提交线下洽谈申请
  submitOfflineChat: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'service/offlineMeet.do',
      data: _.pick(options, ['apiServiceId', 'type', 'cname', 'resReq', 'purpose', 'contact', 'contactNo'])
    })
  }
  
}

export default apiAPI;