<template>
  <div class="set-password">
    <el-tabs type="border-card">
      <el-tab-pane v-if="!hasAccount" label="设置密码">
        <div class="pass-area">
          <div class="pass-wrap">
            <h2>设置六位密码：</h2>
            <c-password-input @typing="handlePassword"></c-password-input>
          </div>
          <div class="pass-wrap">
            <h2>确认六位密码：</h2>
            <c-password-input @typing="handlePasswordConfirm"></c-password-input>
          </div>
          <el-button class="btn-set" :disabled="disableSubmit" @click="submit" type="primary">设置</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="hasAccount" label="修改密码">
        <div class="pass-area"> 
          <div class="pass-wrap">
            <h2>请输入六位原始密码：</h2>
            <c-password-input @typing="handleOldPassword"></c-password-input>
          </div>
          <div class="pass-wrap">
            <h2>请输入新六位密码：</h2>
            <c-password-input @typing="handlePassword"></c-password-input>
          </div>
          <div class="pass-wrap">
            <h2>请确认新六位密码：</h2>
            <c-password-input @typing="handlePasswordConfirm"></c-password-input>
          </div>
          <el-button class="btn-set" :disabled="disableModifySubmit" @click="submitModidy" type="primary">设置</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="hasAccount" label="忘记密码">
        <div class="pass-area">
          <el-form label-width="160px" :model="resetForm" ref="resetForm" :rules="resetRules">
            <el-form-item label="认证手机号：">
              <el-input class="account-input" :value="user.mobile" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="验证码：" prop="captcha">
              <el-input class="account-input" v-model="resetForm.captcha"></el-input>
              <img :src="captchaUrl" @click="refreshCaptcha" class="captcha-img" alt="验证码">
            </el-form-item>
            <el-form-item label="手机验证码：" prop="authCode">
              <el-input class="account-input" v-model="resetForm.authCode" :disabled="smsIptDisabled">
              </el-input>
              <el-button @click="sendAuthCode" :icon="smsBtnCtrl.icon" :loading="smsBtnCtrl.loading" :disabled="smsBtnCtrl.disabled">{{smsBtnCtrl.text}}</el-button>
            </el-form-item>
          </el-form>
          <div class="pass-wrap">
            <h2>请输入新六位密码：</h2>
            <c-password-input @typing="handleResetPassword"></c-password-input>
          </div>
          <div class="pass-wrap">
            <h2>请确认新六位密码：</h2>
            <c-password-input @typing="handleResetPasswordConfirm"></c-password-input>
          </div>
          <el-button class="btn-set" :disabled="disableResetSubmit" @click="submitReset" type="primary">设置</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import API from 'common/api'
  import passwordInput from 'components/passwordInput'
  require('common/utils/date')
  export default {
    data () {
      return {
        oldPassword: '',
        password: '',
        passwordConfirm: '',
        captchaUrl: '/forget/payPwd/captcha.do?t='+ new Date().getTime(),
        resetForm: {
          captcha: '',
          authCode: '',
          password: '',
          passwordConfirm: ''
        },
        smsIptDisabled: true,
        smsBtnCtrl: {
          text: '获取短信验证码',
          icon: '',
          loading: false,
          disabled: false
        },
        resetRules: {
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
          ]
        }
      }
    },
    created () {
      
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      hasAccount () {
        return this.$store.getters.hasAccount
      },
      disableSubmit () {
        if(this.password && 
            this.passwordConfirm && 
            /^\d+$/.test(this.password) &&
            /^\d+$/.test(this.passwordConfirm) &&
            this.password === this.passwordConfirm) {
          return false
        }else {
          return true
        }
      },
      disableModifySubmit () {
        if(this.oldPassword &&  
          this.password && 
          this.passwordConfirm && 
          /^\d+$/.test(this.password) &&
          /^\d+$/.test(this.passwordConfirm) &&
          /^\d+$/.test(this.oldPassword) &&
          this.password === this.passwordConfirm) {
          return false
        }else {
          return true
        }
      },
      disableResetSubmit () {
        if(this.resetForm.password &&
          this.resetForm.passwordConfirm && 
          /^\d+$/.test(this.resetForm.password) &&
          /^\d+$/.test(this.resetForm.passwordConfirm) &&
          this.resetForm.password === this.resetForm.passwordConfirm &&
          this.resetForm.authCode) {
          return false
        }else {
          return true
        }
      }
    },
    methods: {
      handleResetPassword (password) {
        this.resetForm.password = password
      },
      handleResetPasswordConfirm (password) {
        this.resetForm.passwordConfirm = password
      },
      handlePassword (password) {
        this.password = password
      },
      handlePasswordConfirm (password) {
        this.passwordConfirm = password
      },
      handleOldPassword (password ) {
        this.oldPassword = password
      },
      refreshCaptcha () {
        this.captchaUrl = '/forget/payPwd/captcha.do?t=' + new Date().getTime()
      },
      sendAuthCode () {
        // 必须输入手机号和验证码
        var canSendFlag = true;
        this.$refs.resetForm.validateField('captcha', function(errMsg) {
          canSendFlag = canSendFlag && !errMsg;
        });

        if(canSendFlag) {
          this.smsBtnCtrl.loading = true
          this.smsBtnCtrl.disabled = true
          this.smsBtnCtrl.text = '正在发送'

          API.Common.getResetPayPassSmsCode(this.resetForm).then(res => {
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
          }).catch((res) => {
            this.$message({
              message: res.message,
              type: 'warning'
            })
            this.refreshCaptcha()
            this.smsBtnCtrl.loading = false
            this.smsBtnCtrl.text = '发送失败'
            this.smsBtnCtrl.icon = ''
            setTimeout(() => {
              this.smsBtnCtrl.text = '重新发送'
              this.smsBtnCtrl.disabled = false
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
      submit () {
        API.Account.createPaypwd({
          payPwd: this.password
        }).then((res) => {
          this.$message({
            message: res.result,
            type: 'success'
          });
          setTimeout(() => {
            location.href = 'userInfo.html';
          }, 2000);
        }).catch(() => {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        })
      },
      submitModidy() {
        API.Account.changePwd({
          oldPwd: this.oldPassword,
          newPwd: this.password
        }).then((res) => {
          this.$message({
            message: res.result,
            type: 'success'
          });
          setTimeout(() => {
            location.href = 'userInfo.html';
          }, 2000);
        }).catch((res) => {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        })
      },
      submitReset () {
        API.Common.resetPayPassword(this.resetForm).then((res) => {
          this.$message({
            message: '重置支付密码成功！',
            type: 'success'
          });
          setTimeout(() => {
            location.href = 'userInfo.html';
          }, 2000);
        }).catch((res) => {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        })
      }
    },
    components: {
      'c-password-input': passwordInput
    }
  }
</script>
<style lang="less">
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .set-password {
    // .box-shadow();
    // box-sizing: border-box;
    // padding: 29px 25px;
    background: #fff;
    .el-form-item__label {
      padding-right: 0!important;
    }
    .account-input {
      width: 150px;
      &.account-sms-input {
        width: 280px;
      }
    }
    .captcha-img {
      border: 1px solid #8391a5;
      vertical-align: middle;
      display: inline-block;
    }
    .pass-area {
      padding: 80px 0 80px 180px;
      .btn-set {
        margin-left: 160px;
      }
    }
    .pass-wrap {
      height: 70px;
      position: relative;
      h2 {
        font-size: 14px;
        overflow: hidden;
        height: 50px;
        line-height: 50px;
        position: absolute;
        width: 160px;
        text-align: right;
      }
    }

  }
</style>