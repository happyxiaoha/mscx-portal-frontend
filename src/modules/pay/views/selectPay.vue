<template>
  <div class="content grid-l">
    <div class="pay-amount-block">
      <h2>应付金额：<span class="pay-price">￥{{orderDetail.orderCash}}</span>
      </h2>
    </div>
    <div class="pay-amount-block">
      <h3>请选择支付方式</h3>
      <div class="pay-type">
        <label class="zfb">
          <input type="radio" v-model="payType" name="type" value="alipay" checked=""></label>
        <label class="wxzf">
          <input type="radio" v-model="payType" name="type" value="weixin">
        </label>
        <template v-if="orderDetail.order_classify == '2'">
        </template>
        <template v-else-if="accountInfo.account !== 'noAccount'">
          <label class="account pay-way">
            <input type="radio" v-model="payType" name="type" value="account">
            <div class="account-balance">
              <h3>账户支付</h3>
              <span style="font-size:12px;">（余额<span class="pay-price">{{ accountInfo.account_balance }}</span>元）</span>
            </div>
          </label>
        </template>
        <template v-else>
          <label class="account pay-way">
            <input type="radio" disabled>
            <div class="account-balance disabled">
              <h3>账户支付</h3>
              <span>未开通</span>
            </div>
          </label>
        </template>
      </div>
      <hr/>
      <p :class="[showPointArea ? 'more' : '' ,'point-title']" @click="togglePointArea">使用积分抵用<i></i></p>
      <div class="point-pay" v-show="showPointArea">
        <ul v-if="!pointRule">
          <li>
            <p>当前无法使用积分。</p>
          </li>
        </ul>
        <ul v-else>
          <li>
            <p>积分总额：</p>
            <p class="point-rule">
              <span class="mr10">{{ point.remainingPoint }}积分</span>
              本次最多使用<span class="pay-price">{{ point && Math.floor(point.remainingPoint/10)*10 }}</span>积分
              <el-tooltip class="item" effect="dark" placement="right">
                <div slot="content">
                  <span class="pay-price">{{pointRule.deductionPoint}}</span>积分=
                  <span class="pay-price">{{ pointRule.deductionMoney }}</span>元
                  <br/>
                  每次使用的积分必须为10的整倍数
                </div>
                <i></i>
              </el-tooltip>
            </p>
          </li>
          <li>
            <p>使用积分：</p>
            <p>
              <template v-if="point.remainingPoint && point.remainingPoint < 10">
                <input type="text" name="point" class="input-point" readonly>
              </template>
              <template v-else>
                <el-input-number v-model="inputPoint" @change="handleInputPointChange" :step="10" :min="0" :max="inputPointLimit"></el-input-number>
              </template>
              积分
              <p class="el-form-item__error">{{inputPointError}}</p>
            </p>
          </li>
          <li>
            <p>金额抵用：</p>
            <p>
              <span class="pay-price">{{ pointAmount > 0 ? '￥' + pointAmount : '--'}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="pay-amount-block pay-total">
      <ul>
        <li>
          <p class="title">总额：</p>
          <p class="amount">{{orderDetail.orderCash}}元</p>
        </li>
        <li class="point-serve" v-show="pointAmount > 0">
          <p class="title">积分抵用额度：</p>
          <p class="amount">{{pointAmount}}元</p>
        </li>
        <li>
          <p class="title">需要支付额度：</p>
          <p class="amount pay-price">{{finalAmount}}元</p>
        </li>
      </ul>
    </div>
    <el-button class="btn-submit-pay" @click="submitPay" type="primary">确认支付</el-button>
  </div>
</template>
<script>
  import API from 'common/api'
  import Axios from 'axios'
  import _ from 'lodash'
  const PayResource = {
    host: '/ro/mscx-order-api/order/payOrder.do',
    channels: {
      alipay: 'ALI_WEB',
      weixin: 'WX_NATIVE',
      account: 'ACCOUNT_PAY',
      point: 'POINT_PAY',
      weixinPoint: 'WX_NATIVE_POINT_PAY',
      alipayPoint: 'ALI_WEB_POINT_PAY',
      accountPoint: 'ACCOUNT_PAY_POINT_PAY'
    }
  }
  export default {
    data () {
      return {
        orderInfo: {},
        orderDetail: {
          orderCash: ''
        },
        accountInfo: {},
        point: {},
        pointRule: {},
        payType: 'alipay',
        showPointArea: false,
        inputPoint: 0,
        // 积分抵用金额
        pointAmount: 0,
        payBalance: 0,
        inputPointError: '',
        pointTips: ''
      }
    },
    computed: {
      inputPointLimit () {
        return Math.floor(this.point.remainingPoint / 10) * 10
      },
      finalAmount () {
        let finalAmount
        let orderAmount = this.orderDetail.orderCash

        // 计算最终需要支付额度
        if(this.pointAmount > 0) {
          finalAmount = +this.pointAmount - +orderAmount > 0 ? 0 : (+orderAmount * 1000 - +this.pointAmount * 1000) / 1000;
        }else {
          finalAmount = orderAmount;
        }
        return finalAmount
      }
    },
    watch: {
      pointAmount () {
        // 积分抵用金额必须小于等于订单金额
        if(this.pointAmount > this.orderDetail.orderCash) {
          // this.pointAmount = 0
          // this.inputPoint = 0
          this.inputPointError = '积分抵用金额必须小于等于订单金额'
        }else {
          this.inputPointError = ''
        }
      },
      payType (val, oldVal) {
        if(val !== oldVal) {
          if(val === 'account') {
            this.payBalance = (+this.orderDetail.orderCash * 1000 - this.pointAmount * 1000)/1000;
          }
        }else {
          this.payBalance = 0
        }
      }
    },
    created () {
      var orderInfo = window.localStorage.getItem('orderInfo');
      var base = new Base64;

      this.orderInfo = orderInfo && JSON.parse(base.decode(orderInfo)) || {};

      Axios.all([this.getOrderDetail(), this.getAccountInfo(), this.getRemainingPoint(), this.getPointDeductionRule()])
        .then(Axios.spread((order, accountInfo, point, pointRule) => {
          this.orderDetail = order
          this.accountInfo = accountInfo.result
          this.point = point.result
          this.pointRule = pointRule.result
        }))
    },
    methods: {
      getOrderDetail () {
        return API.Order.getOrderDetail({
          orderNum: this.orderInfo.orderNum
        })
      },
      getAccountInfo () {
        return API.Account.getAccountInfo()
      },
      getRemainingPoint () {
        return API.Point.getRemainingPoint()
      },
      getPointDeductionRule() {
        return API.Point.getPointDeductionRule()
      },
      togglePointArea () {
        this.showPointArea = !this.showPointArea
      },
      handleInputPointChange (val) {
        setTimeout(() => {
          API.Point.getDeductionMoney({
            pointNum: val
          }).then((res) => {
            this.pointAmount = res.result
          })
        }, 500)
      },
      param (obj) {
        let object = obj || {}
        let params = ''
        for(let key in obj) {
         params += key + '=' + obj[key] + '&'
        }
        params = params.slice(0, -1)
        return params
      },
      submitPay () {
        if(this.inputPointError !== '') {return}
        let type = this.payType
        let pointAmount = this.pointAmount;
        let payBalance = this.payBalance;
        let payReturnHost = location.protocol + '//' + location.host + '/'

        // 使用积分，且完全积分支付
        if(+pointAmount - +this.orderDetail.orderCash >= 0) {
          type = 'point';
        }else if(pointAmount > 0) {
          // 否则，积分混合支付
          type = type + 'Point';
        }

        let orderInfo = _.extend(this.orderInfo, {
          channel: PayResource.channels[type],
          title: '神州数码智慧校园',
          payPoint: this.inputPoint,
          payBalance: payBalance
        });
        /* 
         * 如果是支付宝，页面跳转
         * 如果是微信支付，ajax获取url生成二维码
         */
        var payUrl = PayResource.host + '?' + this.param(orderInfo);
        switch(type) {
          case 'alipay':
          case 'alipayPoint':
            location.href = payUrl + '&returnUrl=' + payReturnHost + 'pay-result.html';
            break;
          case 'weixin':
          case 'weixinPoint':
            Axios.get(payUrl).then((res) => {
              location.href = 'pay.html#weixin/' + encodeURIComponent(res.result) + '/' + this.orderInfo.orderNum;
            })
            break;
          case 'account':
          case 'accountPoint':
            location.href = payUrl + '&payAccountUrl=' + encodeURIComponent(payReturnHost + 'pay-account.html')
                + '&returnUrl=' + encodeURIComponent(payReturnHost + 'pay-result.html');
            break;
          default:
            location.href = payUrl + '&returnUrl=' + encodeURIComponent(payReturnHost + 'pay-result.html');
            break;
        }
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
    .pay-price {
      color: @priceTextColor;
    }
    .pay-amount-block {
      .box-shadow();
      border: 1px solid #ccc;
      padding: 20px;
      background: #fff;
      margin-bottom: 20px;
      overflow: hidden;
    }
    .pay-type {
      height: 100px;
      label {
        width: 180px;
        display: block;
        margin-left: 30px;
        margin-top: 20px;
        float: left;
        height: 60px;
        &.zfb {
          background: url("../../../assets/images/pay/zfb.png") right center no-repeat;
        }
        &.wxzf {
          background: url("../../../assets/images/pay/wxzf.png") right center no-repeat;
        }
        input {
          float: left;
          height: 50px;
          width: 20px;
          margin: 4px 0 0;
        }
      }
      .account-balance {
        width: 150px;
        height: 50px;
        border: 1px solid #ccc;
        margin-left: 40px;
        margin-top: 5px;
        background: #fff url("../../../assets/images/pay/balance_logo.png") 10px center no-repeat;
        padding: 6px 10px 0 38px;
        box-sizing: border-box;
        border-radius: 8px;
        text-align: center;
        &.disabled {
          color: #aaa;
        }
      }
    }
    .point-title {
      font-size: 16px;
      position: relative;
      cursor: pointer;
      &.more {
        i {
          border-top: 0;
          border-bottom: 7px solid @mainBackground;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          top: -13px;
        }
      }
      i {
        border-top: 7px solid @mainBackground;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        width: 0;
        height: 0;
        position: relative;
        top: 12px;
        left: 6px;
      }
    }
    .point-pay {
      padding: 20px;
      font-size: 14px;
      &.hide {
        display: none;
      }
      li {
        padding: 10px 0;
        p {
          display: inline-block;
        }
      }
      .el-form-item__error {
        position: relative;
        margin-left: 10px;
      }
      .input-point {
        margin: 0 10px 0 0;
        width: 100px;
      }
      .point-rule i {
        background: url(../../../assets/images/pay/icon-question.png) right center no-repeat;
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .pay-total {
      padding: 20px 40px;
    }
    .pay-total ul {
      float: right;
      font-size: 16px;
      li {
        margin-top: 20px;
        &:first-child {
          margin-top: 0
        }
      }
      p {
        display: inline-block
      }
      .title {
        width: 150px;
        text-align: right
      }
      .amount {
        width: 100px;
        text-align: right
      }
    }
    .btn-submit-pay {
      float: right;
    }
  }
</style>