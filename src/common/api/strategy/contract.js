import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/mscx-contract-api/'

var apiAPI = {
  // 提交线下洽谈申请
  submitOfflineChat: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'service/offlineMeet.do',
      data: _.pick(options, ['apiServiceId', 'type', 'cname', 'resReq', 'purpose', 'contact', 'contactNo'])
    })
  },
  // 获取开口合同资源授权信息
  getResourceInfo: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'contract/getResourceInfo.do',
      params: _.pick(options, ['contractNum', 'page', 'pageSize'])
    })
  },
  // 获取开口合同资源授权信息
  getInvokeInfo: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'contract/getInvokeInfo.do',
      params: _.pick(options, ['contractNum', 'page', 'pageSize'])
    })
    // return Promise.resolve({"code":"000000","message":null,"result":{"page":null,"list":null},"status":"OK"})
  },
  invokeInfoExcelUrl: baseUrl + 'invokeInfoExcel.do',
  resourceInfoExcelUrl: baseUrl + 'resourceInfoExcel.do'
}

export default apiAPI;