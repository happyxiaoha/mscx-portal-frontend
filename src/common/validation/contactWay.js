var urlRegex = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[358]\d{9})$)/

export default function(rule, value, callback) {
  if (!value) {
    callback(new Error('联系方式不能为空'));
  }else if(!urlRegex.test(value)) {
    callback(new Error('请输入正确的手机号码或座机号'));
  }else {
    callback();
  }
}