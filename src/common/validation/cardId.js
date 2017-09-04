var urlRegex = /\d{15}/

var validateCard = function(value) {
  var iSum=0,res = true;
  var aCity= {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
  if(!/^\d{17}(\d|x)$/i.test(value)) res=false;
  var value = value.replace(/x$/i,"a");
  if(aCity[parseInt(value.substr(0,2))]==null) res=false;
  var sBirthday = value.substr(6,4)+"-"+Number(value.substr(10,2))+"-"+Number(value.substr(12,2));
  var d = new Date(sBirthday.replace(/-/g,"/")) ;
  if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())) res=false;
  for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(value.charAt(17 - i),11) ;
  if(iSum%11!=1) res=false;
  return res;
}


export default function(rule, value, callback) {
  if (!value) {
    callback(new Error('身份证号码不能为空'));
  }else if(!validateCard(value)) {
    callback(new Error('请输入正确的身份证号码'));
  }else {
    callback();
  }
}