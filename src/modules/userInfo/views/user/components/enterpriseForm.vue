<template>
  <el-form :model="enterpriseForm" label-width="140px" ref="enterpriseForm" :rules="enterpriseRules" class="form" v-loading="enterpriseLoading.status" :element-loading-text="enterpriseLoading.tip" v-loading-response="enterpriseResponse">
    <h2>企业信息</h2>
    <el-form-item label="公司名称" prop="name">
      <el-input v-model="enterpriseForm.name" auto-complete="off" placeholder="请输入公司名称">
      </el-input>
    </el-form-item>
    <el-form-item label="详情地址" prop="address">
      <el-input v-model="enterpriseForm.address" auto-complete="off" placeholder="请输入详情地址">
      </el-input>
    </el-form-item>
    <el-form-item label="营业执照编号" prop="licenceNo">
      <el-input v-model="enterpriseForm.licenceNo" auto-complete="off" placeholder="请输入营业执照编号">
      </el-input>
    </el-form-item>
    <el-form-item label="税务登记证编号" prop="taxRegisterNo">
      <el-input v-model="enterpriseForm.taxRegisterNo" auto-complete="off" placeholder="请输入税务登记证编号"></el-input>
    </el-form-item>
    <el-form-item label="组织机构编号" prop="organizationCode">
      <el-input v-model="enterpriseForm.organizationCode" auto-complete="off" placeholder="请输入组织机构编号">
      </el-input>
    </el-form-item>
    <el-form-item label="营业执照副本" prop="licencePicUrl">
      <c-upload id="fileId" v-on:uploaded="handleLicencePicSuccess" name="photo" :url="licencePicUrl">
        <el-upload slot="elUpload" id="licencePic" name="photo" :action="licencePicUrl" :on-success="handleLicencePicSuccess" :show-file-list="false">
          <!-- <el-button type="ghost" icon="ios-cloud-upload-outline">上传图片</el-button> -->
          <img v-if="enterpriseForm.licencePicUrl" :src="enterpriseForm.licencePicUrl" class="picture">
          <i v-else class="el-icon-plus picture-uploader-icon"></i>
        </el-upload>
      </c-upload>
      <div class="el-form-item__error">{{licencePicError}}</div>
    </el-form-item>
    <h2>联系人信息</h2>
    <el-form-item label="联系人姓名" prop="contractName">
      <el-input v-model="enterpriseForm.contractName" auto-complete="off" placeholder="请输入联系人姓名">
      </el-input>
    </el-form-item>
    <el-form-item label="联系人身份证号" prop="contractIdcard">
      <el-input v-model="enterpriseForm.contractIdcard" auto-complete="off" placeholder="请输入联系人身份证号">
      </el-input>
    </el-form-item>
    <el-form-item label="手机号码" prop="contractMobile">
      <el-input v-model="enterpriseForm.contractMobile" auto-complete="off" placeholder="请输入手机号码">
      </el-input>
    </el-form-item>
    <el-form-item label="公司邮箱" prop="contractEmail">
      <el-input v-model="enterpriseForm.contractEmail" auto-complete="off" placeholder="请输入公司邮箱">
      </el-input>
    </el-form-item>
    <el-form-item prop="agreement">
      <el-checkbox v-model="enterpriseForm.agreement">阅读并接受</el-checkbox>
      <a href="realNameProtocol.html" target="_blank">《神州数码智慧校园用户实名认证协议》</a>
      </el-form-item>
    <el-form-item>
      <el-button type="primary" :icon="submitBtnCtrl.icon" :loading="submitBtnCtrl.loading" :disabled="submitBtnCtrl.disabled" class="confirm-btn" @click="submitForm('enterpriseForm')">{{submitBtnCtrl.text}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {mobile, bussinessCard, cardId} from 'common/validation'
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
        licencePicUrl: API.UC.licencePicUrl,
        licencePicError: '',
        enterpriseForm: {
          name: '',
          address: '',
          licenceNo: '',
          taxRegisterNo: '',
          organizationCode: '',
          licencePicUrl: '',
          licenceImageId: '',
          contractName: '',
          contractIdcard: '',
          contractMobile: '',
          contractEmail: '',
          agreement: []
        },
        enterpriseLoading: {
          status: false,
          tip: ''
        },
        enterpriseResponse: {},
        enterpriseRules: {
          name: [
            {
              required: true,
              message: '请输入公司名称',
              trigger: 'change'
            }, {
              max: 500,
              message: '公司名称不能超过500个字符',
              trigger: 'change'
            }, {
              min: 2,
              message: '公司名称至少两个字符',
              trigger: 'change'
            }
          ],
          address: [
            {
              required: true,
              message: '请输入详情地址',
              trigger: 'change'
            }, {
              max: 500,
              message: '详情地址不能超过500个字符',
              trigger: 'change'
            }
          ],
          licenceNo: [
            {
              required: true,
              message: '请输入营业执照编号',
              trigger: 'change'
            },{
              validator: bussinessCard,
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
              validator: mobile,
              trigger: 'change'
            }
          ],
          licencePicUrl: [
            {
              required: true,
              message: '请上传营业执照',
              trigger: 'change'
            }
          ],
          contractName: [
            {
              required: true,
              message: '请输入联系人姓名',
              trigger: 'change'
            },{
              max: 20,
              message: '联系人姓名不能超过20个字符',
              trigger: 'change'
            },{
              min: 2,
              message: '联系人姓名至少2个字符',
              trigger: 'change'
            }

          ],
          contractIdcard: [
            {
              required: true,
              message: '请输入联系人身份证号',
              trigger: 'change'
            },{
              validator: cardId,
              trigger: 'change'
            }
          ],
          contractMobile: [
            {
              required: true,
              message: '请输入联系电话',
              trigger: 'change'
            },{
              validator: mobile,
              trigger: 'change'
            }
          ],
          contractEmail: [
            {
              type: 'email',
              required: true,
              message: '请输入正确的公司邮箱',
              trigger: 'change'
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
      _.extend(this.enterpriseForm, this.model)
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      handleLicencePicSuccess (res) {
        this.licencePicError = ''
        this.enterpriseForm.licenceImageId = ''
        this.enterpriseForm.licencePicUrl = ''
        if(res.status === 'OK') {
          this.enterpriseForm.licenceImageId = res.result.imageId
          this.enterpriseForm.licencePicUrl = res.result.imageUrl
        }else {
          this.licencePicError = res.message
        }
      },
      submitForm (form) {
        this.licencePicError = ''
        this.$refs[form].validate((valid) => {
          if(valid) {
            this.enterpriseLoading.status = true
            // 新增企业实名认证
            if(!this.isAuthorizing) {
              API.UC.addEnterpriseAuth(this.enterpriseForm).then((res) => {
                this.enterpriseResponse = res
                this.enterpriseLoading.tip = '提交成功'
                setTimeout(() => {
                  this.enterpriseLoading.status = false
                  this.$router.push({name: 'userDefault'})
                }, 3000)
              }).catch((res) => {
                this.enterpriseResponse = res
                this.enterpriseLoading.tip = res.message
                setTimeout(() => {
                  this.enterpriseLoading.status = false
                }, 3000)
              })
            }else {
              // 修改企业实名认证
              this.enterpriseForm.account = this.user.account
              API.UC.updateEnterpriseAuth(this.enterpriseForm).then((res) => {
                this.enterpriseResponse = res
                this.enterpriseLoading.tip = '提交成功'
                setTimeout(() => {
                  this.enterpriseLoading.status = false
                  this.$router.push({name: 'userDefault'})
                }, 3000)
              }).catch((res) => {
                this.enterpriseResponse = res
                this.enterpriseLoading.tip = res.message
                setTimeout(() => {
                  this.enterpriseLoading.status = false
                }, 3000)
              })
            }
            
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
  
</style>