<template>
  <div class="content grid-l">
    <c-filter type="saas" :category="routeCategory" :tag="routeTag" v-on:updateParams="updateParams"></c-filter>
    <div class="app-list">
      <div class="search-banner">
        <h4>此条件下，共<span class="result-count">{{pageInfo.totalSize}}</span>个SaaS服务</h4>
        <div class="condition">
            <a href="javascript:;" @click="sort()" :class="[sortActiveIndex === '' ? 'active' : '']">默认排序</a>
            <a href="javascript:;" @click="sort(1)" :class="[sortActiveIndex === 1 ? 'active' : '']">最新上线</a>
            <a href="javascript:;" @click="sort(2)" :class="[sortActiveIndex === 2 ? 'active' : '']">使用数量</a>
        </div>
        <div class="condition fee-type">
            <a href="javascript:;" @click="changeFee()" :class="[feeActiveIndex === '' ? 'active' : '']">全部</a>
            <a href="javascript:;" @click="changeFee('01')" :class="[feeActiveIndex === '01' ? 'active' : '']">免费</a>
            <a href="javascript:;" @click="changeFee('02')" :class="[feeActiveIndex === '02' ? 'active' : '']">收费</a>
            <a href="javascript:;" @click="changeFee('03')" :class="[feeActiveIndex === '03' ? 'active' : '']">后付款（账户扣款）</a>
        </div>
      </div>
      <div class="app-list-result" v-loading="loading">
        <c-app-item type="saas" v-for="item in appList" :itemObj="item" :key="item.id"></c-app-item>
        <h4 v-if="appList.length < 1">没有符合查询条件的数据</h4>
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
  </div>
</template>
<script>
  import API from 'common/api'
  import filter from 'components/filter/filter'
  import appItem from 'components/appItem'
  import _ from 'lodash'
  export default {
    data: function() {
      return {
        appList: [],
        pageInfo: {
          totalSize: 0
        },
        sortActiveIndex: '',
        feeActiveIndex: '',
        loading: false,
        params: {
          orderBy: '',
          chargeType: '',
          page: 1,
          pageSize: 10,
          serviceObject: '',
          categoryId: '',
          tagId: '',
          scope: ''
        },
        routeCategory: '',
        routeTag: ''
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
      if(this.$route.params.category) {
        this.routeCategory = this.$route.params.category
        this.params.categoryId = this.routeCategory
      }
      if(this.$route.params.tag) {
        this.routeTag = this.$route.params.tag
        this.params.tagId = this.routeTag
      }
      this.filterList();
    },
    methods: {
      updateParams (options) {
        _.extend(this.params, options || {})
      },
      filterList () {
        // this.loading = true
        this.appList = []
        API.Saas.getSaasList(this.params).then((res) => {
          this.appList = res.result.list
          this.pageInfo = res.result.page
          this.loading = false
        })
      },
      sort (index) {
        index = index || ''
        this.sortActiveIndex = index
        this.params.orderBy = index
        this.params.page = 1
      },
      changeFee (index) {
        index = index || ''
        this.feeActiveIndex = index
        this.params.chargeType = index
        this.params.page = 1
      },
      jumpPage (page) {
        this.params.page = page
      }
    },
    components: {
      'c-filter': filter,
      'c-app-item': appItem
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .content {
    margin-top: 20px;
    .app-list {
      margin-top: 20px;
      .search-banner {
        height: 20px;
        line-height: 20px;
        padding-left: 20px;
        border-left: 3px solid @mainBackground;
        h4 {
          float: left;
          .result-count {
            color: @mainBackground
          }
        }
        .condition {
          padding-left: 40px;
          float: right;
          a {
            color: #666;
            font-size: 14px;
            &:not(:last-child) {
              margin-right: 26px;
            }
            &.active {
              color: @linkColorHover;
            }
          }
        }
        .fee-type {
          padding-right: 40px;
          border-right: 1px solid #aaa;
        }
      }
      .app-list-result {
        overflow: hidden;
        margin-top: 25px;
        min-height: 325px;
        padding: 0 1px;
        width: 100%;
      }
      .page-wrapper {
        text-align: center;
        margin-top: 20px;
      }
    }
  }
</style>