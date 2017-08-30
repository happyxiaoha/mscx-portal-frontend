import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/mscx-message-api/'

var apiAPI = {
  // 提交留言反馈
  submitFeedback: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'message/resMsg.do',
      data: _.pick(options, ['tel', 'email', 'userName', 'content'])
    })
  },
  // 获取消息列表
  getMessageList: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'msg/messageInfos.do',
    })
  },
  // 获取首页公共消息
  getAnnouncement: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'msg/getAnnouncement.do',
    })
  }
}

export default apiAPI;