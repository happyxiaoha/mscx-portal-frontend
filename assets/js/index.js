$(function(){
	$('#registerBtn').click(function(){
		document.location.href=getRootPath() + "/register.html";
	})
	$('#loginBtn').click(function(){
		document.location.href=getRootPath() + "/login.html";
	})
});

function skipToRegister(){
	var username = $('#userName').val();
	var email = $('#email').val();
	window.location.href="register.html?username="+username+"&email="+email;
}