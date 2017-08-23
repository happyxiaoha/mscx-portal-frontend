import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/mscx-point-api/'

var apiAPI = {
  // 获取积分明细列表
  getAllPointRecordList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'point/getAllPointRecordList.do',
      params: _.pick(options, ['pageNum', 'pageSize', 'startTime', 'endTime'])
    })
  },
  // 获取积分收入列表
  getIncomePointRecordList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'point/getIncomePointRecordList.do',
      params: _.pick(options, ['pageNum', 'pageSize', 'startTime', 'endTime'])
    })
  },
  // 获取积分支出列表
  getExpensePointRecordList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'point/getExpensePointRecordList.do',
      params: _.pick(options, ['pageNum', 'pageSize', 'startTime', 'endTime'])
    })
  },
  // 获取积分规则
  getPointRuleList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'point/getPointRuleList.do',
      params: _.pick(options, ['pageNum', 'pageSize'])
    })
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