<template>
  <el-form :model="passwordForm" label-width="140px" ref="passwordForm" :rules="passwordRules" class="form" v-loading="passwordLoading.status" :element-loading-text="passwordLoading.tip" v-loading-response="passwordResponse">
    <el-form-item label="旧密码：" prop="oldPassword">
      <el-input type="password" v-model="passwordForm.oldPassword" auto-complete="off" placeholder="请填写旧密码">
      </el-input>
    </el-form-item>
    <el-form-item label="新密码：" prop="password">
      <el-input type="password" v-model="passwordForm.password" auto-complete="off" placeholder="请填写新密码">
      </el-input>
    </el-form-item>
    <el-form-item label="确认新密码：" prop="passwordConfirm">
      <el-input type="password" v-model="passwordForm.passwordConfirm" auto-complete="off" placeholder="请确认新密码">
      </el-input>
      </el-input>
    </el-form-item>
    <el-form-item>
      <label>注意：密码只能包含数字字母下划线中划线，8到20位</label>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :icon="submitBtnCtrl.icon" :loading="submitBtnCtrl.loading" :disabled="submitBtnCtrl.disabled" class="confirm-btn" @click="submitForm('passwordForm')">{{submitBtnCtrl.text}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {password} from 'common/validation'
  import loadingResponse from 'common/directive/response'
  import API from 'common/api'
  export default {
    data () {
      var validateConfirmPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.passwordForm.password) {
          callback(new Error('两次输入的新密码不一致'));
        } else {
          callback();
        }
      };
      return {
        submitBtnCtrl: {
          icon: '',
          loading: false,
          disabled: false,
          text: '提交'
        },
        passwordForm: {
          oldPassword: '',
          password: '',
          passwordConfirm: ''
        },
        passwordLoading: {
          status: false,
          tip: ''
        },
        passwordResponse: {},
        passwordRules: {
          oldPassword: [
            { 
              required: true,
              message: '请输入密码',
              trigger: 'change'
            }, {
              validator: password,
              trigger: 'change'
            }
          ],
          password: [
            { 
              required: true,
              message: '请填写新密码',
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
          ]
        }
      }
    },
    methods: {
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            this.passwordLoading.status = true
            API.Common.changePassword(this.passwordForm).then((res) => {
              this.passwordResponse = res
              this.passwordLoading.tip = '修改密码成功'
              setTimeout(() => {
                this.passwordLoading.status = false
                this.$router.push({name: 'userDefault'})
              }, 3000)
            }).catch((res) => {
              this.passwordResponse = res
              this.passwordLoading.tip = res.message
              setTimeout(() => {
                this.passwordLoading.status = false
              }, 3000)
            })
          }else {
            return false
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .form {
    padding: 30px 35% 30px 36px;
    box-sizing: border-box;
    height: 350px;
    box-sizing: border-box;
    background: #fff;
    .box-shadow();
  }

</style>