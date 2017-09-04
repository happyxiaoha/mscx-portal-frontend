$(function(){
    // 切换城市  
    var labelFromcity = new Array();
    labelFromcity ['热门城市'] = new Array(0,5,1,2,3,4,6,7,8);
    // labelFromcity ['热门城市'] = new Array(0,5,1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40);
    // labelFromcity ['A-F'] = new Array(0,3,4,5,6,28,29);
    // labelFromcity ['G-J'] = new Array(1,7,8,9,30,31,32,33,37,40);
    // labelFromcity ['K-N'] = new Array(10,11,12,34,35,38);
    // labelFromcity ['P-W'] = new Array(13,14,15,16,17,18,22,24,25,36);
    // labelFromcity ['X-Z'] = new Array(2,19,20,21,26,27,39);
    var hotList = new Array(14,15,16,17,18,19);

    // $('.citys input').querycity({'data':citysFlight});

  // nav
  $('.nav').find('li').click(function(){
    tab($(this),null);
  });

    // 用户名鼠标滑过 显示  个人信息菜单
    var _c;
    $("#personReal").hover(function(){
        $(".shareBox").show();
    },function(){
        _c = setTimeout(function(){
            $(".shareBox").hide();  
        },200)
    });
    $(".shareBox").hover(function(){
        clearTimeout(_c);
    },function(){
        $(".shareBox").hide();  
    });
    
    // 轮播图
    // $(window).load(function() {
    //     $('#slider').nivoSlider({
    //         effect: 'slideInLeft',
    //         directionNav: false
    //     });
    // });
    
    // 全部搜索下拉选择
    $('.allSearch').click(function(){
        downUp($(this),$('.SearchDown'));
    });
    $('.SearchDown li').click(function(){
        selLi($(this),$('.allSearch'),$('.SearchDown'));
    });
  
    // 侧导航
    $('.citySdkLeft li').find('a').click(function(){
        tab($(this),null);
    });

    // 筛选条件
    $('.J_List').find('li').click(function(){
        tab($(this),null);
    });
    // 点击更多  全部显示
    // 2016-09-07 对机构置灰是  更多按钮不可点击  增加的类名 agencyDown
    $('.sl-e-more').click(function(){
        if($(this).hasClass('agencyDown')){
            return;
        }
        if($(this).hasClass('down')){
            $(this).html('收起>>').removeClass('down').parent().siblings('.sl-value').find('.J_List').css({'height':'auto'});
        }else{
            $(this).html('更多>>').addClass('down').parent().siblings('.sl-value').find('.J_List').css({'height':'40px'});
        }

    });

    // 退出登录
    $('#exit').click(function() {$('#exitModal').modal();});
    // 居中显示
    var clientW = document.documentElement.clientWidth;
    $('.modal').on('show', function () {
        $obj=$(this);
        var left=(clientW - $obj.width())/2;
        var top=($(window).height() - $obj.height())/2;
        $obj.css({
            top:top+'px',
            left:left+'px'
        })
    });

    // SDK 排序效果
    $('.sort').find('a').click(function(){
        tab($(this),null);
    });
    // 城市SDK 底部APItab 切换
    $('.tabList .tab span').click(function(){
        tab($(this),$('.tabConsInfo'));
    });
    $('.tabLeft span').click(function(){
        var inx = $(this).index();
        $(this).addClass('active').siblings('span').removeClass('active');
        $('.api .rightCons').eq(inx).show().siblings('.rightCons').hide();
        $('.control .rightCons').eq(inx).show().siblings('.rightCons').hide();
    });
    // 质量趋势
    $('.monitor p').click(function(){
        downUp($(this),$('.monitorDown'));
    });
    $('.monitorDown li').click(function(){
        selLi($(this),$('.monitor p'),$('.monitorDown'));
    });
    $('.apiName p').click(function(){
        downUp($(this),$('.apiNameCons'));
    });
    $('.apiNameCons li').click(function(){
        selLi($(this),$('.apiName p'),$('.apiNameCons'));
    });
    $('.apitime p').click(function(){
        downUp($(this),$('.apitimeCons'));
    });
    $('.apitimeCons li').click(function(){
        selLi($(this),$('.apitime p'),$('.apitimeCons'));
    });

    // 个人中心
    $('.leftListWrap ul li a').click(function(){
        tab($(this),null);
    });
    // 用户中心  实名认证 tab 切换
    $('.InfoTopTit span').click(function(){
        tab($(this),$('.tabCons'));
    });
    // 个人 企业 tab切换
    $('.My-titTab span').click(function(){
        tab($(this),$('.inputConsList'));
    });
    // 消费记录
    $('.titTab span').click(function(){
        tab($(this),$('.M-downCons'));
    });
    // 我的API Tab切换
    $('.myApiTop span').click(function(){
        tab($(this),$('.myApitabCons'));
    });

    // 2016-09-08 新增 用户中心 - 我的应用 - 发布新应用页面 tab 切换
    // $('.ReleaseTabTit').find('span').click(function(){
    //     tab($(this),$('.ReleaseDown'));
    // });
    // 2016-09-08 新增 分类和收费 下拉选择
    $('.Travel01 p').click(function(){
        downUp($(this),$('.Travel01Down'));
    });
    $('.Travel01Down li').click(function(){
        selLi($(this),$('.Travel01 p'),$('.Travel01Down'));
    });
    $('.Travel02 p').click(function(){
        downUp($(this),$('.Travel02Down'));
    });
    $('.Travel02Down li').click(function(){
        selLi($(this),$('.Travel02 p'),$('.Travel02Down'));
    });
    $('.Cost01 p').click(function(){
        downUp($(this),$('.Cost01Down'));
    });
    $('.Cost01Down li').click(function(){
        selLi($(this),$('.Cost01 p'),$('.Cost01Down'));
    });
    $('.Cost02 p').click(function(){
        downUp($(this),$('.Cost02Down'));
    });
    $('.Cost02Down li').click(function(){
        selLi($(this),$('.Cost02 p'),$('.Cost02Down'));
    });

    // 输入框 显示删除按钮
    $('input').each(function(index,item){
        var me = $(this);
        if($.trim(me.val()) == ""){
            me.siblings('.close').hide();
        }
        me.bind('input status',function() {
            var length = $.trim(this.value).length;
            if(length > 0){
                $(this).siblings('.close').show();
            } else {
                //$(this).val('');
                $(this).siblings('.close').hide();
            }
        });
    });
    $(".close").click(function(){
        $(this).siblings('input').val("");
        $(this).css('display','none');
    });

    // 增加 城市联动 2016-09-05
    $('.ProvinceName p').click(function(){
        downUp($(this),$('.ProvinceDown'));
    });
    $('.ProvinceDown li').click(function(){
        selLi($(this),$('.ProvinceName p'),$('.ProvinceDown'));
    });
    $('.SCityName p').click(function(){
        downUp($(this),$('.CityDown'));
    });
    $('.CityDown li').click(function(){
        selLi($(this),$('.SCityName p'),$('.CityDown'));
    });
    $('.RegionName p').click(function(){
        downUp($(this),$('.CountyDown'));
    });
    $('.CountyDown li').click(function(){
        selLi($(this),$('.RegionName p'),$('.CountyDown'));
    });

    // 当内容无法撑起正个屏幕是 加上这个类名：allHeight
    var allHeight = $('.allHeight').height(),
        height = $(window).height(),
        navHeight = $('.navCons').height(),
        headerHeight = $('.header').height(),
        footerHeight = $('.footer').height();
    if($('div').hasClass('allHeight')){
        if($('div').hasClass('navCons')){
            if(allHeight < height-(navHeight + headerHeight + footerHeight)){
                $('.footer').css({
                    'position':'fixed',
                    'bottom':'0px',
                    'left':'0px',
                    'width':'100%'
                })
            }else{
                $('.footer').css({
                    'position':'static'
                })
            }
        }else{
            if(allHeight < height-(headerHeight + footerHeight)){
                $('.footer').css({
                    'position':'fixed',
                    'bottom':'0px',
                    'left':'0px',
                    'width':'100%'
                })
            }else{
                $('.footer').css({
                    'position':'static'
                })
            }
        }
        
    }
    
  
});
// 点击P
function downUp(a,b){
    if(a.hasClass('down')){
        a.removeClass('down').addClass('up');
        b.slideDown();
    }else{
        a.addClass('down').removeClass('up');
        b.slideUp();
    }
}
// 选择下拉li
function selLi(li,p,ul){
    var html = li.html();
    p.html(html);
    ul.slideUp();
    p.addClass('down').removeClass('up');
}

// tab切换
function tab(self,childDiv){
    var index = self.index();
    self.addClass('active').siblings().removeClass('active');
    childDiv.eq(index).show().siblings(childDiv).hide();
}

// 统计浏览数
function statisticsViews(id,type,obj){
    $.post("../common/viewsStatistics",{id:id,type:type},function(data){
        if (data != null) {
            $(obj).text(parseInt(data));
        }
    });
}

// 统计下载数
function statisticsDownload(id,type,obj){
    $.post("../common/downloadStatistics",{id:id,type:type},function(data){
        if (data != null) {
            $(obj).text(parseInt(data));
        }
    });
}



