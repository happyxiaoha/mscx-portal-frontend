import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/mscx-account-api/'

var apiAPI = {
  // 获取账户信息
  getAccountInfo: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'getAccountInfo.do'
    })
  },
  // 创建支付密码
  createPaypwd: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'createPaypwd.do',
      params: _.pick(options, ['payPwd'])
    })
  },
  // 修改支付密码
  changePwd: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'changePwd.do',
      params: _.pick(options, ['oldPwd', 'newPwd'])
    })
  },
  getRechargeList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'getRechargeList.do',
      params: _.pick(options, ['page', 'pageSize', 'beginTime', 'endTime'])
    })
  },
  getConsumeList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'getConsumeList.do',
      params: _.pick(options, ['page', 'pageSize', 'beginTime', 'endTime'])
    })
  },
  minusAmount: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'minusAmount.do',
      params: _.pick(options, ['payPwd', 'orderNo'])
    })
  },
}

export default apiAPI;