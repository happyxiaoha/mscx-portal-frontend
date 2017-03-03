$(function(){
	$("#productName").text(decodeURI(GetQueryString("name")));
	jQueryAjaxAsync("/productVersion/getVersionList", {"pid" : GetQueryString("pid")}, function(res){
		if (res.resCode == "2000"){
			var str = "";
			for (var i = 0; i < res.data.length; i++){
				str += '<div class="manage_ul manage_zy"><span>'
					+ res.data[i].version + '</span><p class="manage_ul_p">￥ <b>' + res.data[i].price + '</b></p>'
					+ '<p class="manage_ul_p2">提供' + res.data[i].trialDate + '天的免费试用</p><a class="manage_a" onclick="buyProduct(\'' 
					+ res.data[i].id + "\',\'" + res.data[i].price + "\',\'" + res.data[i].product.priceUnit + "\',\'" + res.data[i].trialDate + "\',\'" + GetQueryString("pid") + '\')">免费试用</a>'
					+ '<a class="manage_a" id="buyBtn" onclick="buyProduct(\'' 
					+ res.data[i].id + '\',\'' + res.data[i].price + "\',\'" + res.data[i].product.priceUnit + "\'," + null + ",\'" + GetQueryString("pid") + '\')">立即购买</a></div>'
			}
			$("#productVersions").html(str);
			
			initDataTable(res.data);
		}
	}, "GET");
});

function buyProduct(id, price, priceUnit, trialDate,productId){
	var uri = "manage_tab.html?id=" + id + "&price=" + price + "&priceUnit=" + priceUnit+"&productId="+productId+"&name="+encodeURI(GetQueryString("name"));
	if (trialDate != null){
		uri +=  "&trialDate=" + trialDate;
	}
	window.location.href=uri;
}

/**
 * 初始化产品属性表格
 */
function initDataTable(data){
	var columns = new Array();
	columns.push({"title" : "特性"});
	for (var i = 0; i < data.length; i++){
		columns.push({"title" : data[i].version});
	}
	
	var attrDatas = new Array();
	jQueryAjaxAsync("/productVersion/getProductVersionAttrByProNo", {"pno" : GetQueryString("pid")}, function(res){
		if (res.resCode == "2000"){
			for (var j = 0; j < res.data.length;){
				var row = new Array();
				var attrName = res.data[j].attrName
				row.push(attrName);
				for (var i = 0; i < data.length; i++){
					for (var k = 0; k < res.data.length;){
						if (attrName == res.data[k].attrName && res.data[k].versionNo == data[i].id){
							row.push(res.data[k].attrValue);
							res.data.splice(k, 1);
							k = 0;
							break;
						}else{
							k++;
						}
					}
					if (k == res.data.length){
						row.push("N/A");
					}
				}
				attrDatas.push(row);
//				res.data.splice(j, 1);
			}
			$("#versionCompareTable").DataTable({
		        scrollY: $(window).clientHeight,
		        dom : 't',
		        ordering: false,
		        columns : columns,
		        language: {
		            zeroRecords: "没有内容"
		        },
		        data : attrDatas
			});
		}
	}, "GET");
}