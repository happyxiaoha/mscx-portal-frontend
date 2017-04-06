var transRuleTable;
var index=1;
var height;
var type = "history";
var userName;
$(function() {
	var clientHeight=document.documentElement.clientHeight;
	$('.admin_product').attr('style','min-height:250px;overflow-y:auto;overflow-x:hidden;max-height:'+clientHeight+'px;');

	type = GetQueryString("type");
	userName = GetQueryString("userName");
	if (type == "history"){
		$("#queryTimeStart").show();
		$("#queryTimeEnd").show();
		dateWidget('startTime');
		dateWidget('endTime');
	}else{
		$("#queryTimeStart").hide();
		$("#queryTimeEnd").hide();
	}
	
	height = window.screen.availHeight - 140;
	// 点击出现
	$(".pic_order").click(function() {
		$(".bg_div").show();
		$(".pic").show();
	});
	// 点击关闭
	$(".shut").click(function() {
		$(".bg_div").hide();
		$(".pic").hide();
	});
	//初始化充值记录表格
	initTransRuleTables();
});

/**
 * 初始化商品列表
 */
function initTransRuleTables() {
	transRuleTable = $("#transRuleTable").DataTable(
	{
		ordering : false,// 是否启用排序
		searching : false,// 搜索
		bRetrieve : true,
		columnDefs : [ {
			className : "tdClass"
		} ],
		columns : [
					{
						data : null,
						"render" : function(data,type,row,meta){
							var startIndex = meta.settings._iDisplayStart;
							return startIndex + meta.row + 1;
						}
					},
					{
						data : "goodName"
					},
					{
						data : "goodClassify",
						"render":function(data, type, row){
							return data == '1'?"话费":"流量";
						}
					},
					{
						data : "denomination"
					},
					{
						data : "operator"
					},
					{
						data : "province"
					},
					{
						data : "city"
					},
					{
						data : "discount"
					},
					{
						data : "value",
						"render":function(data, type, row){
							return (row.denomination * row.discount).toFixed(2);
						}
					},
					{
						data:"availabilityTime",
						"render":function(data, type, row){
							if (data != null){
								return data.substring(0,10);
							}else{
								return "";
							}
						}
					},
					{
						data : "goodStatus",
						"render":function(data, type, row){
							return data == 'Y'?"启用":"停用";
						}
					}],
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
				ajax : function(data, callback,settings){
					var args={
						'operator':encodeURI($('#operator').val()),
						'province':encodeURI($('#province').val()),
						'denomination':$('#denomination').val(),
						'userName':userName,
						'type':'account',
						'history':type,
						'goodClassify':$('#goodClassify').val()
					};
					if (type == "history"){
						args.startTime = $("#startTime").val();
						args.endTime = $("#endTime").val();
					}
					var param={
						'params':JSON.stringify(args),
						'start':data.start,
						'draw':data.draw,
						'length':data.length
					};
//					$.ajax({
//						url : getRootPath() + "/dispacher.jsp?url=/transRule/query",
//						data : param,
//						type : "post",
//						dataType : "json",
//						success : function(data) {
//							callback(data);
//						}
//					});
					var res = jQueryAjax("/transRule/query.action", param);
					callback(res);
				}
	});
	$("#table_local_filter input[type=search]").css({
		width : "auto"
	});// 右上角的默认搜索文本框，不写这个就超出去了。
}

/**
 * 查询
 */
function query(){
	transRuleTable.draw();
}

/**
 * 重置
 */
function resetVal(){
	document.getElementById("basicForm").reset(); 
}

function exportTransRule(){
	var url = "/transRule/export.action"
		+ "?operator=" + encodeURI(encodeURI($('#operator').val()))
		+ "&province=" + encodeURI(encodeURI($('#province').val()))
		+ "&denomination=" + $('#denomination').val()
		+ "&userName=" + userName
		+ "&type=account&history=" + type
		+ "&goodClassify=" +$('#goodClassify').val();
	if (type == "history"){
		url += "&startTime=" + $("#startTime").val();
		url += "&endTime=" +  $("#endTime").val();
	}
	$.download(getRootPath() + url,null,'post');
}
