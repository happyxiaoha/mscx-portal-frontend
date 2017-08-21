<template>
  <div>
    <div class="title">帮助中心<i>&gt;</i><span>API使用</span></div>
    <ul class="main-native-area api-help-menu">
      <li><a href="javascript:;" data-src="apiApply">1. API申请</a></li>
      <li><a href="javascript:;" data-src="apiCall">2. API接口调用规范</a></li>
      <li><a href="javascript:;" data-src="apiDes">3. API使用次数查看</a></li>
    </ul>
    <ul class="api-help-con">
      <li>
          <h3 name="apiApply" id="apiApply">API申请</h3>
          <p>简介：API申请指的是平台API资源的申请及支付过程</p>
          <div>
              <p>(一)有固定申请次数的情况</p>
              <p>1.点击详细页面申请功能</p>
              <img src="../images/apihelp/apihelp1.png">
              <p>2.收费套餐：选择套餐、输入申请套餐数，接受服务协议</p>
              <img src="../images/apihelp/apihelp2.png">
              <p>3.免费套餐：接受服务协议</p>
              <img src="../images/apihelp/apihelp3.png">
              <p>4.收费套餐：如果只有一项资源可以点击立即支付完成申请</p>
              <img src="../images/apihelp/apihelp4.png">
              <p>5.收费套餐：如果支付过程中出现异常或者报错，用户可以在用户中心购物车中继续完成支付</p>
              <img src="../images/apihelp/apihelp5.png">
              <p>6.收费套餐：如果要选择多项资源可以加入购物车后统一支付完成申请</p>
              <img src="../images/apihelp/apihelp6.png">
          </div>
          <div>
              <p>(二)没有固定申请次数的情况</p>
              <p>如果想对某项资源进行深度合作，可以点击线下洽谈申请，会有工作人员第一时间和您取得联系</p>
              <img src="../images/apihelp/apihelp7.png">
          </div>
      </li>
      <li>
          <h3 name="apiCall" id="apiCall">API调用</h3>
          <div>
              <p>2.1协议</p>
              <p>所有接口调用均采用HTTP远程调用方式，客户端调用并同步返回响应。</p>
              <p>数据格式： json</p>
          </div>
          <div>
              <p>2.2请求</p>
              <p>1.请求方式：get/post， 服务地址url格式为</p>
              <p>http://domain/[service]/[servicename]</p>
              <p>其中:</p>
              <p>domain为服务域名</p>
              <p>service为服务名称</p>
              <p>servicename 为API名称</p>

              <p>2.协议消息头包含以下属性:</p>
              <p>Content-Type：application/json;charset=utf-8;</p>

              <p>3.请求header包含以下参数:</p>
              <p>user-date： 调用日期。格式yyyyMMddHHmmssSSS。17位日期字符串，小时采用24小时格式，如：20160101160758675</p>
              <p>authorization： 鉴权码，其中，鉴权码（authorition）=dc:{apikey}:{signature}。鉴权码由三部分组成，他们之间以英文冒号隔开；（详细请参考2.2）</p>
          </div>
          <div>
              <p>2.3响应</p>
              <p>1.响应报文媒体类型为application/json;charset=utf-8</p>
          </div>
          <div>
              <p>2.4鉴权信息</p>
          </div>
          <table class="table table-bordered">
              <tbody>
                  <tr>
                      <td style="width: 30%;">apikey</td>
                      <td>用户注册平台帐号并实名认证通过后，可在用户个人中心查看</td>
                  </tr>
                  <tr>
                      <td>secretkey</td>
                      <td>用户注册平台帐号并实名认证通过后，可在用户个人中心查看</td>
                  </tr>
                  <tr>
                      <td>authorization</td>
                      <td>
                          <p>1）第一部分：固定值为dc</p>
                          <p>2）第二部分：用户申请的apikey</p>
                          <p>3）第三部分：数据签名（signature）</p>
                          <p>例如：</p>
                          <p>dc:test-apikey:ODExQUJENUFCRTBDQTc5NzM4RkQ2RTUzQzE2MDQyNUY=</p>
                          <p>数据签名（signature），加密格式如下：</p>
                          <code>signature =
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BASE64 {
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hmac_sha1{
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user-params + 换行符
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ user-date + 换行符
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
                          </code>
                          <p>数据签名由hmac_sha1加密后在经base64编码。hmac_sha1密钥为用户申请的secretkey</p>
                      </td>
                  </tr>
                  <tr>
                      <td>user-date</td>
                      <td>
                          <p>用日期。格式yyyyMMddHHmmssSSS。17位日期字符串，小时采用24小时格式，如：20160101160758675；</p>
                      </td>
                  </tr>
              </tbody>
          </table>
      </li>
      <li>
          <h3 name="apiDes" id="apiDes">API使用次数查看</h3>
          <div>
              <p>用户可以通过用户中心-我的API-申请(购买)的API查看API使用次数与API剩余次数</p>
              <img src="../images/apihelp/apihelp8.png">
          </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {

  }
</script>