import Axios from '../http'
import _ from 'lodash'

var baseUrl = 'ro/mscx-provider-api/'

var apiAPI = {
  // 判断某个资源是否有折扣
  getDiscountInfo: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'selectDisocunt.do',
      params: _.pick(options, ['resourceId', 'resourceType'])
    })
  }
  
}

export default apiAPI;