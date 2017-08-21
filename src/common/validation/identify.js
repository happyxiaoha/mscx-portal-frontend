var regex = /^[a-zA-Z0-9_-]{2,30}$/;

export default function(rule, value, callback) {
  if(!regex.test(value)) {
    callback(new Error('请输入有效的服务标识'));
  }else {
    callback();
  }
}