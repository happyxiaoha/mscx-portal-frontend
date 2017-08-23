import Axios from '../http'
import _ from 'lodash'

var baseUrl = '/ro/mscx-api-api/'

var apiAPI = {
  // 首页-导航栏-api
  getNavigationApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/getNavigationApi.do'
    })
  },
  // 首页-精选API
  getSelectedApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/getSelectedApi.do',
    })
  },
  // 首页-saas营销信息
  getMarketingTheme: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'getMarketingTheme.do'
    })
  },
  // 获取数据API列表
  getDataApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/queryDataApi.do',
      params: _.pick(options, ['orderBy', 'keyword', 'chargeType', 'serviceObject', 'scope', 'categoryId', 'tagId', 'page', 'pageSize'])
    })
  },
  // 获取工具API列表
  getToolApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/queryToolApi.do',
      params: _.pick(options, ['orderBy', 'keyword', 'chargeType', 'serviceObject', 'scope', 'categoryId', 'tagId', 'page', 'pageSize'])
    })
  },
  // 获取模型API列表
  getModelApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/queryModelApi.do',
      params: _.pick(options, ['orderBy', 'keyword', 'chargeType', 'serviceObject', 'scope', 'categoryId', 'tagId', 'page', 'pageSize'])
    })
  },
  // 获取API详情
  getApiDetail: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/getApiServiceDetailById.do?t=' + new Date().getTime(),
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 关注
  followApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'userAttention/add.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 取消关注
  unfollowApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'userAttention/remove.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 获取API套餐信息
  getPackage: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'charge/getChargeRuleByServiceId.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 上传图片
  uploadFileUrl: baseUrl + 'uploadFile.do',
  // 新增API
  publishServiceApi: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'service/publishServiceApi.do',
      data: options
    })
  },
  // 修改API
  modifyServiceApi: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'service/modifyServiceApi.do',
      data: options
    })
  },
  // 检查API标识的唯一
  checkApiServerId: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/checkApiByIdentification.do',
      params: _.pick(options, ['name'])
    })
  },
  // 获取收费说明
  getFee: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/getFee.do',
      params: _.pick(options, ['price'])
    })
  },
  // 获取修改API的详情
  getApiDetailUpdate: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/getMyApiServiceDetailById.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 获取套餐
  getMyChargeRuleByServiceId: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'charge/getMyChargeRuleByServiceId.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 获取发布的API
  getMyPublishedApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/getMyPublishedApi.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 下架发布的API
  offlineServiceApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/offlineServiceApi.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 删除发布的API
  deleteApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/deleteServiceApi.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 修改API套餐
  modifyChargeRule: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'charge/modifyChargeRule.do',
      data: options
    })
  },
  // 获取关注的API
  getMyAttentionApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/getMyAttentionApi.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 取消API关注
  cancelFollow: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'userAttention/remove.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 查询API
  searchApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/searchApi.do',
      params: _.pick(options, ['keyword', 'page', 'pageSize'])
    })
  },
  // 评分
  addScore: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'userScore/add.do',
      params: _.pick(options, ['apiServiceId', 'score'])
    })
  },
  
}

export default apiAPI;