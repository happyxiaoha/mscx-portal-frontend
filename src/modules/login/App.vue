<template>
  <div class="layout">
    <c-header type="login"></c-header>
    <div class="login-content grid-l">
      <div class="main-icon">
        <img src="./images/login-main-icon.png">
      </div>
      <div class="login-form-wrapper" v-loading="loading">
        <div class="form-title">
          <h1>登录神州数云平台</h1>
        </div>
        <el-form :model="form" ref="form" :rules="rules" class="login-form">
          <div class="err-msg" v-if="isError">{{errMsg}}</div>
          <el-form-item prop="loginName">
            <el-input v-model="form.loginName" @keyup.native="typingFormItem" placeholder="用户名/手机号">
              <template slot="prepend"><img class="pre-icon" src="./images/login-user-icon.png"></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" @keyup.native="typingFormItem" placeholder="登录密码" auto-complete="off">
              <template slot="prepend"><img class="pre-icon" src="./images/login-pwd-icon.png"></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input type="text" v-model="form.captcha" @keyup.enter.native="submitLoginForm('form')" class="captcha-ipt" placeholder="验证码" auto-complete="off"></el-input>
            <img :src="src" @click="refreshCaptcha" class="captcha-img" alt="验证码">
          </el-form-item>
          <a href="javascript:;" @click="showForgetPwd" class="forget-pwd">忘记密码？</a>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="submitLoginForm('form')">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="form-footer">
          <a href="register.html" class="register-link">立即注册</a>
        </div>
      </div>
    </div>
    <c-footer></c-footer>
    <forget-dialog :visible="dialogVisible" @toggle="toggleVisible"></forget-dialog>
  </div>
</template>
<script>
  import API from 'common/api/index'
  import footer from 'components/footer/simpleFooter'
  import header from 'components/header/simpleHeader'

  export default {
    data: function() {
      return {
        form: {
          loginName: '',
          password: '',
          captcha: ''
        },
        loading: false,
        isError: false,
        errMsg: '',
        src: '/login/captcha.do?t='+ new Date().getTime(),
        dialog: '',
        dialogVisible: false,
        rules: {
          loginName: [
            { 
              required: true,
              message: '请输入用户名',
              trigger: 'change'
            },{
              min: 6,
              max: 20,
              message: '用户名长度在 6 到 20 个字符之间',
              trigger: 'change'
            }
          ],
          password: [
            { 
              required: true,
              message: '请输入密码',
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
          ]
        }
      }
    },
    created: function () {
    },
    components: {
      'c-footer': footer,
      'c-header': header,
      'forget-dialog': function(resolve) {
        require(['./forgetPwd'], resolve)
      }
    },
    methods: {
      submitLoginForm: function(loginForm) {
        this.$refs[loginForm].validate(function(valid) {
          if(valid) {
            this.loading = true;
            API.Common.login(this.form).then(function(res) {
              this.loading = false;
              // 记录登录用户
              API.UC.recordLoginInfo(this.form).then(() => {
                this.redirectToIndex()
              }).catch(() => {
                this.redirectToIndex()
              })
            }.bind(this)).catch(function(res) {
              this.isError = true;
              this.errMsg = res.message;
              this.loading = false;
              this.refreshCaptcha()
            }.bind(this))
          }else {
            return false;
          }
        }.bind(this))
      },
      redirectToIndex: function() {
        var nHref = location.search.replace('?service=','');
        if(nHref){
            location.href = decodeURIComponent(nHref);
        }
        else{
            location.href = 'index.html';
        }
      },
      refreshCaptcha: function() {
        this.src = '/login/captcha.do?t=' + new Date().getTime()
      },
      showForgetPwd: function() {
        this.dialogVisible = true
      },
      toggleVisible: function(arg) {
        this.dialogVisible = arg
      },
      typingFormItem: function() {
        this.isError = false
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/less/variables.less";
  .layout {
    background: #fff;
    .login-content {
      padding: 50px 0;
      overflow: hidden;
      .main-icon {
        float: left;
      }
      .login-form-wrapper {
        float: left;
        height: 410px;
        width: 324px;
        margin-left: 15%;
        box-shadow: 0 2px 17px rgba(0,0,0,.15);
        .form-title {
          height: 70px;
          padding-left: 35px;
          line-height: 70px;
          border-bottom: 1px solid #eee;
        }
        .login-form {
          padding: 27px 35px 10px 35px;
          position: relative;
          // .el-form-item__error {
          //   left: 40px;
          // }
          .pre-icon {
            vertical-align: middle;
          }
          .captcha-ipt {
            width: 160px;
          }
          .captcha-img {
            margin-left: 5px;
            border: 1px solid #8391a5;
            vertical-align: middle;
            display: inline-block;
          }
          .login-btn {
            width: 100%;
            border-radius: 0;
          }
          .forget-pwd {
            float: right;
            margin-top: -15px;
            margin-bottom: 15px;
          }
          .err-msg {
            position: absolute;
            top: 5px;
            left: 35px;
            color: #ff4949;
            padding-left: 20px;
            font-size: 12px;
            background: url(./images/error-icon.png) left center no-repeat;
            background-size: 16px 16px;
          }
        }
        .form-footer {
          height: 50px;
          line-height: 50px;
          background: #fafafa;
          padding: 0 35px;
          .register-link {
            float: right;
            color: #0ca6ff;
            padding-left: 20px;
            background: url(./images/login-right-icon.png) left center no-repeat;
          }
        }
      }
    }
  }
</style>
