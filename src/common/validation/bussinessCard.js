var urlRegex = /^[a-zA-Z0-9]{15,20}$/

export default function(rule, value, callback) {
  if (!value) {
    callback(new Error('营业执照编号不能为空'));
  }else if(!urlRegex.test(value)) {
    callback(new Error('请输入正确的营业执照编号'));
  }else {
    callback();
  }
}