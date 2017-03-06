function getRootPath() {
	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	// var localhostPaht=curWwwPath.substring(0,pos);
	var projectName = pathName
			.substring(0, pathName.substr(1).indexOf('/') + 1);
	return "";
}

function getNginxUrl(){
	var data = jQueryAjax("/fileHandling/getNginxUrl", null);
	return data.nginxUrl;
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}
function jQueryAjax(url, params, async, type, dataType) {
	var res = "";
	try {
		var paramJson = "";
		if (params) {
			paramJson = JSON.stringify(params);
		}

		$.ajax({
			url : getRootPath() + "/dispacher.jsp?url=" + url,
			data : paramJson,
			contentType : 'application/json',  
			async : async == null ? false : async,
			type : type == null ? "post" : type,
			dataType : dataType == null ? "json" : dataType,
			success : function(data) {
				try {
					if (data.success != null && data.success == "timeout"){
						top.window.location.href = getRootPath() + "/login.html";
					}else{
						res = data;
					}
				} catch (e) {
					$.messager.alert("提示", "响应信息格式错误");
				}
			}
		});
		if (res != null && res != "") {
			res = JSON.parse(res);
		}
	} catch (e) {
	}
	return res;
}

function jQueryAjaxAsync(url, params, callback, type, dataType) {
	try {
		var paramJson = "";
		if (params) {
			paramJson = JSON.stringify(params);
		}

		$.ajax({
			url : getRootPath() + "/dispacher.jsp?url=" + url,
			contentType : 'application/json', 
			data : paramJson,
			async : true,
			type : type == null ? "post" : type,
			dataType : dataType == null ? "json" : dataType,
			success : function(data){
				callback(data);
			}
		});
	} catch (e) {
	}
}
function commonLoadData(datagridId, data) {
	if (data) {
		if (data.rtnCode == '2000') {
			if (data.total == 0) {
				$.messager.alert("提示", "没有符合条件的数据");
			}
			$("#" + datagridId).datagrid("loadData", data);
		} else {
			$.messager.alert("提示", data.rtnMessage);
		}
	} else {
		$.messager.alert("提示", "查询失败");
	}
}

var Debugger = {
	URL_MESSAGE : "",
	modify : false,

	/**
	 * 向控制台的TOP页面查询是否打开调试
	 * 
	 * @return true/false
	 */
	isDebug : function() {
		var debug = false;// 调试开关。打开/关闭消息显示
		// 如果调试功能被关闭，则询问控制台是否需要调式
		// 这种方式适合现场的客户端调试，
		// 注意：如果调试信息可以修改，就意味着打开调试功能对于数据传输是极不安全的！！
		if (!debug) {
			this.modify = false;// 为安全，客户端的调试不允许修改数据
			var idx = document.cookie.indexOf("debug=");
			if (idx != -1) {
				debug = document.cookie.charAt(idx + 6) == 't';
			}
		}
		this.modify = debug;
		return debug;
	},
	showMessage : function(str, flag) {
		if (flag == null) {
			flag = 1;
		}
		switch (flag) {
		case -1:
			var rtn = showModalDialog(this.URL_MESSAGE, new String(str),
					"dialogWidth=480px;dialogheight=530px;status:no;help:no");
			return rtn;
		default:
			alert(str, flag);
		}
	}
};

/**
 * 浏览器检测
 */
var BrowserDetect = {
	init : function() {
		this.userAgent = window.navigator.userAgent.toLowerCase();
	},
	isIE : function() {
		if (/msie/i.test(this.userAgent) || /rv\:11.0/i.test(this.userAgent)) {
			return true;
		} else {
			return false;
		}
	},
	isChrome : function() {
		if (/chrome/i.test(this.userAgent)) {
			return true;
		} else {
			return false;
		}
	},
	isFireFox : function() {
		if (/firefox/i.test(this.userAgent)) {
			return true;
		} else {
			return false;
		}
	},
	getIEVersion : function() {
		var version = "";
		if (/rv\:11\.0/i.test(this.userAgent)) {
			version = "IE11";
		}
		if (/msie 10\.0/i.test(this.userAgent)) {
			version = "IE10";
		}
		if (/msie 9\.0/i.test(this.userAgent)) {
			version = "IE9";
		}
		if (/msie 8\.0/i.test(this.userAgent)) {
			version = "IE8";
		}
		if (/msie 7\.0/i.test(this.userAgent)) {
			version = "IE7";
		}
		if (/msie 6\.0/i.test(this.userAgent)) {
			version = "IE6";
		}
		return version;
	}

};
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}
BrowserDetect.init();

// 获取url拼接参数值
function GetRequest() {
	var url = location.search; // 获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

// 初始化时间控件
function dateWidget(id) {
	$("#" + id).datepicker({
		showOtherMonths : true,
		selectOtherMonths : false,
		autoclose : true,
		format : "yyyy-mm-dd",
		language : "cn"
	});
}

function dateTimeWidget(id) {
	$("#" + id).datetimepicker({
		showOtherMonths : true,
		selectOtherMonths : false,
		autoclose : true,
		format : "yyyy-mm-dd hh:ii:ss",
		language : "cn"
	});
}

// form表单禁用（启用）
function disableForm(formId, isDisabled) {

	var attr = "disable";
	if (!isDisabled) {
		attr = "enable";
	}
	$("form[id='" + formId + "'] :text").attr("disabled", isDisabled);
	$("form[id='" + formId + "'] textarea").attr("disabled", isDisabled);
	$("form[id='" + formId + "'] select").attr("disabled", isDisabled);
	$("form[id='" + formId + "'] :radio").attr("disabled", isDisabled);
	$("form[id='" + formId + "'] :checkbox").attr("disabled", isDisabled);

	// 禁用jquery easyui中的下拉选（使用input生成的combox）

	$("#" + formId + " input[class='combobox-f combo-f']").each(function() {
		if (this.id) {
			// alert("input" + this.id);
			$("#" + this.id).combobox(attr);
		}
	});

	// 禁用jquery easyui中的下拉选（使用select生成的combox）
	$("#" + formId + " select[class='combobox-f combo-f']").each(function() {
		if (this.id) {
			// /alert(this.id);
			$("#" + this.id).combobox(attr);
		}
	});

	// 禁用jquery easyui中的日期组件dataBox
	$("#" + formId + " input[class='date']").each(function() {

		if (this.id) {
			if (!isDisabled) {
				$("#" + this.id).removeAttr("disabled");
			} else {
				$("#" + this.id).attr("disabled", isDisabled);
			}

		}
	});
}

// 特有属性根据groundName进行分组，返回分组后的对象数组
function groundByAttr(data) {
	var map = {}, dest = [];
	for (var i = 0; i < data.length; i++) {
		var ai = data[i];
		if (!map[ai.groupname]) {
			dest.push({
				groupname : ai.groupname,
				data : [ ai ]
			});
			map[ai.groupname] = ai;
		} else {
			for (var j = 0; j < dest.length; j++) {
				var dj = dest[j];
				if (dj.groupname == ai.groupname) {
					dj.data.push(ai);
					break;
				}
			}
		}
	}
	return dest;
}

function initFileInput(ctrlName, uploadUrl, extraData) {

	$("#" + ctrlName).fileinput({
		language : 'zh', // 设置语言
		uploadUrl : uploadUrl, // 上传的地址
		uploadAsync : true,
		showUpload : true, // 是否显示全部上传按钮
		showCaption : true,// 是否显示标题
		browseClass : "btn btn-primary", // 按钮样式
		uploadExtraData : extraData
	});
	$("#" + ctrlName).fileinput('reset');
	var data = $("#" + ctrlName).data('fileinput');
	data.uploadExtraData = extraData;
}

// jqgrid翻页图标
// replace icons with FontAwesome icons like above
function updatePagerIcons(table) {
	var replacement = {
		'ui-icon-seek-first' : 'icon-double-angle-left bigger-140',
		'ui-icon-seek-prev' : 'icon-angle-left bigger-140',
		'ui-icon-seek-next' : 'icon-angle-right bigger-140',
		'ui-icon-seek-end' : 'icon-double-angle-right bigger-140'
	};
	$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon')
			.each(function() {
				var icon = $(this);
				var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

				if ($class in replacement)
					icon.attr('class', 'ui-icon ' + replacement[$class]);
			})
}

/** *******************************统计报表********************************* */

// 饼图
function report_pie(divid, title, series, click_function) {
	$('#' + divid).highcharts(
			{
				chart : {
					type : 'pie',
					options3d : {
						enabled : true,
						alpha : 45,
						beta : 0
					}
				},
				// colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00',
				// '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
				credits : {
					enabled : false
				},
				title : {
					text : title
				},
				lang : {
					noData : '暂无数据显示'
				},
				tooltip : {
					formatter : function() {
						return '<b>' + this.point.name + '</b>: '
								+ Highcharts.numberFormat(this.percentage, 1)
								+ '% ('
								+ Highcharts.numberFormat(this.y, 0, ',')
								+ ' 次)';
					}
				},
				plotOptions : {
					pie : {
						allowPointSelect : true,
						cursor : 'pointer',
						depth : 35,
						dataLabels : {
							enabled : true,
							formatter : function() {
								return '<b>'
										+ this.point.name
										+ '</b>: '
										+ Highcharts.numberFormat(
												this.percentage, 1)
										+ '% ('
										+ Highcharts.numberFormat(this.y, 0,
												',') + ' 次)';
							}
						},
						events : {
							click : click_function
						}
					}

				},
				series : series
			});
}

/*
 * 仪表盘 author: maxValue, dataValue, defaultData date: 2015-6-30
 */

function report_gauge(divid, title, unit, maxValue, plotBandsValue, seriesValue) {
	$('#' + divid).highcharts({
		chart : {
			type : 'gauge',
			plotBackgroundColor : null,
			plotBackgroundImage : null,
			plotBorderWidth : 0,
			plotShadow : false
		},

		title : {
			text : null
		},
		credits : {
			enabled : false
		},
		pane : {
			startAngle : -150,
			endAngle : 150,
			background : [ {
				backgroundColor : {
					linearGradient : {
						x1 : 0,
						y1 : 0,
						x2 : 0,
						y2 : 1
					},
					stops : [ [ 0, '#FFF' ], [ 1, '#333' ] ]
				},
				borderWidth : 0,
				outerRadius : '109%'
			}, {
				backgroundColor : {
					linearGradient : {
						x1 : 0,
						y1 : 0,
						x2 : 0,
						y2 : 1
					},
					stops : [ [ 0, '#333' ], [ 1, '#FFF' ] ]
				},
				borderWidth : 1,
				outerRadius : '107%'
			}, {
			// default background
			}, {
				backgroundColor : '#DDD',
				borderWidth : 0,
				outerRadius : '105%',
				innerRadius : '103%'
			} ]
		},

		// the value axis
		yAxis : {
			min : 0,
			max : maxValue,

			minorTickInterval : 'auto',
			minorTickWidth : 1,
			minorTickLength : 10,
			minorTickPosition : 'inside',
			minorTickColor : '#666',

			tickPixelInterval : 30,
			tickWidth : 2,
			tickPosition : 'inside',
			tickLength : 10,
			tickColor : '#666',
			labels : {
				step : 2,
				rotation : 'auto'
			},
			title : {
				text : unit
			},
			plotBands : plotBandsValue
		},

		series : [ {
			name : title,
			data : [ seriesValue ],
			tooltip : {
				valueSuffix : ' ' + unit
			}
		} ]

	});
}

// 折线图
function report_line(divid, title, categories, series, clickFunction, value) {
	$('#' + divid).highcharts({
		title : {
			text : title,
			x : -20
		},
		credits : {
			enabled : false
		},
		xAxis : {
			categories : categories
		},
		yAxis : {
			title : {
				text : value
			},
			plotLines : [ {
				value : 0,
				width : 1,
				color : '#808080'
			} ]
		},
		lang : {
			noData : '暂无数据显示'
		},
		plotOptions : {
			line : {
				allowPointSelect : true,
				cursor : 'pointer',
				dataLabels : {
					enabled : true,
					formatter : function() {
						return Highcharts.numberFormat(this.y, 0, ',');
					}
				},
				events : {
					click : clickFunction
				}
			}
		},
		series : series
	});
}

/**
 * wangEditor图片上传配置
 * 
 * @param editorID
 *            控件ID
 * @returns
 */
function createEditor(editorID) {
	editor = new wangEditor(editorID);
	editor.config.uploadImgUrl = getRootPath() + "/systemFileInfoAction/upload";
	editor.config.uploadParams = {
		isRecord : 0
	};
	editor.config.uploadImgFileName = "file";
	editor.create();
	return editor;
}

jQuery.download = function(url, data, method) { // 获得url和data
	if (url) {
		// data 是 string 或者 array/object
		
		// form的
		// input
		var inputs = '';
		if (data){
			data = typeof data == 'string' ? data : decodeURIComponent(jQuery.param(data)); // 把参数组装成
			jQuery.each(data.split('&'), function() {
				var pair = this.split('=');
				var val=pair[1].replace(/\+/g," ");
				inputs += '<input type="hidden" name="' + pair[0] + '" value=\''
						+ val + '\' />';
			}); // request发送请求
		}
		jQuery(
				'<form action="' + url + '" method="' + (method || 'post')
						+ '">' + inputs + '</form>').appendTo('body').submit()
				.remove();
	}
	;
};

function clearDatas() {
	$(':input', 'form[name="form"]').not(':button, :submit, :reset, :hidden')
			.val('').removeAttr('checked').removeAttr('selected');
}

// ps:注意将同名的放在一个数组里
function getFormJson(form) {
	var o = {};
	var a = $(form).serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}

$.fn.scrollShow = function(callback) {
	var scrollHight = $(window).scrollTop();
	var windHight = $(window).height();
	if ($(this).offset().top - windHight < scrollHight) {
		callback.call();
	}
}

function scrollFunc() {
	var windowTop = 0;
	$(window).scroll(
			function() {
				windowTop = $(window).scrollTop();
				var tables = $(".ff");
				var dts = $(".catalog-list dt");
				for (var i = 0; i < tables.length;) {
					if (tables[i].offsetTop <= windowTop
							&& windowTop < tables[i].offsetTop
									+ tables[i].offsetHeight) {
						$("#aarrow").css("top", dts[i].offsetTop);
						break;
					} else {
						i++;
					}
				}
			});
}

function hideProcessGrid() {
	if ($("#processGridList").is(":visible")) {
		$("#chartDiv").height($("#modalDialog").height() - 50);
	} else {
		$("#chartDiv").height(300);
	}
}
var isMax = false;
function setSize() {
	if (!isMax) {
		$("#modalDialog").css({
			padding : 0,
			width : $(window).width(),
			height : $(window).height()
		});
		isMax = true;
	} else {
		$("#modalDialog").css({
			padding : 0,
			width : 800,
			height : 500
		});
		isMax = false;
	}
	$("#processGridList").setGridWidth(
			$("#processGridList").parents('.jqGrid_wrapper').width());
}


function removeArrayEle(array,item){
	var len=array.length;
	for (var i = len; i >= 0; i--) {
		if (item === array[i]) {
			array.splice(i, 1);
		}
	}
}

var dateOptions = {
	showOtherMonths : true,
	selectOtherMonths : false,
	autoclose : true,
	format : 'yyyy-mm-dd hh:ii:ss',
	language : 'zh-CN',
	minView : 2
};

function initLogoImg(){
	jQueryAjaxAsync("/fileHandling/findFileById",{objType:'02'},function(data){
		if(data.file!=null&&data.file!=""){
			file=data.file[0];
			$("#headLogo").attr("src",getNginxUrl()+data.file[0].filePath);
		}else{
			$("#headLogo").attr("src","../../assets/images/logo2.png");
			
		}
	},"GET");
}

function initAlertify(){
	alertify.defaults.transition = "fade";
	alertify.defaults.movable = false;
	alertify.defaults.theme.ok = "btn btn-primary";
	alertify.defaults.theme.cancel = "btn btn-danger";
	alertify.defaults.theme.input = "form-control";
	alertify.set('notifier','position', 'bottom-right');
	alertify.set('notifier','delay', 3);
}
