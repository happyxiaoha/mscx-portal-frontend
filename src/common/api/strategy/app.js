import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/mscx-app-api/'

var appAPI = {
  // 首页-导航栏-app
  getNavigationApp: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'recommend/bar.do'
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":[{"appList":[],"name":"医疗卫生","categoryId":142},{"appList":[{"name":"公积金查询","id":21}],"name":"社会保障","categoryId":123},{"appList":[],"name":"教育","categoryId":139},{"appList":[{"name":"编诗姬","id":6},{"name":"智能问答机器人","id":8},{"name":"作文改写","id":7},{"name":"文本语义分析","id":9}],"name":"文化体育","categoryId":125},{"appList":[],"name":"工作就业","categoryId":140},{"appList":[{"name":"身份证二元素认证","id":22},{"name":"手机号实名认证","id":10029},{"name":"一卡通查询","id":5}],"name":"生活服务","categoryId":126},{"appList":[{"name":"企业信用信息查询","id":23},{"name":"企业信息及图谱查询","id":18},{"name":"企业信息多维度查询","id":20}],"name":"产业发展","categoryId":128},{"appList":[],"name":"旅游","categoryId":141},{"appList":[],"name":"交通出行","categoryId":124}]})
  },
  // 首页-精选微应用
  getSelectedApp: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'recommend/list.do'
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":[{"score":5.0,"imageUri":"./static/f016162af76e492887ae93c2f8340df2.png","charge":"01","applyCount":0,"name":"公积金查询","chargeType":"免费","description":"公积金查询服务为您提供最详细、最真实可靠的公积金缴存、提取记录查询。","attentionCount":1,"id":21,"viewCount":204},{"score":5.0,"imageUri":"./static/d0258d31e4764c0bbb8ed3ac1d7cdb95.png","charge":"02","applyCount":4,"name":"银行卡实名认证","chargeType":"收费","description":"银行卡证实名认证","attentionCount":0,"id":10031,"viewCount":88},{"score":5.0,"imageUri":"./static/eb6b97feb20d4a73923f2a84b1b15ab7.png","charge":"01","applyCount":0,"name":"一卡通查询","chargeType":"免费","description":"一卡通查询服务为您提供北京一卡通的消费记录查询，让您对您的每一笔账单都心中有数。 ","attentionCount":1,"id":5,"viewCount":123},{"score":5.0,"imageUri":"./static/df909f225efc4e3098a132008f66d7e8.png","charge":"01","applyCount":27,"name":"机动车摇号查询","chargeType":"免费","description":"机动车摇号查询服务为您提供北京实时的机动车摇号结果查询、定制延期提醒、摇号结果提醒等服务。","attentionCount":7,"id":2,"viewCount":373},{"score":5.0,"imageUri":"./static/9e9bb481b4274918950e86298b1d9963.png","charge":"01","applyCount":0,"name":"文本语义分析","chargeType":"免费","description":"玻森NLP引擎提供行业领先的篇章级分析。基于上百万条社交网络平衡语料和数十万条新闻平衡语料的机器学习模型，结合自主开发的半监督学习技术，正负面情感分析准确度达到80%~85% 。经过行业数据标注学习后准确率可达85%~90%。","attentionCount":2,"id":9,"viewCount":50},{"score":5.0,"imageUri":"./static/ec8dd77797ba4926a44728bd3cd337a0.png","charge":"01","applyCount":0,"name":"企业信息多维度查询","chargeType":"免费","description":"七大快捷查询：查专利、查著作权、查公告、查电话、查上市、查融资、查P2P。轻松获取企业信息，一键实现； 六大企业维度：疑似关系、经营异常、行政处罚、财务数据、股权出质、税务信息，全方位的企业查询体验，一目了然； ","attentionCount":1,"id":20,"viewCount":57},{"score":5.0,"imageUri":"./static/66ec195e3c8f51d0a3ed333fe58a19d5.png","charge":"01","applyCount":9,"name":"编诗姬","chargeType":"免费","description":"采用语义分析与深度学习技术开发的诗歌生成机器人。在熟读了全唐诗五万首后，本姬可以自动根据您的需要三秒吟诗。雅韵传情，原创保证，来分享给您关心的人一首小诗吧。","attentionCount":3,"id":6,"viewCount":77},{"score":3.0,"imageUri":"./static/bdaa2250210a438a9dd02441cabce25f.png","charge":"01","applyCount":6,"name":"企业信用信息查询","chargeType":"免费","description":"提供企业信用信息查询服务","attentionCount":0,"id":23,"viewCount":135}]})
  },
  // 首页-saas营销信息
  getMarketingTheme: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'getMarketingTheme.do'
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":{"browseUrl":"http://172.16.49.132/services/detail/10027","imageUrl":"./static/850c46db3fcb49cd9dace23b23b5fb68.png","showRuleType":"2"}})
  },
  // 列表页-查询微服务列表
  getAppList: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'list.do',
    //   params: _.pick(options, ['orderBy', 'keyword', 'chargeType', 'serviceObject', 'scope', 'categoryId', 'tagId', 'page', 'pageSize'])
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":{"page":{"startIndex":0,"endIndex":10,"totalPage":3,"currentPage":1,"totalSize":21},"list":[{"id":10029,"name":"手机号实名认证","categoryName":"生活服务","tagNames":"查询","imageUri":"./static/51f19ad1e4634f4da247f5aaebdc8580.png","serviceType":"H5","serviceChannel":"h5","providerName":"智慧神州","scope":"全国","description":"手机号实名认证","chargeTypeDesc":"1.50元起","chargeType":"02","attentionTime":null,"viewCount":116,"applyCount":"12","updatedTimeFormat":"2017-04-07","discount":null},{"id":9,"name":"文本语义分析","categoryName":"文化体育","tagNames":"APIX","imageUri":"./static/9e9bb481b4274918950e86298b1d9963.png","serviceType":"H5","serviceChannel":"WEB","providerName":"风报","scope":"全国","description":"玻森NLP引擎提供行业领先的篇章级分析。基于上百万条社交网络平衡语料和数十万条新闻平衡语料的机器学习模型，结合自主开发的半监督学习技术，正负面情感分析准确度达到80%~85% 。经过行业数据标注学习后准确率可达85%~90%。","chargeTypeDesc":"免费","chargeType":"01","attentionTime":null,"viewCount":50,"applyCount":"0","updatedTimeFormat":"2017-01-22","discount":null},{"id":2,"name":"机动车摇号查询","categoryName":"交通出行","tagNames":"百度","imageUri":"./static/df909f225efc4e3098a132008f66d7e8.png","serviceType":"H5","serviceChannel":"WEB","providerName":"智慧神州","scope":"北京","description":"机动车摇号查询服务为您提供北京实时的机动车摇号结果查询、定制延期提醒、摇号结果提醒等服务。","chargeTypeDesc":"免费","chargeType":"01","attentionTime":null,"viewCount":373,"applyCount":"27","updatedTimeFormat":"2017-01-22","discount":null},{"id":6,"name":"编诗姬","categoryName":"文化体育","tagNames":"认证","imageUri":"./static/66ec195e3c8f51d0a3ed333fe58a19d5.png","serviceType":"H5","serviceChannel":"WEB","providerName":"风报","scope":"全国","description":"采用语义分析与深度学习技术开发的诗歌生成机器人。在熟读了全唐诗五万首后，本姬可以自动根据您的需要三秒吟诗。雅韵传情，原创保证，来分享给您关心的人一首小诗吧。","chargeTypeDesc":"免费","chargeType":"01","attentionTime":null,"viewCount":77,"applyCount":"9","updatedTimeFormat":"2017-01-22","discount":null},{"id":5,"name":"一卡通查询","categoryName":"生活服务","tagNames":"查询","imageUri":"./static/eb6b97feb20d4a73923f2a84b1b15ab7.png","serviceType":"H5","serviceChannel":"WEB","providerName":"智慧神州","scope":"北京","description":"一卡通查询服务为您提供北京一卡通的消费记录查询，让您对您的每一笔账单都心中有数。 ","chargeTypeDesc":"免费","chargeType":"01","attentionTime":null,"viewCount":123,"applyCount":"0","updatedTimeFormat":"2017-06-01","discount":null},{"id":10027,"name":"实名认证","categoryName":"生活服务","tagNames":"查询","imageUri":"./static/87b47b434d06468498a0cd781ae0e1ae.png","serviceType":"H5","serviceChannel":"h5","providerName":"智慧神州","scope":"全国","description":"实名认证","chargeTypeDesc":"1.50元起","chargeType":"02","attentionTime":null,"viewCount":95,"applyCount":"4","updatedTimeFormat":"2017-04-07","discount":null},{"id":10031,"name":"银行卡实名认证","categoryName":"生活服务","tagNames":"查询","imageUri":"./static/d0258d31e4764c0bbb8ed3ac1d7cdb95.png","serviceType":"H5","serviceChannel":"h5","providerName":"智慧神州","scope":"全国","description":"银行卡证实名认证","chargeTypeDesc":"1.50元起","chargeType":"02","attentionTime":null,"viewCount":88,"applyCount":"4","updatedTimeFormat":"2017-04-07","discount":null},{"id":8,"name":"智能问答机器人","categoryName":"文化体育","tagNames":"验证","imageUri":"./static/5e5a6de2d33b460e621bb2fdd6f2869f.png","serviceType":"H5","serviceChannel":"WEB","providerName":"风报","scope":"全国","description":"基于玻森语义联想引擎开发的问答机器人","chargeTypeDesc":"免费","chargeType":"01","attentionTime":null,"viewCount":38,"applyCount":"0","updatedTimeFormat":"2017-01-22","discount":null},{"id":20,"name":"企业信息多维度查询","categoryName":"产业发展","tagNames":"查询","imageUri":"./static/ec8dd77797ba4926a44728bd3cd337a0.png","serviceType":"H5","serviceChannel":"WEB","providerName":"企查查","scope":"全国","description":"七大快捷查询：查专利、查著作权、查公告、查电话、查上市、查融资、查P2P。轻松获取企业信息，一键实现； 六大企业维度：疑似关系、经营异常、行政处罚、财务数据、股权出质、税务信息，全方位的企业查询体验，一目了然； ","chargeTypeDesc":"免费","chargeType":"01","attentionTime":null,"viewCount":57,"applyCount":"0","updatedTimeFormat":"2017-06-01","discount":null},{"id":18,"name":"企业信息及图谱查询","categoryName":"产业发展","tagNames":"查询","imageUri":"./static/964a9bc7175239aaae1cf1977b134dbf.png","serviceType":"H5","serviceChannel":"WEB","providerName":"智道数聚","scope":"全国","description":"三千万企业多维度信息检索","chargeTypeDesc":"免费","chargeType":"01","attentionTime":null,"viewCount":40,"applyCount":"0","updatedTimeFormat":"2017-01-22","discount":null}]}})
  },
  // 获取微服务详情
  getAppDetail: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'get.do',
    //   params: _.pick(options, ['id'])
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":{"id":10029,"name":"手机号实名认证","identify":"mobile_auth","categoryName":"生活服务","tagNames":"查询","imageUri":"./static/51f19ad1e4634f4da247f5aaebdc8580.png","imageKey":"a7d34e6d305f4d2d975ce378bf4eac09","serviceObjectNames":"个人","serviceType":"H5","serviceChannel":"h5","providerName":"智慧神州","scope":"全国","demoUri":"http://mscxmicro.citysdk.cn/static_html/mobile/index.html","uri":"http://qg-service.citysdk.cn/mobile_auth","demoImage1":"./static/b4e07503c57345a3a1ef06a4ea537333.png","demoKey1":"18929d7e39464dcf80a17d1fae3ec5c9","demoImage2":"./static/a4ccffba6a9c481f875dbed491181314.png","demoKey2":"","demoImage3":"./static/a1530047057a43019321d236e298c401.png","demoKey3":"","description":"手机号实名认证","attentionFlag":false,"applyCount":12,"attentionCount":1,"viewCount":116,"chargeType":"02","chargeTypeDesc":"收费","createdTime":1491533740000,"updatedTime":1491558500000,"resourceType":"03","status":"0","statusDesc":"审核通过","isDataCallBack":"1","avgScore":5.0}})
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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'attention/list.do',
    //   params: _.pick(options, ['page', 'pageSize'])
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":{"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0},"list":[]}})
  },
  // 获取我发布的微服务
  getPublishedService: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'publish/list.do',
    //   params: _.pick(options, ['page', 'pageSize'])
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":{"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0},"list":[]}})
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