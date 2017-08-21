<template>
  <el-dialog title="方案详情" custom-class="apply-dialog" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-form :model="form" class="apply-form" ref="form" :rules="rules" v-loading="loading.status" :element-loading-text="loading.tip" v-loading-response="response" label-width="100px">
      <el-form-item label="报价" prop="price">
        <el-input v-model="form.price" name="price" auto-complete="off" placeholder="请输入报价">
        </el-input>
      </el-form-item>
      <el-form-item label="方案简介" prop="planIntro">
        <el-input v-model="form.planIntro" name="planIntro" type="textarea" auto-complete="off" placeholder="请输入方案简介"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contactUsername">
        <el-input v-model="form.contactUsername" name="contactUsername" auto-complete="off" placeholder="请输入联系人">
        </el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="contactPhone">
        <el-input v-model="form.contactPhone" name="contactPhone" auto-complete="off" placeholder="请输入联系方式" @keyup.enter.native="submitForm('form')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="submitBtnCtrl.disabled" class="confirm-btn" @click="submitForm('form')">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
  import API from 'common/api'
  import {contactWay, price} from 'common/validation'
  import _ from 'lodash'
  import loadingResponse from 'common/directive/response'
  export default {
    props: ['visible', 'id'],
    data () {
      return {
        dialogVisible: this.visible,
        submitBtnCtrl: {
          disabled: false
        },
        loading: {
          status: false,
          tip: ''
        },
        response: {},
        form: {
          reqId: this.id,
          price: '',
          planIntro: '',
          contactUsername: '',
          contactPhone: '',
        },
        rules: {
          price: [
            {
              required: true,
              message: '请输入报价',
              trigger: 'change'
            },{
              validator: price,
              trigger: 'change'
            }
          ],
          planIntro: [
            {
              required: true,
              message: '请输入方案简介',
              trigger: 'change'
            }, {
              max: 500,
              message: '方案简介不能超过500个字符',
              trigger: 'change'
            }
          ],
          contactUsername: [
            {
              required: true,
              message: '请输入联系人',
              trigger: 'change'
            },{
              max: 50,
              message: '联系人不能超过50个字符',
              trigger: 'change'
            }
          ],
          contactPhone: [
            {
              required: true,
              message: '请输入联系方式',
              trigger: 'change'
            },{
              max: 20,
              message: '联系电话不能超过20个字符',
              trigger: 'change'
            },{
              validator: contactWay,
              trigger: 'change'
            }
          ]
        }
      }
    },
    created () {
      
    },
    methods: {
      handleClose (done) {
        this.resetForm('form')
        done()
        this.$emit('toggle', this.dialogVisible)
      },
      closeDialog () {
        this.dialogVisible = false
        this.$emit('toggle', this.dialogVisible)
      },
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            this.loading.status = true
            API.Demand.addServiceDemandOrder(this.form).then((res) => {
              this.response = res;
              if(res.status === 'OK') {
                this.loading.tip = '接单申请提交成功，等待发布人审核'
              }else {
                this.loading.tip = res.message || '接单失败！'
              }
              setTimeout(() => {
                this.resetForm('form')
                this.closeDialog()
              }, 3000)
            }).catch((res) => {
              this.response = res;
              this.loading.tip = res.message || '接单失败！'
              setTimeout(() => {
                this.loading.status = false
              }, 3000)
            })
          }else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.submitBtnCtrl = {
          disabled: false
        }
        this.fileName = ''
        this.loading.status = false
      }
    },
    watch: {
      visible () {
        this.dialogVisible = this.visible
      }
    }
  }
</script>
<style lang="less">
  .apply-dialog {
    width: 530px;
    position: relative;
    overflow: hidden;
    .submit-message {
      position: absolute;
      left: 0;
      top: 42px;
    }
    .apply-content {
      min-height: 250px;
    }
    .confirm-btn {
      float: right;
      display: block;
      margin-left: 15px;
    }
  }
</style>