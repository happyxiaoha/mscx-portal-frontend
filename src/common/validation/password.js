var urlRegex = /^[a-zA-Z0-9_-]{8,20}$/

export default function(rule, value, callback) {
  if (!value) {
    callback(new Error('密码不能为空'));
  }else if(!urlRegex.test(value)) {
    callback(new Error('密码只能包含数字字母下划线中划线,长度为8-20位'));
  }else {
    callback();
  }
}