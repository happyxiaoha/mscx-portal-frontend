<template>
  <el-dialog title="新增API" custom-class="api-form-dialog" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-form :model="form" label-width="120px" ref="form" :rules="rules" class="form">
      <el-form-item label="API名称：" prop="cname">
        <el-input v-model="form.cname" auto-complete="off" placeholder="请输入API名称">
        </el-input>
        <p class="api-form-tip">支持中文、英文（大小写）、数字及其组合组成，最多不超过20字</p>
      </el-form-item>
      <el-form-item label="API标识：" prop="name">
        <el-input v-model="form.name" auto-complete="off" placeholder="请输入API标识"></el-input>
        <p class="api-form-tip">
        由英文、数字及其组合组成，最多不超过20字
        </p>
      </el-form-item>
      <el-form-item label="是否鉴权：" prop="isAuth">
        <el-radio class="radio" v-model="form.isAuth" label="0">是</el-radio>
        <el-radio class="radio" v-model="form.isAuth" label="1">否</el-radio>
      </el-form-item>
      <el-form-item label="请求类型：" prop="requestType">
        <el-select v-model="form.requestType" placeholder="请选择">
          <el-option
            v-for="item in requestTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请求方法：" prop="requestMethod">
        <el-select v-model="form.requestMethod" placeholder="请选择">
          <el-option
            v-for="item in requestMethodOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="API地址：" prop="uri">
        <el-input v-model="form.uri" auto-complete="off" placeholder="请输入API地址"></el-input>
        <p class="api-form-tip">
        请输入完整的服务访问URL地址(如：http://www.xxxx.cn)
        </p>
      </el-form-item>
      <el-form-item label="参数和示例：" prop="testPacket">
        <el-input v-model="form.testPacket" type="textarea" auto-complete="off" placeholder="参数和示例"></el-input>
        <p class="api-form-tip">
          参数和返回示例，使用MarkDown格式
        </p>
      </el-form-item>
      <el-form-item label="备注信息：" prop="directions">
        <el-input v-model="form.directions" type="textarea" auto-complete="off" placeholder="请输入备注信息"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import API from 'common/api'
  import _ from 'lodash'
  import {unSpecial} from 'common/validation'
  export default {
    props: ['visible', 'defaultIndex'],
    data () {
      return {
        dialogVisible: this.visible,
        requestTypeOptions: [
          {
            value: 'JSON',
            label: 'JSON'
          },{
            value: 'FORM',
            label: 'FORM'
          },{
            value: 'JSON/FORM',
            label: 'JSON/FORM'
          }
        ],
        requestMethodOptions: [
          {
            value: 'GET',
            label: 'GET'
          },{
            value: 'POST',
            label: 'POST'
          },{
            value: 'GET/POST',
            label: 'GET/POST'
          }
        ],
        form: {
          id: '',
          flag: 'C',
          cname: '',
          name: '',
          isAuth: '0',
          requestType: 'JSON',
          requestMethod: 'GET',
          uri: '',
          testPacket: '',
          directions: ''
        },
        rules: {
          cname: [
            {
              required: true,
              message: '请输入API名称',
              trigger: 'change'
            },{
              max: 20,
              message: 'API名称不能超过20个字符',
              trigger: 'change'
            },{
              validator: unSpecial,
              trigger: 'change'
            }
          ],
          name: [
            {
              required: true,
              message: '请输入API标识',
              trigger: 'change'
            },{
              max: 20,
              message: 'API标识不能超过20个字符',
              trigger: 'change'
            },{
              validator: unSpecial,
              trigger: 'change'
            }
          ],
          isAuth: [
            {
              required: true,
              message: '请选择是否鉴权',
              trigger: 'change'
            }
          ],
          requestType: [
            {
              required: true,
              message: '请选择请求类型',
              trigger: 'change'
            }
          ],
          requestMethod: [
            {
              required: true,
              message: '请选择请求方法',
              trigger: 'change'
            }
          ],
          uri: [
            {
              type: 'url',
              required: true,
              message: '请输入正确的API地址',
              trigger: 'change'
            }
          ],
          testPacket: [
            {
              required: true,
              message: '请输入参数和示例',
              trigger: 'change'
            }
          ]
        }
      }
    },
    computed: {
      apiList () {
        return this.$store.getters.apiItemList
      }
    },
    created () {
      if(this.defaultIndex !== '') {
        let copiedForm = Object.assign({}, this.apiList[this.defaultIndex])
        copiedForm.flag = 'U'
        this.form = copiedForm
      }
    },
    methods: {
      handleClose (done) {
        this.resetForm('form')
        done()
        this.$emit('toggle', this.dialogVisible)
      },
      closeDialog () {
        this.resetForm('form')
        this.dialogVisible = false
        this.$emit('toggle', this.dialogVisible)
      },
      submit () {
        this.$refs['form'].validate((valid) => {
          if(valid) {
            let copiedForm = Object.assign({}, this.form)
            this.$emit('submit', copiedForm)
            this.closeDialog()
          }else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.form = {
          id: '',
          flag: 'C',
          cname: '',
          name: '',
          isAuth: '0',
          requestType: 'JSON',
          requestMethod: 'GET',
          uri: '',
          testPacket: '',
          directions: ''
        }
      }
    },
    watch: {
      visible () {
        this.dialogVisible = this.visible
      },
      categoryId () {
        this.getTags()
      },
      searchText () {
        this.filterTag()
      },
      defaultIndex () {
        if(this.defaultIndex !== '') {
          let copiedForm = Object.assign({}, this.apiList[this.defaultIndex])
          copiedForm.flag = 'U'
          this.form = copiedForm
        }
      }
    }
  }
</script>
<style lang="less">
  .api-form-dialog {
    width: 550px;
    position: relative;
    height: 550px;
    overflow: auto;
    .form {
      .api-form-tip {
        font-size: 12px;
        margin-top: 3px;
        color: #aaa;
      }
      .el-form-item__content {
        width: 70%;
      }
    }
    
  }
</style>