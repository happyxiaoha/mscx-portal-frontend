<template>
  <el-dialog title="需求" custom-class="offline-dialog" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-alert
      v-show="showSubmitMessage"
      :title="messageTitle"
      :type="messageType"
      show-icon
      class="submit-message"
      :closable="false">
    </el-alert>
    <el-form :model="form" label-width="100px" ref="form" :rules="rules" class="offline-form">
      <el-form-item label="需求" prop="resReq">
        <el-input v-model="form.resReq" type="textarea" auto-complete="off" placeholder="请输入需求">
        </el-input>
      </el-form-item>
      <el-form-item label="意向" prop="purpose">
        <el-input v-model="form.purpose" type="textarea" auto-complete="off" placeholder="请输入意向"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input v-model="form.contact" auto-complete="off" placeholder="请输入联系人">
        </el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="contactNo">
        <el-input v-model="form.contactNo" auto-complete="off" placeholder="请输入联系电话" @keyup.enter.native="submitForm('form')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="submitBtnCtrl.icon" :loading="submitBtnCtrl.loading" :disabled="submitBtnCtrl.disabled" class="confirm-btn" @click="submitForm('form')">{{submitBtnCtrl.text}}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
  import API from 'common/api'
  import {contactWay} from 'common/validation'
  import _ from 'lodash'
  export default {
    props: ['visible', 'apiServiceId', 'type', 'cname'],
    data () {
      return {
        dialogVisible: this.visible,
        showSubmitMessage: false,
        messageTitle: '',
        messageType: '',
        submitBtnCtrl: {
          icon: '',
          loading: false,
          disabled: false,
          text: '提交'
        },
        form: {
          resReq: '',
          purpose: '',
          contact: '',
          contactNo: ''
        },
        rules: {
          resReq: [
            {
              required: true,
              message: '请输入需求',
              trigger: 'change'
            },{
              max: 500,
              message: '需求不能超过500个字符',
              trigger: 'change'
            }
          ],
          purpose: [
            {
              required: true,
              message: '请输入意向',
              trigger: 'change'
            }, {
              max: 500,
              message: '意图不能超过500个字符',
              trigger: 'change'
            }
          ],
          contact: [
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
          contactNo: [
            {
              required: true,
              message: '请输入联系电话',
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
            // 提交线下洽谈申请
            _.extend(this.form, {
              apiServiceId: this.apiServiceId,
              type: this.type,
              cname: this.cname
            })
            this.submitBtnCtrl.loading = true
            this.submitBtnCtrl.disabled = true
            this.submitBtnCtrl.text = '正在提交'
            API.Contract.submitOfflineChat(this.form).then((res) => {
              this.submitBtnCtrl.loading = false
              this.submitBtnCtrl.text = '提交'
              this.showSubmitMessage = true
              if(res.status === 'OK') {
                this.messageType = 'success'
                this.messageTitle = '线下洽谈申请成功'
                setTimeout(() => {
                  this.resetForm('form')
                  this.closeDialog()
                }, 1000)
              }else {
                this.messageType = 'error'
                this.messageTitle = '线下洽谈申请失败'
              }
            })
          }else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.submitBtnCtrl = {
          text: '提交',
          icon: '',
          loading: false,
          disabled: false
        }
        this.showSubmitMessage = false
        this.messageTitle = ''
        this.messageType = ''
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
  .offline-dialog {
    width: 520px;
    position: relative;
    .submit-message {
      position: absolute;
      left: 0;
      top: 42px;
    }
    .offline-form {
      margin-top: 5px;
    }
  }
</style>