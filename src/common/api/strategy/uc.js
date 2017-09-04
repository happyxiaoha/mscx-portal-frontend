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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'user/info/mine.do'
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"account":"lxy111","alreadyCertification":true,"certification":"已认证","apiKey":"2C03B1F12A184B0B","secretKey":"PHUW44PMbz2rQgdLmVOQoUGahn8oY6Jk","mobile":"13915394606","userType":"个人实名"},"status":"OK"})
  },
  // 获取个人用户认证信息
  getPersonAuth: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'certification/person/info.do'
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"certificationType":"01","name":"刘晓英","idcard":"320282198908243827","photoUrl":"http://qg-shenzhoushuyun-sc.oss-cn-beijing.aliyuncs.com/mscx-uc/USER_PHOTO/440100000002681?Expires=1504407596&OSSAccessKeyId=LTAIC1yCfa7cWDyr&Signature=EVornn8f3mjOVH4q%2BRGv7vRhRhg%3D","mobile":null,"bankCardNo":null,"idcardPic1Url":null,"idcardPic2Url":null},"status":"OK"})
  },
  // 获取企业用户认证信息
  getEnterpriseAuth: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'certification/enterprise/info.do'
    // })
    return Promise.resolve({"code":"000000","message":"success","result":null,"status":"OK"})
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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl  + 'shopping/cart/user/query.do',
    //   params: _.pick(options, ['page', 'pageSize'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0},"list":[]},"status":"OK"})
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