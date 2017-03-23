var height;
var rechargeTable = null;
var companyName, userName;// 公司名称，用户名称
var paramObj;// 查询参数

$(function() {
	var clientHeight=document.documentElement.clientHeight;
	$('.admin_product').attr('style','min-height:250px;overflow-y:auto;overflow-x:hidden;max-height:'+clientHeight+';');

	var $ti = $(".navs li a");
	$ti.click(function() {
		var $this = $(this);
		var $tia = $this.index();
		$ti.removeClass();
		$this.addClass('ti');
	});
//	companyName = getUrlLocationQueryString("companyName");
//	userName = getUrlLocationQueryString("userName");
	userName = GetQueryString("userName");

	if (determineParameters()) {

		paramObj = getQueryParams();

		// 获取账户余额和信用余额
		getAccountBalance();
		// 获取总充值金额
		getTotalBalance();

		height = window.screen.availHeight - 140;

		dateWidget('startTime');
		dateWidget('endTime');
		// 初始化充值记录表格
		initRechargetTables();
	}

});

/**
 * 检测是否传入查询参数
 * 
 * @returns {Boolean}
 */
function determineParameters() {
	if (userName == null || userName == "" || userName == undefined) {
		alertify.alert("提示", "请传入需要查询的用户名参数");
		return false;
	}
//	if (companyName == null || companyName == "" || companyName == undefined) {
//		alertify.alert("提示", "请传入需要查询的公司名称参数");
//		return false;
//	}
	return true;
}

/**
 * 获取地址栏输入参数
 * 
 * @param name
 * @returns
 */
function getUrlLocationQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		// return decodeURIComponent(r[2]);
		return r[2];
		// return r[2];
	} else {
		return null;
	}
}

/**
 * 初始化充值记录列表
 */
function initRechargetTables() {

	rechargeTable = $("#rechargeTable")
			.DataTable(
					{
						paging : false,// 分页
						ordering : false,// 是否启用排序
						searching : false,// 搜索
						bRetrieve : true,
						columnDefs : [ {
							className : "tdClass"
						} ],
						columns : [
								// { data : "id" },
								{
									data : "",
									"render" : function(data, type, row, index) {
										return index.settings._iDisplayStart
												+ index.row + 1;
									}
								},
								{
									data : "",
									"render" : function(data, type, row, index) {
										return "账号充值";
									}
								}, {
									data : "value"
								},{
									data : "balance"
								},  {
									data : "operateTime"
								} ],
						language : {
							lengthMenu : '<select class="form-control input-xsmall">'
									+ '<option value="10">10</option>'
									+ '<option value="20">20</option>'
									+ '<option value="50">50</option>'
									+ '</select>条记录',// 左上角的分页大小显示。
							paginate : {// 分页的样式内容。
								previous : "上一页",
								next : "下一页",
								first : "第一页",
								last : "最后"
							},
							zeroRecords : "没有内容",// table
							// tbody内容为空时，tbody的内容。
							// 下面三者构成了总体的左下角的内容。
							info : "共_PAGES_ 页，第_START_ 到第 _END_条",// 筛选之后得到
							// _TOTAL_
							// 条，初始_MAX_
							// 条",//左下角的信息显示，大写的词为关键字。
							infoEmpty : "0条记录",// 筛选为空时左下角的显示。
							infoFiltered : ""// 筛选之后的左下角筛选提示，
						},
						paging : true,
						pagingType : "full_numbers",// 分页样式的类型
						serverSide : true,
						dom : 't<"col-sm-3"i><"col-sm-2"l><"col-sm-7"p>',
						ajax : function(data, callback, settings) {

							var param = {
								'params' : JSON.stringify(paramObj),
								'start' : data.start,
								'draw' : data.draw,
								'length' : data.length
							};
//							$
//									.ajax({
//										url : getRootPath()
//												+ "/dispacher.jsp?url=/account/queryRechargeFlow",
//										data : param,
//										type : "post",
//										dataType : "json",
//										success : function(data) {
//											callback(data);
//										}
//									});
							var res = jQueryAjax("/account/queryRechargeFlowByUser.action", param);
							callback(res);
						}
					});

}

/**
 * 获取查询参数
 * 
 * @returns {___anonymous1997_1998}
 */
function getQueryParams() {

	var param = {};
//	param["companyName"] = companyName;
	param["userName"] = userName;
	param["auditStatus"] = "30";// 审核状态，30-审核通过

	if ($("#startTime").val() != null && $("#startTime").val() != "") {
		param["beginTime"] = $("#startTime").val();
	}
	if ($("#endTime").val() != null && $("#endTime").val() != "") {
		param["stopTime"] = $("#endTime").val();
	}
	return param;
}

/**
 * 获取总充值金额
 */
function getTotalBalance() {
	var param = {};
//	param["companyName"] = companyName;
	param["userName"] = userName;
//	$.ajax({
//		url : getRootPath() + "/dispacher.jsp?url=/account/getTotalBalance",
//		data : {
//			"param" : JSON.stringify(param)
//		},
//		contentType : 'application/json', 
//		async : true,
//		type : "post",
//		dataType : "json",
//		success : function(res) {
//			if (res.resCode == 1) {
//				$("#totalBalance").html(res.totalBalance + "元");
//			} else if (res.resCode == 0) {
//				$("#totalBalance").html(res.resMsg);
//			}
//		}
//	});
	jQueryAjaxAsync("/account/getTotalBalance.action", param, function(res) {
		if (res.resCode == 1) {
			$("#totalBalance").html(res.totalBalance + "元");
		} else if (res.resCode == 0) {
			$("#totalBalance").html("0元");
		}
	});
}

/**
 * 获取账户余额和信用余额
 */
function getAccountBalance() {
	var param = {};
//	param["companyName"] = companyName;
	param["userName"] = userName;

//	$.ajax({
//		url : getRootPath() + "/dispacher.jsp?url=/account/accountBalance",
//		contentType : 'application/json', 
//		data : {"param":JSON.stringify(param)},
//		async : true,
//		type : "post",
//		dataType : "json",
//		success : function(res) {
//			if (res.resCode == 1) {
//				$("#balance").html(res.balance);
//				$("#creditBalance").html(res.creditBalance);
//			} else if (res.resCode == 2) {
//				$("#balance").html(res.resMsg);
//			}
//		}
//	});
	jQueryAjaxAsync("/account/accountBalance.action", param, function(res) {
		if (res.resCode == 1) {
			$("#balance").html(res.balance);
			$("#creditBalance").html(res.creditBalance);
		}else{
			$("#balance").html('0');
			$("#creditBalance").html('0');
		}
	});

}

function exportExcel(){
	var url = "/account/exportExcelRechargeFlow.action?auditStatus=30";
//	var startTime = $.trim($('#startTime').val())==''?'':$.trim($('#startTime').val())+" 00:00:00";
//	var stopTime = $.trim($('#endTime').val())==''?'':$.trim($('#endTime').val())+" 23:59:59";
	var startTime = $.trim($('#startTime').val())==''?'':$.trim($('#startTime').val());
	var stopTime = $.trim($('#endTime').val())==''?'':$.trim($('#endTime').val());
	
	url = url+"&beginTime="+startTime+"&stopTime="+stopTime
			+"&userName="+userName;
	
	$.download(getRootPath() + url, null, 'post');
	
}

function query() {

	paramObj = getQueryParams();
	rechargeTable.draw();
	// rechargeTable.ajax.reload();
}

function reset() {
	$("#startTime").val("");
	$("#endTime").val("");
}
