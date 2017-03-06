var username = GetQueryString('username');
var email = GetQueryString('email');
$(function() {
	$('#userName').val(username);
	$('#email').val(email);
	flushValidateCode();
	initValidate();
})

function flushValidateCode() {
	$('#codeValidateImg').removeAttr('src');
	$('#codeValidateImg').attr('src',getRootPath() + '/user/getCaptcha?time='+new Date());
}

function register() {
	var bootstrapValidator = $('#register').data('bootstrapValidator'); 
	if(!bootstrapValidator.isValid()){
		return
	}
	var param = {
			"name" : $('#userName').val()
	};
	var response = jQueryAjax("/user/getUserByProperty",param);
	if(response.resCode == 2000){
		alertify.alert('提示','该用户名已存在');
		return
	};
	var param2 = {
			"email" : $('#email').val()
	};
	var response2 = jQueryAjax("/user/getUserByProperty",param2);
	if(response2.resCode == 2000){
		alertify.alert('提示','该邮箱已注册');
		return
	};
	var params = {};
	params.username = $('#userName').val();
	params.password = $('#password').val();
	params.email = $('#email').val();
	var res = jQueryAjax("/user/addUser",params);
	if (res.resCode == 2000) {
		alertify.alert('提示',res.resMsg).set({onclose:function(){ 
			window.top.location.href = getRootPath()+"/login.html";
		}}); 
	} else if (res.resCode == 2001) {
		alertify.alert('提示',res.resMsg);
	}
}

function initValidate(){
        $('#register').bootstrapValidator({
            message: 'This value is not valid',
            fields: {
                userName: {
                    message: '用户名验证失败',
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        },
                        stringLength: {
                            min: 6,
                            max: 18,
                            message: '用户名长度必须在6到18位之间'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_]+$/,
                            message: '用户名只能包含大写、小写、数字和下划线'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: '邮箱不能为空'
                        },
                        emailAddress: {
                            message: '邮箱地址格式有误'
                        }
                    }
                },
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
                captcha: {
                	validators: {
                		notEmpty: {
                            message: '请输入验证码'
                        },
                        remote: {
                        	url: getRootPath() + "/user/checkimagecode",
                        	message: '验证码错误',
                        	delay: 2000,
                        	data: function(validator){
                        		return {
                        			validateCode:$('#captcha').val()
                        		}
                        	}
                        }
                	}
                }
            }
        });
}
