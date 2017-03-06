$(function(){
	 $('#resetPassword').bootstrapValidator({
         message: 'This value is not valid',
         fields: {
             password: {
             	validators: {
             		notEmpty: {
                         message: '密码不能为空'
                     },
             		regexp: {
             			regexp: /^[a-zA-Z0-9]{6,10}$/,
                         message: '必须含有字母和数字，6-10位'
             		}
             	}
             },
             repassword: {
              	validators: {
              		notEmpty: {
                          message: '密码不能为空'
                      },
              		regexp: {
              			regexp: /^[a-zA-Z0-9]{6,10}$/,
                          message: '必须含有字母和数字，6-10位'
              		},
              		identical: {
                        field: 'password',
                        message: '两次密码不一致'
                    }
              	}
              }
         }
     });
})

function resetPassword(){
	var bootstrapValidator = $('#resetPassword').data('bootstrapValidator'); 
	if(!bootstrapValidator.isValid()){
		return
	}
	var sid = GetQueryString("sid");
	var name = GetQueryString("name");
	var params = {
			"sid" : sid,
			"name" : name,
			"password" : $('#password').val()
	}
	var res = jQueryAjax("/user/resetPassword",params);
	if(res.resCode == '2000'){
		alertify.alert('提示',res.resMsg).set({onclose:function(){ 
			window.location.href = getRootPath()+'/login.html';
		}}); 
	}else if(res.resCode == '2001'){
		alertify.alert('提示',res.resMsg);
	}
}

function keyReset() {
	var event = arguments.callee.caller.arguments[0] || window.event;
	if (event.keyCode == 13) // 回车键的键值为13
		resetPassword();
}