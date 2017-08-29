<template>
  <div class="demand-api-create-content grid-l">
    <h1>{{updateApiId ? '修改API开发需求' : '新增API开发需求'}}</h1>
    <el-form :model="form" label-width="190px" ref="form" :rules="rules" class="form" v-loading="loading.status" :element-loading-text="loading.tip" v-loading-response="response" v-submit-file-form="fileFormOption">
      <input type="hidden" name="id" :value="updateApiId">
      <el-form-item label="需求说明：" prop="name">
        <el-input v-model="form.name" name="name" auto-complete="off" placeholder="请输入需求说明"></el-input>
      </el-form-item>
      <el-form-item label="系统名称：" prop="sysName">
        <el-input v-model="form.sysName" name="sysName" auto-complete="off" placeholder="请输入系统名称"></el-input>
      </el-form-item>
      <el-form-item label="系统类型：" prop="sysType">
        <el-select v-model="form.sysType" placeholder="请选择" name="sysType">
          <el-option
            v-for="item in sysTypeArr"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="系统描述：" prop="sysDescription">
        <el-input v-model="form.sysDescription" name="sysDescription" type="textarea" auto-complete="off" placeholder="请输入系统描述"></el-input>
      </el-form-item>
      <el-form-item label="归属单位：" prop="department">
        <el-input v-model="form.department" name="department" auto-complete="off" placeholder="请输入归属单位">
        </el-input>
      </el-form-item>
      <el-form-item label="所有权：" prop="ownership">
        <el-radio class="radio" v-model="form.ownership" name="ownership" label="Y">是</el-radio>
        <el-radio class="radio" v-model="form.ownership" name="ownership" label="N">否</el-radio>
      </el-form-item>
      <el-form-item label="访问网址：" prop="site">
        <el-input v-model="form.site" name="site" auto-complete="off" placeholder="请输入http://开头的访问地址">
        </el-input>
      </el-form-item>
      <el-form-item label="网络性质：" prop="netType">
        <el-radio class="radio" v-model="form.netType" name="netType" label="inner">内网系统</el-radio>
        <el-radio class="radio" v-model="form.netType" name="netType" label="outer">公网系统</el-radio>
      </el-form-item>
      <el-form-item label="开发语言：" prop="developLanguage">
        <el-checkbox-group v-model="form.developLanguage">
          <el-checkbox :label="item.value" name="developLanguage" v-for="item in developLanguageArr" :key="item.label">{{item.label}}</el-checkbox>
          <el-input v-model="form.otherLanguage" name="otherLanguage" auto-complete="off" class="other-lan-ipt">
          </el-input>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="接口个数：" prop="interfaceNum">
        <el-input-number v-model="form.interfaceNum" name="interfaceNum" :min="1" :max="100000"></el-input-number>
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
      <el-form-item label="需求用户：" prop="reqUser">
        <el-input v-model="form.reqUser" name="reqUser" auto-complete="off" placeholder="请输入需求用户">
        </el-input>
      </el-form-item>
      <el-form-item label="主联系人：" prop="contactUsername">
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
        <el-radio class="radio" v-model="categoryType" name="apiCategory" label="2">数据API</el-radio>
        <el-radio class="radio" v-model="categoryType" name="apiCategory" label="3">模型API</el-radio>
        <el-radio class="radio" v-model="categoryType" name="apiCategory" label="4">工具API</el-radio>
        <el-select v-model="form.categoryId" placeholder="请选择" name="categoryId">
          <el-option
            v-for="item in categoryArr"
            :key="item.categoryId"
            :label="item.categoryName"
            :value="categoryType + ',' + item.categoryId">
          </el-option>
        </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="预期报价：" prop="preOffer">
        <el-input v-model="form.preOffer" name="preOffer" auto-complete="off" placeholder="请输入预期报价">
        </el-input>
      </el-form-item>
      <el-form-item label="附件" prop="file">
        <el-button class="beauty-file" type="default">选择文件</el-button>
        <input type="file" name="file" class="btn-file" @change="changeFile">
        <i id="showFileName"><a :href="fileUrl">{{fileName}}</a></i>
      </el-form-item>
      <el-form-item label="说明：" prop="description">
        <el-input v-model="form.description" name="description" type="textarea" auto-complete="off" placeholder="请输入其他说明"></el-input>
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
  import submitFileForm from 'common/directive/submitFileForm'
  import _ from 'lodash'
  require('common/utils/date')
  export default {
    data () {
      return {
        updateApiId: '',
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        fileFormOption: {},
        fileName: '',
        fileUrl: '',
        sysTypeArr: [
          {
            value: 'A/S',
            label: 'A/S'
          },{
            value: 'B/S带插件',
            label: 'B/S带插件'
          },{
            value: 'B/S无插件',
            label: 'B/S无插件'
          },{
            value: 'C/S',
            label: 'C/S'
          }
        ],
        developLanguageArr: [
          {
            value: 'JAVA',
            label: 'JAVA'
          },{
            value: 'C/C++',
            label: 'C/C++'
          },{
            value: 'C#',
            label: 'C#'
          },{
            value: 'JS',
            label: 'JS'
          },{
            value: 'CSS',
            label: 'CSS'
          },{
            value: 'HTML',
            label: 'html'
          },{
            value: 'PHP',
            label: 'PHP'
          },{
            value: '',
            label: '其他'
          }
        ],
        categoryType: '2',
        form: {
          name: '',
          sysName: '',
          sysType: 'A/S',
          sysDescription: '',
          department: '',
          ownership: 'Y',
          site: '',
          netType: 'inner',
          developLanguage: [],
          otherLanguage: '',
          interfaceNum: '',
          endTime: '',
          reqUser: '',
          contactPhone: '',
          matchmakeTrade: 'Y',
          categoryId: '',
          preOffer: '',
          file: '',
          description: '',
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
              message: '请输入需求说明',
              trigger: 'change'
            },{
              min: 2,
              max: 100,
              message: '需求说明最少2个字符，不超过100个字符',
              trigger: 'change'
            }
          ],
          sysName: [
            {
              required: true,
              message: '请输入系统名称',
              trigger: 'change'
            },{
              max: 100,
              message: '系统名称不超过100个字符',
              trigger: 'change'
            }
          ],
          sysDescription: [
            {
              max: 1000,
              message: '系统描述不超过1000个字符',
              trigger: 'change'
            }
          ],
          department: [
            {
              required: true,
              message: '请输入归属单位',
              trigger: 'change'
            },{
              max: 64,
              message: '归属单位不超过64个字符',
              trigger: 'change'
            }
          ],
          ownership: [
            {
              required: true,
              message: '请选择所有权',
              trigger: 'change'
            }
          ],
          site: [
            {
              type: 'url',
              message: '请输入正确的访问地址',
              trigger: 'change'
            }
          ],
          netType: [
            {
              required: true,
              message: '请选择网络性质',
              trigger: 'change'
            }
          ],
          interfaceNum: [
            {
              type: 'number',
              required: true,
              message: '请输入接口个数',
              trigger: 'change'
            }
          ],
          endTime: [
            {
              required: true,
              message: '请选择截止日期',
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
          matchmakeTrade: [
            {
              required: true,
              message: '请选择是否需要平台撮合交易',
              trigger: 'change'
            }
          ],
          categoryId: [
            {
              required: true,
              message: '请选择分类',
              trigger: 'change'
            }
          ],
          preOffer: [
            {
              required: true,
              message: '请输入预期报价',
              trigger: 'change'
            },{
              max: 50,
              message: '预期报价不超过50个字符',
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
      this.updateApiId = this.$route.params.id
      // 如果有updateApiId，则进入修改模式
      if(this.updateApiId) {
        API.Demand.getModifyApiDetail({
          id: this.updateApiId
        }).then((res) => {
          this.fileUrl = res.result.fileUrl || ''
          this.fileName = res.result.fileName || ''
          this.categoryType = res.result.categoryId.split(',')[0]
          this.form = res.result
          this.form.developLanguage = res.result.developLanguage.split(',')
        }).catch((res) => {
        })
      }
      // 获取API分类信息
      API.Dict.getDataApiCategory().then((res) => {
        this.dataCategoryArr = res.result
        this.categoryArr = this.dataCategoryArr
      })
      API.Dict.getModelApiCategory().then((res) => {
        this.modelCategoryArr = res.result
      })
      API.Dict.getToolApiCategory().then((res) => {
        this.toolCategoryArr = res.result
      })
    },
    watch: {
      categoryType (val, oldVal) {
        if(val !== oldVal) {
          console.log(this.form)
          this.form.categoryId = ''
          switch(val) {
            case '2':
              this.categoryArr = this.dataCategoryArr
              break;
            case '3':
              this.categoryArr = this.modelCategoryArr
              break;
            case '4':
              this.categoryArr = this.toolCategoryArr
              break;
          }
        }
      }
    },
    methods: {
      changeEndTimeDate (date) {
        this.form.endTime = date
      },
      submitForm (form) {
        console.log(this.form)
        this.$refs[form].validate((valid) => {
          if(valid) {
            if(this.updateApiId) {
              this.form.id = this.updateApiId
              this.loading.status = true
              this.fileFormOption = {
                url: API.Demand.modifyApiDemand.url,
                params: this.form,
                submitFlag: true,
                callBack: function (res) {
                  this.response = res;
                  if(res.status === 'OK') {
                    this.loading.tip = '修改成功，请至用户中心我的需求内发布！'
                    setTimeout(() => {
                      location.href = '/userInfo.html#/demand/'
                    }, 3000)
                  }else {
                    this.loading.tip = res.message || '创建失败！'
                  }
                  
                }.bind(this)
              }
            }else {
              this.loading.status = true
              this.fileFormOption = {
                url: API.Demand.addApiDemand.url,
                params: this.form,
                submitFlag: true,
                callBack: function (res) {
                  this.response = res;
                  if(res.status === 'OK') {
                    this.loading.tip = '创建成功，请至用户中心我的需求内发布！'
                    setTimeout(() => {
                      location.href = '/userInfo.html#/demand/'
                    }, 3000)
                  }else {
                    this.loading.tip = res.message || '创建失败！'
                  }
                }.bind(this)
              }
            }
          }else {
            return false
          }
        })
      },
      changeFile (event) {
        let res = event.target.value
        let arr = res.split('\\')
        this.fileName = arr[arr.length-1]
        this.form.file = event.target.files && event.target.files[0]
      },
      fillUpdateForm (detail) {
        _.extend(this.form, _.pick(detail, ['scope', 'name', 
          'description', 'identify', 'demoUri', 'demoKey1', 
          'demoKey2', 'demoKey3', 'demoImage1', 'demoImage2',
          'demoImage3', 'isDataCallBack', 'imageUri', 'uri',
          'imageKey', 'categoryId', 'tags', 'rtnCode', 'chargeType']))
          
        let checkedTags = []
        let tagsArr = detail.tags.split(',')
        let tagsNameArr = detail.tagNames.split(',')
        _.each(tagsArr, (item, index) => {
          checkedTags.push(item + '|' + tagsNameArr[index])
        })

        this.form.serviceObject = detail.serviceObject.split(',')
        this.checkedTags = checkedTags
      }
    },
    components: {
      
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .demand-api-create-content {
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