var flowTable;
var index=1;
var height;
var companyName;

$(function(){
	companyName = GetQueryString('companyName');
	height = window.screen.availHeight - 220;
	initFlowQueryTables();
	dateTimeWidget('startTime');
	dateTimeWidget('stopTime');
	$('#countShow').html("统计信息(总面值：成功面值：待充值面值：失败面值：成本金额)");
})


function queryFlow(){
	flowTable.draw();
}

function queryTotalValue(){
	if($('#count').is(':checked')){
		var res = jQueryAjax('/order/queryTotalValue',null,false,'post','json');
		if(res.resCode == "000000"){
			$('#countShow').html("统计信息(总面值："+res.data.totalDenomination+"  成功面值："+res.data.totalsuccessfulValue+"  待充值面值："+res.data.totalWaitValue+"  失败面值：成本金额)");
		}
	}
}

/**
 * 初始化列表
 */
function initFlowQueryTables() {
	//var data=JSON.stringify({'companyName':'神州数码'});
	flowTable = $("#flowTable").DataTable(
	{
		ordering : false,// 是否启用排序
		searching : false,// 搜索
		bRetrieve : true,
		columnDefs : [ {
			className : "tdClass"
		} ],
		columns : [{
						data : null,
						"render" : function(data,type,row,meta){
							var startIndex = meta.settings._iDisplayStart;
							return startIndex + meta.row + 1;
						}
					},
					{
						data : "createTime"
					},
					{
						data : "id"
					},
					{
						data : "account.companyName"
					},
					{
						data : "product.operator"
					},
					{
						data : "product.province"
					},
					{
						data : "product.city"
					},
					{
						data : "ext1",
						"render" : function(data, type, row){
							if(data == null){
								return "";
							}else{
								return data;
							}
						}
					},
					{
						data : "denomination",
						"render" : function(data, type, row){
							if(data == null){
								return "";
							}else{
								return data;
							}
						}
					},
					{
						data : "successfulValue"
					},
					{
						data : "waitValue",
						"render" : function(data, type, row){
							if(data == null){
								return "";
							}else{
								return data;
							}
						}
					},
					{
						data : "orderStatus",
						"render":function(data, type, row){
							switch(data){
								case '10' : return data="新建";
								case '20' : return data="正在充值";
								case '30' : return data="充值成功";
								case '40' : return data="充值失败";
							}
						}
					},
					{
						data : "notifyStatus",
						"render":function(data, type, row){
							switch(data){
								case '10' : return data="等待通知";
								case '20' : return data="正在通知";
								case '30' : return data="通知成功";
								case '40' : return data="通知失败";
							}
						}
					},
					{
						data : "completionTime",
						"render" : function(data, type, row){
							if(data == null){
								return "";
							}else{
								return data;
							}
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
					info : "总共_PAGES_ 页，显示第_START_ 到第 _END_条",// 筛选之后得到
					// _TOTAL_
					// 条，初始_MAX_
					// 条",//左下角的信息显示，大写的词为关键字。
					infoEmpty : "0条记录",// 筛选为空时左下角的显示。
					infoFiltered : ""// 筛选之后的左下角筛选提示，
				},
				scrollY : height-288,
				scrollCollapse : "true",
				paging : true,
				pagingType : "full_numbers",// 分页样式的类型
				serverSide : true,
				dom : 't<"col-sm-2"i><"col-sm-4"l><"col-sm-6"p>',
				ajax : function(data, callback,settings){
					var args={
							'operator':encodeURI($('#operator').val()),
							'province':encodeURI($('#province').val()),
							'denomination':$('#denomination').val(),
							'startTime':$('#startTime').val(),
							'stopTime':$('#stopTime').val(),
							'orderStatus':$('#flowStatus').val(),
							'notifyStatus':$('#notifyStatus').val(),
							'denomination':$('#denomination').val(),
							'mobile':$('#phone').val(),
							'id':$('#sysOrderNum').val(),
							'agentOrderId':$('#merOrderNum').val(),
							'companyName' : companyName
						}
						var param={
							'params':JSON.stringify(args),
							'start':data.start,
							'draw':data.draw,
							'length':data.length
						};
						$.ajax({
							url : getRootPath() + "/dispacher.jsp?url=/order/queryAgentFlow",
							data : JSON.stringify(param),
							contentType : 'application/json',
							type : "post",
							dataType : "json",
							success : function(data) {
								callback(data);
							}
						});
				}
	});
	$("#table_local_filter input[type=search]").css({
		width : "auto"
	});// 右上角的默认搜索文本框，不写这个就超出去了。
}

function exportExcel(){
	if(companyName == null){
		var url = "/dispacherDown?url=/order/exportAtfExcel&fileName=商户交易流水.xls&visitType=down"
			+'&startTime='+$('#startTime').val()
			+'&stopTime='+$('#stopTime').val()
			+'&operator='+encodeURI(encodeURI(encodeURI($('#operator').val())))
			+'&province='+encodeURI(encodeURI(encodeURI($('#province').val())))
			+'&denomination='+$('#denomination').val()
			+'&orderStatus='+$('#flowStatus').val()
			+'&notifyStatus='+$('#notifyStatus').val()
			+'&mobile='+$('#phone').val()
			+'&id='+$('#sysOrderNum').val()
			+'&agentOrderId='+$('#merOrderNum').val()
			+'&companyName=';
	}else{
		var url = "/dispacher.jsp?url=/order/exportAtfExcel&fileName=商户交易流水.xls&visitType=down"
			+'&startTime='+$('#startTime').val()
			+'&stopTime='+$('#stopTime').val()
			+'&operator='+encodeURI(encodeURI(encodeURI($('#operator').val())))
			+'&province='+encodeURI(encodeURI(encodeURI($('#province').val())))
			+'&denomination='+$('#denomination').val()
			+'&orderStatus='+$('#flowStatus').val()
			+'&notifyStatus='+$('#notifyStatus').val()
			+'&mobile='+$('#phone').val()
			+'&id='+$('#sysOrderNum').val()
			+'&agentOrderId='+$('#merOrderNum').val()
			+'&companyName='+encodeURI(encodeURI(companyName));
	}
	$.download(getRootPath() + url,null,'post');
}