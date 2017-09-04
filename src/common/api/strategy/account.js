import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/mscx-account-api/'

var apiAPI = {
  // 获取账户信息
  getAccountInfo: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'getAccountInfo.do'
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":{"id":57,"user_id":"440100000002681","user_name":"lxy111","account_balance":0.00,"status":"0","area":"000000","created_time":1504408645000,"created_by":"lxy111","created_from":"1","created_user_id":"440100000002681","updated_time":1504408645000,"updated_by":"lxy111","version":0,"pay_pwd":"96E79218965EB72C92A549DD5A330112","guaranteeBalance":0.00,"freezeBalance":0,"useableBalance":0.00}})
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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'getRechargeList.do',
    //   params: _.pick(options, ['page', 'pageSize', 'beginTime', 'endTime'])
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":{"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0},"totalMoneny":0,"list":[]}})
  },
  getConsumeList: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'getConsumeList.do',
    //   params: _.pick(options, ['page', 'pageSize', 'beginTime', 'endTime'])
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":{"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0},"list":[]}})
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