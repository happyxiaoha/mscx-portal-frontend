<template>
  <div class="layout">
    <c-header type="register"></c-header>
    <div class="register-content grid-l">
      <div class="register-form-wrapper">
        <el-form :model="form" ref="form" label-width="100px" :rules="rules" class="register-form" v-loading="loading">
          <el-alert
            v-show="showSubmitMessage"
            :title="messageTitle"
            :type="messageType"
            show-icon
            class="submit-message"
            :closable="false">
          </el-alert>
          <el-form-item label="用户名" prop="account">
            <el-input v-model="form.account" class="register-input" placeholder="设置用户名">
            </el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input type="password" v-model="form.password" class="register-input" placeholder="设置你的登录密码" auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="密码确认" prop="passwordConfirm">
            <el-input type="password" v-model="form.passwordConfirm" class="register-input" placeholder="请再次输入你的密码" auto-complete="off">
            </el-input>
          </el-form-item>
          <hr/>
          <el-form-item label="手机号" prop="mobile">
            <el-input type="text" v-model="form.mobile" class="register-input" placeholder="请输入手机号" auto-complete="off">
              <template slot="prepend">+86</template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <el-input type="text" v-model="form.captcha" class="captcha-ipt" placeholder="验证码" auto-complete="off"></el-input>
            <img :src="src" @click="refreshCaptcha" class="captcha-img" alt="验证码">
          </el-form-item>
          <el-form-item label="手机验证码" prop="authCode">
            <el-input type="text" v-model="form.authCode" :disabled="smsIptDisabled" @keyup.enter.native="submitForm('form')" class="register-input" placeholder="验证码" auto-complete="off">
              <el-button slot="append" @click="sendAuthCode" :icon="smsBtnCtrl.icon" :loading="smsBtnCtrl.loading" :disabled="smsBtnCtrl.disabled">{{smsBtnCtrl.text}}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="agreement">
            <el-checkbox label="我已阅读并接受" v-model="form.agreement" name="agreement"></el-checkbox>
            <a href="registerProtocol.html">《智慧大厂用户注册协议》</a>
          </el-form-item>
          <el-form-item label-width="0">
            <el-button type="primary" class="register-btn" :disabled="submitBtnDisabled" @click="submitForm('form')">立即注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <c-footer></c-footer>
  </div>
</template>
<script>
  import API from 'common/api/index'
  import footer from 'components/footer/simpleFooter'
  import header from 'components/header/simpleHeader'
  import {mobile, password, account} from 'common/validation'

  export default {
    data: function() {
      var validateConfirmPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      }
      var validateAccount = (rule, value, callback) => {
        API.UC.checkAccount({account: value}).then((res) => {
          if(res.result) {
            callback(new Error('该用户名已经被注册，换个试试？'))
          }else {
            callback()  
          }
        }).catch((error) => {
          callback(new Error(error))
        })
      }
      var validateMobile = (rule, value, callback) => {
        API.UC.checkMobile({mobile: value}).then((res) => {
          if(res.result) {
            callback(new Error('该手机号已被使用啦，换个试试？'))
          }else {
            callback()  
          }
        }).catch((error) => {
          callback(new Error(error))
        })
      }
      return {
        form: {
          account: '',
          password: '',
          passwordConfirm: '',
          mobile: '',
          captcha: '',
          authCode: '',
          agreement: []
        },
        smsIptDisabled: true,
        smsBtnCtrl: {
          text: '获取短信验证码',
          icon: '',
          loading: false,
          disabled: false
        },
        submitBtnDisabled: false,
        loading: false,
        showSubmitMessage: true,
        messageType: '',
        messageTitle: '',
        src: '/register/captcha.do?t='+ new Date().getTime(),
        rules: {
          account: [
            {
              validator: account,
              trigger: 'change'
            },{
              min: 6,
              max: 20,
              message: '用户名长度在 6 到 20 个字符之间',
              trigger: 'change'
            },{
              validator: validateAccount,
              trigger: 'blur'
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
          mobile: [
            {
              required: true,
              message: '请输入手机号码',
              trigger: 'change'
            },{
              validator: mobile,
              trigger: 'change'
            },{
              validator: validateMobile,
              trigger: 'blur'
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
          agreement: [
            {
              type: 'array',
              required: true,
              message: '请阅读并勾选协议！'
            }
          ]
        }
      }
    },
    created: function () {
    },
    components: {
      'c-footer': footer,
      'c-header': header
    },
    methods: {
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            this.loading = true
            this.submitBtnDisabled = true
            API.Common.register(this.form).then((res) => {
              this.loading = false
              if(res.status === 'OK') {
                this.messageTitle = '注册成功'
                this.messageType = 'success'
                setTimeout(() => {
                  location.href = '/index.html'
                }, 1000)
              }else {
                this.showSubmitMessage = true
                this.messageTitle = res.message || '注册失败'
                this.messageType = 'error'
              }
            }).catch((res) => {
              this.loading = false
              this.submitBtnDisabled = false
              this.showSubmitMessage = true
              this.messageTitle = res || '注册失败'
              this.messageType = 'error'
            })
          }else {
            return false;
          }
        })
      },
      refreshCaptcha () {
        this.src = '/register/captcha.do?t=' + new Date().getTime()
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

          API.Common.getRegisterSmsCode(this.form).then(res => {
            if(res.status === 'OK') {
              this.smsBtnCtrl.loading = false
              this.smsBtnCtrl.text = '发送成功'
              this.smsBtnCtrl.icon = 'check'
              this.smsBtnCtrl.disabled = true
              this.smsIptDisabled = false
              setTimeout(() => {
                this.smsBtnCtrl.icon = ''
                this.startTimeout(60)
              })
            }
          }).catch(() => {
            this.refreshCaptcha();
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
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/less/variables.less";
  .layout {
    background: #fff;
    .register-content {
      padding: 60px 0;
      overflow: hidden;
      .main-icon {
        float: left;
      }
      .register-form-wrapper {
        height: 470px;
        width: 535px;
        margin: 0 auto;
        .register-form {
          padding: 0 50px;
          position: relative;
          .submit-message {
            position: absolute;
            left: 0;
            top: -45px;
          }
          hr {
            border-top: none;
            border-bottom: 1px dashed #bbb;
            margin-top: 16px;
            margin-bottom: 24px;
          }
          .register-input {
            width: 270px;
          }
          .pre-icon {
            vertical-align: middle;
          }
          .captcha-ipt {
            width: 175px;
          }
          .captcha-img {
            margin-left: 6px;
            border: 1px solid #8391a5;
            vertical-align: middle;
            display: inline-block;
          }
          .register-btn {
            width: 100%;
            height: 50px;
            border-radius: 0;
          }
        }
      }
    }
  }
</style>
