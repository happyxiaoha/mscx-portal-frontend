var accountRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;

export default function(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入用户名'));
  }else if(!accountRegex.test(value)) {
    callback(new Error('用户名必须以字母开头，且只能包含数字字母下划线'));
  }else {
    callback();
  }
}