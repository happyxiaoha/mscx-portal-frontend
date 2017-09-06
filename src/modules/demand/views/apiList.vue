<template>
  <div class="content grid-l">
    <div class="demand-api-banner">
      <img src="../images/demand-api-banner.png">
      <button class="btn-publish" @click="goPublish">发布任务</button>
    </div>
    <div class="demand-api-condition">
      <h3>API开发需求</h3>
      <div class="demand-api-search">
        <el-date-picker
          v-model="date"
          type="daterange"
          align="right"
          placeholder="选择日期范围"
          @change="dateChange"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-input class="demand-api-keyword" placeholder="搜索..." v-model="keyword">
          <el-button slot="append" icon="search" @click="seachKeyword"></el-button>
        </el-input>
      </div>
    </div>
    <div class="demand-api-result" v-loading="loading">
      <c-demand-item v-for="item in apiList" type="api" :itemObj="item" :key="item.id"></c-demand-item>
      <h4 v-if="apiList.length < 1">没有符合查询条件的数据</h4>
    </div>
    <div class="page-wrapper" v-if="pageInfo.totalSize > 10">
      <el-pagination
        layout="prev, pager, next"
        @current-change="jumpPage"
        :current-page.sync="pageInfo.currentPage"
        :page-size="10"
        :total="pageInfo.totalSize">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import API from 'common/api'
  import demandItem from 'components/demandItem'
  import _ from 'lodash'
  export default {
    data: function() {
      return {
        apiList: [],
        pageInfo: {
          totalSize: 0
        },
        loading: false,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        date: '',
        keyword: '',
        params: {
          keywords: '',
          beginTime: '',
          endTime: '',
          page: 1,
          pageSize: 10
        }
      }
    },
    mounted () {
      
    },
    watch: {
      params: {
        handler (val) {
          this.filterList();
        },
        deep: true
      }
    },
    created () {
      this.filterList();
    },
    methods: {
      goPublish () {
        location.href = './demand.html#api/create'
      },
      filterList () {
        // this.loading = true
        this.apiList = []
        API.Demand.getApiList(this.params).then((res) => {
          this.apiList = res.result.list
          this.pageInfo = res.result.page
          this.loading = false
        })
      },
      jumpPage (page) {
        this.params.page = page
      },
      dateChange (res) {
        let range = res.split(' - ')
        _.extend(this.params, {
          beginTime: range[0],
          endTime: range[1]
        })
      },
      seachKeyword () {
        this.params.keywords = this.keyword
      }
    },
    components: {
      'c-demand-item': demandItem
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .content {
    margin-top: 20px;
    .demand-api-banner {
      position: relative;
      margin-top: 20px;
      img {
        width: 100%;
      }
      .btn-publish {
        position: absolute;
        right: 5%;
        top: 40px;
        width: 160px;
        height: 45px;
        background: #ffa300;
        color: #fff;
        border: 1px solid #ffa300;
        cursor: pointer;
        outline: none;
        font-size: 18px;
      }
    }
    .demand-api-condition {
      margin-top: 40px;
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      border-left: 3px solid @mainBackground;
      h3 {
        float: left;
        .result-count {
          color: @mainBackground
        }
      }
    }
    .demand-api-search {
      float: right;
      .demand-api-keyword {
        width: 200px;
        margin-left: 20px;
      }
    }
    .demand-api-result {
      margin-top: 25px;
      min-height: 325px;
      overflow: hidden;
    }
    .page-wrapper {
      text-align: center;
      margin-top: 20px;
    }
  }
</style>