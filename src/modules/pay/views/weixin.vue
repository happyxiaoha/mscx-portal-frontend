<template>
  <div class="content grid-l">
    <p>
      <img src="../../../assets/images/pay/wx_logo.png" alt="微信logo">
    </p>
    <div class="pay-block">
      <p style="float: left;line-height: 35px;">
        <span>订单号：<span>{{orderNum}}</span></span>
        <span class="resource-text">交易资源：</span>
        <span v-for="item in orderDetail.sourceDetail">
          {{item.resourceName}}
        </span>
      </p>
      <el-button type="primary" @click="goPayResult" class="btn-result">支付后点击查看支付结果</el-button>
    </div>
    <div class="pay-block"> 
      <div class="weixin-code-img">
        <div ref="qrCode"></div>
        <div class="saomiao">
          <p>请使用微信扫一扫扫描二维码支付</p>
        </div>
      </div>
      <div class="weixin-code-tips">
        <img src="../../../assets/images/pay/shouji.png" alt="支付说明">
      </div>
    </div>
  </div>
</template>
<script>
  import API from 'common/api'
  import QrCode from 'common/utils/qrCode'
  export default {
    data () {
      return {
        orderNum: '',
        orderDetail: {
          sourceDetail: {}
        }
      }
    },
    created () {
      this.orderNum = this.$route.params.order
      this.weixinUrl = this.$route.params.url
      API.Order.getOrderDetail({
        orderNum: this.orderNum
      }).then((res) => {
        this.orderDetail = res
        var qrcode = new QrCode(this.$refs.qrCode, {
            width : 200,
            height : 200
        });
        qrcode.makeCode(decodeURIComponent(this.weixinUrl));
      })
    },
    methods: {
      goPayResult () {
        location.href = this.orderDetail.order_classify == '2' ? 'userInfo.html#account/recharge/result/' + this.orderNum : '#result/' + this.orderNum;
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .content {
    margin-top: 20px;
    overflow: hidden;
    .pay-block {
      .box-shadow();
      border: 1px solid #ccc;
      padding: 20px;
      background: #fff;
      margin-bottom: 20px;
      overflow: hidden;
      .resource-text {
        margin-left: 40px;
      }
      .weixin-code-img {
        margin-top: 70px;
        margin-left: 170px;
        float: left;
        .saomiao {
          background: #439cd9 url(../../../assets/images/pay/saomiao.png)20px center no-repeat;
          width: 120px;
          font-size: 14px;
          height: 40px;
          padding-left: 80px;
          padding-top: 10px;
          p {
            float: left;
            color: #fff;
            line-height: 15px;
          }
        }
      }
      .weixin-code-tips {
        float: right;
        margin-top: 10px;
        margin-right: 25px;
      }
    }
    .btn-result {
      float: right;
    }
  }
</style>