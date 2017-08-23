<template>
  <div class="user-auth">
    <el-tabs type="border-card" @tab-click="changeTab" v-if="!isEnterpriseAuthorized">
      <el-tab-pane label="个人">
        <div class="user-auth-person" v-if="isPersonAuthorized">
          <ul>
            <li>
              <label>用户名：</label>
              <span>{{personAuth.name}}</span>
            </li>
            <li>
              <label>姓名：</label>
              <span>{{personAuth.name}}</span>
            </li>
            <li>
              <label>身份证号码：</label>
              <span>{{personAuth.idcard}}</span>
            </li>
            <li>
              <label>认证方式：</label>
              <span>{{certificationMap[personAuth.certificationType]}}</span>
            </li>
            <li>
              <label>个人照片：</label>
              <span>
                <img :src="personAuth.photoUrl">
              </span>
            </li>
          </ul>
        </div>
        <div class="user-auth-person" v-else>
          <c-person></c-person>
        </div>
      </el-tab-pane>
      <el-tab-pane label="企业">
        <c-enterprise :model="enterpriseAuth" :isAuthorizing="isEnterpriseAuthorizing" v-if="loadEnterpriseForm"></c-enterprise>
      </el-tab-pane>
    </el-tabs>
    <div class="user-auth-enterprise" v-else>
      <h2>企业信息</h2>
      <ul>
        <li>
          <label>公司名称：</label>
          <span>{{enterpriseAuth.name}}</span>
        </li>
        <li>
          <label>详情地址：</label>
          <span>{{enterpriseAuth.address}}</span>
        </li>
        <li>
          <label>营业执照编号：</label>
          <span>{{enterpriseAuth.licenceNo}}</span>
        </li>
        <li>
          <label>税务登记证编号：</label>
          <span>{{enterpriseAuth.taxRegisterNo || '-'}}</span>
        </li>
        <li>
          <label>组织机构编号：</label>
          <span>{{enterpriseAuth.organizationCode || '-'}}</span>
        </li>
        <li>
          <label>营业执照副本：</label>
          <span>
            <img :src="enterpriseAuth.licencePicUrl">
          </span>
        </li>
      </ul>
      <h2>联系人信息</h2>
      <ul>
        <li>
          <label>联系人姓名：</label>
          <span>{{enterpriseAuth.contractName}}</span>
        </li>
        <li>
          <label>联系人身份证号：</label>
          <span>{{enterpriseAuth.contractIdcard}}</span>
        </li>
        <li>
          <label>手机号码：</label>
          <span>{{enterpriseAuth.contractMobile}}</span>
        </li>
        <li>
          <label>公司邮箱：</label>
          <span>{{enterpriseAuth.contractEmail}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import enterpriseForm from './components/enterpriseForm'
  import personForm from './components/personForm'
  import API from 'common/api'
  import _ from 'lodash'
  export default {
    //企业认证中whk016
    //仅个人认证lxy1111
    // 企业认证完成 => 仅显示企业信息
    // 企业认证中 => 显示个人认证，企业认证update的form
    // 未进行个人认证 => 显示个人认证，企业认证add的form
    // 个人认证完成 => 显示个人认证只读信息，企业认证add/update的form
    data () {
      return {
        isEnterpriseAuthorized: '',
        isEnterpriseAuthorizing: '',
        isPersonAuthorized: '',
        personAuth: {},
        enterpriseAuth: {},
        loadEnterpriseForm: false,
        certificationMap: {
          '01': '照片认证',
          '02': '手机认证',
          '03': '银行卡号认证'
        }
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    created () {
      API.UC.getEnterpriseAuth().then((res) => {
        if(res.result) {
          this.isEnterpriseAuthorized = res.result.status === '02'
          this.isEnterpriseAuthorizing = res.result.status === '01'
          this.enterpriseAuth = res.result
          this.loadEnterpriseForm = true
        }else {
          this.getPersonAuth()
          this.loadEnterpriseForm = true
        }
      })
    },
    methods: {
      changeTab (tab, event) {
        console.log(tab, event)
      },
      getPersonAuth () {
        API.UC.getPersonAuth().then((res) => {
          if(res.result) {
            this.isPersonAuthorized = true
            this.personAuth = res.result
          }else {
            this.isPersonAuthorized = false
          }
        })
      },
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
      }
    },
    components: {
      'c-enterprise': enterpriseForm,
      'c-person': personForm
    }
  }
</script>
<style lang="less">
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .user-auth {
    background: #fff;
    .box-shadow();
    .user-auth-enterprise, .user-auth-person {
      padding: 30px 36px;
      h2 {
        margin: 0 0 15px 0;
      }
      li {
        line-height: 30px;
        margin: 10px 0;
        label {
          width: 120px;
          text-align: right;
          margin-right: 25px;
          display: inline-block;
          color: #999;
        }
        img {
          width: 170px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .form {
      padding: 30px 35% 30px 36px;
      box-sizing: border-box;
      h2 {
        margin-bottom: 20px;
      }
      .picture-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
          border-color: #20a0ff;
        }
      }
      .picture {
        width: 178px;
        height: 178px;
        display: block;
      }
    }    
  }
</style>