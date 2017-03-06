var pageSize = 8;
$(function() {
	$.ajax({
				url : getRootPath() + "/product/getProductList",
				dataType : 'json',
				async : true,
				type : "GET",
				data : {
					start : 0,
					length : pageSize,
					draw : 1,
					status : 1
				},
				success : function(res) {
					if (res != null) {
						var str = "";
						for ( var i = 0; i < res.data.length; i++) {
								str += '<div class="manage_ul manage_zy"><div style="color:#fff; font-size:26px;">'
										+ res.data[i].name
										+ '</div><a class="manage_a" onclick="selectVersion(\''
										+ res.data[i].no
										+ '\',\''
										+ res.data[i].name
										+ '\')">选择版本</a></div>'
						}
						$("#products").html(str);
						var pageCount = res.recordsTotal; // 取到pageCount的值
						var currentPage = res.pageNo; // 得到urrentPage
						var options = {
							bootstrapMajorVersion : 2, // 版本
							currentPage : currentPage, // 当前页数
							totalPages : pageCount % pageSize == 0? parseInt(pageCount/pageSize) : parseInt(pageCount/pageSize) + 1, // 总页数
							itemTexts : function(type, page, current) {
								switch (type) {
								case "first":
									return "首页";
								case "prev":
									return "上一页";
								case "next":
									return "下一页";
								case "last":
									return "末页";
								case "page":
									return page;
								}
							},// 点击事件，用于通过Ajax来刷新整个list列表
							onPageClicked : function(event, originalEvent,
									type, page) {
								$.ajax({
											url : getRootPath()
													+ "/product/getProductList",
											dataType : 'json',
											async : true,
											type : "GET",
											data : {
												start : page*pageSize-1,
												length : pageSize,
												draw : 1,
												status : 1
											},
											success : function(res1) {
												if (res1 != null) {
													var str = "";
													for ( var i = 0; i < res1.data.length; i++) {
															str += '<div class="manage_ul manage_zy"><div style="color:#fff; font-size:26px;">'
																	+ res1.data[i].name
																	+ '</div><a class="manage_a" onclick="selectVersion(\''
																	+ res1.data[i].no
																	+ '\',\''
																	+ res1.data[i].name
																	+ '\')">选择版本</a></div>'
													}
													$("#products").html(str);
												}
											}
										});
							}
						};
						$('#paginitor').bootstrapPaginator(options);
					}
				}
			});
})

function selectVersion(id, name) {
	window.location.href = encodeURI(encodeURI("manage.html?pid=" + id + "&name=" + name));
}
