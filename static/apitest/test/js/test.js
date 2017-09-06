var test=function () {
};
test.prototype={

    //增加参数输入表格
    addParams:function(){
        $("#params").append('<tr><td><input class="inptboder" value=""/></td><td><input  class="inptboder" value=""/></td>');
},
//初始化参数列表
    initialForm:function () {
        $("#params").empty();//清空
        $("#result").empty();//清空返回
        service.addParams();
    },
//获取参数列表
//     getParams:function () {
//         var data={};//请求参数
//         //获取请求地址
//         data.reqUrl=$("#reqUrl").val();
//
//         //获取请求方式
//         var method=$("#reqMethod").val()
//         data.reqMethod=method;
//         var textInput="";
//         if("GET"==method){
//         $("#params ").children("tr").each(function (i,n) {
//            var key= $(n).children("td").eq(0).children("input").val();
//            var value=$(n).children("td").eq(1).children("input").val();
//             //alert("key="+key+"value="+value);
//             if(key!=null && key!=""){
//             data[key]=value;
//             }
//         });
//             return JSON.stringify(data);
//         }
//         //post
//         if ("POST"==method){
//             var textInput=$("#textInput").val()
//             var params= JSON.parse(textInput);
//             params.reqMethod=method;
//             return JSON.stringify(params);
//         }
//
//       // alert(JSON.stringify(data));
//
//     },
//发送请求点击事件
    sendReq:function () {
        //清空内容
        $("#result").empty();
        $("#textInput").html("");

        var method=$("#reqMethod").val();
        if("GET"==method){
            service.doget();
        }
        if("POST"==method){
            service.dopost();
        }
    },

    //发送GET请求
    doget:function () {
        var load = new Loading();
        //加载中
        load.init();
        load.start();
        setTimeout(function() {
            load.stop();
        }, 30000)

        var data={};//请求参数
        //获取请求地址
        data.reqUrl=$("#reqUrl").val();
        //获取请求方式
        var method=$("#reqMethod").val();
        //增加获取用户的apikey secretkey
         data.apikey=$("#apikey").val();
         data.secretkey=$("#secretkey").val();
        
        data.reqMethod=method;
        $("#params ").children("tr").each(function (i,n) {
            var key= $(n).children("td").eq(0).children("input").val();
            var value=$(n).children("td").eq(1).children("input").val();
            //alert("key="+key+"value="+value);
            if(key!=null && key!=""){
                data[key]=value;
            }
        });
        $.ajax({
            type: "POST",
            url:"/get.do",
            contentType:"application/json",
            data: JSON.stringify(data),
            success: function (res) {
                //将调用结果输出到页面
                load.stop();
                $("#result").text(res);
            }
        })
    },
    //发送POST请求
    dopost:function () {
        var load = new Loading();
        //加载中
        load.init();
        load.start();
        setTimeout(function() {
            load.stop();
        }, 30000)

        var reqUrl=$("#reqUrl").val();
        var textInput=$("#textInput").val();

        var apikey=$("#apikey").val();
        var secretkey=$("#secretkey").val();
        $.ajax({
            type: "POST",
            url:"/post.do",
            data: {"url":reqUrl,
                   "params":textInput,
                    "apikey":apikey,
                    "secretkey":secretkey},
            success: function (res) {
                //将调用结果输出到页面
                load.stop();
                $("#result").text(res);
            }
        })
    },

   //根据中文名检索API,输出到页面的下拉列表中
    searchApi:function () {
        var load = new Loading();
        //加载中
        load.init();
        load.start();
        setTimeout(function() {
            load.stop();
        }, 30000)

        //清楚上次结果
        $("#result").empty();
       var cname=$("#cnanme").val();
       var res = [{"id":"1","cname":"证券从业人员执业注册查询","charge_type":"01"},{"id":"2","cname":"银行专业人员资质信息查询","charge_type":"01"},{"id":"3","cname":"基金从业人员资格信息查询","charge_type":"01"},{"id":"4","cname":"国家职业资格证书查询","charge_type":"01"},{"id":"6","cname":"CETTIC证书查询","charge_type":"01"},{"id":"7","cname":"国际证书查询","charge_type":"01"},{"id":"8","cname":"一级注册建造师查询","charge_type":"01"},{"id":"9","cname":"二级注册建造师查询","charge_type":"01"},{"id":"10","cname":"一级临时建造师证书查询","charge_type":"01"},{"id":"11","cname":"一级临时建造师继续教育查询","charge_type":"01"},{"id":"12","cname":"二级临时建造师证书查询","charge_type":"01"},{"id":"13","cname":"注册会计师查询","charge_type":"01"},{"id":"18","cname":"出入境预审","charge_type":"01"},{"id":"19","cname":"北京公积金查询","charge_type":"01"},{"id":"20","cname":"沧州公积金查询","charge_type":"01"},{"id":"21","cname":"本溪驾驶人记分","charge_type":"01"},{"id":"22","cname":"上海社保查询","charge_type":"01"},{"id":"23","cname":"无锡公积金查询","charge_type":"01"},{"id":"24","cname":"苏州社保查询","charge_type":"01"},{"id":"25","cname":"杭州公积金查询","charge_type":"01"},{"id":"26","cname":"济南公积金查询","charge_type":"01"},{"id":"27","cname":"青岛公积金查询","charge_type":"01"},{"id":"28","cname":"临沂公积金查询","charge_type":"01"},{"id":"29","cname":"长沙公积金查询","charge_type":"01"},{"id":"30","cname":"长沙社保查询","charge_type":"01"},{"id":"31","cname":"南宁公积金查询","charge_type":"01"},{"id":"32","cname":"南宁社保查询","charge_type":"01"},{"id":"33","cname":"徐州社保查询","charge_type":"01"},{"id":"35","cname":"三明社保查询","charge_type":"01"},{"id":"37","cname":"漯河社保查询","charge_type":"01"},{"id":"41","cname":"北京机动车摇号查询","charge_type":"01"},{"id":"42","cname":"北京一卡通查询","charge_type":"01"},{"id":"43","cname":"北京车辆限行查询","charge_type":"01"},{"id":"44","cname":"商标信息查询","charge_type":"01"},{"id":"46","cname":"企业环境标志清单查询","charge_type":"01"},{"id":"51","cname":"政府采购中标公告查询","charge_type":"01"},{"id":"52","cname":"重大税收违法案件信息查询","charge_type":"01"},{"id":"53","cname":"A级纳税人信息查询","charge_type":"01"},{"id":"54","cname":"上市公司信息查询","charge_type":"01"},{"id":"55","cname":"上市公司业绩报告查询","charge_type":"01"},{"id":"58","cname":"无锡交通违章","charge_type":"01"},{"id":"59","cname":"keywords关键词","charge_type":"01"},{"id":"60","cname":"MD5解密","charge_type":"01"},{"id":"61","cname":"validate有效性校验","charge_type":"01"},{"id":"62","cname":"百度权重查询","charge_type":"01"},{"id":"63","cname":"定制图表","charge_type":"01"},{"id":"64","cname":"二维码生成和识别","charge_type":"01"},{"id":"65","cname":"文本相似度检测","charge_type":"01"},{"id":"66","cname":"图片验证码生成","charge_type":"01"},{"id":"67","cname":"新闻、网页正文抽取","charge_type":"01"},{"id":"68","cname":"POI搜索","charge_type":"01"},{"id":"70","cname":"IP定位","charge_type":"01"},{"id":"71","cname":"LBS数据仓库","charge_type":"01"},{"id":"72","cname":"地址与经纬度互转","charge_type":"01"},{"id":"73","cname":"地址转坐标","charge_type":"01"},{"id":"74","cname":"基站定位","charge_type":"01"},{"id":"75","cname":"交通方式检索","charge_type":"01"},{"id":"76","cname":"静态图","charge_type":"01"},{"id":"77","cname":"全景静态图","charge_type":"01"},{"id":"78","cname":"时间路线计算","charge_type":"01"},{"id":"79","cname":"周边检索","charge_type":"01"},{"id":"80","cname":"坐标转换","charge_type":"01"},{"id":"81","cname":"微信大全","charge_type":"01"},{"id":"82","cname":"单位换算","charge_type":"01"},{"id":"83","cname":"空气质量","charge_type":"01"},{"id":"84","cname":"历史上的今天","charge_type":"01"},{"id":"85","cname":"全国邮编查询","charge_type":"01"},{"id":"86","cname":"手机归属地查询","charge_type":"01"},{"id":"87","cname":"问答机器人","charge_type":"01"},{"id":"88","cname":"笑话大全","charge_type":"01"},{"id":"89","cname":"中国及全球天气预报","charge_type":"01"},{"id":"138","cname":"法院裁判文书查询","charge_type":"01"},{"id":"265","cname":"固话信息查询","charge_type":"02"},{"id":"266","cname":"联通在网时长查询","charge_type":"02"},{"id":"268","cname":"移动在网时长查询","charge_type":"02"},{"id":"269","cname":"移动在网状态查询","charge_type":"02"},{"id":"275","cname":"病状信息","charge_type":"01"},{"id":"277","cname":"疾病信息","charge_type":"01"},{"id":"278","cname":"检查项目","charge_type":"01"},{"id":"279","cname":"科室分类","charge_type":"01"},{"id":"280","cname":"身体部位","charge_type":"01"},{"id":"281","cname":"手术分类","charge_type":"01"},{"id":"284","cname":"医院门诊","charge_type":"01"},{"id":"285","cname":"药品信息","charge_type":"01"},{"id":"286","cname":"药店药房","charge_type":"01"},{"id":"288","cname":"城市坐标","charge_type":"01"},{"id":"289","cname":"笑话大全","charge_type":"01"},{"id":"290","cname":"辞海","charge_type":"01"},{"id":"291","cname":"智能问答","charge_type":"01"},{"id":"292","cname":"QQ音乐接口","charge_type":"01"},{"id":"293","cname":"Alexa网站排名","charge_type":"01"},{"id":"294","cname":"邮箱地址验证","charge_type":"01"},{"id":"295","cname":"网站安全检测","charge_type":"01"},{"id":"296","cname":"网站监测","charge_type":"01"},{"id":"297","cname":"手机固话来电显示","charge_type":"01"},{"id":"298","cname":"货币汇率","charge_type":"01"},{"id":"299","cname":"全国WIFI","charge_type":"01"},{"id":"300","cname":"新华字典","charge_type":"01"},{"id":"305","cname":"联通实名信息","charge_type":"02"},{"id":"310","cname":"移动二要素实名","charge_type":"02"},{"id":"312","cname":"人脸识别","charge_type":"02"},{"id":"313","cname":"身份证二元素认证","charge_type":"02"},{"id":"320","cname":"身份证照片信息","charge_type":"02"},{"id":"331","cname":"银行卡三元素认证信息","charge_type":"02"},{"id":"355","cname":"手机归属地","charge_type":"02"},{"id":"357","cname":"银行卡所属行查询信息","charge_type":"02"},{"id":"366","cname":"情感分析","charge_type":"01"},{"id":"367","cname":"命名实体识别","charge_type":"01"},{"id":"368","cname":"依存文法分析","charge_type":"01"},{"id":"369","cname":"关键词提取","charge_type":"01"},{"id":"370","cname":"新闻分类","charge_type":"01"},{"id":"371","cname":"语义联想","charge_type":"01"},{"id":"372","cname":"分词与词性标注","charge_type":"01"},{"id":"379","cname":"手机号反欺诈","charge_type":"02"},{"id":"384","cname":"消费能力核查","charge_type":"02"},{"id":"440","cname":"职业资格证书查询","charge_type":"02"},{"id":"455","cname":"身份多项信息查询","charge_type":"02"},{"id":"459","cname":"被执行人","charge_type":"01"},{"id":"464","cname":"失信被执行人","charge_type":"02"},{"id":"484","cname":"天气预报","charge_type":"01"},{"id":"485","cname":"验证码","charge_type":"01"},{"id":"486","cname":"支付服务","charge_type":"01"},{"id":"487","cname":"短信服务","charge_type":"01"},{"id":"488","cname":"营销短信","charge_type":"01"},{"id":"489","cname":"张家港检验检查","charge_type":"01"},{"id":"495","cname":"农业新闻","charge_type":"01"},{"id":"496","cname":"农业知识","charge_type":"01"},{"id":"497","cname":"健康资讯","charge_type":"01"},{"id":"498","cname":"健康知识","charge_type":"01"},{"id":"499","cname":"健康问答","charge_type":"01"},{"id":"500","cname":"健康食品","charge_type":"01"},{"id":"501","cname":"健康图书","charge_type":"01"},{"id":"502","cname":"健康菜谱","charge_type":"01"},{"id":"504","cname":"身份证验证","charge_type":"02"},{"id":"505","cname":"短信服务","charge_type":"02"},{"id":"512","cname":"人脸识别","charge_type":"02"},{"id":"513","cname":"银行卡四元素","charge_type":"02"},{"id":"522","cname":"上市公司数据","charge_type":"01"},{"id":"523","cname":"环境数据","charge_type":"01"},{"id":"524","cname":"短信服务","charge_type":"02"},{"id":"542","cname":"香港天气数据","charge_type":"01"},{"id":"543","cname":"香港交通数据","charge_type":"01"},{"id":"544","cname":"香港医疗","charge_type":"01"},{"id":"545","cname":"香港公共信息","charge_type":"01"},{"id":"546","cname":"香港政府公众通知","charge_type":"01"},{"id":"547","cname":"香港房地产（租房及买房）信息","charge_type":"01"},{"id":"548","cname":"香港求职信息","charge_type":"01"},{"id":"563","cname":"风报数据","charge_type":"01"},{"id":"564","cname":"事件搜索","charge_type":"01"},{"id":"9549","cname":"学历信息","charge_type":"02"},{"id":"9551","cname":"航运运价指数","charge_type":"02"},{"id":"9569","cname":"手机充值","charge_type":"01"},{"id":"9571","cname":"个人三元素认证","charge_type":"02"},{"id":"9581","cname":"数据可视化","charge_type":"01"},{"id":"9587","cname":"账号管理","charge_type":"01"},{"id":"9589","cname":"菜单管理","charge_type":"01"},{"id":"9621","cname":"联通手机姓名认证","charge_type":"02"},{"id":"9623","cname":"移动手机姓名验证","charge_type":"02"},{"id":"9625","cname":"电信手机姓名验证","charge_type":"02"},{"id":"9627","cname":"联通三要素验证","charge_type":"02"},{"id":"9629","cname":"移动三元素验证","charge_type":"02"},{"id":"9631","cname":"电信三要素验证","charge_type":"02"},{"id":"9633","cname":"联通手机号码在网状态","charge_type":"02"},{"id":"9635","cname":"联通在网时长","charge_type":"02"},{"id":"9637","cname":"移动手机号码状态","charge_type":"02"},{"id":"9639","cname":"移动在网时长","charge_type":"02"},{"id":"9641","cname":"电信在网状态","charge_type":"02"},{"id":"9643","cname":"电信在网时长","charge_type":"02"},{"id":"9659","cname":"自然人学历查询","charge_type":"02"},{"id":"9667","cname":"联通黑名单用户查询","charge_type":"02"},{"id":"9673","cname":"联通呼叫转移","charge_type":"01"},{"id":"9675","cname":"联通入网时长比较","charge_type":"02"},{"id":"9677","cname":"联通最后一次活跃情况","charge_type":"02"},{"id":"9679","cname":"联通用户名下号码数量","charge_type":"02"},{"id":"9681","cname":"移动平均消费区间查询","charge_type":"02"},{"id":"9683","cname":"电信是否常用联系人","charge_type":"02"},{"id":"9685","cname":"银行卡二要素认证接口","charge_type":"02"},{"id":"9687","cname":"银行卡三要素认证接口","charge_type":"02"},{"id":"9689","cname":"银行卡三要素认证接口","charge_type":"02"},{"id":"9691","cname":"银行卡四要素认证接口","charge_type":"02"},{"id":"9693","cname":"银行卡四要素认证接口","charge_type":"02"},{"id":"9695","cname":"自然人司法信息精准查询","charge_type":"02"},{"id":"9697","cname":"企业司法风控报告","charge_type":"02"},{"id":"9699","cname":"企业司法信息精准查询","charge_type":"02"},{"id":"9701","cname":"自然人银行贷款逾期查询","charge_type":"02"},{"id":"9703","cname":"企业基本信息","charge_type":"02"},{"id":"9705","cname":"企业对外投资信息","charge_type":"02"},{"id":"9707","cname":"企业四要素信息比对","charge_type":"02"},{"id":"9709","cname":"企业综合信息","charge_type":"02"},{"id":"9713","cname":"企业域名查询","charge_type":"02"},{"id":"9715","cname":"组织机构代码查询","charge_type":"02"},{"id":"9717","cname":"全国企业专利查询","charge_type":"02"},{"id":"9719","cname":"全国专利查询","charge_type":"02"},{"id":"9721","cname":"软件著作查询","charge_type":"02"},{"id":"9723","cname":"企业对公账户认证","charge_type":"02"},{"id":"9725","cname":"企业固话认证","charge_type":"02"},{"id":"9733","cname":"自然人唯一识别码与姓名比对","charge_type":"02"},{"id":"9735","cname":"自然人唯一识别码与姓名比对实时","charge_type":"02"},{"id":"9767","cname":"北京社保","charge_type":"01"},{"id":"9775","cname":"港华燃气欠费查询","charge_type":"01"},{"id":"9777","cname":"徐州违章查询","charge_type":"01"},{"id":"9795","cname":"徐州司法","charge_type":"01"},{"id":"9803","cname":"自住房","charge_type":"01"},{"id":"9805","cname":"北京出入境非京籍港澳台持证办理","charge_type":"01"},{"id":"9807","cname":"北京出入境京籍港澳台持证办理","charge_type":"01"},{"id":"9809","cname":"国家博物馆","charge_type":"01"},{"id":"9811","cname":"空气质量预测","charge_type":"01"},{"id":"9813","cname":"能见度预测","charge_type":"01"},{"id":"9815","cname":"温度预测","charge_type":"01"},{"id":"9817","cname":"广州报废车辆查询","charge_type":"01"},{"id":"9903","cname":"工控安全信息查询","charge_type":"01"},{"id":"9927","cname":"通关状态查询","charge_type":"01"},{"id":"9929","cname":"电子手册状态查询","charge_type":"01"},{"id":"9931","cname":"进出口税查询","charge_type":"01"},{"id":"9933","cname":"新舱单信息查询","charge_type":"01"},{"id":"9937","cname":"外汇查询","charge_type":"01"}];
        load.stop();
        $("#apiService").empty();//清空下拉列表
        if(res.length>0 && res!=null){
        $.each(res,function (i,item) {
                $("#apiService").append("<option value='"+item.id+"'>"+item.cname+"</option>");
            })
            //默认第一选项，api详情下拉列表默认第一项的列表
            service.serviceChange();
        }
        // $.ajax({
        //     type: "GET",
        //     url:"./service?cname="+cname,
        //     contentType:"application/json",
        //     data: {},
        //     success: function (res) {
        //         res = [{"id":"1","cname":"证券从业人员执业注册查询","charge_type":"01"},{"id":"2","cname":"银行专业人员资质信息查询","charge_type":"01"},{"id":"3","cname":"基金从业人员资格信息查询","charge_type":"01"},{"id":"4","cname":"国家职业资格证书查询","charge_type":"01"},{"id":"6","cname":"CETTIC证书查询","charge_type":"01"},{"id":"7","cname":"国际证书查询","charge_type":"01"},{"id":"8","cname":"一级注册建造师查询","charge_type":"01"},{"id":"9","cname":"二级注册建造师查询","charge_type":"01"},{"id":"10","cname":"一级临时建造师证书查询","charge_type":"01"},{"id":"11","cname":"一级临时建造师继续教育查询","charge_type":"01"},{"id":"12","cname":"二级临时建造师证书查询","charge_type":"01"},{"id":"13","cname":"注册会计师查询","charge_type":"01"},{"id":"18","cname":"出入境预审","charge_type":"01"},{"id":"19","cname":"北京公积金查询","charge_type":"01"},{"id":"20","cname":"沧州公积金查询","charge_type":"01"},{"id":"21","cname":"本溪驾驶人记分","charge_type":"01"},{"id":"22","cname":"上海社保查询","charge_type":"01"},{"id":"23","cname":"无锡公积金查询","charge_type":"01"},{"id":"24","cname":"苏州社保查询","charge_type":"01"},{"id":"25","cname":"杭州公积金查询","charge_type":"01"},{"id":"26","cname":"济南公积金查询","charge_type":"01"},{"id":"27","cname":"青岛公积金查询","charge_type":"01"},{"id":"28","cname":"临沂公积金查询","charge_type":"01"},{"id":"29","cname":"长沙公积金查询","charge_type":"01"},{"id":"30","cname":"长沙社保查询","charge_type":"01"},{"id":"31","cname":"南宁公积金查询","charge_type":"01"},{"id":"32","cname":"南宁社保查询","charge_type":"01"},{"id":"33","cname":"徐州社保查询","charge_type":"01"},{"id":"35","cname":"三明社保查询","charge_type":"01"},{"id":"37","cname":"漯河社保查询","charge_type":"01"},{"id":"41","cname":"北京机动车摇号查询","charge_type":"01"},{"id":"42","cname":"北京一卡通查询","charge_type":"01"},{"id":"43","cname":"北京车辆限行查询","charge_type":"01"},{"id":"44","cname":"商标信息查询","charge_type":"01"},{"id":"46","cname":"企业环境标志清单查询","charge_type":"01"},{"id":"51","cname":"政府采购中标公告查询","charge_type":"01"},{"id":"52","cname":"重大税收违法案件信息查询","charge_type":"01"},{"id":"53","cname":"A级纳税人信息查询","charge_type":"01"},{"id":"54","cname":"上市公司信息查询","charge_type":"01"},{"id":"55","cname":"上市公司业绩报告查询","charge_type":"01"},{"id":"58","cname":"无锡交通违章","charge_type":"01"},{"id":"59","cname":"keywords关键词","charge_type":"01"},{"id":"60","cname":"MD5解密","charge_type":"01"},{"id":"61","cname":"validate有效性校验","charge_type":"01"},{"id":"62","cname":"百度权重查询","charge_type":"01"},{"id":"63","cname":"定制图表","charge_type":"01"},{"id":"64","cname":"二维码生成和识别","charge_type":"01"},{"id":"65","cname":"文本相似度检测","charge_type":"01"},{"id":"66","cname":"图片验证码生成","charge_type":"01"},{"id":"67","cname":"新闻、网页正文抽取","charge_type":"01"},{"id":"68","cname":"POI搜索","charge_type":"01"},{"id":"70","cname":"IP定位","charge_type":"01"},{"id":"71","cname":"LBS数据仓库","charge_type":"01"},{"id":"72","cname":"地址与经纬度互转","charge_type":"01"},{"id":"73","cname":"地址转坐标","charge_type":"01"},{"id":"74","cname":"基站定位","charge_type":"01"},{"id":"75","cname":"交通方式检索","charge_type":"01"},{"id":"76","cname":"静态图","charge_type":"01"},{"id":"77","cname":"全景静态图","charge_type":"01"},{"id":"78","cname":"时间路线计算","charge_type":"01"},{"id":"79","cname":"周边检索","charge_type":"01"},{"id":"80","cname":"坐标转换","charge_type":"01"},{"id":"81","cname":"微信大全","charge_type":"01"},{"id":"82","cname":"单位换算","charge_type":"01"},{"id":"83","cname":"空气质量","charge_type":"01"},{"id":"84","cname":"历史上的今天","charge_type":"01"},{"id":"85","cname":"全国邮编查询","charge_type":"01"},{"id":"86","cname":"手机归属地查询","charge_type":"01"},{"id":"87","cname":"问答机器人","charge_type":"01"},{"id":"88","cname":"笑话大全","charge_type":"01"},{"id":"89","cname":"中国及全球天气预报","charge_type":"01"},{"id":"138","cname":"法院裁判文书查询","charge_type":"01"},{"id":"265","cname":"固话信息查询","charge_type":"02"},{"id":"266","cname":"联通在网时长查询","charge_type":"02"},{"id":"268","cname":"移动在网时长查询","charge_type":"02"},{"id":"269","cname":"移动在网状态查询","charge_type":"02"},{"id":"275","cname":"病状信息","charge_type":"01"},{"id":"277","cname":"疾病信息","charge_type":"01"},{"id":"278","cname":"检查项目","charge_type":"01"},{"id":"279","cname":"科室分类","charge_type":"01"},{"id":"280","cname":"身体部位","charge_type":"01"},{"id":"281","cname":"手术分类","charge_type":"01"},{"id":"284","cname":"医院门诊","charge_type":"01"},{"id":"285","cname":"药品信息","charge_type":"01"},{"id":"286","cname":"药店药房","charge_type":"01"},{"id":"288","cname":"城市坐标","charge_type":"01"},{"id":"289","cname":"笑话大全","charge_type":"01"},{"id":"290","cname":"辞海","charge_type":"01"},{"id":"291","cname":"智能问答","charge_type":"01"},{"id":"292","cname":"QQ音乐接口","charge_type":"01"},{"id":"293","cname":"Alexa网站排名","charge_type":"01"},{"id":"294","cname":"邮箱地址验证","charge_type":"01"},{"id":"295","cname":"网站安全检测","charge_type":"01"},{"id":"296","cname":"网站监测","charge_type":"01"},{"id":"297","cname":"手机固话来电显示","charge_type":"01"},{"id":"298","cname":"货币汇率","charge_type":"01"},{"id":"299","cname":"全国WIFI","charge_type":"01"},{"id":"300","cname":"新华字典","charge_type":"01"},{"id":"305","cname":"联通实名信息","charge_type":"02"},{"id":"310","cname":"移动二要素实名","charge_type":"02"},{"id":"312","cname":"人脸识别","charge_type":"02"},{"id":"313","cname":"身份证二元素认证","charge_type":"02"},{"id":"320","cname":"身份证照片信息","charge_type":"02"},{"id":"331","cname":"银行卡三元素认证信息","charge_type":"02"},{"id":"355","cname":"手机归属地","charge_type":"02"},{"id":"357","cname":"银行卡所属行查询信息","charge_type":"02"},{"id":"366","cname":"情感分析","charge_type":"01"},{"id":"367","cname":"命名实体识别","charge_type":"01"},{"id":"368","cname":"依存文法分析","charge_type":"01"},{"id":"369","cname":"关键词提取","charge_type":"01"},{"id":"370","cname":"新闻分类","charge_type":"01"},{"id":"371","cname":"语义联想","charge_type":"01"},{"id":"372","cname":"分词与词性标注","charge_type":"01"},{"id":"379","cname":"手机号反欺诈","charge_type":"02"},{"id":"384","cname":"消费能力核查","charge_type":"02"},{"id":"440","cname":"职业资格证书查询","charge_type":"02"},{"id":"455","cname":"身份多项信息查询","charge_type":"02"},{"id":"459","cname":"被执行人","charge_type":"01"},{"id":"464","cname":"失信被执行人","charge_type":"02"},{"id":"484","cname":"天气预报","charge_type":"01"},{"id":"485","cname":"验证码","charge_type":"01"},{"id":"486","cname":"支付服务","charge_type":"01"},{"id":"487","cname":"短信服务","charge_type":"01"},{"id":"488","cname":"营销短信","charge_type":"01"},{"id":"489","cname":"张家港检验检查","charge_type":"01"},{"id":"495","cname":"农业新闻","charge_type":"01"},{"id":"496","cname":"农业知识","charge_type":"01"},{"id":"497","cname":"健康资讯","charge_type":"01"},{"id":"498","cname":"健康知识","charge_type":"01"},{"id":"499","cname":"健康问答","charge_type":"01"},{"id":"500","cname":"健康食品","charge_type":"01"},{"id":"501","cname":"健康图书","charge_type":"01"},{"id":"502","cname":"健康菜谱","charge_type":"01"},{"id":"504","cname":"身份证验证","charge_type":"02"},{"id":"505","cname":"短信服务","charge_type":"02"},{"id":"512","cname":"人脸识别","charge_type":"02"},{"id":"513","cname":"银行卡四元素","charge_type":"02"},{"id":"522","cname":"上市公司数据","charge_type":"01"},{"id":"523","cname":"环境数据","charge_type":"01"},{"id":"524","cname":"短信服务","charge_type":"02"},{"id":"542","cname":"香港天气数据","charge_type":"01"},{"id":"543","cname":"香港交通数据","charge_type":"01"},{"id":"544","cname":"香港医疗","charge_type":"01"},{"id":"545","cname":"香港公共信息","charge_type":"01"},{"id":"546","cname":"香港政府公众通知","charge_type":"01"},{"id":"547","cname":"香港房地产（租房及买房）信息","charge_type":"01"},{"id":"548","cname":"香港求职信息","charge_type":"01"},{"id":"563","cname":"风报数据","charge_type":"01"},{"id":"564","cname":"事件搜索","charge_type":"01"},{"id":"9549","cname":"学历信息","charge_type":"02"},{"id":"9551","cname":"航运运价指数","charge_type":"02"},{"id":"9569","cname":"手机充值","charge_type":"01"},{"id":"9571","cname":"个人三元素认证","charge_type":"02"},{"id":"9581","cname":"数据可视化","charge_type":"01"},{"id":"9587","cname":"账号管理","charge_type":"01"},{"id":"9589","cname":"菜单管理","charge_type":"01"},{"id":"9621","cname":"联通手机姓名认证","charge_type":"02"},{"id":"9623","cname":"移动手机姓名验证","charge_type":"02"},{"id":"9625","cname":"电信手机姓名验证","charge_type":"02"},{"id":"9627","cname":"联通三要素验证","charge_type":"02"},{"id":"9629","cname":"移动三元素验证","charge_type":"02"},{"id":"9631","cname":"电信三要素验证","charge_type":"02"},{"id":"9633","cname":"联通手机号码在网状态","charge_type":"02"},{"id":"9635","cname":"联通在网时长","charge_type":"02"},{"id":"9637","cname":"移动手机号码状态","charge_type":"02"},{"id":"9639","cname":"移动在网时长","charge_type":"02"},{"id":"9641","cname":"电信在网状态","charge_type":"02"},{"id":"9643","cname":"电信在网时长","charge_type":"02"},{"id":"9659","cname":"自然人学历查询","charge_type":"02"},{"id":"9667","cname":"联通黑名单用户查询","charge_type":"02"},{"id":"9673","cname":"联通呼叫转移","charge_type":"01"},{"id":"9675","cname":"联通入网时长比较","charge_type":"02"},{"id":"9677","cname":"联通最后一次活跃情况","charge_type":"02"},{"id":"9679","cname":"联通用户名下号码数量","charge_type":"02"},{"id":"9681","cname":"移动平均消费区间查询","charge_type":"02"},{"id":"9683","cname":"电信是否常用联系人","charge_type":"02"},{"id":"9685","cname":"银行卡二要素认证接口","charge_type":"02"},{"id":"9687","cname":"银行卡三要素认证接口","charge_type":"02"},{"id":"9689","cname":"银行卡三要素认证接口","charge_type":"02"},{"id":"9691","cname":"银行卡四要素认证接口","charge_type":"02"},{"id":"9693","cname":"银行卡四要素认证接口","charge_type":"02"},{"id":"9695","cname":"自然人司法信息精准查询","charge_type":"02"},{"id":"9697","cname":"企业司法风控报告","charge_type":"02"},{"id":"9699","cname":"企业司法信息精准查询","charge_type":"02"},{"id":"9701","cname":"自然人银行贷款逾期查询","charge_type":"02"},{"id":"9703","cname":"企业基本信息","charge_type":"02"},{"id":"9705","cname":"企业对外投资信息","charge_type":"02"},{"id":"9707","cname":"企业四要素信息比对","charge_type":"02"},{"id":"9709","cname":"企业综合信息","charge_type":"02"},{"id":"9713","cname":"企业域名查询","charge_type":"02"},{"id":"9715","cname":"组织机构代码查询","charge_type":"02"},{"id":"9717","cname":"全国企业专利查询","charge_type":"02"},{"id":"9719","cname":"全国专利查询","charge_type":"02"},{"id":"9721","cname":"软件著作查询","charge_type":"02"},{"id":"9723","cname":"企业对公账户认证","charge_type":"02"},{"id":"9725","cname":"企业固话认证","charge_type":"02"},{"id":"9733","cname":"自然人唯一识别码与姓名比对","charge_type":"02"},{"id":"9735","cname":"自然人唯一识别码与姓名比对实时","charge_type":"02"},{"id":"9767","cname":"北京社保","charge_type":"01"},{"id":"9775","cname":"港华燃气欠费查询","charge_type":"01"},{"id":"9777","cname":"徐州违章查询","charge_type":"01"},{"id":"9795","cname":"徐州司法","charge_type":"01"},{"id":"9803","cname":"自住房","charge_type":"01"},{"id":"9805","cname":"北京出入境非京籍港澳台持证办理","charge_type":"01"},{"id":"9807","cname":"北京出入境京籍港澳台持证办理","charge_type":"01"},{"id":"9809","cname":"国家博物馆","charge_type":"01"},{"id":"9811","cname":"空气质量预测","charge_type":"01"},{"id":"9813","cname":"能见度预测","charge_type":"01"},{"id":"9815","cname":"温度预测","charge_type":"01"},{"id":"9817","cname":"广州报废车辆查询","charge_type":"01"},{"id":"9903","cname":"工控安全信息查询","charge_type":"01"},{"id":"9927","cname":"通关状态查询","charge_type":"01"},{"id":"9929","cname":"电子手册状态查询","charge_type":"01"},{"id":"9931","cname":"进出口税查询","charge_type":"01"},{"id":"9933","cname":"新舱单信息查询","charge_type":"01"},{"id":"9937","cname":"外汇查询","charge_type":"01"}];
        //         load.stop();
        //         $("#apiService").empty();//清空下拉列表
        //         if(res.length>0 && res!=null){
        //         $.each(res,function (i,item) {
        //                 $("#apiService").append("<option value='"+item.id+"'>"+item.cname+"</option>");
        //             })
        //             //默认第一选项，api详情下拉列表默认第一项的列表
        //             service.serviceChange();
        //         }
        //     }
        // })

    },
    //apiservice onchange 事件
    serviceChange:function () {
        var id=$("#apiService option:selected").val();
        //alert(id);
    service.getApiInfoByServiceId(id);
    },
    //apiinfo onchange 事件
    infoChange:function () {
        var id=$("#apiInfo option:selected").val();
        var serviceid=$("#apiService option:selected").val();
        service.getApiInfoDetailById(id,serviceid);
    },
    //根据apiservice的id获取apiinfo列表
    getApiInfoByServiceId:function (id) {
        // $.ajax({
        //     type: "GET",
        //     url: "/info/"+id,
        //     contentType: "application/json",
        //     data: {},
        //     success: function (res) {
        //         res = [{"id":"1","name":"registInfo","cname":"1-执业注册信息查询","service_id":"1","request_method":"GET","test_packet":"\nGET请求示例：@uri@?certificateNo=S1XXXXXXX\n\n### 请求参数：\n|   名称 | 必填 |\t数据类型 | 说明 |\n|   :---: |   :---: |   :---: | :---:   |\n|\t`certificateNo` | 是 | String | 证书编号\n\n### 返回参数：\n|   名称 |  数据类型 | 说明 |\n|   :---: |  :---: | :---:   |\n|\t`name` | String | 姓名\n|   `gender`| String | 性别\n|   `photo`| String | 头像信息\n|   `institute`| String | 执业机构\n|   `certificateNo`| String | 证书编号\n|   `position`| String | 执业岗位\n|   `level`| String | 学历\n|   `issueDate`| String | 证书取得日期，格式 YYYY-MM-DD\n|   `expireDate`| String | 证书有效截止日期，格式 YYYY-MM-DD\n|   `items`| List | 注册变更记录列表\n|   `histCertificateNo`| String | 证书编号\n|   `histIssueDate`| String | 证书取得日期\n|   `histInstitute`| String | 执业机构\n|   `histPosition`| String | 执业岗位\n|   `status`| String | 证书状态\n\n### 返回示例：\n\t{\n\t\t\"errCode\": \"000000\", \n\t\t\"msg\": \"success\", \n\t\t\"data\": {\n\t\t\t\"name\": \"李四\", \n\t\t\t\"gender\": \"男\", \n\t\t\t\"photo\": \"http://apis.scity.cn/employment2/iw-imgs/800229318f813f16a920bb9ac5cceab7?iw-apikey=123\", \n\t\t\t\"institute\": \"XXXXX公司\", \n\t\t\t\"certificateNo\": \"S1XXXXXXX\", \n\t\t\t\"position\": \"一般证券业务\", \n\t\t\t\"level\": \"博士研究生\", \n\t\t\t\"issueDate\": \"2007-08-01\", \n\t\t\t\"expireDate\": \"2017-12-31\", \n\t\t\t\"items\": [\n\t\t\t\t{\n\t\t\t\t\t\"histCertificateNo\": \"S1XXXXXXX\", \n\t\t\t\t\t\"histIssueDate\": \"2004-02-17\", \n\t\t\t\t\t\"histInstitute\": \"中国XXXXXX公司\", \n\t\t\t\t\t\"histPosition\": \"一般证券业务\", \n\t\t\t\t\t\"status\": \"离职\"\n\t\t\t\t}, \n\t\t\t\t{\n\t\t\t\t\t\"histCertificateNo\": \"S1XXXXXXX\", \n\t\t\t\t\t\"histIssueDate\": \"2007-08-01\", \n\t\t\t\t\t\"histInstitute\": \"XXXXXX公司\", \n\t\t\t\t\t\"histPosition\": \"一般证券业务\", \n\t\t\t\t\t\"status\": \"正常\"\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t}\n","isAuth":null,"encode_uri":"/security/registInfo","apiUri":null}];
        //         $("#apiInfo").empty();//清空下拉列表
        //         if(res.length>0 && res!=null){
        //             $.each(res,function (i,item) {
        //                 $("#apiInfo").append("<option value='"+item.id+"'>"+item.cname+"</option>");
        //             })
        //         }
        //         //默认第一选项，默认右侧内容
        //         var id=$("#apiInfo option:selected").val();
        //        // var serviceid=$("#apiService option:selected").val();
        //        //  service.getApiInfoDetailById(id,serviceid);
        //         service.getApiInfoDetailById(id);
        //     }
        // })
        var res = [{"id":"1","name":"registInfo","cname":"1-执业注册信息查询","service_id":"1","request_method":"GET","test_packet":"\nGET请求示例：@uri@?certificateNo=S1XXXXXXX\n\n### 请求参数：\n|   名称 | 必填 |\t数据类型 | 说明 |\n|   :---: |   :---: |   :---: | :---:   |\n|\t`certificateNo` | 是 | String | 证书编号\n\n### 返回参数：\n|   名称 |  数据类型 | 说明 |\n|   :---: |  :---: | :---:   |\n|\t`name` | String | 姓名\n|   `gender`| String | 性别\n|   `photo`| String | 头像信息\n|   `institute`| String | 执业机构\n|   `certificateNo`| String | 证书编号\n|   `position`| String | 执业岗位\n|   `level`| String | 学历\n|   `issueDate`| String | 证书取得日期，格式 YYYY-MM-DD\n|   `expireDate`| String | 证书有效截止日期，格式 YYYY-MM-DD\n|   `items`| List | 注册变更记录列表\n|   `histCertificateNo`| String | 证书编号\n|   `histIssueDate`| String | 证书取得日期\n|   `histInstitute`| String | 执业机构\n|   `histPosition`| String | 执业岗位\n|   `status`| String | 证书状态\n\n### 返回示例：\n\t{\n\t\t\"errCode\": \"000000\", \n\t\t\"msg\": \"success\", \n\t\t\"data\": {\n\t\t\t\"name\": \"李四\", \n\t\t\t\"gender\": \"男\", \n\t\t\t\"photo\": \"http://apis.scity.cn/employment2/iw-imgs/800229318f813f16a920bb9ac5cceab7?iw-apikey=123\", \n\t\t\t\"institute\": \"XXXXX公司\", \n\t\t\t\"certificateNo\": \"S1XXXXXXX\", \n\t\t\t\"position\": \"一般证券业务\", \n\t\t\t\"level\": \"博士研究生\", \n\t\t\t\"issueDate\": \"2007-08-01\", \n\t\t\t\"expireDate\": \"2017-12-31\", \n\t\t\t\"items\": [\n\t\t\t\t{\n\t\t\t\t\t\"histCertificateNo\": \"S1XXXXXXX\", \n\t\t\t\t\t\"histIssueDate\": \"2004-02-17\", \n\t\t\t\t\t\"histInstitute\": \"中国XXXXXX公司\", \n\t\t\t\t\t\"histPosition\": \"一般证券业务\", \n\t\t\t\t\t\"status\": \"离职\"\n\t\t\t\t}, \n\t\t\t\t{\n\t\t\t\t\t\"histCertificateNo\": \"S1XXXXXXX\", \n\t\t\t\t\t\"histIssueDate\": \"2007-08-01\", \n\t\t\t\t\t\"histInstitute\": \"XXXXXX公司\", \n\t\t\t\t\t\"histPosition\": \"一般证券业务\", \n\t\t\t\t\t\"status\": \"正常\"\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t}\n","isAuth":null,"encode_uri":"/security/registInfo","apiUri":null}];
        $("#apiInfo").empty();//清空下拉列表
        if(res.length>0 && res!=null){
            $.each(res,function (i,item) {
                $("#apiInfo").append("<option value='"+item.id+"'>"+item.cname+"</option>");
            })
        }
        //默认第一选项，默认右侧内容
        var id=$("#apiInfo option:selected").val();
       // var serviceid=$("#apiService option:selected").val();
       //  service.getApiInfoDetailById(id,serviceid);
        service.getApiInfoDetailById(id);
    },
    //根据info id获取api info 详情
    getApiInfoDetailById:function (id) {
        var res = {"id":"1","name":"registInfo","cname":"1-执业注册信息查询","service_id":"1","request_method":"GET","test_packet":"\nGET请求示例：@uri@?certificateNo=S1XXXXXXX\n\n### 请求参数：\n|   名称 | 必填 |\t数据类型 | 说明 |\n|   :---: |   :---: |   :---: | :---:   |\n|\t`certificateNo` | 是 | String | 证书编号\n\n### 返回参数：\n|   名称 |  数据类型 | 说明 |\n|   :---: |  :---: | :---:   |\n|\t`name` | String | 姓名\n|   `gender`| String | 性别\n|   `photo`| String | 头像信息\n|   `institute`| String | 执业机构\n|   `certificateNo`| String | 证书编号\n|   `position`| String | 执业岗位\n|   `level`| String | 学历\n|   `issueDate`| String | 证书取得日期，格式 YYYY-MM-DD\n|   `expireDate`| String | 证书有效截止日期，格式 YYYY-MM-DD\n|   `items`| List | 注册变更记录列表\n|   `histCertificateNo`| String | 证书编号\n|   `histIssueDate`| String | 证书取得日期\n|   `histInstitute`| String | 执业机构\n|   `histPosition`| String | 执业岗位\n|   `status`| String | 证书状态\n\n### 返回示例：\n\t{\n\t\t\"errCode\": \"000000\", \n\t\t\"msg\": \"success\", \n\t\t\"data\": {\n\t\t\t\"name\": \"李四\", \n\t\t\t\"gender\": \"男\", \n\t\t\t\"photo\": \"http://apis.scity.cn/employment2/iw-imgs/800229318f813f16a920bb9ac5cceab7?iw-apikey=123\", \n\t\t\t\"institute\": \"XXXXX公司\", \n\t\t\t\"certificateNo\": \"S1XXXXXXX\", \n\t\t\t\"position\": \"一般证券业务\", \n\t\t\t\"level\": \"博士研究生\", \n\t\t\t\"issueDate\": \"2007-08-01\", \n\t\t\t\"expireDate\": \"2017-12-31\", \n\t\t\t\"items\": [\n\t\t\t\t{\n\t\t\t\t\t\"histCertificateNo\": \"S1XXXXXXX\", \n\t\t\t\t\t\"histIssueDate\": \"2004-02-17\", \n\t\t\t\t\t\"histInstitute\": \"中国XXXXXX公司\", \n\t\t\t\t\t\"histPosition\": \"一般证券业务\", \n\t\t\t\t\t\"status\": \"离职\"\n\t\t\t\t}, \n\t\t\t\t{\n\t\t\t\t\t\"histCertificateNo\": \"S1XXXXXXX\", \n\t\t\t\t\t\"histIssueDate\": \"2007-08-01\", \n\t\t\t\t\t\"histInstitute\": \"XXXXXX公司\", \n\t\t\t\t\t\"histPosition\": \"一般证券业务\", \n\t\t\t\t\t\"status\": \"正常\"\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t}\n","isAuth":null,"encode_uri":"/security/registInfo","apiUri":"http://qg-api.citysdk.cn/security/registInfo"};
        if(res.test_packet!= null){
            var converter = new showdown.Converter();
            converter.setOption("tables",true);
            var html = converter.makeHtml(res.test_packet);
            $("#right").html(html);
            //默认地址到接口地址输入栏
           // var url= $("#right").children("p").eq(0).html();
           //  url=url.replace("接口地址：","");
        }
        $("#reqMethod").html("<option value="+res.request_method+">"+res.request_method+"</option>")
        if ("GET"==res.request_method){
            $("#tableInput").show();
            $("#textInput").hide();
        }
        if ("POST"==res.request_method){
            $("#tableInput").hide();
            $("#textInput").show();
        }
        $("#reqUrl").val(res.apiUri);
        // $.ajax({
        //     type: "GET",
        //     url:"/infoDetail/" + id,
        //     contentType: "application/json",
        //     data: {},
        //     success: function (res) {
        //         res = {"id":"1","name":"registInfo","cname":"1-执业注册信息查询","service_id":"1","request_method":"GET","test_packet":"\nGET请求示例：@uri@?certificateNo=S1XXXXXXX\n\n### 请求参数：\n|   名称 | 必填 |\t数据类型 | 说明 |\n|   :---: |   :---: |   :---: | :---:   |\n|\t`certificateNo` | 是 | String | 证书编号\n\n### 返回参数：\n|   名称 |  数据类型 | 说明 |\n|   :---: |  :---: | :---:   |\n|\t`name` | String | 姓名\n|   `gender`| String | 性别\n|   `photo`| String | 头像信息\n|   `institute`| String | 执业机构\n|   `certificateNo`| String | 证书编号\n|   `position`| String | 执业岗位\n|   `level`| String | 学历\n|   `issueDate`| String | 证书取得日期，格式 YYYY-MM-DD\n|   `expireDate`| String | 证书有效截止日期，格式 YYYY-MM-DD\n|   `items`| List | 注册变更记录列表\n|   `histCertificateNo`| String | 证书编号\n|   `histIssueDate`| String | 证书取得日期\n|   `histInstitute`| String | 执业机构\n|   `histPosition`| String | 执业岗位\n|   `status`| String | 证书状态\n\n### 返回示例：\n\t{\n\t\t\"errCode\": \"000000\", \n\t\t\"msg\": \"success\", \n\t\t\"data\": {\n\t\t\t\"name\": \"李四\", \n\t\t\t\"gender\": \"男\", \n\t\t\t\"photo\": \"http://apis.scity.cn/employment2/iw-imgs/800229318f813f16a920bb9ac5cceab7?iw-apikey=123\", \n\t\t\t\"institute\": \"XXXXX公司\", \n\t\t\t\"certificateNo\": \"S1XXXXXXX\", \n\t\t\t\"position\": \"一般证券业务\", \n\t\t\t\"level\": \"博士研究生\", \n\t\t\t\"issueDate\": \"2007-08-01\", \n\t\t\t\"expireDate\": \"2017-12-31\", \n\t\t\t\"items\": [\n\t\t\t\t{\n\t\t\t\t\t\"histCertificateNo\": \"S1XXXXXXX\", \n\t\t\t\t\t\"histIssueDate\": \"2004-02-17\", \n\t\t\t\t\t\"histInstitute\": \"中国XXXXXX公司\", \n\t\t\t\t\t\"histPosition\": \"一般证券业务\", \n\t\t\t\t\t\"status\": \"离职\"\n\t\t\t\t}, \n\t\t\t\t{\n\t\t\t\t\t\"histCertificateNo\": \"S1XXXXXXX\", \n\t\t\t\t\t\"histIssueDate\": \"2007-08-01\", \n\t\t\t\t\t\"histInstitute\": \"XXXXXX公司\", \n\t\t\t\t\t\"histPosition\": \"一般证券业务\", \n\t\t\t\t\t\"status\": \"正常\"\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t}\n","isAuth":null,"encode_uri":"/security/registInfo","apiUri":"http://qg-api.citysdk.cn/security/registInfo"};
        //         if(res.test_packet!= null){
        //             var converter = new showdown.Converter();
        //             converter.setOption("tables",true);
        //             var html = converter.makeHtml(res.test_packet);
        //             $("#right").html(html);
        //             //默认地址到接口地址输入栏
        //            // var url= $("#right").children("p").eq(0).html();
        //            //  url=url.replace("接口地址：","");
        //         }
        //         $("#reqMethod").html("<option value="+res.request_method+">"+res.request_method+"</option>")
        //         if ("GET"==res.request_method){
        //             $("#tableInput").show();
        //             $("#textInput").hide();
        //         }
        //         if ("POST"==res.request_method){
        //             $("#tableInput").hide();
        //             $("#textInput").show();
        //         }
        //         $("#reqUrl").val(res.apiUri);
        //     }
        // })
    }

}

var service=new test();