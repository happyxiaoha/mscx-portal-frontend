$(function(){
	var msg = GetQueryString('msg');
	$('#notice').html(eval("'" + msg + "'"));
})

