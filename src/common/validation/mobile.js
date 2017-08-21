var urlRegex = /^1[34578]\d{9}$/

export default function(rule, value, callback) {
  if (!value) {
    callback(new Error('手机号码不能为空'));
  }else if(!urlRegex.test(value)) {
    callback(new Error('请输入正确的手机号码'));
  }else {
    callback();
  }
}