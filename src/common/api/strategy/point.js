import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/mscx-point-api/'

var apiAPI = {
  // 获取积分明细列表
  getAllPointRecordList: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'point/getAllPointRecordList.do',
    //   params: _.pick(options, ['pageNum', 'pageSize', 'startTime', 'endTime'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"remainingPoint":55,"page":{"startIndex":0,"endIndex":2,"totalPage":1,"currentPage":1,"totalSize":2,"url":"/point/getAllPointRecordList.do"},"list":[{"id":865,"taskId":null,"taskName":"个人实名认证","point":50,"remainingPoint":null,"redeemPointAmount":null,"orderId":null,"userId":null,"type":"0","area":null,"createdTime":1504147480000,"createdUserId":null,"createdBy":null,"updatedTime":null,"updatedBy":null,"reqId":null,"loginName":null,"status":null,"version":null,"userLevel":null,"detailedDescription":"个人实名认证奖励50积分"},{"id":839,"taskId":null,"taskName":"注册","point":5,"remainingPoint":null,"redeemPointAmount":null,"orderId":null,"userId":null,"type":"0","area":null,"createdTime":1503972906000,"createdUserId":null,"createdBy":null,"updatedTime":null,"updatedBy":null,"reqId":null,"loginName":null,"status":null,"version":null,"userLevel":null,"detailedDescription":"注册奖励5积分"}]},"status":"OK"})
  },
  // 获取积分收入列表
  getIncomePointRecordList: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'point/getIncomePointRecordList.do',
    //   params: _.pick(options, ['pageNum', 'pageSize', 'startTime', 'endTime'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"page":{"startIndex":0,"endIndex":2,"totalPage":1,"currentPage":1,"totalSize":2,"url":"/point/getIncomePointRecordList.do"},"list":[{"id":865,"taskId":null,"taskName":"个人实名认证","point":50,"remainingPoint":null,"redeemPointAmount":null,"orderId":null,"userId":null,"type":"0","area":null,"createdTime":1504147480000,"createdUserId":null,"createdBy":null,"updatedTime":null,"updatedBy":null,"reqId":null,"loginName":null,"status":null,"version":null,"userLevel":null,"detailedDescription":"个人实名认证奖励50积分"},{"id":839,"taskId":null,"taskName":"注册","point":5,"remainingPoint":null,"redeemPointAmount":null,"orderId":null,"userId":null,"type":"0","area":null,"createdTime":1503972906000,"createdUserId":null,"createdBy":null,"updatedTime":null,"updatedBy":null,"reqId":null,"loginName":null,"status":null,"version":null,"userLevel":null,"detailedDescription":"注册奖励5积分"}]},"status":"OK"})
  },
  // 获取积分支出列表
  getExpensePointRecordList: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'point/getExpensePointRecordList.do',
    //   params: _.pick(options, ['pageNum', 'pageSize', 'startTime', 'endTime'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0,"url":"/point/getExpensePointRecordList.do"},"list":[]},"status":"OK"})
  },
  // 获取积分规则
  getPointRuleList: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'point/getPointRuleList.do',
    //   params: _.pick(options, ['pageNum', 'pageSize'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"page":{"startIndex":0,"endIndex":5,"totalPage":2,"currentPage":1,"totalSize":9,"url":"/point/getPointRuleList.do"},"list":[{"id":null,"taskId":null,"taskName":"累计发布5个有效需求","point":200,"status":null,"enableDate":null,"disableDate":null,"area":null,"createdTime":null,"createdUserId":null,"createdBy":null,"updatedTime":null,"updatedBy":null,"description":"累计发布5个有效需求,奖励200个积分","userLevel":null},{"id":null,"taskId":null,"taskName":"发布1个有效需求","point":20,"status":null,"enableDate":null,"disableDate":null,"area":null,"createdTime":null,"createdUserId":null,"createdBy":null,"updatedTime":null,"updatedBy":null,"description":"发布1个有效需求,奖励20个积分","userLevel":null},{"id":null,"taskId":null,"taskName":"注册","point":5,"status":null,"enableDate":null,"disableDate":null,"area":null,"createdTime":null,"createdUserId":null,"createdBy":null,"updatedTime":null,"updatedBy":null,"description":"注册,奖励5个积分","userLevel":null},{"id":null,"taskId":null,"taskName":"企业实名认证","point":50,"status":null,"enableDate":null,"disableDate":null,"area":null,"createdTime":null,"createdUserId":null,"createdBy":null,"updatedTime":null,"updatedBy":null,"description":"企业实名认证,奖励50个积分","userLevel":null},{"id":null,"taskId":null,"taskName":"个人实名认证","point":50,"status":null,"enableDate":null,"disableDate":null,"area":null,"createdTime":null,"createdUserId":null,"createdBy":null,"updatedTime":null,"updatedBy":null,"description":"个人实名认证,奖励50个积分","userLevel":null}]},"status":"OK"})
  },
  getRemainingPoint: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'point/getRemainingPoint.do'
    })
  },
  getDeductionMoney: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'point/getDeductionMoney.do',
      params: _.pick(options, ['pointNum'])
    })
  },
  getPointDeductionRule: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'pointDeduction/getPointDeductionRule.do',
    })
  },
}

export default apiAPI;