var height;
var userName;
$(function() {
	var clientHeight=document.documentElement.clientHeight;
	$('.admin_product').attr('style','min-height:250px;overflow-y:auto;overflow-x:hidden;max-height:'+clientHeight+';');
	userName = getUrlLocationQueryString("userName");
	if (userName == null){
		alertify.alert("提示", "请输入用户名");
		return;
	}
	var $ti=$(".navs li a");
	$ti.click(function(){
	  var $this=$(this);
	  var $tia=$this.index();
	  $ti.removeClass();
	  $this.addClass('ti');
	  
	  init($this.innerText);
	});
	init("当前商品");
});
/**
 * 获取地址栏输入参数
 * @param name
 * @returns
 */
function getUrlLocationQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null){
//    	 return  decodeURIComponent(r[2]);
    	 return  encodeURI(r[2]);
//    	 return  r[2];
     }else{
    	 return null;
     }
}
function init(tabName){
	if (tabName == "当前商品"){
		$("#transRuleIfm").attr("src", "./portalTransRuleQuery.html?type=effective&userName=" + userName);
	}else{
		$("#historyTransRuleIfm").attr("src", "./portalTransRuleQuery.html?type=history&userName=" + userName);
	}
}
