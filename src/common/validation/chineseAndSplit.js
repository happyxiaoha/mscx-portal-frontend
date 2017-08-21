var regex = /^[\u4E00-\u9FA5，]+$/;

export default function(rule, value, callback) {
  if(!regex.test(value)) {
    callback(new Error('只能包含中文和逗号'));
  }else {
    callback();
  }
}