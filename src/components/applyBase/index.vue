<template>
  <el-dialog title="选择您要购买的套餐" custom-class="package-dialog" :visible.sync="dialogVisible" :before-close="handleClose">
    <!-- <el-alert
      v-show="showSubmitMessage"
      :title="messageTitle"
      :type="messageType"
      show-icon
      class="submit-message"
      :closable="false">
    </el-alert> -->
    <el-form :model="form" class="package-form" ref="form" :rules="rules" v-loading="loading.status" :element-loading-text="loading.tip" v-loading-response="response">
      <div class="package-content" v-if="packageList.length > 0">
        <table class="table">
          <thead>
            <tr>
                <th></th>
                <th>名称</th>
                <th>次数/{{resourceType === '01' ? '月' : '天'}}数</th>
                <th>单价（元）</th>
                <th>数量</th>
                <th>小计（元）</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in packageList">
                  <td>
                    <el-radio class="radio" v-model="packageRadio" :label="index">&nbsp;</el-radio>
                  </td>
                  <td>{{item.name}}</td>
                  <td>
                      {{item.chargeCount || 0}}
                      {{resourceType === '01' ? (item.chargeType === '04' ? '月' : '次') : (item.chargeType === '04' || item.chargeType === '06' ? '天' : '次')}}
                  </td>
                  <td>
                    <template v-if="discountInfo">
                      <el-tooltip class="item" content="折扣价" effect="dark" placement="top">
                        <span class="pay-price">{{item.price}}</span>
                      </el-tooltip>
                      <span class="disabled-price">{{item.rawPrice}}</span>
                    </template>
                    <span v-else>
                      {{item.price}}
                    </span>
                  </td>
                  <td>
                    <input type="number" @input="typeNum($event)" class="number" min="1" value="1">
                  </td>
                  <td class="total">{{(item.price * item.num).toFixed(2)}}</td>
              </tr>
            </tbody>
        </table>
      </div>
      <div class="package-content" v-else-if="chargeType === '01'">
        本套餐在24个月内免费使用，超过这个期限，需要重新申请。
      </div>
      <div class="package-content" v-else-if="chargeType === '03'">
        本套餐在24个月内后付费使用，将自动扣除账户余额，超过这个期限，需要重新申请。
      </div>
      <div class="package-content" v-else>
        暂无套餐
      </div>
      <el-form-item prop="agreement">
        <el-checkbox v-model="form.agreement">阅读并接受</el-checkbox>
        <a href="/agreement.html" target="_blank">《智慧大厂平台服务协议》</a>
        <div v-if="packageList.length > 0" class="package-price-total">已选择1个套餐 应付：￥<span>{{totalPrice}}</span>元</div>
      </el-form-item>
      <template v-if="chargeType === '01' || chargeType === '03'">
        <el-button type="primary" :icon="submitBtnCtrl.icon" :loading="submitBtnCtrl.loading" :disabled="submitBtnCtrl.disabled" class="confirm-btn" @click="submitForm('form')">完成</el-button>
      </template>
      <template v-else>
        <el-button :icon="submitBtnCtrl.icon" :loading="submitBtnCtrl.loading" :disabled="submitBtnCtrl.disabled" class="confirm-btn" @click="addShopCart('form')">加入购物车</el-button>
        <el-button type="primary" :icon="submitBtnCtrl.icon" :loading="submitBtnCtrl.loading" :disabled="submitBtnCtrl.disabled" class="confirm-btn" @click="submitForm('form')">立即支付</el-button>
      </template>
    </el-form>
  </el-dialog>
</template>
<script>
  import API from 'common/api'
  import {contactWay} from 'common/validation'
  import _ from 'lodash'
  import loadingResponse from 'common/directive/response'
  export default {
    props: ['visible', 'id', 'chargeType', 'resourceType'],
    data () {
      return {
        dialogVisible: this.visible,
        // showSubmitMessage: false,
        // messageTitle: '',
        // messageType: '',
        submitBtnCtrl: {
          icon: '',
          loading: false,
          disabled: false,
          text: '完成'
        },
        loading: {
          status: false,
          tip: ''
        },
        response: {},
        form: {
          agreement: []
        },
        rules: {
          agreement: [
            {
              required: true,
              type: 'array',
              message: '请阅读并接受资源服务协议'
            }
          ]
        },
        packageList: [],
        packageRadio: 0,
        totalPrice: 0,
        discountInfo: ''
      }
    },
    created () {
      // 获取套餐
      if(this.isNeedPackage()) {
        this.getPackage(this.id).then((res) => {
          this.packageList = res.result
          this.totalPrice = this.packageList[this.packageRadio].price
          this.packageList.forEach((item) => {
            item.num = 1
          })
          // API或APP，查询折扣信息
          if(this.resourceType === '01' || this.resourceType === '03') {
            this.getDiscountInfo(this.id).then((res) => {
              this.discountInfo = res.result
              if(this.discountInfo) {
                this.packageList.forEach((item) => {
                  item.rawPrice = item.price
                  item.price = (this.discountInfo * item.rawPrice).toFixed(2)
                })
                this.totalPrice = this.packageList[this.packageRadio].price
              }
            })
          }
        })
      }
    },
    methods: {
      handleClose (done) {
        this.resetForm('form')
        done()
        this.$emit('toggle', this.dialogVisible)
      },
      closeDialog () {
        this.dialogVisible = false
        this.loading.tip = ''
        this.$emit('toggle', this.dialogVisible)
      },
      isNeedPackage () {
        return Promise.resolve()
      },
      getPackage () {
        return Promise.resolve()
      },
      placeFreeOrder () {
        return Promise.resolve()
      },
      placeFeeOrder () {
        return Promise.resolve()
      },
      placeAfterFeeOrder () {
        return Promise.resolve()
      },
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            // 免费情况下的提交
            if(this.chargeType === '01') {
              this.freeOrder()
            }else if(this.chargeType === '03') {
              this.afterFeeOrder()
            }else {
              this.feeOrder()
            }
          }else {
            return false
          }
        })
      },
      freeOrder () {
        this.loading.status = true
        this.placeFreeOrder(this.id).then((res) => {
          this.response = res
          if(res.status === 'OK') {
            this.loading.tip = '申请成功！'
            setTimeout(() => {
              this.resetForm('form')
              this.closeDialog()
            }, 1000)
          }else {
            this.loading.tip = res.message || '申请失败！'
            setTimeout(() => {
              this.loading.status = false
            }, 1000)
          }          
        }).catch((res) => {
          this.response = res
          this.loading.tip = res.message || '申请失败！'
          setTimeout(() => {
            this.loading.status = false
          }, 1000)
        })
      },
      afterFeeOrder () {
        this.loading.status = true
        this.placeAfterFeeOrder(this.id).then((res) => {
          this.response = res
          if(res.status === 'OK') {
            this.loading.tip = '申请成功！'
            setTimeout(() => {
              this.resetForm('form')
              this.closeDialog()
            }, 1000)
          }else {
            this.loading.tip = res.message || '申请失败！'
            setTimeout(() => {
              this.loading.status = false
            }, 1000)
          }          
        }).catch((res) => {
          this.response = res
          this.loading.tip = res.message || '申请失败！'
          setTimeout(() => {
            this.loading.status = false
          }, 1000)
        })
      },
      feeOrder () {
        // this.loading.status = true
        let selectedItem = this.packageList[this.packageRadio]
        this.placeFeeOrder({
          id: this.id,
          charRuleId: selectedItem.id,
          itemNum: selectedItem.num
        }).then((res) => {
          this.handleFeeOrder(res)
        }).catch((res) => {
          this.loading.tip = res.message || '提交失败，请稍后再试'
          this.response = res
          setTimeout(() => {
            this.loading.status = false
          }, 1000)
        })
      },
      addShopCart (form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            this.loading.status = true
            let selectedItem = this.packageList[this.packageRadio]
            API.UC.addShopCart({
              resourceType: this.resourceType,
              resourceId: this.id,
              chargeRuleId: selectedItem.id,
              applyTimes: selectedItem.num
            }).then((res) => {
              this.response = res
              if(res.status === 'OK') {
                this.loading.tip = '添加购物车成功！'
                setTimeout(() => {
                  this.resetForm('form')
                  this.closeDialog()
                }, 1000)
              }else {
                this.loading.tip = '添加购物车失败！'
                setTimeout(() => {
                  this.loading.status = false
                }, 1000)
              }          
            }).catch((res) => {
              this.loading.tip = res.message || '添加购物车失败！'
              this.response = res
              setTimeout(() => {
                this.loading.status = false
              }, 1000)
            })
          }else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.submitBtnCtrl = {
          text: '提交',
          icon: '',
          loading: false,
          disabled: false
        }
        this.loading.status = false
        // this.showSubmitMessage = false
        // this.messageTitle = ''
        // this.messageType = ''
      },
      typeNum (event) {
        let number = event.target.value
        if(number < 1) {
          number = 1
          event.target.value = number
        }else if(number > 100000) {
          number = 100000
          event.target.value = number
        }
        this.packageList[this.packageRadio].num = number
        this.calculate()
      },
      calculate () {
        let selectedItem = this.packageList[this.packageRadio]
        let totalPrice = (10000 * selectedItem.price * selectedItem.num) / 10000;
        this.totalPrice = totalPrice
      },
      handleCart () {
        var model = this.addCartModel.toJSON();
        layer.msg('添加购物车成功！');

        if(model.status == 'OK') {
            layer.close(this.layerIndex);
        }
      },
      handleFeeOrder (res) {
        this.response = res
        if(res.status !== 'OK') {
          this.loading.tip = 'API下单失败！'
          setTimeout(() => {
            this.loading.status = false
          }, 1000)
          return
        }
        
        // 如果是0元套餐，不需要跳转到支付页面，直接提示成功
        if(this.totalPrice == 0 && this.chargeType == '02') {
          this.loading.tip = '购买成功！'
          setTimeout(() => {
            this.resetForm('form')
            this.closeDialog()
          }, 1000)
          return;
        }

        var param = {
          orderNum: res.result,
          amount: this.totalPrice
        };

        var base = new Base64;
        window.localStorage.setItem('orderInfo', base.encode(JSON.stringify(param)));
        location.href = '/pay.html';
      }
    },
    watch: {
      visible () {
        this.dialogVisible = this.visible
      },
      packageRadio (val) {
        this.calculate()
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/less/variables.less";
  .package-dialog {
    width: 530px;
    position: relative;
    overflow: hidden;
    .submit-message {
      position: absolute;
      left: 0;
      top: 42px;
    }
    .package-form {
      overflow: hidden;
    }
    .package-content {
      min-height: 250px;
    }
    .confirm-btn {
      float: right;
      display: block;
      margin-left: 15px;
    }
    .pay-price {
      color: @priceTextColor;
    }
    .disabled-price {
      text-decoration:line-through;
      color: #aaa;
      font-size: 12px;
      margin-left: 5px;
    }
    .package-price-total {
      float: right;
      span {
        color: #ef6f08;
        padding: 0 2px;
        font-size: 16px;
      }
    }
  }
</style>