import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/mscx-dict-api/'

var ucAPI = {
  // 头部-热搜关键词
  getHotWordList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'hotWord/selectHotWordList.do'
    })
  },
  // 获取服务对象
  getServiceObject: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'dict/getServiceObject.do'
    })
  },
  // 获取数据API分类
  getDataApiCategory: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'category/getDataApiCategory.do'
    })
  },
  // 获取模型API分类
  getModelApiCategory: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'category/getModelApiCategory.do'
    })
  },
  // 获取工具API分类
  getToolApiCategory: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'category/getToolApiCategory.do'
    })
  },
  // 获取API分类
  getApiTypeAndCategory: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'category/getApiTypeAndCategory.do'
    })
  },
  // 获取所有API分类
  getApiCategory: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'category/getApiCategory.do'
    })
  },
  // 获取微服务分类
  getServiceCategory: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'category/getServiceCategory.do'
    })
  },
  // saas分类
  getSaasCategory: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'category/getSassCategory.do'
    })
  },
  // 数据API标签
  getDataApiTags: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'tags/getDataApiTags.do'
    })
  },
  // 工具API标签
  getToolApiTags: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'tags/getToolApiTags.do'
    })
  },
  // 模型API标签
  getModelApiTags: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'tags/getModelApiTags.do'
    })
  },
  // 微服务标签
  getServiceTags: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'tags/getServiceTags.do'
    })
  },
  // saas标签
  getSaasTags: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'tags/getSassTags.do'
    })
  },
  // 标签详情 根据categoryId获取
  getTagsInfo: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'tags/getTagsInfo.do',
      params: _.pick(options, 'categoryId')
    })
  },
  // 收费类型
  getChargeWays: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'tags/getChargeWays.do'
    })
  },
  // 收费类型
  getTagsInfoWithPinyin: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'tags/getTagsInfo4pinyin.do',
      params: _.pick(options, ['categoryId'])
    })
  },
  // 新增标签
  addTag: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'tags/addTag.do',
      data: _.pick(options, ['categoryId', 'tagName'])
    })
  },
}

export default ucAPI;