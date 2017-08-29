<template>
  <div class="selected-wrapper">
    <div class="top">
      <img src="../images/selected-api-title.png">
      <a href="/api/">更多</a>
    </div>
    <div class="selected" v-loading="loading">
      <div class="selected-side">
        <img :src="marketTheme && marketTheme.imageUrl">
        <button @click="jump">点击进入</button>
      </div>
      <div class="selected-content">
        <ul class="selected-ul">
          <li v-for="(item, index) in selectedAPI" v-if="index < 8">
            <a :href="'/api/detail/' + item.apiServiceId">
              <div class="rec-item-top">
                <img :src="item.iconUrl">
              </div>
              <div class="rec-title">
                <p class="title">{{item.apiServiceCName}}</p>
                <p class="sub-title">智慧神州</p>
                <i :class="[item.chargeType === '01' ? 'charge-free-icon' : 'charge-not-free-icon', 'charge-icon' ]"></i>
              </div>
              <ul class="rec-count">
                <li>
                  <h3>{{item.applyCnt}}</h3>
                  <span class="sub-title">申请量</span>
                </li>
                <li>
                  <h3>{{item.attentionCnt}}</h3>
                  <span class="sub-title">关注量</span>
                </li>
                <li>
                  <h3 class="rate">{{item.score.toFixed(1)}}</h3>
                  <span class="sub-title">综合评分</span>
                </li>
              </ul>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import API from 'common/api/index'
  export default {
    data () {
      return {
        isApiActive: true,
        selectedAPI: [],
        loading: true,
        chargeIcon: '',
        marketTheme: {},
        map: {
          '2': 'data',
          '3': 'tool',
          '4': 'model'
        }
      }
    },
    created () {
      API.Api.getSelectedApi().then((res) => {
        this.selectedAPI = res.result
        this.loading = false
      })
      API.Api.getMarketingTheme().then((res) => {
        this.marketTheme = res.result
      })
    },
    computed: {
      apiTypeName() {
        return this.map[this.marketTheme.apiType] || ''
      }
    },
    methods: {
      jump () {
        if(!this.marketTheme) return
        if(this.marketTheme.showRuleType === '2') {
          location.href = this.marketTheme.browseUrl
        }else {
          location.href = '/api/' + (this.apiTypeName ? this.apiTypeName : '') +
          (this.marketTheme.categoryId ? '/category-' + this.marketTheme.categoryId : '') + 
          (this.marketTheme.tags ? '/tag-' + this.marketTheme.tags.split(',')[0] : '')
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .selected-wrapper {
    margin-top: 30px;
    .top a {
      float: right;
      margin-right: 30px;
      color: #666;
    }
    .selected {
      margin-top: 20px;
      height: 490px;
      .box-shadow();
      background: #fff;
      padding: 20px 0;
      box-sizing: border-box;
      .selected-side {
        width: 20%;
        display: inline-block;
        vertical-align: top;
        padding-left: 20px;
        position: relative;
        img {
          width: 200px;
          height: 440px;
        }
        button {
          position: absolute;
          top: 330px;
          left: 80px;
          background: #477ee6;
          border: 0;
          padding: 7px 15px;
          color: #fff;
          border-radius: 10px;
          outline: 0;
          cursor: pointer;
        }
      }
      .selected-content {
        width: 77%;
        display: inline-block;
        .selected-ul > li {
          height: 210px;
          width: 23%;
          border: 1px solid #ccc;
          float: left;
          margin-right: 17px;
          margin-bottom: 20px;
          box-sizing: border-box;
          padding: 0 10px;
          &:nth-child(4n) {
            margin-right: 0;
          }
          .rec-item-top {
            height: 105px;
            padding-top: 10px;
            text-align: center;
            box-sizing: border-box;
          }
          .rec-title {
            display: inline-block;
            vertical-align: top;
            position: relative;
            width: 100%;
            margin-top: 5px;
            .title {
              font-weight: 600;
              .ellipsis();
              width: 155px;
              color: #000;
            }
            .sub-title {
              color: #aaa;
              line-height: 15px;
              font-size: 12px;
            }
            .charge-icon {
              position: absolute;
              top: 7px;
              right: 0;
              width: 33px;
              height: 13px;
            }
            .charge-free-icon {              
              background: url(../images/free-icon.png) no-repeat;
            }
            .charge-not-free-icon {
              background: url(../images/not-free-icon.png) no-repeat;
            }
          }
          .rec-count {
            font-size: 12px;
            margin-top: 10px;
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
                font-size: 12px;
              }
              &:first-child {
                padding-left: 0;
              }
              &:last-child {
                width: 31%;
                border-right: 0;
                margin-right: 0;
                padding-right: 0;
              }
            }
          }
        }
      }
    }
  }
</style>