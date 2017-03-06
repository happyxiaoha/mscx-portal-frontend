$(function(){
	$.ajax({
		url : getRootPath() + "/user/isLogin",
		async : false,
		dataType : 'text',
		success : function(data){
			if(data == ''){
				$('.head_nav_ul').after("<div class='head_nav_font' id='login_before'><a href='register.html' target='_parent'>注册</a> <a href='login.html' target='_parent'>登录</a></div>");
			}else{
				var name = JSON.parse(data).name;
				var id = JSON.parse(data).id
				if(id == 1000000000){
					$('.head_nav_ul').after("<div class='head_nav_font' id='login_after'><a href='./order/userCenter.html?type=4' target='_parent'><img src='assets/images/user.png'>"+name+"</a><a href='./order/userCenter.html' target='_parent'>用户中心</a><a href='./softwareCompany/admin_index.html' target='_parent'>管理后台</a><a onclick='logOut()'>退出</a></div> ");
				}else{
					$('.head_nav_ul').after("<div class='head_nav_font' id='login_after'><a href='./order/userCenter.html?type=4' target='_parent'><img src='assets/images/user.png'>"+name+"</a><a href='./order/userCenter.html' target='_parent'>用户中心</a><a onclick='logOut()'>退出</a></div> ");
				}
			}
		}
	});
	
	$('#homeBtn').click(function(){	
		window.parent.location.href="./index.html";
	})
	
	$('#itManageBtn').click(function(){
		window.parent.location.href="./product.html";
	})
	
	$('#aboutUsBtn').click(function(){
		window.parent.location.href="./aboutus.html";
	})
	var url = window.window.parent.location.pathname;
	if(url == getRootPath()+'/index.html'){
		$('#homeBtn').parent().addClass('native');
	}else if(url == getRootPath()+'/manage.html'){
		$('#itManageBtn').parent().addClass('native');
	}else if(url == getRootPath()+'/aboutUs.html'){
		$('#aboutUsBtn').parent().addClass('native');
	}
})

function logOut(){
	$.ajax({
		url : getRootPath() + "/logout",
		async : false,
		type : 'post',
		success : function(data){
			window.parent.location.href = getRootPath() + "/index.html";
		}
	})
}