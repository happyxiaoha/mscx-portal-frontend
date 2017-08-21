import Axios from '../http'
import _ from 'lodash'

var baseUrl = 'ro/mscx-requirement-api/'

var demandAPI = {
  // API需求列表页
  getApiList: function (options) {
    options = options || {};
    let params = _.pick(options, ['page', 'pageSize', 'keywords']);
    if(options.beginTime) {
      params.beginTime = options.beginTime;
    }
    if(options.endTime) {
      params.endTime = options.endTime;
    }
    return Axios({
      method: 'GET',
      url : baseUrl + 'queryAllApi.do',
      params: params
    })
  },
  // 服务需求列表页
  getServiceList: function (options) {
    options = options || {};
    let params = _.pick(options, ['page', 'pageSize', 'keywords']);
    if(options.beginTime) {
      params.beginTime = options.beginTime;
    }
    if(options.endTime) {
      params.endTime = options.endTime;
    }

    return Axios({
      method: 'GET',
      url : baseUrl + 'queryServiceListOfAll.do',
      params: params
    })
  },
  // 服务需求详情
  getServiceDetail: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'getServiceDetail.do',
      params: _.pick(options, 'id')
    })
  },
  // API需求详情
  getApiDetail: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'apiDetail.do',
      params: _.pick(options, 'id')
    })
  },
  // 关注API需求
  followApiDemand: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'addApiFocus.do',
      data: _.pick(options, 'id')
    })
  },
  // 取消关注API需求
  unfollowApiDemand: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'reduceApiFocus.do',
      data: _.pick(options, 'id')
    })
  },
  // 关注服务需求
  followServiceDemand: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'addReqServiceFocus.do',
      data: _.pick(options, 'serviceId')
    })
  },
  // 取消关注服务需求
  unfollowServiceDemand: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'cancelServiceFocus.do',
      data: _.pick(options, 'serviceId')
    })
  },
  // 新增API接单（form提交）
  addApiDemandOrder: {
    url: baseUrl + 'addApiOrder.do'
  },
  // 新增API需求（form提交）
  addApiDemand: {
    url: baseUrl + 'addApi.do'
  },
  // 修改API需求（form提交）
  modifyApiDemand: {
    url: baseUrl + 'modifyApi.do'
  },
  // 新增服务接单
  addServiceDemandOrder: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'addServiceOrder.do',
      data: _.pick(options, 'reqId', 'price', 'planIntro', 'contactUsername', 'contactPhone')
    })
  },
  // 获取修改API需求的详情
  getModifyApiDetail: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'modifyApiDetail.do',
      params: _.pick(options, 'id')
    })
  },
  // 新增服务需求
  addService: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'addService.do',
      data: options
    })
  },
  // 修改服务需求
  modifyService: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'modifyService.do',
      data: options
    })
  },
  // 获取修改服务需求的详情
  getModifyServiceDetail: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'getServiceDetailOfMe.do',
      params: _.pick(options, 'id')
    })
  },
  // 获取发布的API需求
  queryApi: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'queryApi.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 删除API需求
  deleteApi: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'deleteApi.do',
      data: _.pick(options, ['id'])
    })
  },
  // 关闭API需求
  closeApi: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'closeApi.do',
      data: _.pick(options, ['id'])
    })
  },
  // 发布API需求
  publishApi: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'publishApi.do',
      data: _.pick(options, ['id'])
    })
  },
  // 查看api需求接单列表
  queryApiOrder: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'queryApiOrder.do',
      params: _.pick(options, ['id', 'page', 'pageSize'])
    })
  },
  // 查看api需求接单方案
  queryApiOrderDetail: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'apiOrderDetail.do',
      params: _.pick(options, ['id'])
    })
  },
  // 确认api需求接单
  confirmApiOrder: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'confirmApiOrder.do',
      data: _.pick(options, ['id', 'reqId'])
    })
  },
  // 拒绝api需求接单
  refuseApiOrder: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'refuseApiOrder.do',
      data: _.pick(options, ['id', 'reqId'])
    })
  },
  // 获取发布的服务需求
  queryService : function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'queryServiceListOfMe.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 删除服务需求
  deleteService: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'deleteService.do',
      data: _.pick(options, ['id'])
    })
  },
  // 关闭服务需求
  closeService: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'closeService.do',
      data: _.pick(options, ['id'])
    })
  },
  // 发布服务需求
  publishService: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'publishService.do',
      data: _.pick(options, ['id'])
    })
  },
  // 查看服务需求接单列表
  queryServiceOrder: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'queryServiceOrder.do',
      params: _.pick(options, ['reqId', 'page', 'pageSize'])
    })
  },
  // 查看服务需求接单方案
  queryServiceOrderDetail: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'getServiceOrder.do',
      params: _.pick(options, ['id'])
    })
  },
  // 确认服务需求接单
  confirmServiceOrder: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'confirmServiceOrder.do',
      data: _.pick(options, ['id', 'reqId'])
    })
  },
  // 拒绝服务需求接单
  refuseServiceOrder: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'refuseServiceOrder.do',
      data: _.pick(options, ['id', 'reqId'])
    })
  },
  // 获取关注的服务需求
  queryServiceFocus: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'queryServiceFocus.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 获取关注的API需求
  queryApiFocus: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'queryApiFocus.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 取消关注服务需求
  cancelServiceFocus: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'cancelServiceFocus.do',
      data: _.pick(options, ['serviceId'])
    })
  },
  // 取消关注API需求
  reduceApiFocus: function(options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'reduceApiFocus.do',
      data: _.pick(options, ['id'])
    })
  },
  // 我的API需求接单
  queryMyApiOrder: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'queryMyApiOrder.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 我的服务需求接单
  queryMyServiceOrder: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'queryServiceOrderOfMe.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // add pv
  addApiPV: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'addApiPV.do',
      params: _.pick(options, ['id'])
    })
  },
  addServicePV: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'addPageViewAmount.do',
      params: _.pick(options, ['id'])
    })
  },
}

export default demandAPI;