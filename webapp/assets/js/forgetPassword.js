$(function(){
	   $('#form').bootstrapValidator({
           message: 'This value is not valid',
           submitHandler: function(validator, form, submitButton) {
        	   if (result.valid == true || result.valid == 'true') {
                   alert();
               }else{
            	   alert('false');
               }
           },
           fields: {
               email: {
                   validators: {
                       notEmpty: {
                           message: '邮箱不能为空'
                       },
                       emailAddress: {
                           message: '邮箱地址格式有误'
                       }
                   }
               }
           }
       })
})

function forgetPassword(){
	var bootstrapValidator = $('#form').data('bootstrapValidator'); 
	if($('#email').val() == ''){
		return
	}
	if(!bootstrapValidator.isValid()){
		return
	} 
	var params = {
			"email" : $('#email').val()
	}
	var res = jQueryAjax("/user/forgetPassword",params);
	if(res.resCode == 2001){
		alertify.alert('提示',res.resMsg);
	}else{
		alertify.alert('提示','重置密码邮件已经发送，请登陆邮箱进行重置');
	}
}