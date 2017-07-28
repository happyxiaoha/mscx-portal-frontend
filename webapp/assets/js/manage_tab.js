var id = GetQueryString("id");
var productId = GetQueryString("productId");
var price = GetQueryString("price");
var priceUnit = GetQueryString("priceUnit");
var name = decodeURI(GetQueryString("name"));
$(function(){
	getPicture();
	getProductDetails();
	$('#price').html("价格：￥"+price+"/" + (priceUnit == '1'?"年" : "月"));
	$('#productName').html(name);
	getAssess();
})

function buyNow(){
	$.ajax({
		url : getRootPath() + "/user/isLogin",
		success : function(data){
			if(data == ''){
				window.location.href = "login.html"
			}else{
				var uri = "order/userCenter.html?type=6&id=" + id + "&price=" + GetQueryString("price") + "&priceUnit=" + GetQueryString("priceUnit");
				if (GetQueryString("trialDate") != null){
					uri +=  "&trialDate=" + GetQueryString("trialDate");
				}
				
				window.location.href = uri;
				    
			}
		}
	})
}

function getPicture(){
	var params= {"proNo" : productId};
	var res = jQueryAjax("/fileHandling/findFileById",params,false,"GET");
	var htmlStr = '';
	for(var i=0; i<res.file.length; i++){
		if(i == 0){
			htmlStr +=  "<div class='item active'><img src='" + getNginxUrl() + res.file[i].filePath+"' alt="+res.file[i].fileName+" style='width:"+$('#pictureCarousel').width()+";height:"+$('#pictureCarousel').height()+"'></div>"
		}else{
			htmlStr +=  "<div class='item'><img src='" + getNginxUrl() + res.file[i].filePath+"' alt="+res.file[i].fileName+" style='width:1"+$('#pictureCarousel').width()+";height:"+$('#pictureCarousel').height()+"'></div>"
		}
	}
	$('#pictureCarousel').append(htmlStr);
}

function getAssess(){
	var params = {"id" : id};
	var res = jQueryAjax("/productAssess/getProductAssessByNo/"+id,{},null,"get",null);
	var html = "";
	if(res.list.length < 3){
		for(var i = 0; i < res.list.length; i++){
			html += " <dl class='user_b4'>" +
			"<dt><img src='assets/images/kinds_40.png' /></dt>" +
			"<dd><div class='user_b41'><a href='#'>"+res.list[i].name+"</a>"+res.list[i].time+"</div>" +
			"<div class='user_b42'>"+res.list[i].content+"</div>" +
			"</dd></dl>";
		}
	}else{
		for(var i = 0; i < 3; i++){
			html += " <dl class='user_b4'>" +
			"<dt><img src='assets/images/kinds_40.png' /></dt>" +
			"<dd><div class='user_b41'><a href='#'>"+res.list[i].name+"</a>"+res.list[i].time+"</div>" +
			"<div class='user_b42'>"+res.list[i].content+"</div>" +
			"</dd></dl>";
		}
		html += "<a onclick='showMore()' class='manage_product_command'>更多评论</a>";
	}
	$('#assessment').html(html);
}

function showMore(){
	var params = {"id" : id};
	var res = jQueryAjax("/productAssess/getProductAssessByNo/"+id,{},null,"get",null);
	var html = "";
	for(var i = 0; i < res.list.length; i++){
		html += " <dl class='user_b4'>" +
		"<dt><img src='assets/images/kinds_40.png' /></dt>" +
		"<dd><div class='user_b41'><a href='#'>"+res.list[i].name+"</a>"+res.list[i].time+"</div>" +
		"<div class='user_b42'>"+res.list[i].content+"</div>" +
		"</dd></dl>";
	}
	$('#assessment').html(html);
}

function insertAssess(){
	var params = {
			"proNo" : id,
			"name" : $("#name").val(),
			"content" : $("#content").val()
	}
	var res = jQueryAjax("/productAssess/insertProductAssess/",params,null,"post",null);
	if(res.resCode == 2000){
		getAssess();
	}
}

function getProductDetails(){
	var params = {"no" : id};
	var res = jQueryAjax("/product/getProductByNo/",params,null,"post",null);
	$("#productDescript").html(res.details);
}
