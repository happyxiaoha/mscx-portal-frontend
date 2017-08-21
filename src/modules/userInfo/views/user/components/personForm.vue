<template>
  <el-form :model="personForm" label-width="140px" ref="personForm" :rules="personRules" class="form" v-loading="personLoading.status" :element-loading-text="personLoading.tip" v-loading-response="personResponse">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="personForm.name" auto-complete="off" placeholder="请填写与有效身份证上一致的姓名">
      </el-input>
    </el-form-item>
    <el-form-item label="身份证号码" prop="idcard">
      <el-input v-model="personForm.idcard" auto-complete="off" placeholder="请填写有效身份证号码">
      </el-input>
    </el-form-item>
    <el-form-item label="认证方式" prop="certificationType">
      <el-select v-model="personForm.certificationType" placeholder="请选择">
        <el-option
          v-for="item in certificationOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </el-input>
    </el-form-item>
    <el-form-item label="个人照片" prop="photoId">
      <c-upload id="fileId" v-on:uploaded="handlePicSuccess" name="photo" :url="personPicUrl">
        <el-upload slot="elUpload" id="licencePic" name="photo" :action="personPicUrl" :on-success="handlePicSuccess" :show-file-list="false">
          <img v-if="personForm.photoUrl" :src="personForm.photoUrl" class="picture">
          <i v-else class="el-icon-plus picture-uploader-icon"></i>
        </el-upload>
      </c-upload>
      <label class="photo-tip">注意：照片中人像需要为唯一或者主要人脸，人像至少100×100像素，最大不要超过800x800像素</label>
      <div class="el-form-item__error">{{personPicError}}</div>
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <el-input v-model="personForm.captcha" class="captcha-ipt" placeholder="请输入验证码" auto-complete="off"></el-input>
      <img :src="captchaSrc" @click="refreshCaptcha" class="captcha-img" alt="验证码">
    </el-form-item>
    <el-form-item prop="agreement">
      <el-checkbox v-model="personForm.agreement">阅读并接受</el-checkbox>
      <a href="realNameProtocol.html" target="_blank">《神州数云用户实名认证协议》</a>
      </el-form-item>
    <el-form-item>
      <el-button type="primary" :icon="submitBtnCtrl.icon" :loading="submitBtnCtrl.loading" :disabled="submitBtnCtrl.disabled" class="confirm-btn" @click="submitForm('personForm')">{{submitBtnCtrl.text}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {cardId} from 'common/validation'
  import loadingResponse from 'common/directive/response'
  import API from 'common/api'
  import upload from 'components/upload/upload'
  import _ from 'lodash'
  export default {
    props: ['model', 'isAuthorizing'],
    data () {
      return {
        submitBtnCtrl: {
          icon: '',
          loading: false,
          disabled: false,
          text: '提交'
        },
        certificationOptions: [
          {
            value: '01',
            label: '照片认证'
          }
        ],
        captchaSrc: '/certification/captcha.do?t='+ new Date().getTime(),
        personPicUrl: API.UC.personPicUrl,
        personPicError: '',
        personForm: {
          name: '',
          idcard: '',
          certificationType: '01',
          photoId: '',
          photoUrl: '',
          captcha: '',
          agreement: []
        },
        personLoading: {
          status: false,
          tip: ''
        },
        personResponse: {},
        personRules: {
          name: [
            {
              required: true,
              message: '请输入姓名',
              trigger: 'change'
            }, {
              max: 20,
              message: '姓名不能超过20个字符',
              trigger: 'change'
            }, {
              min: 2,
              message: '姓名至少两个字符',
              trigger: 'change'
            }
          ],
          certificationType: [
            {
              required: true,
              message: '请选择认证方式',
              trigger: 'change'
            }
          ],
          idcard: [
            {
              required: true,
              message: '请输入身份证号',
              trigger: 'change'
            },{
              validator: cardId,
              trigger: 'change'
            }
          ],
          photoId: [
            {
              required: true,
              message: '请上传个人照片',
              trigger: 'change'
            }
          ],
          captcha: [
            {
              required: true,
              message: '请填写验证码',
              trigger: 'change'
            },{
              len: 4,
              message: '验证码为四位',
            }
          ],
          agreement: [
            {
              required: true,
              type: 'array',
              message: '请阅读并接受实名认证协议'
            }
          ]
        }
      }
    },
    created () {
      _.extend(this.personForm, this.model)
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      handlePicSuccess (res) {
        this.personPicError = ''
        this.personForm.photoId = ''
        this.personForm.photoUrl = ''
        if(res.status === 'OK') {
          this.personForm.photoId = res.result.imageId
          this.personForm.photoUrl = res.result.imageUrl
        }else {
          this.personPicError = res.message
        }
      },
      refreshCaptcha () {
        this.captchaSrc = '/certification/captcha.do?t='+ new Date().getTime()
      },
      submitForm (form) {
        this.personPicError = ''
        
        this.$refs[form].validate((valid) => {
          if(valid) {
            this.personLoading.status = true
            // 新增个人实名认证
            API.UC.addPersonAuth(this.personForm).then((res) => {
              this.personResponse = res
              this.personLoading.tip = '提交成功'
              setTimeout(() => {
                this.personLoading.status = false
                this.$router.push({name: 'userDefault'})
              }, 3000)
            }).catch((res) => {
              this.personResponse = res
              this.personLoading.tip = res.message
              this.refreshCaptcha()
              setTimeout(() => {
                this.personLoading.status = false
              }, 3000)
            })
          }else {
            return false
          }
        })
      }
    },
    components: {
      'c-upload': upload
    }
  }
</script>
<style lang="less">
  .photo-tip {
    font-size: 12px;
  }
  .captcha-ipt {
    width: 160px;
  }
  .captcha-img {
    margin-left: 6px;
    border: 1px solid #8391a5;
    vertical-align: middle;
    display: inline-block;
  }
</style>