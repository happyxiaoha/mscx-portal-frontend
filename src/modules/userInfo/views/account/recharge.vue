<template>
  <div>
    <div class="account-recharge">
      <h2>
        账户余额：<span class="recharge-balance">{{result.account_balance}}</span>元
        <!-- <span v-if="result.useableBalance" class="sub-title">（可用余额：{{result.useableBalance}}元&nbsp;&nbsp;合同冻结金额：{{result.freezeBalance}}元）</span> -->
      </h2>
    </div>
    <div class="account-recharge">
      <ul class="process">
        <li :class="[steps.current == 'step1' ? 'current ' : '', steps.done.indexOf('step1') > -1 ? 'done' : '']">
            <i class="step1"></i>
            <h2 class="step-title">账户充值</h2>
            <i class="arrow"></i>
        </li>
        <li :class="[steps.current == 'step2' ? 'current ' : '', steps.done.indexOf('step2') > -1 ? 'done' : '']">
            <i class="step2"></i>
            <h2 class="step-title">确认并支付</h2>
            <i class="arrow"></i>
        </li>
        <li :class="[steps.current == 'step3' ? 'current ' : '', steps.done.indexOf('step3') > -1 ? 'done' : '']">
            <i class="step3"></i>
            <h2 class="step-title">完成</h2>
        </li>
      </ul>
    </div>
    <div class="account-recharge">
      <el-form v-if="steps.current === 'step1'" :model="form" label-width="105px" :rules="rules" ref="form">
        <el-form-item label="充值金额：" prop="money">
          <el-input v-model="form.money" class="amount-ipt"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">下一步</el-button>
        </el-form-item>
      </el-form>
      <div v-else-if="steps.current === 'step2'" class="account-select-pay">
        <h2>应付金额：
          <span class="recharge-balance">{{form.money}}</span>元
        </h2>
        <hr>
        <h3>请选择支付方式</h3>
        <div class="pay-type">
          <label class="zfb">
            <input type="radio" v-model="payType" name="type" value="alipay" checked=""></label>
          <label class="wxzf">
            <input type="radio" v-model="payType" name="type" value="weixin">
          </label>
        </div>
        <el-button type="primary" class="btn-pay" @click="submitPay">确认支付</el-button>
        <hr>
        <div class="account-pay-desc">
          <ul>
            <li>
            请选择支付方式。如果您使用支付宝账户支付，请选择“支付宝”；如果您使用微信账户支付，请选择“微信支付”。
            </li>
            <li>
            请遵守支付宝、微信或相关银行的规定进行操作。您在支付宝、微信或相关银行页面上进行的任何操作及其产生的任何法律后果，将按照您与支付宝、微信或相关银行之间签订的合同处理。本网站不承担任何责任。
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="steps.current === 'step3'">
        <h2>{{ orderDetail && orderDetail.orderStatus == '3' ? '充值成功' : '充值未成功' }}</h2>
      </div>
    </div>
  </div>
</template>
<script>
  import API from 'common/api'
  import {price} from 'common/validation'
  import _ from 'lodash'
  import Axios from 'axios'
  require('common/utils/date')
  const PayResource = {
    host: '/ro/mscx-order-api/order/payOrder.do',
    channels: {
      alipay: 'ALI_WEB',
      weixin: 'WX_NATIVE'
    }
  }
  export default {
    data () {
      return {
        result: {
        },
        steps: {
          current: 'step1',
          done: []
        },
        orderNum: '',
        orderDetail: '',
        payType: 'alipay',
        form: {
          money: ''
        },
        rules: {
          money: [
            {
              required: true,
              message: '请输入金额',
              trigger: 'change'
            }, {
              validator: price,
              trigger: 'change'
            }
          ]
        }
      }
    },
    created () {
      API.Account.getAccountInfo().then((res) => {
        this.result = res.result
      })
      // 充值结果返回
      if(this.$route.params.orderNum) {
        this.orderNum = this.$route.params.orderNum
        this.handleRechargeResult()
      }
    },
    methods: {
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            API.Order.placeRechargeOrder({
              rechargeAmount: this.form.money
            }).then((res) => {
              this.orderNum = res.result
              // 进入第二步
              this.steps.current = 'step2'
              this.steps.done.push('step1')
            }).catch((res) => {
              this.$message({
                message: res.message || '下单失败！',
                type: 'warning'
              })
            })
          }else {
            return false
          }
        })
      },
      submitPay () {
        let orderInfo = _.extend({
          orderNum: this.orderNum,
          amount: this.form.money,
          channel: PayResource.channels[this.payType],
          title: '神州数云'
        });
        /* 
         * 如果是支付宝，页面跳转
         * 如果是微信支付，ajax获取url生成二维码
         */
        var payUrl = PayResource.host + '?' + this.param(orderInfo);
        switch(this.payType) {
            case 'alipay':
              location.href = payUrl + '&returnUrl=' + location.protocol + '//' + location.host + '/' + 'pay-result.html';
              break;
            case 'weixin':
              Axios.get(payUrl).then((res) => {
                location.href = 'pay.html#weixin/' + encodeURIComponent(res.result) + '/' + this.orderNum;
              })
              break;
            default:
              break;
        }
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
      handleRechargeResult () {
        this.steps.current = 'step3'
        this.steps.done = ['step1', 'step2']
        API.Order.getOrderDetail({
          orderNum: this.orderNum
        }).then((res) => {
          this.orderDetail = res
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .account-recharge {
    .box-shadow();
    // height: 300px;
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
    margin-bottom: 20px;
    .recharge-balance {
      font-size: 18px;
      color: @mainBackground;
      margin: 0 5px;
    }
    .sub-title {
      font-size: 14px;
    }
    .process { 
      li {
        display: inline-block;
        overflow: hidden;
        position: relative;
        margin-left: 36px;
        width: 250px;
        &.current .step-title {
          color: #000;
        }
        i {
          height: 36px;
          width: 40px;
          display: block;
          text-align: center;
          vertical-align: middle;
          display: table-cell;
          &.step1 {
            background: url('../../images/account-step1.png') left center no-repeat;
          }
          &.step2 {
            background: url('../../images/account-step2.png') left center no-repeat;
          }
          &.step3 {
            background: url('../../images/account-step3.png') left center no-repeat;
          }
          &.arrow {
            background: url('../../images/account-arrow.png') left center no-repeat;
            width: 84px;
            position: relative;
            left: 25px;
          }
        }
        &.current {
          i {
            &.step1 {
              background: url('../../images/account-curr-step1.png') left center no-repeat;
            }
            &.step2 {
              background: url('../../images/account-curr-step2.png') left center no-repeat;
            }
            &.step3 {
              background: url('../../images/account-curr-step3.png') left center no-repeat;
            }
          }
        }
        &.done {
          i.step1, i.step2, i.step3 {
            background: url('../../images/account-done.png') left center no-repeat;
          }
        }
      }
      .step-title {
        display: table-cell;
        vertical-align: middle;
        font-size: 18px;
        padding-left: 10px;
        color: #aaa;
        font-weight: 600;
      }
    }
    .amount-title {
      display: inline-block;
    }
    .amount-ipt {
      display: inline-block;
      width: 150px;
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
          background: url("../../../../assets/images/pay/zfb.png") right center no-repeat;
        }
        &.wxzf {
          background: url("../../../../assets/images/pay/wxzf.png") right center no-repeat;
        }
        input {
          float: left;
          height: 50px;
          width: 20px;
          margin: 4px 0 0;
        }
      }
    }
    .btn-pay {
      margin: 20px 0 0 70px;
    }
    .account-pay-desc {
      padding: 0 20px;
      margin-top: 20px;
      li {
        list-style: initial;
        line-height: 30px;
      }
    }
  }
</style>