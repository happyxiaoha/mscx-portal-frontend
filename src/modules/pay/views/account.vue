<template>
  <div class="content grid-l">
    <div class="pay-amount-block">
      <h2>应付金额：<span class="pay-price">￥{{orderDetail.orderCash || 0}}</span>
      </h2>
    </div>
    <div class="pay-amount-block">
      <h2>
        可用余额：<span class="pay-price">￥{{accountInfo.useableBalance || 0}}</span>
      </h2>
      <a href="userInfo.html#account" class="go-recharge">余额不足？去充值</a>
      <hr>

      <div class="pass-wrapper" v-if="orderDetail.pay_balance < accountInfo.useableBalance">
        <h2>请输入支付密码</h2>
        <div class="pass-wrap">
          <c-password-input :leftAlign="true" @typing="handlePassword"></c-password-input>
          <div class="forget-pass">
            <a href="userInfo.html#account/setPayPassword">忘记支付密码？</a>
          </div>
        </div>
        <el-button :disabled="submitDisabled" class="btn-submit-pay" @click="submitPay" type="primary">确认支付</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import API from 'common/api'
  import _ from 'lodash'
  import passwordInput from 'components/passwordInput'
  export default {
    data () {
      return {
        orderDetail: {
          orderCash: ''
        },
        orderNum: '',
        accountInfo: {},
        password: '',
        submitDisabled: true
      }
    },
    watch: {
      password () {
        if(this.password.length === 6 && /^\d+$/.test(this.password)) {
          this.submitDisabled = false
        }else {
          this.submitDisabled = true
        }
      }
    },
    created () {
      this.orderNum = this.$route.params.order
      API.Order.getOrderDetail({
        orderNum: this.orderNum
      }).then((res) => {
        this.orderDetail = res
      })
      API.Account.getAccountInfo().then((res) => {
        this.accountInfo = res.result
      })
    },
    methods: {
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
      handlePassword (password) {
        this.password = password
      },
      submitPay () {
        this.submitDisabled = true
        API.Account.minusAmount({
          payPwd: this.password,
          orderNo: this.orderNum
        }).then((res) => {
          this.$message({
            message: '账户余额支付成功！',
            type: 'success'
          })
          setTimeout(() => {
            location.href = '#result/' + this.orderNum
          }, 2000)
        }).catch((res) => {
          this.$message({
            message: res.message || '账户余额支付失败！',
            type: 'warning'
          })
          this.submitDisabled = false
        })
      }
    },
    components: {
      'c-password-input': passwordInput
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
      h2 {
        display: inline-block;
      }
      .go-recharge {
        margin-left: 90px;
        font-size: 18px;
      }
      .btn-submit-pay {
        display: block;
      }
      .pass-wrapper {
        h2 {
          margin-bottom: 20px;
        }
        .forget-pass {
          position: absolute;
          top: 15px;
          left: 330px;
          z-index: 99;
          a {
            font-size: 16px;
          }
        }
      }
      .pass-wrap {
        height: 70px;
        position: relative;
      }
    }
    
  }
</style>