$(function(){
	initAlertify();
})
function getParam() {
	var param = {};
	param.id = $("#id").val();
	param.name = $("#name").val();
	param.password = $("#password").val();
	param.email = $("#email").val();
	return param;
}

function ajax(param, method) {
	$.ajax({
		url : getRootPath() + "/j_spring_security_check",
		data : param,
		async : true,
		type : "post",
		success : function(responseText) {
			var res = JSON.parse(responseText);
			if (!res.success) {
				alertify.alert('提示', res.data);
			} else {
				document.location.href = getRootPath() + "/index.html";
			}
		}
	});
}

function login() {
	if ($('#username').val() == '') {
		alertify.alert('提示', '请输入用户名');
		return
	}
	if ($('#password').val() == '') {
		alertify.alert('提示', '请输入密码');
		return
	}
	var param = {};
	param.j_username = $("#username").val();
	param.j_password = $("#password").val();
	ajax(param, "login");
}

function keyLogin() {
	var event = arguments.callee.caller.arguments[0] || window.event;
	if (event.keyCode == 13) // 回车键的键值为13
		login();
}