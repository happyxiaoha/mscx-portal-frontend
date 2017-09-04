import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/mscx-order-api/'

var apiAPI = {
  // 获取我申请的api
  getSelfApiList: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'api/getSelfApiList.do',
    //   params: _.pick(options, ['pageSize', 'page'])
    // })
    return Promise.resolve({"code":"000000","message":"success","status":"OK","result":{"list":[{"apiName":"MD5解密","apiDesc":"输入md5串，接口返回加密的源串。","applyTime":"2017-08-31 15:26:53","chargeType":"收费","totalTime":0,"remainTime":-1,"sourceId":60,"sourcePakcageId":-2,"logoUrl":"http://sdk.scity.cn/image/get/system/default/707cb3a11ef32446469538425430f7df.jpg","viewCnt":"20","applyCnt":"3","typeStatus":"05","price":"0","chargeCount":null,"status":"0"}],"page":{"startIndex":0,"endIndex":1,"totalPage":1,"currentPage":1,"totalSize":1,"url":null}}})
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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'order/getOrderList.do',
    //   params: _.pick(options, ['pageSize', 'page'])
    // })
    return Promise.resolve({"code":"000000","message":"success","status":"OK","result":{"list":[{"orderNum":"lubin1001","orderTime":"2017-08-31 15:26:53","orderCash":0.0,"havePay":0.0,"orderType":null,"orderStatus":"已付款","orderUserName":null,"payWay":null,"order_classify":"1","sourceDetail":[{"id":2193,"orderId":3111,"resourceId":60,"resourceType":"01","resourceName":"MD5解密","chargeRuleId":-2,"chargeRuleName":"按合同收费","chargeRuleDes":"按合同收费","chargeRuleType":"1","itemCash":0.0,"itemNumber":1,"itemCashTotal":0.0,"area":"000000","createdTime":1504164413000,"createdBy":null,"udpatedTime":null,"updatedBy":null,"defaulTime":-1,"resourceDelayTime":null,"payType":null,"orderUserId":"440100000002681","orderUserName":"lxy111","createUserId":null,"orderNum":"lubin1001","sourceJson":"{\"area\":\"000000\",\"apiName\":\"MD5解密\",\"feeCount\":0,\"chargeRuleId\":-1,\"apiServiceDesc\":\"输入md5串，接口返回加密的源串。\",\"chargeType\":\"02\",\"chargeTypeDesc\":\"收费\",\"apiServiceId\":60,\"type\":\"3\",\"chargeStatus\":\"01\",\"categoryName\":\"应用开发\",\"logoUrl\":\"http://sdk.scity.cn/image/get/system/default/707cb3a11ef32446469538425430f7df.jpg\",\"earningCount\":0,\"providerId\":81,\"price\":0,\"chargeMethod\":\"05\",\"apiTypeDesc\":\"工具API\",\"categoryId\":100,\"providerName\":\"易源接口\",\"status\":\"0\"}","unitPrice":"0","resourceChargeType":"02","effectiveTime":null,"ineffectiveTime":null,"discount":1.0,"free":false}],"pay_balance":null,"havaPayPoint":null}],"page":{"startIndex":0,"endIndex":1,"totalPage":1,"currentPage":1,"totalSize":1,"url":"/order/getOrderList.do"}}})
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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'invoice/queryInvoices.do',
    //   params: _.pick(options, ['page', 'pageSize', 'taxpayerName'])
    // })
    return Promise.resolve({"code":"000000","message":"success","status":"OK","result":{"list":[],"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0,"url":"/invoice/queryInvoices.do"}}})
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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'invoice/enableAccount.do'
    // })
    return Promise.resolve({"code":"000000","message":"success","status":"OK","result":0.0})
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