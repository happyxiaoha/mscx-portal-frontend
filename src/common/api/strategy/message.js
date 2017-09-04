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

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'msg/getAnnouncement.do',
    // })

    return Promise.resolve({"code":"000000","message":"success","result":[{"id":27,"msgTitle":"神州数云3.0版本升级","msgContent":"神州数云3.0版本于2017年9月正式对外发布，新版系统界面友好、功能丰富，新版系统提供在线测试、数据可视化实施、数云PaaS等技术工具为开发创业者提供技术支撑，同时平台提供积分功能，用户在使用过程中不断积累财富。更多的友好功能期待您的发现。","publishTime":1504159120000,"resId":null,"resType":null},{"id":19,"msgTitle":"1111","msgContent":"22222","publishTime":1504085620000,"resId":null,"resType":null},{"id":17,"msgTitle":"访问额外服务","msgContent":"司法的范围","publishTime":1504085529000,"resId":null,"resType":null},{"id":15,"msgTitle":"神州数云平台3.0版本发布","msgContent":"神州数云平台3.0版本发布","publishTime":1504083633000,"resId":null,"resType":null},{"id":13,"msgTitle":"神州数云平台3.0版本发布","msgContent":"神州数云平台已于2017年8月底完成3.0版本升级，新升级版本对快捷功能操作、在线测试工具、合同管理等功能进行了新增优化，体验更加丰富！","publishTime":1503992193000,"resId":null,"resType":null},{"id":11,"msgTitle":"123","msgContent":"123","publishTime":1501062022000,"resId":null,"resType":null},{"id":7,"msgTitle":"通知","msgContent":"重要通知","publishTime":1497421889000,"resId":null,"resType":null},{"id":5,"msgTitle":"通知test","msgContent":"内容test","publishTime":1497410700000,"resId":null,"resType":null}],"status":"OK"})
  }
}

export default apiAPI;