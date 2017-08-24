<template>
  <div class="layout">
    <c-header></c-header>
    <div class="content grid-l">
      <div class="bigInputs clearfix">
        <div class="sel fl">
          <p class="down selCons allSearch">{{ dataType }}</p>
        </div>
        <input type="text" v-model="keyword" @keydown.enter="search" class="search fl" id="searchValue">
        <el-button type="primary" class="searchBtn fl" @click="search">搜索</el-button>
      </div>
      <el-tabs type="border-card" v-model="activeTab">
        <el-tab-pane label="API" name="api" class="SearchList">
          <ul v-if="apiList.length > 0">
            <li v-for="item in apiList">
                <p>
                    <a :href="'/api/detail/' + item.apiServiceId" class="corOrange ft16">{{ item.apiServiceName}}</a>
                    <span>类型：</span>
                    <span class="corBlue">{{ item.typeDesc }}</span>
                </p>
                <p class="cor4">{{ item.description }}</p>
            </li>
          </ul>
          <div v-else class="none-list">找不到数据，换个关键词试试！</div>
          <div class="page-wrapper" v-if="apiPageInfo.totalSize > 10">
            <el-pagination
              layout="prev, pager, next"
              @current-change="jumpApiPage"
              :current-page.sync="apiPageInfo.currentPage"
              :page-size="10"
              :total="apiPageInfo.totalSize">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="微应用" name="service" class="SearchList">
          <ul v-if="serviceList.length > 0">
            <li v-for="item in serviceList">
                <p>
                    <a :href="'/services/detail/' + item.id" class="corOrange ft16">{{ item.name}}</a>
                    <span>类型：</span>
                    <span class="corBlue">微应用</span>
                </p>
                <p class="cor4">{{ item.description }}</p>
            </li>
          </ul>
          <div v-else class="none-list">找不到数据，换个关键词试试！</div>
          <div class="page-wrapper" v-if="servicePageInfo.totalSize > 10">
            <el-pagination
              layout="prev, pager, next"
              @current-change="jumpServicePage"
              :current-page.sync="servicePageInfo.currentPage"
              :page-size="10"
              :total="servicePageInfo.totalSize">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <c-footer></c-footer>
  </div>
</template>
<script>
  import header from 'components/header/header'
  import footer from 'components/footer/footer'
  import API from 'common/api'
  require('common/utils/date')
  const map = {
    'api': 'API',
    'service': '微应用'
  }
  export default {
    data: function() {
      return {
        apiList: [],
        apiPageInfo: {
          totalSize: ''
        },
        apiParams: {
          page: 1,
          pageSize: 10
        },
        serviceList: [],
        servicePageInfo: {
          totalSize: ''
        },
        serviceParams: {
          page: 1,
          pageSize: 10
        },
        activeTab: 'api',
        keyword: ''
      }
    },
    created () {
      this.keyword = window.localStorage.getItem('keyword') || '';
      this.activeTab = window.localStorage.getItem('dataType') || 'api';
      if(this.activeTab === 'api') {
        this.searchApi()
      }else {
        this.getAppList()
      }
    },
    computed: {
      dataType () {
        return map[this.activeTab]
      }
    },
    watch: {
      activeTab (val, oldVal) {
        if(val !== oldVal) {
          if(val === 'api') {
            this.searchApi()
          }else {
            this.getAppList()
          }
        }
      }
    },
    methods: {
      search () {
        if(this.activeTab === 'api') {
          this.searchApi()
        }else {
          this.getAppList()
        }
      },
      getAppList () {
        this.serviceParams.keyword = this.keyword
        API.App.getAppList(this.serviceParams).then((res) => {
          this.serviceList = res.result.list
          this.servicePageInfo = res.result.page
        })
      },
      searchApi () {
        this.apiParams.keyword = this.keyword
        API.Api.searchApi(this.apiParams).then((res) => {
          this.apiList = res.result.list
          this.apiPageInfo = res.result.page
        })
      },
      jumpApiPage (page) {
        this.apiParams.page = page
        this.searchApi()
      },
      jumpServicePage (page) {
        this.serviceParams.page = page
        this.getAppList()
      }
    },
    components: {
      'c-header': header,
      'c-footer': footer
    }
  }
</script>
<style lang="less">
  @import "../../assets/less/variables.less";
  @import "../../assets/less/mixins.less";
  .layout {
    background: #f7f8fc;
    .content {
      margin-top: 20px;
      overflow: hidden;
    }
  }
  .el-tabs__item {
    padding: 0 40px;
    font-size: 16px;
  }
  .fl {
    float: left;
  }
  /*综合搜索*/
.bigInputs{width: 830px;margin:26px auto;overflow: hidden;}
.sel{position: relative;}
.sel p{width: 142px;height: 56px;background: #fff;border: 1px solid #ccc;box-sizing: border-box;text-align: center;line-height: 54px;position: relative;font-size: 18px;  padding-left: 22px;padding-right: 22px;}
.sel ul{position: absolute;width: 142px;border: 1px solid #ccc;box-sizing: border-box;top: 60px;left: 0;background: #fff;z-index: 2;display: none;}
.sel ul li{height: 42px;line-height: 42px;text-align: center;border-bottom: 1px solid #ccc;font-size: 16px;cursor: pointer;}
.sel ul li:last-child{border: 0;}
.sel ul li:hover{background: #f1f1f1;}
.bigInputs input{display: block;}
.bigInputs input[type="text"]{width: 546px;height: 56px;border: 1px solid #ccc;border-left: 0;border-right: 0;box-sizing: border-box;border-radius: 0;margin: 0;box-shadow: none;background: #fff;font-size: 18px;padding-left: 20px;padding-right: 20px;}
.bigInputs .searchBtn{width: 140px;height: 56px;border-radius: 0;border: 0;color: #fff;font-size: 18px;}

.SearchList{margin-bottom: 25px;}
.SearchList>ul{background: #fff;min-height: 150px;}
.SearchList>ul li{border-bottom: 1px dashed #ccc;padding: 20px;}
.SearchList>ul li p{line-height: 18px;}
.SearchList>ul li p:first-child{margin-bottom: 18px;}
.SearchList>ul li p:first-child a{margin-right: 30px;}
.SearchList>ul li p:first-child a:hover{color: #ef6f08;text-decoration: underline;}
.SearchList>ul li:last-child{border:0;}

.Page{width: 100%;margin-top: 25px;}
.Page ul{text-align: center;}
.Page ul li{display: inline-table;font-size: 12px;line-height: 24px;margin-right: 10px;}
.Page ul li a{display: inline-block;padding: 0 7px;border: 1px solid #ddd;margin-right: 5px; }
.Page ul li a:link{color: #333;}
.Page ul li a:hover{color: #5596ed;}
.Page ul li a.active{border: 1px solid #5596ed;color: #5596ed;}
.Page ul li input{vertical-align: 0; width: 30px;height: 26px;border-radius: 0;box-sizing: border-box;text-align: center;margin: 0 6px;}
.Page ul li a#go{margin-left: 6px;}

.search-type {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #ccc;
    /*border-bottom: solid 1px #ccc;*/
}
.search-type span{
    height: 40px;
    border: 1px solid transparent;
    font-size: 16px;
    display: inline-block;
    line-height: 40px;
    padding: 0 30px;
    text-align: center;
    cursor: pointer;
}
.search-type span.active{
    background: #fff;
    border: 1px solid #ccc;
    border-bottom: 0;
    color: #069cd9;
}
.none-list {
    padding: 20px;
    font-size: 20px;
}
</style>
