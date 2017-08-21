var urlRegex = /^[a-zA-Z0-9]+$/

export default function(rule, value, callback) {
  if(value === '') {
    callback()
  }else if(!urlRegex.test(value)) {
    callback(new Error('只能包含字母及数字'));
  }else {
    callback();
  }
}