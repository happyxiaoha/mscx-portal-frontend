<template>
  <div class="recommand" v-loading="loading">
    <el-row>
      <el-col :span="8" class="rec-item" v-for="item in recommandList">
        <div class="rec-item-top">
          <a :href="map[item.sourceType] + 'detail/' + item.id">
            <img :src="item.imageUri">
          </a>
          <div class="rec-title">
            <a :href="map[item.sourceType] + 'detail/' + item.id">
              <p class="title">{{item.name}}</p>
            </a>
            <p class="sub-title">{{item.providerName}}</p>
          </div>
        </div>
        <div>
          <ul class="rec-count">
            <li>
              <h2>{{item.applyCount}}</h2>
              <span class="sub-title">申请量</span>
            </li>
            <li>
              <h2>{{item.attentionCount}}</h2>
              <span class="sub-title">关注量</span>
            </li>
            <li>
              <h2 class="rate">{{item.score}}</h2>
              <span class="sub-title">综合评分</span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import API from 'common/api/index'
  export default {
    data () {
      return {
        isApiActive: true,
        recommandList: [],
        loading: true,
        map: {
          '01': '/api/',
          '03': '/services/',
          '04': '/saas/'
        }
      }
    },
    created () {
      API.Common.getRecommendation().then((res) => {
        this.recommandList = res.result
        this.loading = false
      })
    },
    methods: {
      
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .recommand {
    padding-top: 15px;
    height: 130px;
    box-sizing: border-box;
    .rec-item {
      padding-left: 3%;
      border-right: 1px solid #ccc;
      height: 100%;
      .rec-item-top {
        height: 62px;
        img {
          max-width: 70px;
          height: 56px;
        }
      }
      &:last-child {
        border-right: 0;
      }
      .rec-title {
        display: inline-block;
        vertical-align: top;
        margin-left: 5px;
        width: 55%;
        .title {
          font-weight: 600;
          color: #000;
          .ellipsis();
        }
        .sub-title {
          color: #aaa;
          margin-top: 5px;
        }
      }
      .rec-count {
        font-size: 12px;
        margin-top: 5px;
        li {
          display: inline-block;
          width: 25%;
          border-right: 1px solid #ccc;
          padding: 0 5px;
          .rate {
            color: @mainBackground;
          }
          .sub-title {
            color: #aaa;
          }
          &:first-child {
            padding-left: 0;
          }
          &:last-child {
            width: 28%;
            border-right: 0;
            margin-right: 0;
          }
        }
      }
    }
  }
</style>