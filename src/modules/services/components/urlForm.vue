<template>
  <el-dialog title="新增服务URL" custom-class="service-form-dialog" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-form :model="form" label-width="120px" ref="form" :rules="rules" class="form">
      <el-form-item label="服务URL：" prop="url">
        <el-input v-model="form.url" auto-complete="off" placeholder="请输入API名称">
        </el-input>
        <p class="service-form-tip">服务URL必须以“/”开头</p>
      </el-form-item>
      <el-form-item label="服务描述：" prop="description">
        <el-input v-model="form.description" type="textarea" auto-complete="off" placeholder="请输入服务描述"></el-input>
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
    props: ['visible', 'defaultIndex', 'appId'],
    data () {
      var startWithSlash = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入服务URL'));
        } else if (value.substring(0,1) !== '/') {
          callback(new Error('服务URL必须以“/”开头'));
        } else {
          callback();
        }
        
      }
      return {
        dialogVisible: this.visible,
        form: {
          appId: this.appId || '',
          id: '',
          flag: 'C',
          url: '',
          description: ''
        },
        rules: {
          url: [
            {
              required: true,
              message: '请输入服务URL',
              trigger: 'change'
            },{
              max: 255,
              message: '服务URL不能超过255个字符',
              trigger: 'change'
            },{
              validator: startWithSlash,
              trigger: 'change'
            }
          ],
          description: [
            {
              required: true,
              message: '请输入服务描述',
              trigger: 'change'
            },{
              max: 50,
              message: '服务描述不能超过20个字符',
              trigger: 'change'
            }
          ]
        }
      }
    },
    computed: {
      serviceUrlList () {
        return this.$store.getters.serviceUrlList
      }
    },
    created () {
      if(this.defaultIndex !== '') {
        let copiedForm = Object.assign({}, this.serviceUrlList[this.defaultIndex])
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
          appId: this.appId || '',
          id: '',
          flag: 'C',
          url: '',
          description: ''
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
          let copiedForm = Object.assign({}, this.serviceUrlList[this.defaultIndex])
          copiedForm.flag = 'U'
          this.form = copiedForm
        }
      }
    }
  }
</script>
<style lang="less">
  .service-form-dialog {
    width: 550px;
    position: relative;
    height: 350px;
    overflow: auto;
    .form {
      .service-form-tip {
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