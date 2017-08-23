<template>
  <div class="user-basic">
    <ul>
      <li>
        <label>账户名：</label>
        <span>{{result.account}}</span>
      </li>
      <li>
        <label>实名认证：</label>
        <span>{{result.certification}}</span>
      </li>
      <li>
        <label>APIKey：</label>
        <span v-if="result.apiKey">{{result.apiKey}}</span>
        <span v-else>您尚未进行实名认证，完成<a href="#user/auth">认证</a>后可以查看APIKey</span>
      </li>
      <li>
        <label>secretKey：</label>
        <span v-if="result.secretKey">{{result.secretKey}}</span>
        <span v-else>您尚未进行实名认证，完成<a href="#user/auth">认证</a>后可以查看secretKey</span>
      </li>
      <li>
        <label>手机号码：</label>
        <span>{{result.mobile}}</span>
      </li>
      <li>
        <label>用户类型：</label>
        <span>{{result.userType || '注册用户'}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import API from 'common/api'
  export default {
    data () {
      return {
        result: {}
      }
    },
    created () {
      API.UC.getBasicInfo().then((res) => {
        this.result = res.result
      })
    }
  }
</script>
<style lang="less">
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .user-basic {
    .box-shadow();
    height: 300px;
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
    li {
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      margin: 5px 0;
      label{
        width: 100px;
        display: inline-block;
        text-align: right;
        margin-right: 20px;
        color: #666;
      }
    }
  }
</style>