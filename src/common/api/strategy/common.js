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
    
    return Axios({
      method: 'GET',
      url : baseUrl + 'briefInfo.do',
      params: {
        t: +new Date()
      }
    })
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

    return Axios({
      method: 'GET',
      url : baseUrl + 'home/recommendation.do'
    })
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

    return Axios({
      method: 'GET',
      url : baseUrl + 'personal/dashboard.do'
    })
  },
  // 获取我申请的微应用
  getServiceList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'order/getSelfWeiAppListWithCallback.do',
      params: _.pick(options, ['pageSize', 'page'])
    })
  },
  // 获取我的销售记录
  getSaledOrderList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'order/getSaledOrderList.do',
      params: _.pick(options, ['pageSize', 'page'])
    })
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

    return Axios({
      method: 'GET',
      url : baseUrl + 'static_html/datainfo/c2_indexInfo/index.html?v=' + new Date().getTime()
    })
  },
  // 数据可视化接口
  redirectToEthink: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'ethink/redirectToEthink.do?action=1'
    })
  },
}

export default commonAPI;