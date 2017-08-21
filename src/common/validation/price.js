var urlRegex = /^([1-9]\d{0,6}?(\.\d{1,2})?)$|^([0]?(\.\d{1,2})?)$/

export default function(rule, value, callback) {
  if (!value) {
    callback(new Error('价格不能为空'));
  }else if(value < 1) {
    callback(new Error('请输入大于1的价格'));
  }else if(value > 9999999) {
    callback(new Error('请输入小于一千万的价格'));
  }else if(!urlRegex.test(value)) {
    callback(new Error('价格只能为数字，且小数点后不超过2位'));
  }else {
    callback();
  }
}