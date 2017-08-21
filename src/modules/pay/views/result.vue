<template>
  <div class="content grid-l">
    <img v-if="orderDetail.payWay === 'ALI_WEB'" src="../../../assets/images/pay/zfb_logo.png" alt="支付宝支付">
    <img v-if="orderDetail.payWay === 'WX_NATIVE'" src="../../../assets/images/pay/wx_logo.png" alt="微信支付">
    <h2 class="pay-result-title">收银台</h2>
    <div class="pay-result-block">
      <h1 v-if="orderDetail.orderStatus == 3">您已成功支付{{orderDetail.orderCash}}元</h1>
      <h1 v-else-if="orderDetail.orderStatus == 3">支付失败</h1>
      <h1 v-else-if="orderDetail.orderStatus == 1">订单未支付</h1>
      <h1 v-else-if="orderDetail.orderStatus == 2">订单支付中</h1>
      <p>订单号:{{orderNum}}</p>
      <p>交易资源：
        <span v-for="item in orderDetail.sourceDetail">
          {{item.resourceName}}&nbsp;&nbsp;
        </span>
      </p>
      <p>您可能还需要：&nbsp;&nbsp;<a style="text-decoration: underline" href="userInfo.html#order">进入我的订单</a></p>
    </div>
  </div>
</template>
<script>
  import API from 'common/api'
  export default {
    data () {
      return {
        orderNum: '',
        orderDetail: {}
      }
    },
    computed: {
      
    },
    created () {
      this.orderNum = this.$route.params.orderNum
      API.Order.getOrderDetail({
        orderNum: this.orderNum
      }).then((res) => {
        this.orderDetail = res
      })
    }
  }
</script>
<style scoped lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .content {
    margin-top: 20px;
    overflow: hidden;
    .pay-result-block {
      .box-shadow();
      border: 1px solid #ccc;
      padding: 20px;
      background: #fff;
      margin-top: 20px;
      overflow: hidden;
      h1 {
        margin-bottom: 20px;
      }
      p {
        line-height: 35px;
      }
    }
    .pay-result-title {
      display: inline-block;
      position: relative;
      top: 3px;
      margin-left: 10px;
    }
    img {
      vertical-align: middle;
    }
  }
</style>