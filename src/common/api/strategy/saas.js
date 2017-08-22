import Axios from '../http'
import _ from 'lodash'

var baseUrl = 'ro/mscx-saas-api/'

var saasAPI = {
  // 首页-导航saas
  getNavigationApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/getNavigationApi.do'
    })
  },
  // 首页-精选saas
  getSelectedSaas: function (options) {
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
  // 获取Saas套餐信息
  getPackage: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'chargeRule/get.do',
      params: _.pick(options, ['saasId'])
    })
  },
  // 获取Saas列表
  getSaasList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'list.do',
      params: _.pick(options, ['orderBy', 'keyword', 'chargeType', 'serviceObject', 'scope', 'categoryId', 'tagId', 'page', 'pageSize'])
    })
  },
  // 获取Saas详情
  getSaasDetail: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'get.do',
      params: _.pick(options, ['id'])
    })
  },
  // 关注saas
  followSaas: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'attention/add.do',
      params: _.pick(options, ['id'])
    })
  },
  // 取消关注saas
  unfollowSaas: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'attention/delete.do',
      params: _.pick(options, ['id'])
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
  // 发布SaaS
  publishSaas: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'apply.do',
      data: options
    })
  },
  // 修改微服务
  modifySaas: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'modify.do',
      data: options
    })
  },
  // 修改Saas的详情
  getUpdateDetail: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'publish/get.do',
      params: _.pick(options, ['id'])
    })
  },
  // 获取Saas套餐详情
  getChargeRuleDetail: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'publish/chargeRule/get.do',
      params: _.pick(options, ['saasId'])
    })
  },
  // 获取发布的Saas
  getMyPublishedSaas: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'publish/list.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 下架发布的saas
  offlineServiceSaas: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'unshelve.do',
      params: _.pick(options, ['id'])
    })
  },
  // 删除发布的saas
  deleteSaas: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'delete.do',
      params: _.pick(options, ['id'])
    })
  },
  // 修改Saas套餐
  modifyChargeRule: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'chargeRule/modify.do',
      data: options
    })
  },
  // 获取关注的Saas
  getMyAttentionSaas: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'attention/list.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 取消Saas关注
  cancelFollow: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'attention/delete.do',
      params: _.pick(options, ['id'])
    })
  },
  // 评分
  addScore: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'userScore/add.do',
      params: _.pick(options, ['saasId', 'score'])
    })
  },
}

export default saasAPI;