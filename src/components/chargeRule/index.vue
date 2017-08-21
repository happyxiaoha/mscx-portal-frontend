<template>
  <el-dialog :title="defaultIndex ? '修改收费规则' : '新增收费规则'" custom-class="charge-form-dialog" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-form :model="form" label-width="120px" ref="form" :rules="rules" class="form">
      <el-form-item label="计费方式：" prop="chargeType">
        <el-select v-model="form.chargeType" placeholder="请选择">
          <el-option
            v-for="item in chargeTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="套餐名称：" prop="name">
        <el-input v-model="form.name" auto-complete="off" placeholder="请输入套餐名称"></el-input>
        <p class="charge-form-tip">      
          套餐名称最多不超过50字
        </p>
      </el-form-item>
      <el-form-item class="inline-form-item" label="套餐价格：" prop="price">
        <el-input v-model="form.price" class="charge-price-ipt" auto-complete="off" placeholder="请输入套餐价格"></el-input>
        元/
      </el-form-item>
      <el-input-number v-model="form.chargeCount" :min="1" :max="99999999"></el-input-number>{{form.chargeType === '05' ? '次':limitTimeText}}
      <p class="charge-form-tip price-tip">
          价格大于等于0元，次数或者月数是大于1的整数
        </p>
      <el-form-item label="购买限制：" prop="countLimit">
        <el-radio class="radio" v-model="form.countLimit" :label="-1">不限制</el-radio>
        <el-radio class="radio" v-model="form.countLimit" :label="1">限制一次</el-radio>
      </el-form-item>
      <el-form-item label="使用限制：" prop="monthLimit">
        <el-input-number v-model="form.monthLimit" :min="0" :max="10"></el-input-number>
        <span>{{form.chargeType === '05' ? '次':limitTimeText}}</span>
        <span>(0为无限制)</span>
        <p class="charge-form-tip">      
          次数或者{{limitTimeText}}数是大于1的整数
        </p>
      </el-form-item>
      <el-form-item label="生效日期：" prop="effectDate">
        <el-date-picker
          v-model="form.effectDate"
          type="date"
          @change="changeEffectDate"
          placeholder="选择生效日期"
          :picker-options="effectPickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="失效日期：" prop="expireDate">
        <el-date-picker
          v-model="form.expireDate"
          type="date"
          @change="changeExpireDate"
          placeholder="选择失效日期"
          :picker-options="expirePickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="套餐说明：" prop="description">
        <el-input v-model="form.description" type="textarea" auto-complete="off" placeholder="套餐说明"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import API from 'common/api'
  import _ from 'lodash'
  import {price} from 'common/validation'
  require('common/utils/date')
  export default {
    props: ['visible', 'defaultIndex', 'type', 'serviceId'],
    data () {
      var vm = this
      return {
        dialogVisible: this.visible,
        chargeTypeOptions: [
          {
            value: '05',
            label: '按次数'
          },{
            value: '04',
            label: '按时间'
          }
        ],
        effectPickerOptions: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        expirePickerOptions: {
          disabledDate (time) {
            return time.getTime() < new Date(vm.form.effectDate).addDays(1).getTime() - 8.64e7;
          }
        },
        form: {
          chargeType: '05',
          name: '',
          price: '',
          flag: 'C',
          countLimit: -1,
          boughtLimit: -1,
          monthLimit: '',
          invokeLimit: '',
          chargeCount: '',
          effectDate: '',
          expireDate: '',
          description: '',
          serviceId: this.serviceId
        },
        rules: {
          chargeType: [
            {
              required: true,
              message: '请选择计费方式',
              trigger: 'change'
            }
          ],
          name: [
            {
              required: true,
              message: '请输入套餐名称',
              trigger: 'change'
            },{
              max: 50,
              message: '套餐名称不能超过20个字符',
              trigger: 'change'
            }
          ],
          price: [
            {
              required: true,
              message: '请输入套餐价格',
              trigger: 'change'
            },{
              validator: price,
              trigger: 'change'
            }
          ],
          effectDate: [
            {
              required: true,
              message: '请选择生效日期',
              trigger: 'change'
            }
          ],
          description: [
            {
              max: 500,
              message: '套餐说明不能超过500个字符',
              trigger: 'change'
            }
          ]
        }
      }
    },
    computed: {
      chargeRuleList () {
        return this.$store.getters.chargeRuleList
      },
      isTypeAPI () {
        return this.type === 'api'
      },
      isTypeSaas () {
        return this.type === 'saas'
      },
      limitTimeText () {
        return this.isTypeAPI ? '月' : '天'
      }
    },
    created () {
      if(this.defaultIndex !== '') {
        this.copyForm()
      }
    },
    methods: {
      handleClose (done) {
        this.resetForm('form')
        done()
        this.$emit('toggle', this.dialogVisible)
      },
      closeDialog () {
        this.resetForm('form')
        this.dialogVisible = false
        this.$emit('toggle', this.dialogVisible)
      },
      submit () {
        this.$refs['form'].validate((valid) => {
          if(valid) {
            let copiedForm = Object.assign({}, this.form)
            if(!this.isTypeAPI) {
              copiedForm.invokeLimit = copiedForm.monthLimit
            }
            if(this.isTypeSaas) {
              copiedForm.boughtLimit = copiedForm.countLimit
            }
            this.$emit('submit', copiedForm)
            this.closeDialog()
          }else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.form = {
          id: '',
          chargeType: '05',
          name: '',
          price: '',
          flag: 'C',
          countLimit: -1,
          boughtLimit: -1,
          monthLimit: '',
          invokeLimit: '',
          chargeCount: '',
          effectDate: '',
          expireDate: '',
          description: '',
          serviceId: this.serviceId
        }
      },
      changeEffectDate (date) {
        this.form.effectDate = date
        this.form.expireDate = ''
      },
      changeExpireDate (date) {
        this.form.expireDate = date
      },
      copyForm () {
        let copiedForm = Object.assign({}, this.chargeRuleList[this.defaultIndex])
        copiedForm.price = copiedForm.price + ''
        copiedForm.effectDate = copiedForm.effectDate && new Date(copiedForm.effectDate).format('yyyy-MM-dd')
        copiedForm.expireDate = copiedForm.expiryDate && new Date(copiedForm.expiryDate).format('yyyy-MM-dd')
        if(copiedForm.flag !== 'C') {
         copiedForm.flag = 'U' 
        }
        this.form = copiedForm
      }
    },
    watch: {
      visible () {
        this.dialogVisible = this.visible
      },
      categoryId () {
        this.getTags()
      },
      defaultIndex () {
        if(this.defaultIndex !== '') {
          this.copyForm()
        }
      }
    }
  }
</script>
<style lang="less">
  .charge-form-dialog {
    width: 550px;
    position: relative;
    height: 550px;
    overflow: auto;
    .form {
      .inline-form-item {
        display: inline-block;
      }
      .charge-form-tip {
        font-size: 12px;
        margin-top: 3px;
        color: #aaa;
        &.price-tip {
          margin-left: 120px;
          margin-top: -5px;
        }
      }
      .el-form-item__content {
        width: 70%;
      }
      .charge-price-ipt {
        width: 130px;
      }
    }
    
  }
</style>