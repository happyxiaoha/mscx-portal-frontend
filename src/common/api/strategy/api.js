import Axios from '../http'
import _ from 'lodash'

var baseUrl = location.protocol + '//' + location.host + '/ro/mscx-api-api/'

var apiAPI = {
  // 首页-导航栏-api
  getNavigationApi: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'service/getNavigationApi.do'
    // })
    return Promise.resolve({"code":"000000","message":"success","result":[{"navigationOrder":1,"apiServiceList":[{"apiServiceName":"法院裁判文书查询","apiServiceId":138}],"id":17,"iconUrl":null,"categoryName":"城市管理","categoryId":110,"apiType":"2"},{"navigationOrder":3,"apiServiceList":[{"apiServiceName":"国际证书查询","apiServiceId":7},{"apiServiceName":"CETTIC证书查询","apiServiceId":6},{"apiServiceName":"国家职业资格证书查询","apiServiceId":4},{"apiServiceName":"证券从业人员执业注册查询","apiServiceId":1},{"apiServiceName":"基金从业人员资格信息查询","apiServiceId":3}],"id":3,"iconUrl":null,"categoryName":"工作就业","categoryId":103,"apiType":"2"},{"navigationOrder":4,"apiServiceList":[{"apiServiceName":"空气质量","apiServiceId":83},{"apiServiceName":"全国邮编查询","apiServiceId":85}],"id":173,"iconUrl":null,"categoryName":"生活常用","categoryId":118,"apiType":"3"},{"navigationOrder":5,"apiServiceList":[{"apiServiceName":"图片验证码生成","apiServiceId":66}],"id":185,"iconUrl":null,"categoryName":"图像识别","categoryId":113,"apiType":"3"},{"navigationOrder":6,"apiServiceList":[],"id":13,"iconUrl":null,"categoryName":"文化体育","categoryId":108,"apiType":"2"},{"navigationOrder":84,"apiServiceList":[{"apiServiceName":"上海社保查询","apiServiceId":22},{"apiServiceName":"无锡公积金查询","apiServiceId":23},{"apiServiceName":"苏州社保查询","apiServiceId":24},{"apiServiceName":"济南公积金查询","apiServiceId":26},{"apiServiceName":"青岛公积金查询","apiServiceId":27},{"apiServiceName":"徐州社保查询","apiServiceId":33},{"apiServiceName":"北京公积金查询","apiServiceId":19}],"id":5,"iconUrl":null,"categoryName":"社会保障","categoryId":104,"apiType":"2"},{"navigationOrder":85,"apiServiceList":[{"apiServiceName":"北京机动车摇号查询","apiServiceId":41},{"apiServiceName":"北京车辆限行查询","apiServiceId":43}],"id":9,"iconUrl":null,"categoryName":"交通出行","categoryId":106,"apiType":"2"},{"navigationOrder":86,"apiServiceList":[],"id":189,"iconUrl":null,"categoryName":"旅游","categoryId":107,"apiType":"2"},{"navigationOrder":87,"apiServiceList":[{"apiServiceName":"自然人学历查询","apiServiceId":9659},{"apiServiceName":"学历信息","apiServiceId":9549}],"id":1,"iconUrl":null,"categoryName":"教育","categoryId":102,"apiType":"2"}],"status":"OK"})
  },
  // 首页-精选API
  getSelectedApi: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'service/getSelectedApi.do',
    // })
    return Promise.resolve({"code":"000000","message":"success","result":[{"updatedTime":null,"chargeType":"01","description":"提供全国范围内的上市公司信息查询","chargeTypeDesc":"免费","apiServiceId":54,"accessCnt":0,"attentionCnt":1,"applyCnt":9,"score":5.0,"background":"","viewCnt":156,"iconUrl":"./static/37cef5f06f51417b89afd970b539c2c7.jpg","apiServiceCName":"上市公司信息查询","providerName":"智慧神州"},{"updatedTime":null,"chargeType":"01","description":"提供全国范围内的商标信息查询。","chargeTypeDesc":"免费","apiServiceId":44,"accessCnt":0,"attentionCnt":0,"applyCnt":3,"score":5.0,"background":"","viewCnt":68,"iconUrl":"./static/03476052421f4791bdfca75789776fc1.jpg","apiServiceCName":"商标信息查询","providerName":"智慧神州"},{"updatedTime":null,"chargeType":"01","description":"提供全国范围内的上市公司业绩报告查询","chargeTypeDesc":"免费","apiServiceId":55,"accessCnt":0,"attentionCnt":2,"applyCnt":5,"score":5.0,"background":"","viewCnt":85,"iconUrl":"./static/c5018c2e66ba47eea4a8877a58a176e8.jpg","apiServiceCName":"上市公司业绩报告查询","providerName":"智慧神州"},{"updatedTime":null,"chargeType":"01","description":"提供全国范围内的注册国外职业资格证书证书查询。","chargeTypeDesc":"免费","apiServiceId":7,"accessCnt":0,"attentionCnt":0,"applyCnt":4,"score":5.0,"background":"","viewCnt":71,"iconUrl":"./static/9fb27288f6cd4746826d9c3ec6510cc8.jpg","apiServiceCName":"国际证书查询","providerName":"智慧神州"},{"updatedTime":null,"chargeType":"01","description":"提供全国范围内的基金从业人员资格信息查询。","chargeTypeDesc":"免费","apiServiceId":3,"accessCnt":0,"attentionCnt":2,"applyCnt":4,"score":4.0,"background":"","viewCnt":76,"iconUrl":"./static/b648d7f3dab64356a0429e7dd11981fd.jpg","apiServiceCName":"基金从业人员资格信息查询","providerName":"智慧神州"},{"updatedTime":null,"chargeType":"02","description":"提供发送短信服务","chargeTypeDesc":"收费","apiServiceId":505,"accessCnt":0,"attentionCnt":0,"applyCnt":1,"score":5.0,"background":"","viewCnt":66,"iconUrl":"./static/a010e4ebcb9e4893a5219bcf17ff549a.jpg","apiServiceCName":"短信服务","providerName":"智慧神州"},{"updatedTime":null,"chargeType":"02","description":"企业司法信息精准查询","chargeTypeDesc":"收费","apiServiceId":9699,"accessCnt":0,"attentionCnt":0,"applyCnt":0,"score":5.0,"background":"","viewCnt":5,"iconUrl":"./static/5949d93e053c4ecca4c99c881c84f57e.jpg","apiServiceCName":"企业司法信息精准查询","providerName":"点滴信"},{"updatedTime":null,"chargeType":"02","description":"传入姓名，身份证号码以及，手机号，验证是否一致","chargeTypeDesc":"收费","apiServiceId":9571,"accessCnt":0,"attentionCnt":1,"applyCnt":8,"score":5.0,"background":"","viewCnt":103,"iconUrl":"./static/e5f812e73a0c43b9bba592a5a195d31e.jpg","apiServiceCName":"个人三元素认证","providerName":"智慧神州"}],"status":"OK"})
  },
  // 首页-saas营销信息
  getMarketingTheme: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'getMarketingTheme.do'
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"browseUrl":null,"imageUrl":"./static/b6c43f2dd3ce4d89bce31ae4554aa58b.jpg","showRuleType":"1","apiType":"2","categoryId":106,"tags":""},"status":"OK"})
  },
  // 获取数据API列表
  getDataApi: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'service/queryDataApi.do',
    //   params: _.pick(options, ['orderBy', 'keyword', 'chargeType', 'serviceObject', 'scope', 'categoryId', 'tagId', 'page', 'pageSize'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"page":{"startIndex":0,"endIndex":15,"totalPage":8,"currentPage":1,"totalSize":113,"url":"/service/queryDataApi.do"},"list":[{"typeDesc":"数据API","viewCnt":76,"chargeType":"01","apiServiceName":"基金从业人员资格信息查询","description":"提供全国范围内的基金从业人员资格信息查询。","chargeTypeDesc":"免费","apiServiceId":3,"iconUrl":"./static/b648d7f3dab64356a0429e7dd11981fd.jpg","accessCnt":0,"type":"2","applyCnt":4,"status":"0"},{"typeDesc":"数据API","viewCnt":65,"chargeType":"01","apiServiceName":"一级注册建造师查询","description":"提供全国范围内的一级注册建造师查询.","chargeTypeDesc":"免费","apiServiceId":8,"iconUrl":"./static/64a2cfe5b3d17c72bb837280c5685e31.jpg","accessCnt":0,"type":"2","applyCnt":4,"status":"0"},{"typeDesc":"数据API","viewCnt":71,"chargeType":"01","apiServiceName":"CETTIC证书查询","description":"提供全国范围内的CETTIC职业培训证书查询。","chargeTypeDesc":"免费","apiServiceId":6,"iconUrl":"./static/ef01ecf8faf7ddd4df61fb2cca908f03.jpg","accessCnt":0,"type":"2","applyCnt":3,"status":"0"},{"typeDesc":"数据API","viewCnt":76,"chargeType":"01","apiServiceName":"二级注册建造师查询","description":"提供全国范围内的二级注册建造师查询。","chargeTypeDesc":"免费","apiServiceId":9,"iconUrl":"./static/64a2cfe5b3d17c72bb837280c5685e31.jpg","accessCnt":0,"type":"2","applyCnt":5,"status":"0"},{"typeDesc":"数据API","viewCnt":353,"chargeType":"01","apiServiceName":"证券从业人员执业注册查询","description":"提供全国范围内的证券从业人员执业注册信息查询。","chargeTypeDesc":"免费","apiServiceId":1,"iconUrl":"./static/8ce1344a8b29701e5c55f052d8e89ba5.jpg","accessCnt":0,"type":"2","applyCnt":14,"status":"0"},{"typeDesc":"数据API","viewCnt":244,"chargeType":"01","apiServiceName":"银行专业人员资质信息查询","description":"提供全国范围内的银行专业人员资质信息查询。","chargeTypeDesc":"免费","apiServiceId":2,"iconUrl":"./static/0d8a934c4a5b478dc7b2b95f7a623fa0.jpg","accessCnt":0,"type":"2","applyCnt":6,"status":"0"},{"typeDesc":"数据API","viewCnt":71,"chargeType":"01","apiServiceName":"国际证书查询","description":"提供全国范围内的注册国外职业资格证书证书查询。","chargeTypeDesc":"免费","apiServiceId":7,"iconUrl":"./static/9fb27288f6cd4746826d9c3ec6510cc8.jpg","accessCnt":0,"type":"2","applyCnt":4,"status":"0"},{"chargeCount":1,"typeDesc":"数据API","chargeType":"05","apiServiceName":"学历信息","description":"提供全国地区学历信息查询","chargeTypeDesc":"收费","apiServiceId":9549,"accessCnt":0,"type":"2","applyCnt":21,"viewCnt":208,"price":1.00,"iconUrl":"./static/2146c04594aa403888ab04df9367c500.jpg","status":"0"},{"typeDesc":"数据API","viewCnt":18,"chargeType":"01","apiServiceName":"一级临时建造师证书查询","description":"提供全国范围内的一级建造师临时执业证书人员查询。","chargeTypeDesc":"免费","apiServiceId":10,"iconUrl":"./static/64a2cfe5b3d17c72bb837280c5685e31.jpg","accessCnt":0,"type":"2","applyCnt":3,"status":"0"},{"typeDesc":"数据API","viewCnt":92,"chargeType":"01","apiServiceName":"国家职业资格证书查询","description":"提供全国范围内的人社部颁发国家职业资格证书查询。","chargeTypeDesc":"免费","apiServiceId":4,"iconUrl":"http://news.citysdk.cn/uploads/8/image/public/portal/gjzy.png","accessCnt":0,"type":"2","applyCnt":8,"status":"0"},{"typeDesc":"数据API","viewCnt":20,"chargeType":"01","apiServiceName":"一级临时建造师继续教育查询","description":"提供全国范围内的一级建造师临时执业证书继续教育查询。","chargeTypeDesc":"免费","apiServiceId":11,"iconUrl":"./static/64a2cfe5b3d17c72bb837280c5685e31.jpg","accessCnt":0,"type":"2","applyCnt":2,"status":"0"},{"typeDesc":"数据API","viewCnt":28,"chargeType":"01","apiServiceName":"二级临时建造师证书查询","description":"提供全国范围内的二级建造师临时执业证书人员查询。","chargeTypeDesc":"免费","apiServiceId":12,"iconUrl":"./static/64a2cfe5b3d17c72bb837280c5685e31.jpg","accessCnt":0,"type":"2","applyCnt":0,"status":"0"},{"typeDesc":"数据API","viewCnt":17,"chargeType":"01","apiServiceName":"注册会计师查询","description":"提供全国范围内的注册会计师人员信息查询。","chargeTypeDesc":"免费","apiServiceId":13,"iconUrl":"./static/6a499f81eb25775dbd4a42320cbded34.jpg","accessCnt":0,"type":"2","applyCnt":3,"status":"0"},{"typeDesc":"数据API","viewCnt":34,"chargeType":"01","apiServiceName":"出入境预审","description":"提供北京市范围内的普通护照、港澳签注预审服务。","chargeTypeDesc":"免费","apiServiceId":18,"iconUrl":"./static/9736d66e0762ab98ce12ffb470ab78ef.jpg","accessCnt":0,"type":"2","applyCnt":5,"status":"0"},{"typeDesc":"数据API","viewCnt":129,"chargeType":"01","apiServiceName":"北京公积金查询","description":"提供北京市范围内的公积金查询功能。","chargeTypeDesc":"免费","apiServiceId":19,"iconUrl":"./static/5ec5195d8298f7a67a1f54c87044f306.jpg","accessCnt":0,"type":"2","applyCnt":6,"status":"0"}]},"status":"OK"})
  },
  // 获取工具API列表
  getToolApi: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'service/queryToolApi.do',
    //   params: _.pick(options, ['orderBy', 'keyword', 'chargeType', 'serviceObject', 'scope', 'categoryId', 'tagId', 'page', 'pageSize'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"page":{"startIndex":0,"endIndex":15,"totalPage":7,"currentPage":1,"totalSize":93,"url":"/service/queryToolApi.do"},"list":[{"typeDesc":"工具API","viewCnt":108,"chargeType":"01","apiServiceName":"数据可视化","description":"数据可视化API致力于帮助业务人员查看并理解数据，根据提供图标获取数据分析结果。","chargeTypeDesc":"免费","apiServiceId":9581,"iconUrl":"./static/4653d8efb656426a9127cbe6d0d3eb8a.jpg","accessCnt":0,"type":"3","applyCnt":4,"status":"0"},{"typeDesc":"工具API","viewCnt":22,"chargeType":"02","apiServiceName":"航运运价指数","description":"提供航运运价指数信息","chargeTypeDesc":"收费","apiServiceId":9551,"iconUrl":"./static/c712772232f9498bab4679d507de2ba9.jpg","accessCnt":0,"type":"3","applyCnt":3,"status":"0"},{"chargeCount":1,"typeDesc":"工具API","chargeType":"05","apiServiceName":"个人三元素认证","description":"传入姓名，身份证号码以及，手机号，验证是否一致","chargeTypeDesc":"收费","apiServiceId":9571,"accessCnt":0,"type":"3","applyCnt":8,"viewCnt":103,"price":0.60,"iconUrl":"./static/e5f812e73a0c43b9bba592a5a195d31e.jpg","status":"0"},{"typeDesc":"工具API","viewCnt":318,"chargeType":"01","apiServiceName":"手机充值","description":"手机话费充值API接口","chargeTypeDesc":"免费","apiServiceId":9569,"iconUrl":"./static/9e7d129cf112483d8e293689ac21b4cd.jpg","accessCnt":0,"type":"3","applyCnt":14,"status":"0"},{"typeDesc":"工具API","viewCnt":25,"chargeType":"01","apiServiceName":"keywords关键词","description":"keywords，关键词提取，关键字","chargeTypeDesc":"免费","apiServiceId":59,"iconUrl":"./static/b3dc704496a91fc27132e1c13c94bf12.jpg","accessCnt":0,"type":"3","applyCnt":3,"status":"0"},{"typeDesc":"工具API","viewCnt":20,"chargeType":"01","apiServiceName":"MD5解密","description":"输入md5串，接口返回加密的源串。","chargeTypeDesc":"免费","apiServiceId":60,"iconUrl":"./static/707cb3a11ef32446469538425430f7df.jpg","accessCnt":17,"type":"3","applyCnt":3,"status":"0"},{"typeDesc":"工具API","viewCnt":16,"chargeType":"01","apiServiceName":"validate有效性校验","description":"校验表单字段值的有效性，支持校验类型有手机号、邮箱、中文、身份证、营业执照号码、组织机构代码、税务登记号、车牌号、银行卡号等。","chargeTypeDesc":"免费","apiServiceId":61,"iconUrl":"./static/0f7cdd7b508d295582897bd91ac8664b.jpg","accessCnt":0,"type":"3","applyCnt":2,"status":"0"},{"typeDesc":"工具API","viewCnt":15,"chargeType":"01","apiServiceName":"百度权重查询","description":"百度权重查询，包括权重及百度收录量数据。","chargeTypeDesc":"免费","apiServiceId":62,"iconUrl":"./static/9e3f1b0ce0575467b46825849be7c6de.jpg","accessCnt":0,"type":"3","applyCnt":2,"status":"0"},{"typeDesc":"工具API","viewCnt":16,"chargeType":"01","apiServiceName":"定制图表","description":"本api旨在为不太了解前端js或者不想写前端js的开发人员提供一个简单易用的参数定制图表，支持常规的线图、饼图、柱图、面积图以及特有的文字云图。开发者使用仅需像其他api一样传参即可取到一个html的iframe代码片段，将该片段插入要展现图表的页面即可。","chargeTypeDesc":"免费","apiServiceId":63,"iconUrl":"./static/baa59edd0c30148f49d2a79d031d9747.jpg","accessCnt":0,"type":"3","applyCnt":1,"status":"0"},{"typeDesc":"工具API","viewCnt":13,"chargeType":"01","apiServiceName":"二维码生成和识别","description":"二维码的处理(因第三方提供的二维码服务不稳定,故官方提供一个版本供大家使用),包括二维码生成和识别接口","chargeTypeDesc":"免费","apiServiceId":64,"iconUrl":"./static/789b27786e8d80f19ebafa9076062c09.jpg","accessCnt":0,"type":"3","applyCnt":2,"status":"0"},{"typeDesc":"工具API","viewCnt":13,"chargeType":"01","apiServiceName":"文本相似度检测","description":"通过计算向量间的夹角（余弦公式），来判断文本相似度。","chargeTypeDesc":"免费","apiServiceId":65,"iconUrl":"./static/f9cdc30cda5253c57e5000742038b5df.jpg","accessCnt":0,"type":"3","applyCnt":1,"status":"0"},{"typeDesc":"工具API","viewCnt":11,"chargeType":"01","apiServiceName":"图片验证码生成","description":"图片验证码生成，支持自定义高宽，文字颜色、字体，边框颜色，底色，验证码字数，验证码字符范围等。 默认字符范围使用数字+字母+2500个中文汉字。","chargeTypeDesc":"免费","apiServiceId":66,"iconUrl":"./static/16a88629d20b5aeeef06d66d672b7871.jpg","accessCnt":0,"type":"3","applyCnt":1,"status":"0"},{"typeDesc":"工具API","viewCnt":12,"chargeType":"01","apiServiceName":"新闻、网页正文抽取","description":"新闻、网页正文抽取","chargeTypeDesc":"免费","apiServiceId":67,"iconUrl":"./static/6ef357dd5c4ecbcec3e0f8ca9f6f38ef.jpg","accessCnt":0,"type":"3","applyCnt":1,"status":"0"},{"typeDesc":"工具API","viewCnt":20,"chargeType":"01","apiServiceName":"POI搜索","description":"Place API 是一类简单的HTTP接口，用于返回查询某个区域的某类POI数据，且提供单个POI的详情查询服务，用户可以使用C#、C++、Java等开发语言发送HTTP请求且接收json、xml的数据。","chargeTypeDesc":"免费","apiServiceId":68,"iconUrl":"./static/3800006514cbabace4baf08d6cf597a7.jpg","accessCnt":0,"type":"3","applyCnt":1,"status":"0"},{"typeDesc":"工具API","viewCnt":11,"chargeType":"01","apiServiceName":"IP定位","description":"IP定位 API是一个根据IP返回对应位置信息的http形式位置服务接口,支持多种语言调用，如C# 、C++、Java等，即通过发送http请求，返回json格式的位置数据（包括坐标值、省份、城市、百度城市代码等）。","chargeTypeDesc":"免费","apiServiceId":70,"iconUrl":"./static/a0b17b62d5e315308b119964ad7ce4e5.jpg","accessCnt":0,"type":"3","applyCnt":1,"status":"0"}]},"status":"OK"})
  },
  // 获取模型API列表
  getModelApi: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'service/queryModelApi.do',
    //   params: _.pick(options, ['orderBy', 'keyword', 'chargeType', 'serviceObject', 'scope', 'categoryId', 'tagId', 'page', 'pageSize'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"page":{"startIndex":0,"endIndex":14,"totalPage":1,"currentPage":1,"totalSize":14,"url":"/service/queryModelApi.do"},"list":[{"typeDesc":"模型API","viewCnt":9,"chargeType":"01","apiServiceName":"关键词提取","description":"关键词提取从一篇或多篇文本中提取出有代表性的关键词。关键词提取技术综合考虑词语在文本中的频率，和词语在千万级背景数据中的频率，选择出最具有代表性的关键词并给出相应权重。","chargeTypeDesc":"免费","apiServiceId":369,"iconUrl":"./static/f1846c1b8f6bb6c1aa9bbaf27530ea8c.jpg","accessCnt":0,"type":"4","applyCnt":1,"status":"0"},{"typeDesc":"模型API","viewCnt":10,"chargeType":"01","apiServiceName":"命名实体识别","description":"命名实体识别（NER）是指识别文本中具有特定意义的实体，主要包括人名、地名、机构名、专有名词等。","chargeTypeDesc":"免费","apiServiceId":367,"iconUrl":"./static/4baaf726c1cbdf3183a1b57254a5581d.jpg","accessCnt":0,"type":"4","applyCnt":1,"status":"0"},{"typeDesc":"模型API","viewCnt":7,"chargeType":"01","apiServiceName":"新闻分类","description":"文本信息分类将文本按照预设的分类体系进行自动区分。","chargeTypeDesc":"免费","apiServiceId":370,"iconUrl":"./static/7f1c2f98f6b53cbf98f7b8d1530ee21f.jpg","accessCnt":0,"type":"4","applyCnt":1,"status":"0"},{"typeDesc":"模型API","viewCnt":45,"chargeType":"01","apiServiceName":"情感分析","description":"情感分析指的是对文本中情感的倾向性和评价对象进行提取的过程。正负面情感分析准确度达到80%~85% 。经过行业数据标注学习后准确率可达85%~90%。","chargeTypeDesc":"免费","apiServiceId":366,"iconUrl":"./static/a7c7ab3feac7b94e95833a4472ba800b.jpg","accessCnt":0,"type":"4","applyCnt":2,"status":"0"},{"typeDesc":"模型API","viewCnt":8,"chargeType":"01","apiServiceName":"依存文法分析","description":"依存文法分析核心思想为将一个线性描写的句子表述为成员之间的搭配与驱动关系。","chargeTypeDesc":"免费","apiServiceId":368,"iconUrl":"./static/ac52c35a91b8932809e4c5409a38dda9.jpg","accessCnt":0,"type":"4","applyCnt":1,"status":"0"},{"typeDesc":"模型API","viewCnt":8,"chargeType":"01","apiServiceName":"语义联想","description":"该接口返回与输入词语最相近的top_k 个词，最大值可设定为100 。","chargeTypeDesc":"免费","apiServiceId":371,"iconUrl":"./static/9878cd64543a23e05045ad066e911f25.jpg","accessCnt":0,"type":"4","applyCnt":1,"status":"0"},{"typeDesc":"模型API","viewCnt":5,"chargeType":"01","apiServiceName":"分词与词性标注","description":"词性用来描述一个词在上下文中的作用，而词性标注就是识别这些词的词性，以确定其在上下文中的作用。模型采用将分词和词性标注联合枚举的方法，基于序列标注实现的，实现了这一套分词和词性标注系统。","chargeTypeDesc":"免费","apiServiceId":372,"iconUrl":"./static/eac3ef3d08cbb4adcb0691e143e2046f.jpg","accessCnt":0,"type":"4","applyCnt":1,"status":"0"},{"chargeCount":1,"typeDesc":"模型API","chargeType":"05","apiServiceName":"手机号反欺诈","description":"首次发现时间、最近一次发现时间、类型、是否查询到","chargeTypeDesc":"收费","apiServiceId":379,"accessCnt":0,"type":"4","applyCnt":1,"viewCnt":10,"price":1.00,"iconUrl":"./static/7a58b0d19e56fb1546c8d5a962edd66b.jpg","status":"0"},{"chargeCount":1,"typeDesc":"模型API","chargeType":"05","apiServiceName":"消费能力核查","description":"手机余额、入网时间、欠费标识、用户鉴权状态、鉴权日期、品牌代码、运营商、在网时长、（手机号、银行号、卡号、卡类型、月份、稳定入账金额、其他入账金额、pos出账金额、其他出账金额、工作状态、是否按时还款还贷、剩余应还）、收入估算、累计收入估算、稳定收入估算、累计稳定收入估算、其他收入估算、累计其他收入估算、支出估算、累计支出估算、消费类支出、累计消费类支出、其他类支出、累计其他类支出","chargeTypeDesc":"收费","apiServiceId":384,"accessCnt":0,"type":"4","applyCnt":0,"viewCnt":11,"price":1.00,"iconUrl":"./static/6d4e9418ec32728a45f7401f27fc0912.jpg","status":"0"},{"chargeCount":1,"typeDesc":"模型API","chargeType":"05","apiServiceName":"联通黑名单用户查询","description":"联通黑名单用户查询","chargeTypeDesc":"收费","apiServiceId":9667,"accessCnt":0,"type":"4","applyCnt":0,"viewCnt":5,"price":2.00,"iconUrl":"./static/ec4e3a4d30e248f38ced8c0d1ae7f2c9.jpg","status":"0"},{"chargeCount":1,"typeDesc":"模型API","chargeType":"05","apiServiceName":"自然人司法信息精准查询","description":"自然人司法信息精准查询","chargeTypeDesc":"收费","apiServiceId":9695,"accessCnt":0,"type":"4","applyCnt":0,"viewCnt":5,"price":2.00,"iconUrl":"./static/5fa4dabc18e645ee9f0003bc717d8a28.jpg","status":"0"},{"chargeCount":1,"typeDesc":"模型API","chargeType":"05","apiServiceName":"自然人银行贷款逾期查询","description":"自然人银行贷款逾期查询","chargeTypeDesc":"收费","apiServiceId":9701,"accessCnt":0,"type":"4","applyCnt":0,"viewCnt":6,"price":2.00,"iconUrl":"./static/9307877b7f534e998b96063abcf295b5.jpg","status":"0"},{"chargeCount":1,"typeDesc":"模型API","chargeType":"05","apiServiceName":"企业司法信息精准查询","description":"企业司法信息精准查询","chargeTypeDesc":"收费","apiServiceId":9699,"accessCnt":0,"type":"4","applyCnt":0,"viewCnt":5,"price":2.00,"iconUrl":"./static/5949d93e053c4ecca4c99c881c84f57e.jpg","status":"0"},{"chargeCount":1,"typeDesc":"模型API","chargeType":"05","apiServiceName":"企业司法风控报告","description":"企业司法风控报告","chargeTypeDesc":"收费","apiServiceId":9697,"accessCnt":0,"type":"4","applyCnt":0,"viewCnt":4,"price":2.00,"iconUrl":"./static/f4b5786114ab4d2fb4b01cfc9b12db9d.jpg","status":"0"}]},"status":"OK"})
  },
  // 获取API详情
  getApiDetail: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'service/getApiServiceDetailById.do?t=' + new Date().getTime(),
    //   params: _.pick(options, ['apiServiceId'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"apiServiceId":3,"apiServiceCName":"基金从业人员资格信息查询","name":"fund","description":"提供全国范围内的基金从业人员资格信息查询。","iconUrl":"./static/b648d7f3dab64356a0429e7dd11981fd.jpg","categoryId":103,"categoryName":"工作就业","tags":",10097,10124,10145,","tagsName":"从业,资格,基金","providerId":80,"providerName":"智慧神州","type":"2","typeDesc":"数据API","status":"0","statusDesc":"审核通过","scope":"不限","serviceObject":"01","serviceObjectDesc":"个人","area":"000000","updatedTime":1503631200000,"rtnCode":"### 服务返回码：\n- 返回码\t-\t说明\n- 000000 -\tsuccess\n- 900004 -\t未输入参数或参数格式有误\n- 900005 -\t没有当前查询信息\n- 999999 -\t请求发生异常","chargeType":"01","chargeTypeDesc":"免费","attentionCnt":2,"applyCnt":4,"viewCnt":76,"attentionFlag":false,"resourceType":"01","ownCity":null,"accessCnt":0,"updatedBy":null,"publishType":"01","publishTypeDesc":"完全公开","avgScore":4.0,"apiList":[{"testPacket":"\nGET请求示例：@uri@?certificateNo=F0XXXXXXXXXXX\n\n### 请求参数：\n|   名称 | 必填 |\t数据类型 | 说明 |\n|   :---: |   :---: |   :---: | :---:   |\n|\t`certificateNo` | 否 | String | 证书编号\n\n### 返回参数：\n|   名称 |  数据类型 | 说明 |\n|   :---: |  :---: | :---:   |\n|\t`name` | String | 姓名\n|   `gender`| String | 性别\n|   `photo`| String | 照片\n|   `institute`| String | 从业机构\n|   `certificateNo`| String | 证书编号\n|   `position`| String | 从业岗位\n|   `level`| String | 学历\n|   `issueDate`| String | 证书取得日期 YYYY-MM-DD\n|   `expireDate`| String | 证书有效截止日期 YYYY-MM-DD\n|   `items`| List | 注册变更记录列表\n|   `histCertificateNo`| String | 证书编号\n|   `histIssueDate`| String | 取得日期\n|   `histInstitute`| String | 从业机构\n|   `histPosition`| String | 从业岗位\n|   `status`| String | 证书状态\n\n\n\n\n### 返回示例：\n\t{\n\t    \"errCode\": \"000000\",\n\t    \"msg\": \"success\",\n\t    \"data\": {\n\t        \"name\": \"张xx\",\n\t        \"gender\": \"女\",\n\t        \"photo\": \"http://apis.scity.cn/employment2/iw-imgs/b0d47d35f4533035b5b83941c947f4ac?iw-apikey=123\",\n\t        \"institute\": \"XXXX有限公司\",\n\t        \"certificateNo\": \"F0XXXXXXXXXXX\",\n\t        \"position\": \"基金从业资格\",\n\t        \"level\": \"大专\",\n\t        \"issueDate\": \"2011-03-10\",\n\t        \"expireDate\": \"2017-12-31\",\n\t        \"items\": [\n\t            {\n\t                \"histCertificateNo\": \"F0XXXXXXXXXXX\",\n\t                \"histIssueDate\": \"2011-03-10\",\n\t                \"histInstitute\": \"XXXXX公司\",\n\t                \"histPosition\": \"基金从业资格\",\n\t                \"status\": \"离职\"\n\t            },\n\t            {\n\t                \"histCertificateNo\": \"F0XXXXXXXXXXX\",\n\t                \"histIssueDate\": \"2011-03-10\",\n\t                \"histInstitute\": \"XXXXX公司\",\n\t                \"histPosition\": \"基金从业资格\",\n\t                \"status\": \"正常\"\n\t            }\n\t        ]\n\t    }\n\t} \n","encodeUri":"http://qg-api.citysdk.cn/fund/qualifyInfo","directions":"","requestType":"JSON","requestMethod":"GET","name":"qualifyInfo","apiCName":"1-资格信息查询","uri":"http://172.16.49.39/employment/?iw-apikey=123&iw-cmd=Amac_fundQualifyInfo&$args","apiId":3}],"chargeRuleList":[]},"status":"OK"})
  },
  // 关注
  followApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'userAttention/add.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 取消关注
  unfollowApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'userAttention/remove.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 获取API套餐信息
  getPackage: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'charge/getChargeRuleByServiceId.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 上传图片
  uploadFileUrl: baseUrl + 'uploadFile.do',
  // 新增API
  publishServiceApi: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'service/publishServiceApi.do',
      data: options
    })
  },
  // 修改API
  modifyServiceApi: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'service/modifyServiceApi.do',
      data: options
    })
  },
  // 检查API标识的唯一
  checkApiServerId: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/checkApiByIdentification.do',
      params: _.pick(options, ['name'])
    })
  },
  // 获取收费说明
  getFee: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/getFee.do',
      params: _.pick(options, ['price'])
    })
  },
  // 获取修改API的详情
  getApiDetailUpdate: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/getMyApiServiceDetailById.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 获取套餐
  getMyChargeRuleByServiceId: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'charge/getMyChargeRuleByServiceId.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 获取发布的API
  getMyPublishedApi: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'service/getMyPublishedApi.do',
    //   params: _.pick(options, ['page', 'pageSize'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0,"url":"/service/getMyPublishedApi.do"},"list":[]},"status":"OK"})
  },
  // 下架发布的API
  offlineServiceApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/offlineServiceApi.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 删除发布的API
  deleteApi: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'service/deleteServiceApi.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 修改API套餐
  modifyChargeRule: function (options) {
    options = options || {};

    return Axios({
      method: 'POST',
      url : baseUrl + 'charge/modifyChargeRule.do',
      data: options
    })
  },
  // 获取关注的API
  getMyAttentionApi: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'service/getMyAttentionApi.do',
    //   params: _.pick(options, ['page', 'pageSize'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"page":{"startIndex":0,"endIndex":0,"totalPage":0,"currentPage":1,"totalSize":0,"url":"/service/getMyAttentionApi.do"},"list":[]},"status":"OK"})
  },
  // 取消API关注
  cancelFollow: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'userAttention/remove.do',
      params: _.pick(options, ['apiServiceId'])
    })
  },
  // 查询API
  searchApi: function (options) {
    options = options || {};

    // return Axios({
    //   method: 'GET',
    //   url : baseUrl + 'service/searchApi.do',
    //   params: _.pick(options, ['keyword', 'page', 'pageSize'])
    // })
    return Promise.resolve({"code":"000000","message":"success","result":{"page":{"startIndex":0,"endIndex":10,"totalPage":22,"currentPage":1,"totalSize":220,"url":"/service/searchApi.do"},"list":[{"typeDesc":"数据API","viewCnt":77,"chargeType":"01","apiServiceName":"基金从业人员资格信息查询","description":"提供全国范围内的基金从业人员资格信息查询。","chargeTypeDesc":"免费","apiServiceId":3,"iconUrl":"./static/b648d7f3dab64356a0429e7dd11981fd.jpg","accessCnt":0,"type":"2","applyCnt":4,"status":"0"},{"typeDesc":"数据API","viewCnt":65,"chargeType":"01","apiServiceName":"一级注册建造师查询","description":"提供全国范围内的一级注册建造师查询.","chargeTypeDesc":"免费","apiServiceId":8,"iconUrl":"./static/64a2cfe5b3d17c72bb837280c5685e31.jpg","accessCnt":0,"type":"2","applyCnt":4,"status":"0"},{"typeDesc":"数据API","viewCnt":71,"chargeType":"01","apiServiceName":"CETTIC证书查询","description":"提供全国范围内的CETTIC职业培训证书查询。","chargeTypeDesc":"免费","apiServiceId":6,"iconUrl":"./static/ef01ecf8faf7ddd4df61fb2cca908f03.jpg","accessCnt":0,"type":"2","applyCnt":3,"status":"0"},{"typeDesc":"数据API","viewCnt":76,"chargeType":"01","apiServiceName":"二级注册建造师查询","description":"提供全国范围内的二级注册建造师查询。","chargeTypeDesc":"免费","apiServiceId":9,"iconUrl":"./static/64a2cfe5b3d17c72bb837280c5685e31.jpg","accessCnt":0,"type":"2","applyCnt":5,"status":"0"},{"typeDesc":"数据API","viewCnt":353,"chargeType":"01","apiServiceName":"证券从业人员执业注册查询","description":"提供全国范围内的证券从业人员执业注册信息查询。","chargeTypeDesc":"免费","apiServiceId":1,"iconUrl":"./static/8ce1344a8b29701e5c55f052d8e89ba5.jpg","accessCnt":0,"type":"2","applyCnt":14,"status":"0"},{"typeDesc":"数据API","viewCnt":244,"chargeType":"01","apiServiceName":"银行专业人员资质信息查询","description":"提供全国范围内的银行专业人员资质信息查询。","chargeTypeDesc":"免费","apiServiceId":2,"iconUrl":"./static/0d8a934c4a5b478dc7b2b95f7a623fa0.jpg","accessCnt":0,"type":"2","applyCnt":6,"status":"0"},{"typeDesc":"数据API","viewCnt":71,"chargeType":"01","apiServiceName":"国际证书查询","description":"提供全国范围内的注册国外职业资格证书证书查询。","chargeTypeDesc":"免费","apiServiceId":7,"iconUrl":"./static/9fb27288f6cd4746826d9c3ec6510cc8.jpg","accessCnt":0,"type":"2","applyCnt":4,"status":"0"},{"chargeCount":1,"typeDesc":"数据API","chargeType":"05","apiServiceName":"学历信息","description":"提供全国地区学历信息查询","chargeTypeDesc":"收费","apiServiceId":9549,"accessCnt":0,"type":"2","applyCnt":21,"viewCnt":208,"price":1.00,"iconUrl":"./static/2146c04594aa403888ab04df9367c500","status":"0"},{"typeDesc":"数据API","viewCnt":18,"chargeType":"01","apiServiceName":"一级临时建造师证书查询","description":"提供全国范围内的一级建造师临时执业证书人员查询。","chargeTypeDesc":"免费","apiServiceId":10,"iconUrl":"./static/64a2cfe5b3d17c72bb837280c5685e31.jpg","accessCnt":0,"type":"2","applyCnt":3,"status":"0"},{"typeDesc":"数据API","viewCnt":92,"chargeType":"01","apiServiceName":"国家职业资格证书查询","description":"提供全国范围内的人社部颁发国家职业资格证书查询。","chargeTypeDesc":"免费","apiServiceId":4,"iconUrl":"http://news.citysdk.cn/uploads/8/image/public/portal/gjzy.png","accessCnt":0,"type":"2","applyCnt":8,"status":"0"}]},"status":"OK"})
  },
  // 评分
  addScore: function (options) {
    options = options || {};

    return Axios({
      method: 'GET',
      url : baseUrl + 'userScore/add.do',
      params: _.pick(options, ['apiServiceId', 'score'])
    })
  },
  
}

export default apiAPI;