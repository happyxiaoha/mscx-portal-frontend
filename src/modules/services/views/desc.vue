<template>
  <div class="api-desc-content grid-l">
    <h1>微服务详情</h1>
    <el-form label-width="150px">
      <el-form-item label="服务对象：">
        {{detail.serviceObjectNames}}
      </el-form-item>
      <el-form-item label="服务名称：">
        {{detail.name}}
      </el-form-item>
      <el-form-item label="服务简介：">
        {{detail.description}}
      </el-form-item>
      <el-form-item label="服务图标：">
        <img :src="detail.imageUri">
      </el-form-item>
      <el-form-item label="服务分类：">
        {{detail.categoryName}}
      </el-form-item>
      <el-form-item label="标签：">
        {{detail.tagNames}}
      </el-form-item>
      <el-form-item label="服务范围：">
        {{detail.scope}}
      </el-form-item>
      <el-form-item label="演示地址：">
        {{detail.demoUri}}
      </el-form-item>
      <el-form-item label="接入URL：">
        {{detail.uri}}
      </el-form-item>
      <el-form-item label="示例图片：">
        <img v-if="detail.demoImage1" :src="detail.demoImage1">
        <img v-if="detail.demoImage2" :src="detail.demoImage2">
        <img v-if="detail.demoImage3" :src="detail.demoImage3">
      </el-form-item>
      <el-form-item label="是否收费：">
        {{detail.chargeTypeDesc}}
      </el-form-item>
      <el-form-item label="是否落地：">
        {{detail.isDataCallBack == 1 ? '是' : '否'}}
      </el-form-item>
      
      <div class="table-wrapper" v-show="detail.chargeType == '02'">
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
            <template v-if="chargeRule.length > 0">
              <tr v-for="(item, index) in chargeRule">
                <td>{{item.name}}</td>
                <td>{{item.price + '元/' + item.chargeCount + (item.chargeType === '05' ? '次' : '天')}}</td>
                <td>{{item.countLimit === '-1' ? '不限制' : '限制一次'}}</td>
                <td>{{item.invokeLimit === 0 ? '不限制' : (item.invokeLimit + (item.chargeType === '05' ? '次' : '天'))}}</td>
                <td>{{item.effectDate && new Date(item.effectDate).format('yyyy-MM-dd')}}</td>
                <td>{{item.expireDate && new Date(item.expireDate).format('yyyy-MM-dd')}}</td>
                <td>
                  -
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="7">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-wrapper">
        <table class="table">
          <tr>
            <th>服务URL</th>
            <th>服务描述</th>
          </tr>
          <tbody id="apiTable">
            <template v-if="detail.url.length > 0">
              <tr v-for="(item, index) in detail.url" v-show="item.flag !== 'D'">
                <td>{{item.url}}</td>
                <td>{{item.description}}</td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="2">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-form>
  </div>
</template>
<script>
  import API from 'common/api'
  import _ from 'lodash'
  require('common/utils/date')
  export default {
    data () {
      return {
        detail: {
          url: []
        },
        chargeRule: [],
        id: ''
      }
    },
    computed: {
    },
    created () {
      this.id = this.$route.params.id
      API.App.getUpdateDetail({
        id: this.id
      }).then((res) => {
        this.detail = res.result
      })
      API.App.getChargeRuleDetail({
        appId: this.id
      }).then((res) => {
        this.chargeRule = res.result
      })
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .api-desc-content {
    background: #fff;
    margin-top: 20px;
    padding: 24px 36px;
    box-sizing: border-box;
    .box-shadow();
    h1 {
      margin-bottom: 30px;
    }
    .table {
      margin-bottom: 22px;
    }
    img {
      width: 60px;
      height: 60px;
    }
  }
</style>