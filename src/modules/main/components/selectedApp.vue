<template>
  <div class="selected-wrapper">
    <div class="top">
      <img src="../images/selected-app-title.png">
      <a href="services.html">更多</a>
    </div>
    <div class="selected" v-loading="loading">
      <div class="selected-side">
        <img :src="marketTheme && marketTheme.imageUrl">
        <button @click="jump">点击进入</button>
      </div>
      <div class="selected-content">
        <ul class="selected-ul">
          <li v-for="(item, index) in selectedApp" v-if="index < 8">
            <a :href="'services.html#detail/' + item.id">
              <div class="rec-item-top">
                <img :src="item.imageUri">
                <a :href="'services.html#detail/' + item.id">
                </a>
              </div>
              <div class="rec-title">
                <p class="title">{{item.name}}</p>
                <p class="sub-title">智慧神州</p>
                <i :class="[item.charge === '01' ? 'charge-free-icon' : 'charge-not-free-icon', 'charge-icon' ]"></i>
              </div>
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
        selectedApp: [],
        loading: true,
        chargeIcon: '',
        marketTheme: {}
      }
    },
    created () {
      API.App.getSelectedApp().then((res) => {
        this.selectedApp = res.result
        this.loading = false
      })
      API.App.getMarketingTheme().then((res) => {
        this.marketTheme = res.result
      })
    },
    methods: {
      jump () {
        if(marketTheme.showRuleType === '2') {
          location.href = marketTheme.browseUrl
        }else {
          location.href = 'services.html' + marketTheme.categoryId ? '#category-' + marketTheme.categoryId : ''
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
          background: #059ae7;
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
            position: relative;
            a {
              position: absolute;
              right: 0;
              background: url(../images/app-demo.png) no-repeat;
              width: 32px;
              height: 32px;
              &:hover {
                background: url(../images/app-demo-active.png) no-repeat;
              }
            }
            img {
              max-height: 88px;
            }
          }
          .rec-title {
            display: inline-block;
            vertical-align: top;
            position: relative;
            width: 100%;
            .title {
              font-weight: 600;
              .ellipsis();
              width: 155px;
              color: #000;
            }
            .sub-title {
              color: #aaa;
              line-height: 15px;
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
            margin-top: 15px;
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