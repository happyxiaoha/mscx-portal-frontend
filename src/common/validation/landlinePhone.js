var urlRegex = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)/

export default function(rule, value, callback) {
  if(!urlRegex.test(value)) {
    callback(new Error('请输入正确的座机号'));
  }else {
    callback();
  }
}