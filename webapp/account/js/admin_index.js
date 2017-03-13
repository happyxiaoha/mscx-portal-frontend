var file = null;
$(function() {
	// 浏览器高度减去导航的高度是下半部分的高度
	var height = window.screen.availHeight - 345;
	var height1 = window.screen.availHeight - 425;
	$("#admin_left").css('height', height);
	$("#admin_right").css('height', height);
	$("#demandTabs span").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});

	// 改变div的宽度
	$("#click").click(function() {
		if ($("#click").attr("src") == "./assets/images/none.png") {
			$("#admin_left").css('width', '11%');
			$("#admin_right").css('width', '89%');
			$("#click").attr("src", "./assets/images/block.png");
		} else {
			$("#admin_left").css('width', '4%');
			$("#admin_right").css('width', '96%');
			$("#click").removeAttr("src");
			$("#click").attr("src", "./assets/images/none.png");
		}

	});

	var $nat = $(".admin_iconfont li a");
	$nat.click(function() {
		var $this = $(this);
		var $cli = $this.index();
		$nat.removeClass();
		$this.addClass('nat');
	});

	// 右侧导航栏
	var $ti = $(".admin_right_topa li a");
	$ti.click(function() {
		var $this = $(this);
		var $tia = $this.index();
		$ti.removeClass();
		$this.addClass('ti');
	});
});

function webLink(url) {
	$("#center").attr("src", url);
}
function webLinkIndex(url) {
	$("#centerIndex").attr("src", url);
}