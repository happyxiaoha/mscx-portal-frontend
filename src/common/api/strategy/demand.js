import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/mscx-requirement-api/'

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
    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'queryAllApi.do',
    //   params: params
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"list":[{"publishTime":1494989501000,"sysType":"B/S无插件","pageviewAmount":24,"netType":"内网系统","reqUser":"刘晓英","developLanguage":"","name":"为了进一步方便市民查询社保信息，顺应政府大数据开放趋势，我局决定以API的形式展现个人养老保险缴费、医疗保险缴费、失业保险缴费、工伤保险缴费和生育保险缴费等信息，企业、开发者可以通过平台竞标此开发项目","sysName":"社保API开发需求-所有权否-内网系统","statusName":"已关闭","id":59,"endTime":1496160000000,"department":"人力资源和社会保障局","statusCode":"5"},{"publishTime":1494989144000,"sysType":"B/S带插件","pageviewAmount":8,"netType":"公网系统","reqUser":"住房公积金管理中心","developLanguage":"JAVA,HTML,","name":"为了进一步方便市民查询公积金信息，根据《贵阳市公积金管理条例》，我中心决定以API的形式展现个人公积金缴存、提取以及余额等信息，企业、开发者可以通过平台竞标此开发项目","sysName":"贵阳公积金API开发需求","statusName":"已关闭","id":57,"endTime":1496160000000,"department":"住房公积金管理中心","statusCode":"5"},{"publishTime":1491009765000,"sysType":"A/S","pageviewAmount":21,"netType":"内网系统","reqUser":"赵雅明","developLanguage":"","name":"健身教学系统","sysName":"健身教学系统","statusName":"已关闭","id":39,"endTime":1493481600000,"department":"智慧神州","statusCode":"5"},{"publishTime":1487209608000,"sysType":"A/S","pageviewAmount":28,"netType":"公网系统","reqUser":"赵雅明","developLanguage":"","name":"整合苏州市出租车车辆信息，供用户查询","sysName":"出租车基本信息系统","statusName":"已关闭","id":33,"endTime":1490889600000,"department":"神州数码","statusCode":"5"},{"publishTime":1485240313000,"sysType":"A/S","pageviewAmount":47,"netType":"内网系统","reqUser":"张广良","developLanguage":"JAVA,","name":"全市中小学生的学籍管理系统，现准备面向社会授权开放中小学生的学籍查询服务，需要提供对外查询接口","sysName":"中小学生学籍管理系统","statusName":"已关闭","id":31,"endTime":1490716800000,"department":"北京市教委信息中心","statusCode":"5"},{"publishTime":1485240051000,"sysType":"A/S","pageviewAmount":11,"netType":"内网系统","reqUser":"张广良","developLanguage":"JAVA,","name":"招投标过程中的企业资质、人员资质、收入证明等在线核验真伪，无需再提供复印件，以防止虚假材料、虚假信息导致招标结果不公","sysName":"招投标资质核验系统","statusName":"已关闭","id":29,"endTime":1488211200000,"department":"市招投局","statusCode":"5"}],"page":{"startIndex":0,"endIndex":6,"totalPage":1,"currentPage":1,"totalSize":6,"url":"/queryAllApi.do"}},"status":"OK"})
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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'queryServiceListOfAll.do',
    //   params: params
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"list":[{"id":29,"name":"test111","description":"描述","required":"要求","money":"10000","endTime":"2017-07-29","contactUsername":"主联系人","contactPhone":"18111111111","contactEmail":"","contactAddress":"","status":"5","area":"000000","userId":"440100000002545","createdBy":null,"createdTime":"2017-07-26","updatedBy":null,"updatedTime":"2017-07-29 17:00:00","remark":null,"pageviewAmount":4,"focusAmount":0,"reqUser":"赵恒尉","publishTime":"2017-07-26","username":null,"statusName":"已关闭","spareContactphone":null,"spareContactname":null,"matchmakeTrade":null,"matchmakeTradeName":null,"categoryId":null,"categoryName":null,"orderNum":28,"ensureStatus":"N","ensureStatusName":"否","percent":null,"ensureMoney":null,"tags":null,"tagNames":null,"attentionFlag":false,"billFlag":false},{"id":25,"name":"健身教学系统","description":"提供各类健身知识教程","required":"包括视频、图片、文字等课程信息，同时支持用户自定义教学课程","money":"20000","endTime":"2017-04-30","contactUsername":"赵星星","contactPhone":"18661011111","contactEmail":"","contactAddress":"","status":"5","area":"000000","userId":"440100000002453","createdBy":null,"createdTime":"2017-04-01","updatedBy":null,"updatedTime":"2017-04-30 17:00:00","remark":null,"pageviewAmount":26,"focusAmount":2,"reqUser":"赵雅明","publishTime":"2017-04-01","username":null,"statusName":"已关闭","spareContactphone":null,"spareContactname":null,"matchmakeTrade":null,"matchmakeTradeName":null,"categoryId":null,"categoryName":null,"orderNum":25,"ensureStatus":"N","ensureStatusName":"否","percent":0,"ensureMoney":null,"tags":null,"tagNames":null,"attentionFlag":false,"billFlag":false},{"id":19,"name":"招投标资质核验系统","description":"招投标过程中的企业资质、人员资质、收入证明等在线核验真伪，无需再提供复印件，以防止虚假材料、虚假信息导致招标结果不公","required":"1、系统需要使用神州数云提供的数据、API或者服务；\r\n2、系统必须部署在神州数云提供的虚拟环境中；\r\n3、系统中使用到的数据、API或者服务，如需付费，开发者需要负责交付前的费用。\r\n4、最终产品版权归本单位所有，未经许可禁止用于其他地方。","money":"30","endTime":"2017-04-26","contactUsername":"岳子丰","contactPhone":"15801630261","contactEmail":"","contactAddress":"","status":"5","area":"000000","userId":"440100000002421","createdBy":null,"createdTime":"2017-01-24","updatedBy":null,"updatedTime":"2017-02-05 12:00:34","remark":null,"pageviewAmount":35,"focusAmount":1,"reqUser":"张广良","publishTime":"2017-01-24","username":null,"statusName":"已关闭","spareContactphone":null,"spareContactname":null,"matchmakeTrade":null,"matchmakeTradeName":null,"categoryId":null,"categoryName":null,"orderNum":19,"ensureStatus":"N","ensureStatusName":"否","percent":0,"ensureMoney":null,"tags":null,"tagNames":null,"attentionFlag":false,"billFlag":false}],"page":{"startIndex":0,"endIndex":3,"totalPage":1,"currentPage":1,"totalSize":3,"url":"/queryServiceListOfAll.do"}},"status":"OK"})
  },
  // 服务需求详情
  getServiceDetail: function(options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'getServiceDetail.do',
    //   params: _.pick(options, 'id')
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"description":"描述","matchmakeTrade":"Y","orderNum":28,"reqUser":"赵恒尉","categoryName":"教育","required":"要求","tagNames":"","billFlag":false,"statusName":"已关闭","createdTime":1501065925000,"contactAddress":"","id":29,"attentionFlag":false,"matchmakeTradeName":"是","spareContactphone":"18551264221","area":"000000","publishTime":1501065979000,"updatedTime":1501347600000,"updatedBy":"system","pageviewAmount":4,"contactEmail":"","myself":0,"userId":"440100000002545","tags":"","contactUsername":"主联系人","focusAmount":0,"money":"10000","createdBy":"赵恒尉","spareContactname":"赵恒尉","name":"test111","endTime":1501286400000,"contactPhone":"18111111111","ensureStatus":"N","categoryId":"139","ensureStatusName":"否","status":"5"},"status":"OK"})
  },
  // API需求详情
  getApiDetail: function(options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'apiDetail.do',
    //   params: _.pick(options, 'id')
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"flag":0,"sysType":"B/S无插件","description":"","reqUser":"刘晓英","matchmakeTrade":"是","flag1":0,"categoryName":"教育","spareContactUsername":"刘晓英","sysDescription":"通过社保账号、身份证号登录系统，用户可以查询个人养老保险缴费、医疗保险缴费、失业保险缴费、工伤保险缴费和生育保险缴费等信息，其他信息请参见贵阳市人力资源和社会保障局官网。","billFlag":false,"preOffer":"15","sysName":"社保API开发需求-所有权否-内网系统","statusName":"已关闭","id":59,"department":"人力资源和社会保障局","attentionFlag":false,"interfaceNum":3,"publishTime":1494989501000,"pageviewAmount":24,"netType":"内网系统","myself":0,"site":"","contactUsername":"陈潇","focusAmount":1,"spareContactPhone":"13912389925","ownership":"否","developLanguage":"","name":"为了进一步方便市民查询社保信息，顺应政府大数据开放趋势，我局决定以API的形式展现个人养老保险缴费、医疗保险缴费、失业保险缴费、工伤保险缴费和生育保险缴费等信息，企业、开发者可以通过平台竞标此开发项目","publisher":"刘晓英","endTime":1496160000000,"contactPhone":"18611567786","categoryId":"2,102","statusCode":"5"},"status":"OK"})
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
    url: location.protocol + '//' + location.host + '/zuul/ro/mscx-requirement-api/' + 'addApiOrder.do'
  },
  // 新增API需求（form提交）
  addApiDemand: {
    url: location.protocol + '//' + location.host + '/zuul/ro/mscx-requirement-api/' + 'addApi.do'
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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'queryApi.do',
    //   params: _.pick(options, ['page', 'pageSize'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"list":[],"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0,"url":"/queryApi.do"}},"status":"OK"})
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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'queryServiceListOfMe.do',
    //   params: _.pick(options, ['page', 'pageSize'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"list":[],"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0,"url":"/queryServiceListOfMe.do"}},"status":"OK"})
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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'queryServiceFocus.do',
    //   params: _.pick(options, ['page', 'pageSize'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"list":[],"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0,"url":"/queryServiceFocus.do"}},"status":"OK"})
  },
  // 获取关注的API需求
  queryApiFocus: function(options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'queryApiFocus.do',
    //   params: _.pick(options, ['page', 'pageSize'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"list":[],"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0,"url":"/queryApiFocus.do"}},"status":"OK"})
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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'queryMyApiOrder.do',
    //   params: _.pick(options, ['page', 'pageSize'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"list":[],"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0,"url":"/queryMyApiOrder.do"}},"status":"OK"})
  },
  // 我的服务需求接单
  queryMyServiceOrder: function(options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'queryServiceOrderOfMe.do',
    //   params: _.pick(options, ['page', 'pageSize'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0,"url":"/queryServiceOrderOfMe.do"},"list":[]},"status":"OK"})
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