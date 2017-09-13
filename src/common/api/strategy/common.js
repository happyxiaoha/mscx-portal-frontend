import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/'

var commonAPI = {
  getLoginInfo: function (options) {
    options = options || {};

    
    // return new Promise(function(resolve, reject) {

    //   debugger
    //   var xhr = new XMLHttpRequest();
    //   xhr.open('GET', baseUrl + 'briefInfo.do', false);
    //   xhr.send(null);
    //   xhr.onreadystatechange = function () {
    //     debugger
    //     if(xhr.readyState==4 && xhr.status ==200) {
    //       var res = JSON.parse(xhr.responseText);
    //       if(res.status == 'OK') {
    //         debugger
    //         resolve(res)
    //       }else {
    //         reject()
    //       }
    //     }
    //   }
    // })
    
    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'briefInfo.do',
    //   params: {
    //     t: +new Date()
    //   }
    // })

    return Promise.resolve({"code":"000000","message":"success","result":{"userId":"440100000002681","account":"lxy111","mobile":"13915394606","name":"刘晓英","userType":"PERSON","certificationInfo":{"status":"CERTIFICATED_PERSON","personName":"刘晓英","enterpriseName":null,"enterpriseContactPerson":null,"enterpriseContactMobile":null},"headPortrait":null},"status":"OK"})
  },
  switchCity: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'home/switchCity.do',
      params: {
        t: +new Date(),
        areaCode: options.areaCode
      }
    })
  },
  login: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'login.do',
      data: _.pick(options, ['loginName', 'password', 'captcha'])
    })
  },
  logout: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'logout.do'
    })
  },
  jumpDevelop: function(options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'developer/portal.do'
    })
  },
  // 忘记密码-获取短信验证码
  getForgetSmsCode: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'forget/password/sms/send.do',
      params: _.pick(options, ['mobile', 'captcha'])
    })
  },
  // 重置密码
  resetPassword: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'forget/password.do',
      data: _.pick(options, ['mobile', 'authCode', 'password', 'passwordConfirm'])
    })
  },
  // 注册-获取短信验证码
  getRegisterSmsCode: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'register/sms/send.do',
      params: _.pick(options, ['mobile', 'captcha'])
    })
  },
  // 注册
  register (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'register.do',
      data: _.pick(options, ['account', 'password', 'passwordConfirm', 'mobile', 'authCode'])
    })
  },
  // 首页推荐
  getRecommendation (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'home/recommendation.do'
    // })
    return Promise.resolve({"code":"000000","message":"success","result":[{"imageUri":"./static/516447e156ff4be6a1b026f9286cce41.png","name":"身份证二元素认证","chargeTypeDesc":"收费","id":313,"viewCount":229,"applyCount":12,"sourceType":"01","background":"","attentionCount":4,"score":5.0,"updatedTime":1503653702000,"providerName":"同程金服"},{"imageUri":"./static/cfe5b3edb91043ca8b16d274e98cf514.png","name":"人脸识别","chargeTypeDesc":"收费","id":312,"viewCount":159,"applyCount":4,"sourceType":"01","background":"","attentionCount":4,"score":4.0,"updatedTime":1503653697000,"providerName":"神州融"},{"imageUri":"./static/f016162af76e492887ae93c2f8340df2.png","name":"公积金查询","chargeTypeDesc":"免费","id":21,"viewCount":204,"applyCount":0,"sourceType":"03","background":null,"attentionCount":1,"score":5.0,"updatedTime":1503653735000,"providerName":"智慧神州"}],"status":"OK"})
  },
  // 免费API下单
  placeFreeApiOrder (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'order/freeApi/placeOrder.do',
      params: _.pick(options, ['apiId'])
    })
  },
  // 收费API下单
  placeFeeApiOrder (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'order/feeApi/placeOrder.do',
      params: _.pick(options, ['apiId', 'charRuleId', 'itemNum'])
    })
  },
  // 免费APP下单
  placeFreeAppOrder (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'order/freeApp/placeOrder.do',
      params: _.pick(options, ['appId'])
    })
  },
  // 收费APP下单
  placeFeeAppOrder (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'order/feeApp/placeOrder.do',
      params: _.pick(options, ['appId', 'charRuleId', 'itemNum'])
    })
  },
  // 免费Saas下单
  placeFreeSaasOrder (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'order/freeSaaS/placeOrder.do',
      params: _.pick(options, ['appId'])
    })
  },
  // 收费Saas下单
  placeFeeSaasOrder (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'order/feeSaaS/placeOrder.do',
      params: _.pick(options, ['appId', 'charRuleId', 'itemNum'])
    })
  },
  // 后付费saas服务下单
  placeAfterFeeSaasOrder (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'order/afterFeeSaaS/placeOrder.do',
      params: _.pick(options, ['appId'])
    })
  },
  // 购物车下单
  placeShopcartOrder (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'order/cart/placeOrder.do',
      params: _.pick(options, ['cartIds'])
    })
  },
  // 修改密码
  changePassword (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'change/password.do',
      data: _.pick(options, ['oldPassword', 'password', 'passwordConfirm'])
    })
  },
  // 用户中心首页信息
  dashboard (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'personal/dashboard.do'
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"focusApi":0,"focusApp":0,"applyApi":1,"focusData":0,"user":{"userId":"440100000002681","account":"lxy111","mobile":"13915394606","name":"刘晓英","userType":"PERSON","certificationInfo":{"status":"CERTIFICATED_PERSON","personName":"刘晓英","enterpriseName":null,"enterpriseContactPerson":null,"enterpriseContactMobile":null},"headPortrait":null},"cash":0.0},"status":"OK"})
  },
  // 获取我申请的微应用
  getServiceList: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'order/getSelfWeiAppListWithCallback.do',
    //   params: _.pick(options, ['pageSize', 'page'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"page":{"startIndex":0,"totalSize":0,"endIndex":0,"totalPage":0,"currentPage":1,"url":null},"list":[]},"status":"OK"})
  },
  // 获取我的销售记录
  getSaledOrderList: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'order/getSaledOrderList.do',
    //   params: _.pick(options, ['pageSize', 'page'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"page":{"startIndex":0,"totalSize":0,"endIndex":0,"totalPage":0,"currentPage":1,"url":"/order/getSaledOrderList.do"},"list":[]},"status":"OK"})
  },
  // 重置密码
  resetPayPassword: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'forget/payPwd.do',
      data: _.pick(options, ['password', 'passwordConfirm', 'authCode'])
    })
  },
  // 获取重置支付密码短信
  getResetPayPassSmsCode: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'forget/payPwd/sms/send.do',
      params: _.pick(options, ['captcha'])
    })
  },
  // 获取关于我们cms接口
  getContactUsCms: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'static_html/datainfo/c2_indexInfo/index.html?v=' + new Date().getTime()
    // })
    return Promise.resolve([
  {
    "Id": "813",
        "QRcode": "http://172.16.49.132:81/uploads/8/image/public/201706/20170626151232_n8i45xnmg7.png",
    "coopName": "商务合作（工作日9:00-18:00）",
        "coopTel": "010-61853361",
    "coopMail": "zhangglf@dcholdings.com",
    "techName": "技术支持",
        "techTel": "010-82705480",
    "techMail": "zhuangbl@dcholdings.com"
    }
])
  },
  // 数据可视化接口
  redirectToEthink: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'ethink/redirectToEthink.do?action=2'
    })
  },
}

export default commonAPI;