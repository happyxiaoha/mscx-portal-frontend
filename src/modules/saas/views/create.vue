<template>
  <div class="saas-create-content grid-l">
    <h1>{{updateSaasId ? '编辑服务' : '发布新服务'}}</h1>
    <el-form :model="form" label-width="150px" ref="form" :rules="rules" class="form" v-loading="loading.status" :element-loading-text="loading.tip" v-loading-response="response">
      <el-form-item label="服务对象：" prop="serviceObject">
        <el-checkbox-group v-model="form.serviceObject">
          <el-checkbox :label="item.dictCode" v-for="item in serviceObjectArr" :key="item.dictCode">{{item.dictName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="服务名称：" prop="name">
        <el-input v-model="form.name" auto-complete="off" placeholder="请输入服务名称"></el-input>
      </el-form-item>
      <el-form-item label="服务标识：" prop="identify">
        <el-input v-model="form.identify" auto-complete="off" placeholder="请输入服务标识">
        </el-input>
        <p class="service-form-tip">服务标识应当以字母或数字开头结尾，允许出现横线及下划线，长度在2-30个字符之间</p>
      </el-form-item>
      <el-form-item label="服务简介：" prop="description">
        <el-input v-model="form.description" type="textarea" auto-complete="off" placeholder="请输入服务简介"></el-input>
      </el-form-item>
      <el-form-item label="版本号：" prop="saasVersion">
        <el-input v-model="form.saasVersion" auto-complete="off" placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="版本特性：" prop="versionFeatures">
        <el-input v-model="form.versionFeatures" auto-complete="off" placeholder="请输入版本特性"></el-input>
      </el-form-item>
      <el-form-item label="服务图标：" prop="imageUri">
        <c-upload id="fileId" v-on:uploaded="handlePicSuccess" name="pic" :url="serviceIconUrl">
          <el-upload slot="elUpload" id="serviceIcon" name="pic" :action="serviceIconUrl" :on-success="handlePicSuccess" :show-file-list="false">
            <img v-if="form.imageUri" :src="form.imageUri" class="picture">
            <i v-else class="el-icon-plus picture-uploader-icon"></i>
          </el-upload>
        </c-upload>
        <div class="el-form-item__error">{{imageError}}</div>
      </el-form-item>
      <el-form-item label="分类：" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="请选择">
          <el-option
            v-for="item in categoryArr"
            :key="item.categoryId"
            :label="item.categoryName"
            :value="item.categoryId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签：" prop="tags">
        <el-tag
          v-for="tag in checkedTags"
          :key="tag.tagId"
          :closable="true"
          type="primary"
          @close="removeTag(tag)"
        >
        {{tag.split('|')[1]}}
        </el-tag>
        <el-button type="default" :disabled="!form.categoryId" @click="loadTagDialog">选择标签</el-button>
      </el-form-item>
      <el-form-item label="服务范围：" prop="scope">
        <el-input v-model="form.scope" auto-complete="off" placeholder="请输入服务范围">
        </el-input>
      </el-form-item>
      <el-form-item label="演示地址：" prop="demoUri">
        <el-input v-model="form.demoUri" auto-complete="off" placeholder="请输入演示地址">
        </el-input>
      </el-form-item>
      <el-form-item label="访问URL：" prop="uri">
        <el-input v-model="form.uri" auto-complete="off" placeholder="请输入访问URL">
        </el-input>
      </el-form-item>
      <el-form-item class="service-item-inline" label="示例图片：" prop="demoKey1">
        <c-upload id="demoImage1" v-on:uploaded="handlePicDemo1Success" name="pic" :url="serviceIconUrl">
          <el-upload slot="elUpload" id="serviceIcon" name="pic" :action="serviceIconUrl" :on-success="handlePicDemo1Success" :show-file-list="false">
            <img v-if="form.demoImage1" :src="form.demoImage1" class="picture">
            <i v-else class="el-icon-plus picture-uploader-icon"></i>
          </el-upload>
        </c-upload>        
      </el-form-item>
      <el-form-item class="service-item-inline no-label-margin" prop="demoKey2">
        <c-upload id="demoImage2" v-on:uploaded="handlePicDemo2Success" name="pic" :url="serviceIconUrl">
          <el-upload slot="elUpload" id="serviceIcon" name="pic" :action="serviceIconUrl" :on-success="handlePicDemo2Success" :show-file-list="false">
            <img v-if="form.demoImage2" :src="form.demoImage2" class="picture">
            <i v-else class="el-icon-plus picture-uploader-icon"></i>
          </el-upload>
        </c-upload>        
      </el-form-item>
      <el-form-item class="service-item-inline no-label-margin" prop="demoKey3">
        <c-upload id="demoImage3" v-on:uploaded="handlePicDemo3Success" name="pic" :url="serviceIconUrl">
          <el-upload slot="elUpload" id="serviceIcon" name="pic" :action="serviceIconUrl" :on-success="handlePicDemo3Success" :show-file-list="false">
            <img v-if="form.demoImage3" :src="form.demoImage3" class="picture">
            <i v-else class="el-icon-plus picture-uploader-icon"></i>
          </el-upload>
        </c-upload>        
      </el-form-item>
      <el-form-item label="是否收费：" prop="chargeType">
        <el-radio class="radio" v-model="form.chargeType" label="01">免费</el-radio>
        <el-radio class="radio" v-model="form.chargeType" label="02">收费</el-radio>
        <el-radio class="radio" v-model="form.chargeType" label="03">后付款（账户扣款）</el-radio>
      </el-form-item>
      <div class="table-wrapper" v-show="showChargeRuleTable">
        <table class="table">
          <thead>
            <tr>
              <th>套餐名称</th>
              <th>套餐价格</th>
              <th>购买限制</th>
              <th>使用限制</th>
              <th>生效日期</th>
              <th>失效日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="chargeRuleList.length > 0">
              <tr v-for="(item, index) in chargeRuleList">
                <td>{{item.name}}</td>
                <td>{{item.price + '元/' + item.chargeCount + (item.chargeType === '05' ? '次' : '天')}}</td>
                <td>{{item.countLimit === -1 ? '不限制' : '限制一次'}}</td>
                <td>{{item.invokeLimit === 0 ? '不限制' : (item.invokeLimit + (item.chargeType === '05' ? '次' : '天'))}}</td>
                <td>{{item.effectDate && new Date(item.effectDate).format('yyyy-MM-dd')}}</td>
                <td>{{item.expireDate}}</td>
                <td v-if="!updateSaasId">
                  <a href="javascript:;" @click="updateChargeRule(index)">修改</a>
                  <a href="javascript:;" @click="removeChargeRule(index)">删除</a>
                </td>
                <td v-else>
                  -
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="7">暂无数据</td>
            </tr>
          </tbody>
        </table>
        <div class="custom-item-error" v-show="showChargeRuleTable && chargeRuleList.length < 1">请添加套餐</div>
        <el-button type="primary" @click="loadChargeFormDialog" class="btn-charge-rule" v-if="!updateSaasId">新增收费规则</el-button>
      </div>
      <el-form-item>
        <el-button type="primary" :icon="submitBtnCtrl.icon" :loading="submitBtnCtrl.loading" :disabled="submitBtnCtrl.disabled" class="confirm-btn" @click="submitForm('form')">{{submitBtnCtrl.text}}</el-button>
      </el-form-item>
    </el-form>
    <tag-dialog v-if="loadTag" :defaultTags="checkedTags" :visible="tagDialogVisible" :categoryId="form.categoryId" @toggle="toggleTagVisible" @selected="handleSelectedTags"></tag-dialog>
    <charge-form-dialog v-if="loadChargeForm" :defaultIndex="chargeDefaultIndex" :visible="chargeFormDialogVisible"  @submit="handleChargeFormSubmit" @toggle="toggleChargeFormVisible"></charge-form-dialog>
  </div>
</template>
<script>
  import loadingResponse from 'common/directive/response'
  import API from 'common/api'
  import upload from 'components/upload/upload'
  import {chineseAndSplit, identify} from 'common/validation'
  import _ from 'lodash'
  require('common/utils/date')
  export default {
    data () {
      // 验证服务标识
      var validateIdentify = (rule, value, callback) => {
        if(this.updateSaasId && value === this.form.identify) {
          callback()
          return
        }
        if(!value) {return}
        API.Saas.checkUnique({identify: value}).then((res) => {
          if(!res.result) {
            callback(new Error('该服务标识已经被使用，换个试试？'))
          }else {
            callback()  
          }
        }).catch((error) => {
          callback(new Error(error.message))
        })
      }
      return {
        updateSaasId: '',
        form: {
          serviceObject: [],
          scope: '',
          name: '',
          identify: '',
          description: '',
          saasVersion: '',
          versionFeatures: '',
          imageUri: '',
          imageKey: '',
          demoUri: '',
          demoImage1: '',
          demoImage2: '',
          demoImage3: '',
          demoKey1: '',
          demoKey2: '',
          demoKey3: '',
          categoryId: '',
          tags: '',
          chargeType: '01'
        },
        serviceObjectArr: [],
        categoryArr: [],
        showChargeRuleTable: false,
        imageError: '',
        loadTag: false,
        loadChargeForm: false,
        tagDialogVisible: false,
        chargeFormDialogVisible: false,
        serviceIconUrl: API.Saas.uploadFileUrl,
        chargeDefaultIndex: '',
        checkedTags: [],
        loading: {
          tip: '',
          status: false
        },
        response: {},
        submitBtnCtrl: {
          icon: '',
          loading: false,
          disabled: false,
          text: '提交'
        },
        rules: {
          scope: [
            {
              required: true,
              message: '请输入服务范围',
              trigger: 'change'
            },{
              max: 50,
              message: '服务范围不超过50个字符',
              trigger: 'change'
            },{
              validator: chineseAndSplit,
              trigger: 'change'
            }
          ],
          name: [
            {
              required: true,
              message: '请输入服务名称',
              trigger: 'change'
            },{
              max: 30,
              min: 2,
              message: '服务名称至少2个字符，不超过30个字符',
              trigger: 'change'
            }
          ],
          description: [
            {
              required: true,
              message: '请输入服务简介',
              trigger: 'change'
            },{
              max: 500,
              message: '服务简介不能超过500个字符',
              trigger: 'change'
            }
          ],
          saasVersion: [
            {
              required: true,
              message: '请输入版本号',
              trigger: 'change'
            },{
              max: 50,
              message: '版本号不能超过50个字符',
              trigger: 'change'
            }
          ],
          versionFeatures: [
            {
              required: true,
              message: '请输入版本特性',
              trigger: 'change'
            },{
              max: 250,
              message: '版本特性不能超过250个字符',
              trigger: 'change'
            }
          ],
          imageUri: [
            {
              required: true,
              message: '请上传服务图标',
              trigger: 'change'
            }
          ],
          categoryId: [
            {
              type: 'number',
              required: true,
              message: '请选择服务分类',
              trigger: 'change'
            }
          ],
          tags: [
            {
              required: true,
              message: '请选择标签',
              trigger: 'change'
            }
          ],
          serviceObject: [
            {
              type: 'array',
              required: true,
              message: '请选择服务对象',
              trigger: 'change'
            }
          ],
          chargeType: [
            {
              required: true,
              message: '请选择收费类型',
              trigger: 'change'
            }
          ],
          demoUri: [
            {
              required: true,
              message: '请输入演示地址',
              trigger: 'change'
            },{
              max: 255,
              message: '演示地址不能超过255个字符',
              trigger: 'change'
            }
          ],
          uri: [
            {
              type: 'url',
              required: true,
              message: '请输入正确的访问URL',
              trigger: 'change'
            },{
              max: 255,
              message: '访问URL不能超过255个字符',
              trigger: 'change'
            }
          ],
          identify: [
            {
              required: true,
              message: '请输入服务标识',
              trigger: 'change'
            },{
              validator: identify,
              trigger: 'change'
            },{
              validator: validateIdentify,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    computed: {
      chargeRuleList () {
        return this.$store.getters.chargeRuleList
      }
    },
    beforeRouteEnter (to, from, next) {
      API.Common.getLoginInfo().then((res) => {
        if(!res.result) {
          location.href = 'login.html'
        }else if(res.result.userType === 'REGISTER') {
          location.href = 'userInfo.html#user/auth'
        }else {
          next()
        }
      })
    },
    created () {
      this.updateSaasId = this.$route.params.id
      // 如果有updateSaasId，则进入修改模式
      if(this.updateSaasId) {
        API.Saas.getUpdateDetail({
          id: this.updateSaasId
        }).then((res) => {
          this.fillUpdateForm(res.result)
        }).catch((res) => {
        })
        API.Saas.getChargeRuleDetail({
          saasId: this.updateSaasId
        }).then((res) => {
          this.$store.commit('setChargeRuleList', res.result || [])
        })
      }
      // 获取服务对象
      API.Dict.getServiceObject().then((res) => {
        this.serviceObjectArr = res.result
      })
      // 获取分类信息
      API.Dict.getSaasCategory().then((res) => {
        this.categoryArr = res.result
      })
    },
    watch: {
      form: {
        handler (val, oldVal) {
          if(val.chargeType === '02') {
            this.showChargeRuleTable = true
          }else {
            !this.updateSaasId && this.$store.commit('clearChargeRuleList')
            this.showChargeRuleTable = false
          }

          if(oldVal.categoryId !== '' && oldVal.categoryId !== val.categoryId) {
            this.changeCategory()
          }
        },
        deep: true
      },
      checkedTags (val, oldVal) {
        if(val !== oldVal) {
          let tags = ''
          _.each(val, (item) => {
            tags += item.split('|')[0] + ','
          })
          tags = tags.slice(0, -1)
          this.form.tags = tags
        }
      }
    },
    methods: {
      changeCategory() {
        this.checkedTags = []
      },
      handlePicSuccess (res) {
        this.imageError = ''
        this.form.imageUri = ''
        this.form.imageKey = ''
        if(res.status === 'OK') {
          this.form.imageKey = res.result.key
          this.form.imageUri = res.result.uri
        }else {
          this.imageError = res.message
        }
      },
      handlePicDemo1Success (res) {
        this.demo1ImageError = ''
        this.form.demoImage1 = ''
        this.form.demoKey1 = ''
        if(res.status === 'OK') {
          this.form.demoKey1 = res.result.key
          this.form.demoImage1 = res.result.uri
        }else {
          this.demo1ImageError = res.message
        }
      },
      handlePicDemo2Success (res) {
        this.demo2ImageError = ''
        this.form.demoImage2 = ''
        this.form.demoKey2 = ''
        if(res.status === 'OK') {
          this.form.demoKey2 = res.result.key
          this.form.demoImage2 = res.result.uri
        }else {
          this.demo2ImageError = res.message
        }
      },
      handlePicDemo3Success (res) {
        this.demo3ImageError = ''
        this.form.demoImage3 = ''
        this.form.demoKey3 = ''
        if(res.status === 'OK') {
          this.form.demoKey3 = res.result.key
          this.form.demoImage3 = res.result.uri
        }else {
          this.demo3ImageError = res.message
        }
      },
      toggleTagVisible (arg) {
        this.tagDialogVisible = arg
      },
      loadTagDialog () {
        this.loadTag = true,
        this.tagDialogVisible = true
      },
      toggleChargeFormVisible (arg) {
        this.chargeFormDialogVisible = arg
      },
      loadChargeFormDialog () {
        this.chargeDefaultIndex = ''
        this.loadChargeForm = true
        this.chargeFormDialogVisible = true
      },
      handleSelectedTags (arg) {
        this.checkedTags = arg
      },
      removeTag (tag) {
        this.checkedTags.splice(this.checkedTags.indexOf(tag), 1)
      },
      handleChargeFormSubmit (arg) {
        if(this.chargeDefaultIndex !== '') {
          this.$store.commit('updateChargeRule', {
            chargeRuleIndex: this.chargeDefaultIndex,
            chargeRule: arg
          })
        }else {
          this.$store.commit('addChargeRule', arg)
        }
        this.chargeDefaultIndex = ''
      },
      updateChargeRule (index) {
        this.chargeDefaultIndex = index
        this.chargeFormDialogVisible = true
      },
      removeChargeRule (index) {
        this.$store.commit('removeChargeRule', index)
      },
      submitForm (form) {
        console.log(this.form)
        this.$refs[form].validate((valid) => {
          if(valid) {
            // 非修改模式下，收费类型-套餐必填
            if(!this.updateSaasId && this.showChargeRuleTable && this.chargeRuleList.length < 1) {
              return false
            }
            let serviceObject = this.form.serviceObject.join(',')
            let options = {
              app: {},
              url: [],
              chargeRule: []
            }
            _.extend(options.app, this.form, {
              serviceObject: serviceObject
            })
            delete options.app.demoImage1
            delete options.app.demoImage2
            delete options.app.demoImage3
            delete options.app.imageUri
            if(this.showChargeRuleTable) {
              _.extend(options, {
                chargeRule: this.chargeRuleList,
              })
            }

            let request
            if(this.updateSaasId) {
              // 修改
              this.$confirm('将重新审核，请确认！ 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                options.app.id = this.updateSaasId
                request = API.Saas.modifySaas
                this.loading.status = true
                request(options).then((res) => {
                  this.response = res
                  this.loading.tip = '提交审核成功！'
                  setTimeout(() => {
                    this.loading.status = false
                    location.href = 'userInfo.html#saas/'
                  }, 3000)
                }).catch((res) => {
                  this.response = res
                  this.loading.tip = res.message
                  setTimeout(() => {
                    this.loading.status = false
                  }, 3000)
                }).catch(()=>{})
              })
            }else {
              request = API.Saas.publishSaas
              this.loading.status = true
              request(options).then((res) => {
                this.response = res
                this.loading.tip = '提交审核成功！'
                setTimeout(() => {
                  this.loading.status = false
                  location.href = 'userInfo.html#saas/'
                }, 3000)
              }).catch((res) => {
                this.response = res
                this.loading.tip = res.message
                setTimeout(() => {
                  this.loading.status = false
                }, 3000)
              })
            }
          }else {
            return false
          }
        })
      },
      fillUpdateForm (detail) {
        _.extend(this.form, _.pick(detail, ['scope', 'name', 
          'description', 'identify', 'demoUri', 'demoKey1', 
          'demoKey2', 'demoKey3', 'demoImage1', 'demoImage2',
          'demoImage3', 'saasVersion', 'versionFeatures', 'imageUri', 'uri',
          'imageKey', 'categoryId', 'tags', 'chargeType']))
        
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
      'c-upload': upload,
      'tag-dialog': () => import('components/tag'),
      'charge-form-dialog': () => import('components/chargeRule'),
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .saas-create-content {
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
      .el-form-item__content {
        width: 60%;
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