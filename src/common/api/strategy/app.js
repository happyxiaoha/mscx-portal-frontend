import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/mscx-app-api/'

var appAPI = {
  // 首页-导航栏-app
  getNavigationApp: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'recommend/bar.do'
    })
  },
  // 首页-精选微应用
  getSelectedApp: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'recommend/list.do'
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
  // 列表页-查询微服务列表
  getAppList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'list.do',
      params: _.pick(options, ['orderBy', 'keyword', 'chargeType', 'serviceObject', 'scope', 'categoryId', 'tagId', 'page', 'pageSize'])
    })
  },
  // 获取微服务详情
  getAppDetail: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'get.do',
      params: _.pick(options, ['id'])
    })
  },
  // 关注微服务
  followApp: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'attention/add.do',
      params: _.pick(options, ['id'])
    })
  },
  // 取消关注微服务
  unfollowApp: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'attention/delete.do',
      params: _.pick(options, ['id'])
    })
  },
  // 获取APP套餐信息
  getPackage: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'chargeRule/get.do',
      params: _.pick(options, ['appId'])
    })
  },
  uploadFileUrl: baseUrl + 'pic/upload.do',
  // 检查服务标识是否唯一
  checkUnique: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'checkUnique.do',
      params: _.pick(options, ['identify'])
    })
  },
  // 发布微服务
  publishService: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'apply.do',
      data: options
    })
  },
  // 修改微服务
  modifyService: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'modify.do',
      data: options
    })
  },
  // 修改微服务的详情
  getUpdateDetail: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'publish/get.do',
      params: _.pick(options, ['id'])
    })
  },
  // 获取微服务套餐详情
  getChargeRuleDetail: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'publish/chargeRule/get.do',
      params: _.pick(options, ['appId'])
    })
  },
  // 获取我关注的服务
  getFollowService: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'attention/list.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 获取我发布的微服务
  getPublishedService: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'publish/list.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 下架发布的微服务
  offlineService: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'unshelve.do',
      params: _.pick(options, ['id'])
    })
  },
  // 删除发布的微服务
  deleteService: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'delete.do',
      params: _.pick(options, ['id'])
    })
  },
  // 修改微服务套餐
  modifyChargeRule: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'chargeRule/modify.do',
      data: options
    })
  },
  // 新增回调地址
  addCallBackUrl: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'callbackurl/add.do',
      params: _.pick(options, ['appId', 'callbackUrl'])
    })
  },
  // 修改回调地址
  updateCallBackUrl: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'callbackurl/modify.do',
      params: _.pick(options, ['id', 'callbackUrl'])
    })
  },
  // 删除回调地址
  deleteCallBackUrl: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'callbackurl/delete.do',
      params: _.pick(options, ['id'])
    })
  },
  // 评分
  addScore: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'userScore/add.do',
      params: _.pick(options, ['appId', 'score'])
    })
  },
}

export default appAPI;