<template>
  <el-dialog title="重置密码" custom-class="pwd-dialog" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-alert
      v-show="showSubmitMessage"
      :title="messageTitle"
      :type="messageType"
      show-icon
      class="submit-message"
      :closable="false">
    </el-alert>
    <el-form :model="form" label-width="100px" ref="form" :rules="rules" class="forget-form">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" auto-complete="off" placeholder="请输入手机号">
          <template slot="prepend">+86</template>
        </el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input v-model="form.captcha" auto-complete="off" class="captcha-ipt" placeholder="请输入验证码"></el-input>
        <img :src="src" @click="refreshCaptcha" class="captcha-img" alt="验证码">
      </el-form-item>
      <el-form-item label="手机验证码" prop="authCode">
        <el-input v-model="form.authCode" :disabled="smsIptDisabled" auto-complete="off" placeholder="输入手机验证码">
          <el-button slot="append" @click="sendAuthCode" :icon="smsBtnCtrl.icon" :loading="smsBtnCtrl.loading" :disabled="smsBtnCtrl.disabled">{{smsBtnCtrl.text}}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off" placeholder="设置新密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码确认" prop="passwordConfirm">
        <el-input type="password" v-model="form.passwordConfirm" auto-complete="off" placeholder="确认新密码" @keyup.enter.native="submitForm('form')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="submitBtnCtrl.icon" :loading="submitBtnCtrl.loading" :disabled="submitBtnCtrl.disabled" class="confirm-btn" @click="submitForm('form')">{{submitBtnCtrl.text}}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
  import API from 'common/api/index'
  import {mobile, password} from 'common/validation'
  export default {
    props: ['visible'],
    data: function() {
      var validateConfirmPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };
      return {
        form: {
          mobile: '',
          captcha: '',
          authCode: '',
          password: '',
          passwordConfirm: ''
        },
        dialogVisible: this.visible,
        smsIptDisabled: true,
        smsBtnCtrl: {
          text: '获取短信验证码',
          icon: '',
          loading: false,
          disabled: false
        },
        submitBtnCtrl: {
          text: '确定',
          icon: '',
          loading: false,
          disabled: false
        },
        showSubmitMessage: false,
        messageTitle: '',
        messageType: '',
        src: '/forget/password/captcha.do?t='+ new Date().getTime(),
        rules: {
          mobile: [
            {
              required: true,
              message: '请输入手机号码',
              trigger: 'change'
            },{
              validator: mobile,
              trigger: 'change'
            }
          ],
          captcha: [
            {
              required: true,
              message: '请输入验证码',
              trigger: 'change'
            },{
              len: 4,
              message: '验证码为四位',
            }
          ],
          authCode: [
            {
              required: true,
              message: '请输入手机验证码',
              trigger: 'change'
            }
          ],
          password: [
            { 
              required: true,
              message: '请输入密码',
              trigger: 'change'
            }, {
              validator: password,
              trigger: 'change'
            }
          ],
          passwordConfirm: [
            { 
              required: true,
              message: '请再次输入密码',
              trigger: 'change'
            }, {
              validator: validateConfirmPwd,
              trigger: 'change'
            }
          ],
        }
      }
    },
    watch: {
      visible () {
        this.dialogVisible = this.visible
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
      refreshCaptcha () {
        this.src = '/forget/password/captcha.do?t=' + new Date().getTime()
      },
      sendAuthCode () {
        // 必须输入手机号和验证码
        var canSendFlag = true;
        this.$refs.form.validateField('mobile', function(errMsg) {
          canSendFlag = canSendFlag && !errMsg;
        });
        this.$refs.form.validateField('captcha', function(errMsg) {
          canSendFlag = canSendFlag && !errMsg;
        });

        if(canSendFlag) {
          this.smsBtnCtrl.loading = true
          this.smsBtnCtrl.disabled = true
          this.smsBtnCtrl.text = '正在发送'

          API.Common.getForgetSmsCode(this.form).then(res => {
            this.refreshCaptcha()
            if(res.status === 'OK') {
              this.smsBtnCtrl.loading = false
              this.smsBtnCtrl.text = '发送成功'
              this.smsBtnCtrl.icon = 'check'
              this.smsBtnCtrl.disabled = true
              this.smsIptDisabled = false
              setTimeout(() => {
                this.smsBtnCtrl.icon = ''
                this.startTimeout(60)
              }, 1000)
            }
          }).catch(() => {
            this.refreshCaptcha()
            this.smsBtnCtrl.loading = false
            this.smsBtnCtrl.text = '发送失败'
            this.smsBtnCtrl.icon = ''
            setTimeout(() => {
              this.smsBtnCtrl.text = '重新发送'
            }, 1000)
          })
        }
      },
      startTimeout (time) {
        time--;
        if(time === 0) {
          this.smsBtnCtrl.text = '获取手机验证码'
          this.smsBtnCtrl.disabled = false
          return
        }
        this.smsBtnCtrl.text = time + '秒后可重新发送'
        setTimeout(() => {
          this.startTimeout(time)
        }, 1000)
      },
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            this.submitBtnCtrl.loading = true
            this.submitBtnCtrl.disabled = true
            this.submitBtnCtrl.text = '正在提交'
            API.Common.resetPassword(this.form).then((res) => {
              // 重置密码成功
              this.submitBtnCtrl.loading = false
              this.submitBtnCtrl.text = '提交成功'
              this.showSubmitMessage = true
              this.messageType = 'success'
              this.messageTitle = '重置密码成功'
              setTimeout(() => {
                this.resetForm('form')
                this.closeDialog()
              }, 1000)
            }).catch((res) => {
              // 重置密码失败
              this.showSubmitMessage = true
              this.messageType = 'error'
              this.messageTitle = res.message || '重置密码失败'
              this.submitBtnCtrl.loading = false
              this.submitBtnCtrl.text = '确定'
              this.submitBtnCtrl.disabled = false
              this.refreshCaptcha()
            })
          }else {
            return false;
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.smsIptDisabled = true
        this.smsBtnCtrl = {
          text: '获取短信验证码',
          icon: '',
          loading: false,
          disabled: false
        }
        this.submitBtnCtrl = {
          text: '确定',
          icon: '',
          loading: false,
          disabled: false
        }
        this.showSubmitMessage = false
        this.messageTitle = ''
        this.messageType = ''
      }
    }
  }
</script>
<style lang="less">
  .pwd-dialog {
    width: 520px;
    position: relative;
    .submit-message {
      position: absolute;
      left: 0;
      top: 42px;
    }
  }
  .forget-form {
    padding: 15px 60px 0 50px;
    .captcha-ipt {
      width: 176px;
    }
    .captcha-img {
      margin-left: 6px;
      border: 1px solid #8391a5;
      vertical-align: middle;
      display: inline-block;
    }
    .confirm-btn {
      width: 100%;
    }
  }
</style>