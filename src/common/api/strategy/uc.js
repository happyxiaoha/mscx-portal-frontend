import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/mscx-uc-api/'

var ucAPI = {
  // 注册-验证用户名
  checkAccount: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'unique/check/user/account/exist.do',
      params: _.pick(options, ['account'])
    })
  },
  // 注册-验证手机号
  checkMobile: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'unique/check/user/mobile/exist.do',
      params: _.pick(options, ['mobile'])
    })
  },
  // 加入购物车
  addShopCart: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'shopping/cart/user/add.do',
      data: _.pick(options, ['resourceType', 'resourceId', 'chargeRuleId', 'applyTimes'])
    })
  },
  // 获取账户基本信息
  getBasicInfo: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'user/info/mine.do'
    })
  },
  // 获取个人用户认证信息
  getPersonAuth: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'certification/person/info.do'
    })
  },
  // 获取企业用户认证信息
  getEnterpriseAuth: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'certification/enterprise/info.do'
    })
  },
  // 更新企业用户认证信息
  updateEnterpriseAuth: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'certification/enterprise/update.do',
      data: _.pick(options, ['name', 'address', 'licenceNo', 'taxRegisterNo', 'organizationCode', 'licenceImageId', 'licencePicUrl', 'contractName', 'contractIdcard', 'contractMobile', 'contractEmail'])
    })
  },
  // 新增企业实名认证
  addEnterpriseAuth: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'certification/enterprise.do',
      data: _.pick(options, ['name', 'address', 'licenceNo', 'taxRegisterNo', 'organizationCode', 'licenceImageId', 'licencePicUrl', 'contractName', 'contractIdcard', 'contractMobile', 'contractEmail'])
    })
  },
  // 新增个人实名认证
  addPersonAuth: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : '/certification/person.do',
      data: _.pick(options, ['name', 'idcard', 'certificationType', 'photoId', 'captcha'])
    })
  },
  // 上传营业执照
  licencePicUrl: baseUrl + 'certification/enterprise/upload/licence.do',
  // 上传个人照片
  personPicUrl: baseUrl + 'certification/person/upload/photo.do',
  // 获取购物车列表
  getShopcartList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl  + 'shopping/cart/user/query.do',
      params: _.pick(options, ['page', 'pageSize'])
    })
  },
  // 删除购物车项
  deleteShopcartItem: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl  + 'shopping/cart/user/delete.do',
      params: _.pick(options, ['cartItemId'])
    })
  },
  // 更新购物车项
  modifyShopcartItem: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl  + 'shopping/cart/user/modify/times.do',
      data: _.pick(options, ['cartItemId', 'applyTimes'])
    })
  },
  // 上传头像
  uploadAvatarUrl: baseUrl + 'register/upload/headPortrait.do',
  // 删除头像
  removeAvatar: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl  + 'register/deleteHeadPortrait.do'
    })
  }
}

export default ucAPI;