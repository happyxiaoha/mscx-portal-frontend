<template>
  <div class="demand-service-create-content grid-l">
    <h1>{{updateServiceId ? '修改服务开发需求' : '新增服务开发需求'}}</h1>
    <el-form :model="form" label-width="190px" ref="form" :rules="rules" class="form" v-loading="loading.status" :element-loading-text="loading.tip" v-loading-response="response">
      <el-form-item label="需求名称：" prop="name">
        <el-input v-model="form.name" name="name" auto-complete="off" placeholder="请输入需求名称"></el-input>
      </el-form-item>
      <el-form-item label="需求描述：" prop="description">
        <el-input v-model="form.description" type="textarea" name="description" auto-complete="off" placeholder="请输入需求描述"></el-input>
      </el-form-item>
      <el-form-item label="需求要求：" prop="required">
        <el-input v-model="form.required" type="textarea" name="required" auto-complete="off" placeholder="请输入需求要求"></el-input>
      </el-form-item>
      <el-form-item label="任务金额：" prop="money">
        <el-input v-model="form.money" name="money" auto-complete="off" placeholder="请输入任务金额"></el-input>
      </el-form-item>
      <el-form-item label="截止日期：" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          type="date"
          name="endTime"
          @change="changeEndTimeDate"
          placeholder="选择截止日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="主联系人信息：" prop="contactUsername">
        <el-input v-model="form.contactUsername" name="contactUsername" auto-complete="off" placeholder="请输入主联系人">
        </el-input>
      </el-form-item>
      <el-form-item label="主联系人电话：" prop="contactPhone">
        <el-input v-model="form.contactPhone" name="contactPhone" auto-complete="off" placeholder="请输入主联系人电话">
        </el-input>
      </el-form-item>
      <el-form-item label="备用联系人：">
        <el-input :value="user.name" disabled auto-complete="off" placeholder="请输入服务标识">
        </el-input>
      </el-form-item>
      <el-form-item label="备用联系人电话：">
        <el-input :value="user.mobile" disabled auto-complete="off" placeholder="请输入服务标识">
        </el-input>
      </el-form-item>
      <el-form-item label="是否需要平台撮合交易：" prop="matchmakeTrade">
        <el-radio class="radio" name="matchmakeTrade" v-model="form.matchmakeTrade" label="Y">是</el-radio>
        <el-radio class="radio" name="matchmakeTrade" v-model="form.matchmakeTrade" label="N">否</el-radio>
      </el-form-item>
      <el-form-item label="分类：" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="请选择" name="categoryId">
          <el-option
            v-for="item in categoryArr"
            :key="item.categoryId"
            :label="item.categoryName"
            :value="item.categoryId">
          </el-option>
        </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="需求用户：" prop="reqUser">
        <el-input v-model="form.reqUser" name="reqUser" auto-complete="off" placeholder="请输入需求用户"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="contactEmail">
        <el-input v-model="form.contactEmail" name="contactEmail" auto-complete="off" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="地址：" prop="contactAddress">
        <el-input v-model="form.contactAddress" name="contactAddress" auto-complete="off" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="submitBtnCtrl.icon" :loading="submitBtnCtrl.loading" :disabled="submitBtnCtrl.disabled" class="confirm-btn" @click="submitForm('form')">{{submitBtnCtrl.text}}</el-button>
        <el-button type="primary" class="confirm-btn" @click="history.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import loadingResponse from 'common/directive/response'
  import API from 'common/api'
  import {mobile} from 'common/validation'
  import _ from 'lodash'
  require('common/utils/date')
  export default {
    data () {
      return {
        updateServiceId: '',
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        form: {
          id: this.updateServiceId,
          name: '',
          description: '',
          required: '',
          money: '',
          endTime: '',
          reqUser: '',
          contactUsername: '',
          contactPhone: '',
          matchmakeTrade: 'Y',
          categoryId: '',
          contactEmail: '',
          contactAddress: ''
        },
        categoryArr: [],
        loading: {
          tip: '',
          status: false
        },
        response: {},
        submitBtnCtrl: {
          icon: '',
          loading: false,
          disabled: false,
          text: '保存'
        },
        rules: {
          name: [
            {
              required: true,
              message: '请输入需求名称',
              trigger: 'change'
            },{
              min: 2,
              max: 100,
              message: '需求名称最少2个字符，不超过100个字符',
              trigger: 'change'
            }
          ],
          description: [
            {
              required: true,
              message: '请输入需求描述',
              trigger: 'change'
            },{
              max: 500,
              message: '需求描述不超过500个字符',
              trigger: 'change'
            }
          ],
          required: [
            {
              required: true,
              message: '请输入需求要求',
              trigger: 'change'
            },{
              max: 500,
              message: '需求要求不超过500个字符',
              trigger: 'change'
            }
          ],
          money: [
            {
              required: true,
              message: '请输入任务金额',
              trigger: 'change'
            },{
              max: 50,
              message: '任务金额不超过50个字符',
              trigger: 'change'
            }
          ],
          endTime: [
            {
              required: true,
              message: '请输入截止日期',
              trigger: 'change'
            }
          ],
          contactUsername: [
            {
              required: true,
              message: '请输入主联系人',
              trigger: 'change'
            },{
              max: 50,
              message: '主联系人不超过64个字符',
              trigger: 'change'
            }
          ],
          contactPhone: [
            {
              required: true,
              message: '请输入主联系人电话',
              trigger: 'change'
            },{
              validator: mobile,
              trigger: 'change'
            }
          ],
          contactEmail: [
            {
              type: 'email',
              message: '请输入正确的邮箱格式',
              trigger: 'change'
            }
          ],
          matchmakeTrade: [
            {
              required: true,
              message: '请选择是否需要平台撮合交易',
              trigger: 'change'
            }
          ],
          categoryId: [
            {
              type: 'number',
              required: true,
              message: '请选择分类',
              trigger: 'change'
            }
          ]
        }
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    created () {
      this.updateServiceId = this.$route.params.id
      // 如果有updateServiceId，则进入修改模式
      if(this.updateServiceId) {
        API.Demand.getModifyServiceDetail({
          id: this.updateServiceId
        }).then((res) => {
          res.result.categoryId = +res.result.categoryId
          this.form = res.result
        }).catch((res) => {
        })
      }
      // 获取API分类信息
      API.Dict.getServiceCategory().then((res) => {
        this.categoryArr = res.result
      })
    },
    watch: {
    },
    methods: {
      changeEndTimeDate (date) {
        this.form.endTime = date
      },
      submitForm (form) {
        console.log(this.form)
        this.$refs[form].validate((valid) => {
          if(valid) {
            if(this.updateServiceId) {
              this.loading.status = true
              API.Demand.modifyService(this.form).then((res) => {
                this.response = res
                this.loading.tip = '修改成功，请至用户中心我的需求内发布！'
                setTimeout(() => {
                  this.loading.status = false
                  location.href = '/userInfo.html#/demand/service'
                }, 3000)
              }).catch((res) => {
                this.response = res
                this.loading.tip = res.message
                setTimeout(() => {
                  this.loading.status = false
                }, 3000)
              }).catch(()=>{})
            }else {
              this.loading.status = true
              API.Demand.addService(this.form).then((res) => {
                this.response = res
                this.loading.tip = '创建成功，请至用户中心我的需求内发布！'
                setTimeout(() => {
                  this.loading.status = false
                  location.href = '/userInfo.html#/demand/service'
                }, 3000)
              }).catch((res) => {
                this.response = res
                this.loading.tip = res.message
                setTimeout(() => {
                  this.loading.status = false
                }, 3000)
              }).catch(()=>{})
            }
          }else {
            return false
          }
        })
      }
    },
    components: {
      
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .demand-service-create-content {
    background: #fff;
    margin-top: 20px;
    padding: 24px 36px;
    box-sizing: border-box;
    .box-shadow();
    h1 {
      margin-bottom: 30px;
    }
    .form {
      width: 100%;
      .beauty-file {
        position: relative;
        cursor: pointer;
        width: 90px;
      }
      .btn-file{
        opacity: 0; 
        width: 130px;
        position: absolute;
        top: 0;
        left: 0;
        height: 40px;
      }
      .el-form-item__content {
        width: 60%;
      }
      .other-lan-ipt {
        display: inline-block;
        position: relative;
        width: 100px;
      }
      .picture-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
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
      .service-form-tip {
        font-size: 12px;
        margin-top: 3px;
        color: #aaa;
      }
      .picture {
        width: 100px;
        height: 100px;
        display: block;
      }
      .service-item-inline {
        display: inline-block;
        &.no-label-margin .el-form-item__content {
          margin-left: 0!important;
        }
      }
      .table-wrapper {
        overflow: hidden;
        position: relative;
        .custom-item-error {
          color: #ff4949;
          font-size: 12px;
          line-height: 1;
          padding-top: 4px;
          position: absolute;
          left: 0;
        }
      }
      .table {
        margin-bottom: 22px;
      }
      .btn-charge-rule, .btn-add-url {
        float: right;
        margin-bottom: 22px;
      }
      .el-tag {
        margin-right: 10px;
      }
    }
  }
</style>