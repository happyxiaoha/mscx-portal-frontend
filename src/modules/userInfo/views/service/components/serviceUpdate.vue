<template>
  <el-dialog title="调价" custom-class="charge-form-dialog" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-form label-width="120px" class="form">
      <el-form-item label="计费方式：">
        {{form.chargeType === '05' ? '按次数' : '按时间'}}
      </el-form-item>
      <el-form-item label="套餐名称：">
        {{form.name}}
      </el-form-item>
      <el-form-item class="inline-form-item" label="套餐价格：">
        {{form.price}}元/{{form.chargeType === '05' ? '次':'天'}}
      </el-form-item>
      <el-form-item label="购买限制：">
        {{form.boughtLimit == -1 ? '不限制' : '限制一次'}}
      </el-form-item>
      <el-form-item label="使用限制：">
        {{form.invokeLimit}}{{form.chargeType === '05' ? '次':'天'}}
      </el-form-item>
      <el-form-item label="生效日期：" prop="effectDate">
        {{form.effectDate}}
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
        <p>{{form.description}}</p>
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
        expirePickerOptions: {
          disabledDate (time) {
            return time.getTime() < new Date(vm.form.effectDate).addDays(1).getTime() - 8.64e7;
          }
        },
        form: {
          id: '',
          chargeType: '05',
          name: '',
          price: '',
          flag: 'U',
          boughtLimit: -1,
          invokeLimit: '',
          chargeCount: '',
          effectDate: '',
          expireDate: '',
          expiryDate: '',
          description: '',
          saasId: this.serviceId
        },
      }
    },
    computed: {
      chargeRuleList () {
        return this.$store.getters.chargeRuleList
      }
    },
    created () {
      if(this.defaultIndex !== '') {
        this.copyForm()
      }
    },
    methods: {
      handleClose (done) {
        done()
        this.$emit('toggle', this.dialogVisible)
      },
      closeDialog () {
        this.dialogVisible = false
        this.$emit('toggle', this.dialogVisible)
      },
      submit () {
        let copiedForm = Object.assign({}, this.form)
        copiedForm.expiryDate = copiedForm.expireDate
        this.$emit('submit', copiedForm)
        this.closeDialog()          
      },
      resetForm (formName) {
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
          expiryDate: '',
          description: '',
          appId: this.serviceId
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
        copiedForm.flag = 'U'
        this.form = copiedForm
      }
    },
    watch: {
      visible () {
        this.dialogVisible = this.visible
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