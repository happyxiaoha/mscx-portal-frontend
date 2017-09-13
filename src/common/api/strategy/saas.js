import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/mscx-saas-api/'

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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'recommend/list.do'
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":[{"score":5.0,"imageUri":"./static/4b9cb8968dc64949be5d0ac8541a6194.png","charge":"02","applyCount":11,"name":"信用查询","chargeType":"收费","description":"刻画360°企业全景画像，整合全国2000多万全量企业，从企业发展扩张、知识产权、合规表现、商业贸易、人才需求等方面对企业进行多维画像，全方位多角度考察企业信用，动态监控企业发展变化","attentionCount":0,"id":131,"viewCount":104},{"score":5.0,"imageUri":"./static/b3b163b00e2c4b1f8bba9a433eace4f7.png","charge":"02","applyCount":22,"name":"商业谱系","chargeType":"收费","description":"快速获取任意一个企业的商业谱系，融合企业及人员的投资、任职、专利、招投标、涉诉案件等信息，直观描绘了企业族群之间千丝万缕的关系，洞悉企业关联谱系，评估集团信用风险","attentionCount":1,"id":137,"viewCount":195},{"score":4.0,"imageUri":"./static/7ef4a5db1fb64a5d9fc9c27c2364c11e.png","charge":"02","applyCount":16,"name":"财务诊断","chargeType":"收费","description":"轻松诊断企业财务实力，依托全国、全量、全景的企业数据基础，对企业财务KPI进行定量分析，通过偿债能力、盈利能力、发展能力、运营能力、劳动效率等多个特征变量综合评估企业财务实力，洞悉其在全国/行业/地区的真实位置。","attentionCount":2,"id":129,"viewCount":130},{"score":5.0,"imageUri":"./static/affde38e176d4c259d9b377cd3362a6a.png","charge":"02","applyCount":12,"name":"监控预警","chargeType":"收费","description":"动态监测企业发展变化，通过监测目标企业群体发展扩张、知识产权、荣誉资质、商业贸易、工商违规、法院涉诉、税务拖欠、企业变更等信息变动情况，同时嵌入企业风险预警模型，全方位动态监控企业行为特征，分析变更情况的利弊影响，及时作出风险规避策略","attentionCount":1,"id":139,"viewCount":75}]})
  },
  // 首页-saas营销信息
  getMarketingTheme: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'getMarketingTheme.do'
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":{"browseUrl":"http://172.16.49.132/saas/detail/121","imageUrl":"./static/5015e41aab414d70b257c6bf52499b7d.png","showRuleType":"2"}})
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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'list.do',
    //   params: _.pick(options, ['orderBy', 'keyword', 'chargeType', 'serviceObject', 'scope', 'categoryId', 'tagId', 'page', 'pageSize'])
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":{"page":{"startIndex":0,"endIndex":10,"totalPage":1,"currentPage":1,"totalSize":10},"list":[{"id":129,"name":"财务诊断","categoryName":"生活服务","tagNames":"查询","imageUri":"./static/7ef4a5db1fb64a5d9fc9c27c2364c11e.png","serviceType":"saas","serviceChannel":"saas","providerName":"量子数聚","scope":"全国","description":"轻松诊断企业财务实力，依托全国、全量、全景的企业数据基础，对企业财务KPI进行定量分析，通过偿债能力、盈利能力、发展能力、运营能力、劳动效率等多个特征变量综合评估企业财务实力，洞悉其在全国/行业/地区的真实位置。","chargeTypeDesc":"200.00元起","chargeType":"02","attentionTime":null,"viewCount":130,"applyCount":16,"demoUri":"http://news.shuchuangyi.com/static_html/financial_diagnosis/index.html"},{"id":137,"name":"商业谱系","categoryName":"生活服务","tagNames":"查询","imageUri":"./static/b3b163b00e2c4b1f8bba9a433eace4f7.png","serviceType":"saas","serviceChannel":"saas","providerName":"量子数聚","scope":"全国","description":"快速获取任意一个企业的商业谱系，融合企业及人员的投资、任职、专利、招投标、涉诉案件等信息，直观描绘了企业族群之间千丝万缕的关系，洞悉企业关联谱系，评估集团信用风险","chargeTypeDesc":"400.00元起","chargeType":"02","attentionTime":null,"viewCount":195,"applyCount":22,"demoUri":"http://news.shuchuangyi.com/static_html/business_pedigree/index.html"},{"id":139,"name":"监控预警","categoryName":"生活服务","tagNames":"查询","imageUri":"./static/affde38e176d4c259d9b377cd3362a6a.png","serviceType":"saas","serviceChannel":"saas","providerName":"量子数聚","scope":"全国","description":"动态监测企业发展变化，通过监测目标企业群体发展扩张、知识产权、荣誉资质、商业贸易、工商违规、法院涉诉、税务拖欠、企业变更等信息变动情况，同时嵌入企业风险预警模型，全方位动态监控企业行为特征，分析变更情况的利弊影响，及时作出风险规避策略","chargeTypeDesc":"300000.00元起","chargeType":"02","attentionTime":null,"viewCount":75,"applyCount":12,"demoUri":"http://news.shuchuangyi.com/static_html/monitor_info/index.html"},{"id":135,"name":"优企挖掘","categoryName":"生活服务","tagNames":"查询","imageUri":"./static/e4d1cc1e23fd47a59e1f7cf834b9759c.png","serviceType":"saas","serviceChannel":"saas","providerName":"量子数聚","scope":"全国","description":"精准捕获优质目标群体，基于CETT企业挖潜模型，深度挖掘企业静态数据与动态信息，从资本、企业、技术、人才四大维度组合查询，同时聚焦热点行业、区域，挖掘具有创新活跃度高、对外辐射强等特征的企业，精准捕获优质目标","chargeTypeDesc":"300.00元起","chargeType":"02","attentionTime":null,"viewCount":55,"applyCount":6,"demoUri":"http://news.shuchuangyi.com/static_html/business_dig/index.html"},{"id":131,"name":"信用查询","categoryName":"生活服务","tagNames":"查询","imageUri":"./static/4b9cb8968dc64949be5d0ac8541a6194.png","serviceType":"saas","serviceChannel":"saas","providerName":"智慧神州","scope":"全国","description":"刻画360°企业全景画像，整合全国2000多万全量企业，从企业发展扩张、知识产权、合规表现、商业贸易、人才需求等方面对企业进行多维画像，全方位多角度考察企业信用，动态监控企业发展变化","chargeTypeDesc":"500.00元起","chargeType":"02","attentionTime":null,"viewCount":104,"applyCount":11,"demoUri":"http://news.shuchuangyi.com/static_html/credit_inquiry/index.html"},{"id":121,"name":"数云背调","categoryName":"生活服务","tagNames":"评测","imageUri":"./static/6b55b360d8fb40039845265eb3acfcb2.png","serviceType":"SaaS","serviceChannel":"SaaS","providerName":"智慧神州","scope":"全国","description":"数云背调是基于神州数云平台广阔的数据支撑，深度结合招聘需求，合法合理，拥有完备授权机制和项目自选方式的人性化产品。而且数云背调更加符合人事使用规律，先授权后付费，未授权不收费。用人单位通过数云背调可以有效防范基础信息造假、工作履历造假、隐瞒不良记录和跳槽记录等等用工风险，减少不必要的损失。","chargeTypeDesc":"后付费（账户扣款）","chargeType":"03","attentionTime":null,"viewCount":188,"applyCount":0,"demoUri":""},{"id":165,"name":"1213123123","categoryName":"城市管理","tagNames":"查询,地理围栏","imageUri":"./static/e61fb6d85b2d4bd19a224ee83cca4fb8.png","serviceType":"1","serviceChannel":"1","providerName":"刘晓英","scope":"五香","description":"23123","chargeTypeDesc":"免费","chargeType":"01","attentionTime":null,"viewCount":2,"applyCount":0,"demoUri":"http://172.16.49.132/saas/create"},{"id":167,"name":"五香","categoryName":"生活服务","tagNames":"评测,导购","imageUri":"./static/e61fb6d85b2d4bd19a224ee83cca4fb8.png","serviceType":"1","serviceChannel":"1","providerName":"刘晓英","scope":"五香","description":"qweqweqwe","chargeTypeDesc":"免费","chargeType":"01","attentionTime":null,"viewCount":0,"applyCount":0,"demoUri":"http://172.16.49.132/saas/create"},{"id":169,"name":"wsdas","categoryName":"生活服务","tagNames":"null,null","imageUri":"./static/e61fb6d85b2d4bd19a224ee83cca4fb8.png","serviceType":"1","serviceChannel":"11","providerName":"testlxy222","scope":"无锡","description":"wsdas","chargeTypeDesc":"免费","chargeType":"01","attentionTime":null,"viewCount":0,"applyCount":0,"demoUri":"http://172.16.49.132/saas/create"},{"id":171,"name":"测试积分发布saas","categoryName":"文化体育","tagNames":"文本","imageUri":"./static/2dc1c1b76fde403caba0913df82b5808.png","serviceType":"222","serviceChannel":"2222","providerName":"testlxy222","scope":"苏州","description":"测试积分发布saas","chargeTypeDesc":"免费","chargeType":"01","attentionTime":null,"viewCount":1,"applyCount":0,"demoUri":"http://172.16.49.132/saas/create"}]}})
  },
  // 获取Saas详情
  getSaasDetail: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'get.do',
    //   params: _.pick(options, ['id'])
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":{"id":129,"name":"财务诊断","identify":"financial_diagnosis","categoryName":"生活服务","tagNames":"查询","imageUri":"./static/7ef4a5db1fb64a5d9fc9c27c2364c11e.png","imageKey":"7ef4a5db1fb64a5d9fc9c27c2364c11e","serviceObjectNames":"个人,企业","serviceType":"saas","serviceChannel":"saas","providerName":"量子数聚","scope":"全国","demoUri":"http://news.shuchuangyi.com/static_html/financial_diagnosis/index.html","uri":"/forwardSaaS.do?identity=financial_diagnosis","demoImage1":"./static/1a26e15a62bf4b1583f29622fa5ffd6b.png","demoKey1":"1a26e15a62bf4b1583f29622fa5ffd6b","demoImage2":"./static/fd042f9dab64496a9abe150dbc4fbdc0.png","demoKey2":"fd042f9dab64496a9abe150dbc4fbdc0","demoImage3":"./static/e0ceb43d5b624e0087eeb451c07819fe.png","demoKey3":"e0ceb43d5b624e0087eeb451c07819fe","description":"轻松诊断企业财务实力，依托全国、全量、全景的企业数据基础，对企业财务KPI进行定量分析，通过偿债能力、盈利能力、发展能力、运营能力、劳动效率等多个特征变量综合评估企业财务实力，洞悉其在全国/行业/地区的真实位置。","attentionFlag":false,"attentionCount":2,"viewCount":130,"chargeType":"02","chargeTypeDesc":"200.00元起","createdTime":1496223107000,"updatedTime":1504073182000,"resourceType":"04","status":"0","statusDesc":"审核通过","saasVersion":"1.0","versionFeatures":"<p style=\"line-height: 1.5em;\"> <strong><span style=\";font-family: Microsoft YaHei;font-size:14px\">1<span style=\"font-family: Microsoft YaHei\">、自定义财务数据查询</span></span></strong> </p> <p style=\"text-indent: 21px; line-height: 1.5em;\"> <span style=\";font-family: Microsoft YaHei;font-size:14px\"><span style=\"font-family: Microsoft YaHei\">自定义输入收入、利润、资产、负债等主要财务指标，运用大数据挖掘技术形成动态的财务评价指标体系，查询各财务指标在行业内的领先值、平均值、较差值，综合把控其特征。</span></span> </p> <p style=\"line-height: 1.5em;\"> <strong><span style=\";font-family: Microsoft YaHei;font-size:14px\">2<span style=\"font-family: Microsoft YaHei\">、企业财务数据查询</span></span></strong> </p> <p style=\"text-indent: 21px; line-height: 1.5em;\"> <span style=\";font-family: Microsoft YaHei;font-size:14px\"><span style=\"font-family: Microsoft YaHei\">支持全国在营企业的财务数据评价查询，反应企业经营发展整体状况，为企业提供了多角度的行业、区域对比分析数据，有助于横向对比目标企业的差距，分析同业、同地区竞争地位。</span></span> </p> <p> <br/> </p>","applyCount":16,"area":"000000","avgScore":4.0}})
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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'publish/list.do',
    //   params: _.pick(options, ['page', 'pageSize'])
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":{"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0},"list":[]}})
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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'attention/list.do',
    //   params: _.pick(options, ['page', 'pageSize'])
    // })
    return Promise.resolve({"status":"OK","code":"000000","message":"","result":{"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0},"list":[]}})
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