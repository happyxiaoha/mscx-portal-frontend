<template>
  <div class="api-create-content grid-l">
    <h1>{{updateApiId ? '修改API' : '发布新API'}}</h1>
    <el-form :model="form" label-width="150px" ref="form" :rules="rules" class="form" v-loading="loading.status" :element-loading-text="loading.tip" v-loading-response="response">
      <el-form-item label="服务范围：" prop="scope">
        <el-input v-model="form.scope" type="textarea" auto-complete="off" placeholder="请输入服务范围">
        </el-input>
      </el-form-item>
      <el-form-item label="服务名称：" prop="cname">
        <el-input v-model="form.cname" auto-complete="off" placeholder="请输入服务名称"></el-input>
      </el-form-item>
      <el-form-item label="服务标识：" prop="name">
        <el-input v-model="form.name" auto-complete="off" placeholder="请输入服务标识">
        </el-input>
      </el-form-item>
      <el-form-item label="服务简介：" prop="description">
        <el-input v-model="form.description" type="textarea" auto-complete="off" placeholder="请输入服务简介"></el-input>
      </el-form-item>
      <el-form-item label="服务图标：" prop="imageKey">
        <c-upload id="fileId" v-on:uploaded="handlePicSuccess" name="image" :url="serviceIconUrl">
          <el-upload slot="elUpload" id="serviceIcon" name="image" :action="serviceIconUrl" :on-success="handlePicSuccess" :show-file-list="false">
            <img v-if="form.imageUri" :src="form.imageUri" class="picture">
            <i v-else class="el-icon-plus picture-uploader-icon"></i>
          </el-upload>
        </c-upload>
        <div class="el-form-item__error">{{imageError}}</div>
      </el-form-item>
      <el-form-item label="服务分类：" prop="categoryId">
        <div v-for="item in categoryArr" class="category-block">
          <p class="category-title">{{item.typeName}}</p>
          <el-radio-group v-model="rawCategoryId" class="category-content">
            <el-radio :label="subItem.categoryId + '|' + item.typeId" v-for="subItem in item.categoryList" :key="subItem.categoryId">{{subItem.categoryName}}</el-radio>
          </el-radio-group>
        </div>
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
        <el-button type="default" @click="loadTagDialog">选择标签</el-button>
      </el-form-item>
      <el-form-item label="服务返回码：" prop="rtnCode">
        <el-input v-model="form.rtnCode" type="textarea" auto-complete="off" placeholder="请输入服务返回码">
        </el-input>
      </el-form-item>
      <el-form-item label="服务对象：" prop="serviceObject">
        <el-checkbox-group v-model="form.serviceObject">
          <el-checkbox :label="item.dictCode" v-for="item in serviceObjectArr" :key="item.dictCode">{{item.dictName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="资源类型：" prop="publishType">
        <el-radio class="radio" v-model="form.publishType" label="01">完全公开</el-radio>
        <el-radio class="radio" v-model="form.publishType" label="02">展示但不能申请</el-radio>
        <el-radio class="radio" v-model="form.publishType" label="03">不展示</el-radio>
      </el-form-item>
      <el-form-item label="是否收费：" prop="chargeType">
        <el-radio class="radio" v-model="form.chargeType" label="01">免费</el-radio>
        <el-radio class="radio" v-model="form.chargeType" label="02">收费</el-radio>
        <el-radio class="radio" v-model="form.chargeType" label="04">按实际订单支付</el-radio>
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
                <td>{{item.price + '元/' + item.chargeCount + (item.chargeType === '05' ? '次' : '月')}}</td>
                <td>{{item.countLimit === '-1' ? '不限制' : '限制一次'}}</td>
                <td>{{item.monthLimit === 0 ? '不限制' : (item.monthLimit + (item.chargeType === '05' ? '次' : '个月'))}}</td>
                <td>{{item.effectDate && new Date(item.effectDate).format('yyyy-MM-dd')}}</td>
                <td>{{item.expireDate}}</td>
                <td v-if="!updateApiId">
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
        <el-button type="primary" @click="loadChargeFormDialog" class="btn-charge-rule" v-if="!updateApiId">新增收费规则</el-button>
      </div>
      <div class="table-wrapper">
        <table class="table">
          <tr>
            <th>API名称</th>
            <th>API标识</th>
            <th>API地址</th>
            <th>是否鉴权</th>
            <th>操作</th>
          </tr>
          <tbody id="apiTable">
            <template v-if="apiList.length > 0">
              <tr v-for="(item, index) in apiList" v-show="item.flag !== 'D'">
                <td>{{item.cname}}</td>
                <td>{{item.name}}</td>
                <td>{{item.uri}}</td>
                <td>{{item.isAuth === '0' ? '是' : '否'}}</td>
                <td>
                  <a href="javascript:;" @click="updateApiItem(index)">修改</a>
                  <a href="javascript:;" @click="removeApiItem(index)">删除</a>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="5">暂无数据</td>
            </tr>
          </tbody>
        </table>
        <div class="custom-item-error" v-show="apiList.length < 1">请添加API</div>
        <el-button type="primary"  @click="loadApiFormDialog" class="btn-add-api">新增API</el-button>
      </div>
      <el-form-item>
        <el-button type="primary" :icon="submitBtnCtrl.icon" :loading="submitBtnCtrl.loading" :disabled="submitBtnCtrl.disabled" class="confirm-btn" @click="submitForm('form')">{{submitBtnCtrl.text}}</el-button>
      </el-form-item>
    </el-form>
    <tag-dialog v-if="loadTag" :defaultTags="checkedTags" :visible="tagDialogVisible" :categoryId="form.categoryId" @toggle="toggleTagVisible" @selected="handleSelectedTags"></tag-dialog>
    <api-form-dialog v-if="loadApiForm" :defaultIndex="apiDefaultIndex" :visible="apiFormDialogVisible"  @submit="handleApiFormSubmit" @toggle="toggleApiFormVisible"></api-form-dialog>
    <charge-form-dialog type="api" v-if="loadChargeForm" :defaultIndex="chargeDefaultIndex" :visible="chargeFormDialogVisible"  @submit="handleChargeFormSubmit" @toggle="toggleChargeFormVisible"></charge-form-dialog>
  </div>
</template>
<script>
  import loadingResponse from 'common/directive/response'
  import API from 'common/api'
  import upload from 'components/upload/upload'
  import _ from 'lodash'
  require('common/utils/date')
  export default {
    data () {
      // 验证服务标识
      var validateName = (rule, value, callback) => {
        if(this.updateApiId && value === this.form.name) {
          callback()
          return
        }
        API.Api.checkApiServerId({name: value}).then((res) => {
          if(!res.result) {
            callback(new Error('该服务标识已经被使用，换个试试？'))
          }else {
            callback()  
          }
        }).catch((error) => {
          callback(new Error(error))
        })
      }
      return {
        updateApiId: '',
        form: {
          scope: '',
          cname: '',
          name: '',
          description: '',
          imageUri: '',
          imageKey: '',
          serviceObject: [],
          categoryId: '',
          type: '',
          tags: '',
          rtnCode: '',
          chargeType: '01',
          publishType: '01'
        },
        rawCategoryId: '',
        imageError: '',
        loading: {
          tip: '',
          status: false
        },
        showChargeRuleTable: false,
        serviceObjectArr: [],
        categoryArr: [],
        serviceIconUrl: API.Api.uploadFileUrl,
        tagDialogVisible: false,
        apiFormDialogVisible: false,
        chargeFormDialogVisible: false,
        apiDefaultIndex: '',
        chargeDefaultIndex: '',
        checkedTags: [],
        loadTag: false,
        loadApiForm: false,
        loadChargeForm: false,
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
            }
          ],
          cname: [
            {
              required: true,
              message: '请输入服务名称',
              trigger: 'change'
            }
          ],
          name: [
            {
              required: true,
              message: '请输入服务标识',
              trigger: 'change'
            },{
              validator: validateName,
              trigger: 'blur'
            }
          ],
          description: [
            {
              required: true,
              message: '请输入服务简介',
              trigger: 'change'
            },{
              max: 150,
              message: '服务简介不能超过150个字符',
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
          rtnCode: [
            {
              required: true,
              message: '请输入返回码',
              trigger: 'change'
            },{
              max: 200,
              message: '返回码不能超过200个字符',
              trigger: 'change'
            }
          ],
          chargeType: [
            {
              required: true,
              message: '请选择收费类型',
              trigger: 'change'
            }
          ]
        }
      }
    },
    computed: {
      apiList () {
        return this.$store.getters.apiItemList
      },
      chargeRuleList () {
        return this.$store.getters.chargeRuleList
      },
      user () {
        return this.$store.getters.user
      }
    },
    // beforeRouteEnter (to, from, next) {
    //   next((vm) => {
    //     if(!vm.user.userId) {
    //       location.href = 'login.html'
    //     }
    //   })
    // },
    watch: {
      form: {
        handler (val, oldVal) {
          if(val.chargeType === '02') {
            this.showChargeRuleTable = true
          }else {
            !this.updateApiId && this.$store.commit('clearChargeRuleList')
            this.showChargeRuleTable = false
          }
        },
        deep: true
      },
      rawCategoryId (val, oldVal) {
        if(val !== oldVal) {
          this.form.categoryId = +val.split('|')[0]
          this.form.type = val.split('|')[1]
        }
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
    created () {
      this.updateApiId = this.$route.params.id
      // 如果有updateApiId，则进入修改模式
      if(this.updateApiId) {
        API.Api.getApiDetailUpdate({
          apiServiceId: this.updateApiId
        }).then((res) => {
          this.$store.commit('setApiItemList', res.result.apiListJson)
          this.fillUpdateForm(res.result)
        }).catch((res) => {
        })
        API.Api.getMyChargeRuleByServiceId({
          apiServiceId: this.updateApiId
        }).then((res) => {
          this.$store.commit('setChargeRuleList', res.result || [])
        })
      }
      // 获取服务对象
      API.Dict.getServiceObject().then((res) => {
        this.serviceObjectArr = res.result
      })
      // 获取分类信息
      API.Dict.getApiTypeAndCategory().then((res) => {
        this.categoryArr = res.result
        let defaultCategory = this.categoryArr[0]
        this.rawCategoryId = defaultCategory.categoryList[0].categoryId + '|' + defaultCategory.typeId
      })
    },
    methods: {
      submitForm (form) {
        console.log(this.form)
        this.$refs[form].validate((valid) => {
          if(valid) {
            // 收费类型-套餐必填, API必填
            if(this.showChargeRuleTable && this.chargeRuleList.length < 1 || this.apiList.length < 1) {
              return false
            }
            let serviceObject = this.form.serviceObject.join(',')
            let options = _.extend({}, this.form, {
              apiListJson: this.apiList,
              serviceObject: serviceObject
            })
            if(this.showChargeRuleTable) {
              _.extend(options, {
                chargeSetJson: this.chargeRuleList
              })
            }

            let request
            if(this.updateApiId) {
              // 修改
              this.$confirm('将重新审核，请确认！ 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                options.apiServiceId = this.updateApiId
                !options.imageKey && delete options.imageKey
                request = API.Api.modifyServiceApi
                this.loading.status = true
                request(options).then((res) => {
                  this.response = res
                  this.loading.tip = '提交审核成功！'
                  setTimeout(() => {
                    // this.loading.status = false
                    location.href = 'userInfo.html#/api/'
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
              request = API.Api.publishServiceApi
              this.loading.status = true
              request(options).then((res) => {
                this.response = res
                this.loading.tip = '提交审核成功！'
                setTimeout(() => {
                  // this.loading.status = false
                  location.href = 'userInfo.html#/api/'
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
      handlePicSuccess (res) {
        this.imageError = ''
        this.form.imageUri = ''
        this.form.imageKey = ''
        if(res.status === 'OK') {
          this.form.imageKey = res.result.imageKey
          this.form.imageUri = res.result.imageUri
        }else {
          this.imageError = res.message
        }
      },
      toggleTagVisible (arg) {
        this.tagDialogVisible = arg
      },
      loadTagDialog () {
        this.loadTag = true,
        this.tagDialogVisible = true
      },
      toggleApiFormVisible (arg) {
        this.apiFormDialogVisible = arg
      },
      toggleChargeFormVisible (arg) {
        this.chargeFormDialogVisible = arg
      },
      loadApiFormDialog () {
        this.apiDefaultIndex = ''
        this.loadApiForm = true
        this.apiFormDialogVisible = true
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
      handleApiFormSubmit (arg) {
        if(this.apiDefaultIndex !== '') {
          this.$store.commit('updateApiItem', {
            apiIndex: this.apiDefaultIndex,
            apiItem: arg
          })
        }else {
          this.$store.commit('addApiItem', arg)
        }
        this.apiDefaultIndex = ''
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
      updateApiItem (index) {
        this.apiDefaultIndex = index
        this.loadApiForm = true
        this.apiFormDialogVisible = true
      },
      removeApiItem (index) {
        // 修改模式下
        this.$confirm('确认删除这条API吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          if(this.updateApiId && this.apiList[index].flag !== 'C') {
            this.$store.commit('flagApiItemDetele', index)
          }else {
            this.$store.commit('removeApiItem', index)
          }
          console.log(this.apiList)
        })
      },
      updateChargeRule (index) {
        this.chargeDefaultIndex = index
        this.chargeFormDialogVisible = true
      },
      removeChargeRule (index) {
        this.$store.commit('removeChargeRule', index)
      },
      fillUpdateForm (detail) {
        _.extend(this.form, _.pick(detail, ['scope', 'cname', 'name', 'description', 
          'imageUri', 'imageKey', 'categoryId', 'type', 'tags', 'rtnCode', 'chargeType']))
        
        let checkedTags = []
        let tagsArr = detail.tags.split(',')
        let tagsNameArr = detail.tagsName.split(',')
        _.each(tagsArr, (item, index) => {
          checkedTags.push(item + '|' + tagsNameArr[index])
        })

        this.form.serviceObject = detail.serviceObject.split(',')
        this.checkedTags = checkedTags
        this.rawCategoryId = detail.categoryId + '|' + detail.type
      }
    },
    components: {
      'c-upload': upload,
      'tag-dialog': () => import('components/tag'),
      'api-form-dialog': () => import('../components/apiForm'),
      'charge-form-dialog': () => import('components/chargeRule'),
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .api-create-content {
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
      .picture {
        width: 100px;
        height: 100px;
        display: block;
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
      .btn-charge-rule, .btn-add-api {
        float: right;
        margin-bottom: 22px;
      }
      .category-block {
        overflow: hidden;
        padding: 4px 0;
        .category-title {
          height: 30px;
          line-height: 30px;
          margin-right: 10px;
          float: left;
          overflow: hidden;
          font-weight: 700;
        }
        .category-content {
          width: 90%;
          float: left;
          label {
            margin-left: 15px;
            height: 30px;
            line-height: 30px;
            width: 120px;
            float: left;
            overflow: hidden;
            .ellipsis();
          }
        }
      }
      .el-tag {
        margin-right: 10px;
      }
    }
  }
</style>