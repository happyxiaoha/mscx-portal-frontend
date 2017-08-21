var regex = /^([\u4e00-\u9fa5a-zA-Z0-9]+)$/;

export default function(rule, value, callback) {
  if(!regex.test(value)) {
    callback(new Error('不能包含特殊字符'));
  }else {
    callback();
  }
}