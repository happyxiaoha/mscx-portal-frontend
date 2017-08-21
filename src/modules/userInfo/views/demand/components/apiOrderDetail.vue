<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="方案报价">
        <el-input :value="result.price" type="textarea" :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item label="报价方案简介">
        <el-input :value="result.planIntro" type="textarea" :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item label="附件">
        <a :href="result.fileUrl">{{result.fileName}}</a>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import API from 'common/api'
  import _ from 'lodash'
  export default {
    props: ['detailId'],
    data () {
      return {
        innerId: this.detailId,
        loading: false,
        result: {
          price: '',
          planIntro: '',
          fileUrl: '',
          fileName: ''
        }
      }
    },
    created () {
      if(this.detailId !== '') {
        this.queryApiOrderDetail()
      }
    },
    methods: {
      queryApiOrderDetail () {
        this.loading = true
        API.Demand.queryApiOrderDetail({id: this.innerId}).then((res) => {
          this.loading = false
          this.result = res.result
        })
      },
      back () {
        this.$emit('back')
      }
    },
    watch: {
      detailId () {
        if(this.detailId !== '') {
          this.innerId = this.detailId
          this.queryApiOrderDetail()
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