var transactionDetailTable;
var index=1;
var height;
var userName = GetQueryString("userName");
$(function() {
	var clientHeight=document.documentElement.clientHeight;
	$('.admin_product').attr('style','min-height:250px;overflow-y:auto;overflow-x:hidden;max-height:'+clientHeight+';');
	//初始化日期控件
	initDatePicker();
	height = window.screen.availHeight - 140;
	//初始化select2控件
	if (userName == null){
		$("#btn").removeClass("col-sm-offset-4");
		$("#merchantNameDiv").show();
		initSelect2();
	}
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
	initTransactionDetailTableTables();
});
function initDatePicker(){
	dateWidget('beginDate');
	dateWidget('endDate');
	$('#beginDate').datepicker('setDate',new Date());
	$('#endDate').datepicker('setDate',new Date(addDate(getNowFormatDate(),1)));
	$('#endDate').datepicker('setStartDate',addDate(getNowFormatDate(),1));
	$('#endDate').datepicker('setEndDate',addmulMonth(getNowFormatDate(),1));
	$('#beginDate').datepicker()
	.on('changeDate', function(e) {
		$('#endDate').datepicker('setDate',new Date(addDate($(this).val(),1)));
		$('#endDate').datepicker('setStartDate',addDate($(this).val(),1));
		$('#endDate').datepicker('setEndDate',addmulMonth($(this).val(),1));
    });
}
function initSelect2(){
	$('#merchantName').select2();
	jQueryAjaxAsync("/account/getAll",null,function(data){
		if(data.data!=null&&data.data.length>0){
			for(var i=0;i<data.data.length;i++){
				$('#merchantName').append('<option value="'+data.data[i].id+'">'+data.data[i].companyName+'</option>');
			}
		}
	});
}
/**
 * 初始化商品列表
 */
function initTransactionDetailTableTables () {
	transactionDetailTable = $("#transactionDetailTable").DataTable(
					{
						ordering : false,// 是否启用排序
						searching : false,// 搜索
						bRetrieve : true,
						processing: true,
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
									data : "completionTime",
									"render" : function(data,type,row,meta){
										return data.substring(0,10);
									}
								},
								{
									data : "product.operator"
								},
								{
									data : "product.province"
								},
								{
									data : "product.denomination"
								},
								{
									data : "denominationTotal"
								},
								{
									data : "amount"
								},
								{
									data : "account.companyName"
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
								"footerCallback": function( tfoot, data, start, end, display ) {
									 var api = this.api();
									 if(api.column( 5 ).data().length>0){
										 $(tfoot).find('th').eq(1).html(api.column( 5 ).data().reduce( function ( a, b ) {
											 return a + b;
										 }));
									 }else{
										 $(tfoot).find('th').eq(1).html('0');
									 }
									 if(api.column( 6 ).data().length>0){
										 $(tfoot).find('th').eq(3).html(api.column( 6 ).data().reduce( function ( a, b ) {
											 return a + b;
										 }));
									 }else{
										 $(tfoot).find('th').eq(3).html('0');
									 }
								},
								ajax : function(data, callback,settings){
									var args={
											'startTime':$.trim($('#beginDate').val())==''?'':$.trim($('#beginDate').val())+" 00:00:00",
											'stopTime':$.trim($('#endDate').val())==''?'':$.trim($('#endDate').val())+" 00:00:00",
											'operator':$('#operator').val(),
											'province':$('#province').val(),
											'accountId':$('#merchantName').val(),
											'userName' : userName
									}
									var param={
											'params':JSON.stringify(args),
											'start':data.start,
											'draw':data.draw,
											'length':data.length
									};
									var url="/order/queryAgentDayTrade.action";
									if(userName==null){
										url="/dispacher?url=/order/queryAgentDayTrade.action";
									}
									$.ajax({
										url : getRootPath() + url,
										data : JSON.stringify(param),
										type : "post",
										contentType : 'application/json',
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
	
	$('#transactionDetailTable').on('processing.dt', function (e, settings, processing) {
		var l = Ladda.create( document.querySelector( '.ladda-button' ) );
		if (processing) {
			l.start();
	    } else {
	    	l.stop();
	    }
	});
}

/**
 * 查询
 */
function query(){
	transactionDetailTable.draw();
}

/**
 * 重置
 */
function resetVal(){
	document.getElementById("basicForm").reset(); 
	$("#merchantName").val(null).trigger("change");
	$('#beginDate').datepicker('setDate',new Date());
	$('#endDate').datepicker('setDate',new Date(addDate(getNowFormatDate(),1)));
}

/**
 * 导出
 */
function exportExcel(){
	var visitType=null;
	var cn='';
	if(userName==null){
		visitType="/dispacherDown?url=/order/exportAtdDayTradeExcel.action&fileName=商户日账单交易查询.xls&visitType=down&";
	}else{
		visitType="/order/exportAtdDayTradeExcel.action?";
		cn=userName;
	}
	var startTime=$.trim($('#beginDate').val())==''?'':$.trim($('#beginDate').val())+" 00:00:00";
	var stopTime=$.trim($('#endDate').val())==''?'':$.trim($('#endDate').val())+" 00:00:00";
	var url=visitType+"startTime="+startTime+"&stopTime="+stopTime
	+"&operator="+encodeURI(encodeURI($.trim($('#operator').val())))+'&accountId='+$.trim($('#merchantName').val())
	+"&province="+encodeURI(encodeURI($.trim($('#province').val())))+"&userName="+cn;
	$.download(getRootPath() + url,null,'post');
}

