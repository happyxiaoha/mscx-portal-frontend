import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/mscx-order-api/'

var apiAPI = {
  // 获取我申请的api
  getSelfApiList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'api/getSelfApiList.do',
      params: _.pick(options, ['pageSize', 'page'])
    })
  },
  // 获取我申请的Saas
  getSaaSList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'saas/getSaaSList.do',
      params: _.pick(options, ['pageSize', 'page'])
    })
  },
  // 获取我的订单
  getOrderList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'order/getOrderList.do',
      params: _.pick(options, ['pageSize', 'page'])
    })
  },
  // 账户充值下单
  placeRechargeOrder: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'order/placeRechargeOrder.do',
      params: _.pick(options, ['rechargeAmount'])
    })
  },
  queryInvoices: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'invoice/queryInvoices.do',
      params: _.pick(options, ['page', 'pageSize', 'taxpayerName'])
    })
  },
  insertInvoice: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'invoice/insertInvoice.do',
      data: options
    })
  },
  enableAccount: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'invoice/enableAccount.do'
    })
  },
  uploadInvoiceFileUrl: baseUrl + 'invoice/uploadFile.do',
  getOrderDetail: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'order/getOrderDetail.do',
      params: _.pick(options, ['orderNum'])
    })
  },

}

export default apiAPI;