<template>
  <div class="header">
    <div class="header-top">
      <el-row class="grid-l">
        <el-col :span="5" class="area-picker">
          <div @mouseenter="showCityStation" @mouseleave="hideCityStation">
            <span>hi，欢迎进入新型智慧城市OS！</span>
            <span class="down">
              <span>【{{city && city.name || '全国' }}】</span>
            </span>
            <div id="city-station" v-show="cityStationVisiable">
              <ul>
                <li v-for="item in cityStation" :class="[city && city.code == item.code ? 'selected' : '']">
                  <a @click="switchCity(item)" href="javascript:;">{{ item.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="4" :offset="15" class="login-area">
          <div v-if="user.userId" class="user-drop" @mouseover="showDropdown" @mouseout="hideDropdown">
            {{user.name || user.account}}
            <div :class="[dropClass, { 'active': dropHover }]">
              <ul>
                <li class="usercenter">
                  <a href="userInfo.html">用户中心</a>
                </li>
                <li class="develop" v-if="user.userType !== 'REGISTER'">
                  <a href="javascript:;" @click="jumpDevelop">开发者门户</a>
                </li>
                <li class="logout">
                  <a href="javascript:;" @click="logout">退出</a>
                </li>
              </ul>
            </div>
          </div>
          <div v-else class="unlogin-link">
            <a class="link" href="login.html">登录</a>
            <a class="link" href="register.html">注册</a>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="header-main">
      <el-row class="grid-l">
        <el-col :span="5">
          <a href="index.html">
            <img src="./images/logo.png">
          </a>
        </el-col>
        <el-col :span="13">
          <ul class="channel">
            <li :class="[active === 'index' ? 'active' : '']">
              <a href="index.html">首页</a>
            </li>
            <li :class="[active === 'api' ? 'active' : '']">
              <a href="api.html">API</a>
            </li>
            <li :class="[active === 'service' ? 'active' : '']">
              <a href="services.html">微应用</a>
            </li>
            <li :class="[active === 'saas' ? 'active' : '']">
              <a href="saas.html">SaaS服务</a>
            </li>
            <li :class="[active === 'demand' ? 'active' : '']">
              <a href="demand.html">需求定制</a>
            </li>
          </ul>
        </el-col>
        <el-col :span="6" class="header-search-wrapper">
          <div class="header-seach">
            <el-input v-model="searchTxt" @keydown.enter.native="search" placeholder="请输入要搜索的内容" size="large">
              <el-button slot="append" @click="search">搜索</el-button>
            </el-input>
          </div>
          <div class="hot-words">
            <span>热门搜索：</span>
            <a href="javascript:;" v-for="item in hotWords" @click="clickSearch(item.hotWord)">{{item.hotWord}}</a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import API from 'common/api/index'
  import _ from 'lodash'
  const cityStation = require('common/json/cityStation.json')
  export default {
    props: ['active'],
    data () {
      return {
        user: {
        },
        hotWords: [],
        dropClass: 'drop-menu',
        dropHover: false,
        searchTxt: '',
        cityStation: cityStation.cities,
        cityStationVisiable: false
      }
    },
    computed: {
      city () {
        return this.$store.getters.city
      }
    },
    created () {
      // 城市判断
      let city = _.find(cityStation.cities, function(item){
        return item.url.indexOf(location.host) > -1;
      }) || cityStation.cities[0];
      this.$store.commit('setCity', city)

      // 切换下areaCode
      API.Common.switchCity({areaCode: this.city.code})
      // 获取用户信息
      API.Common.getLoginInfo().then((res) => {
        if(res.result) {
          this.user = res.result
          this.$store.commit('setUser', res.result)
        }
        this.$emit('loaded')
      })
      
      // 获取热搜词
      API.Dict.getHotWordList().then((res) => {
        if(res.status == 'OK') {
          this.hotWords = res.result
        }
      })
    },
    methods: {
      showDropdown () {
        this.dropHover = true
      },
      hideDropdown () {
        this.dropHover = false
      },
      logout() {
        API.Common.logout().then((res)=> {
          location.href = 'index.html'
        })
      },
      jumpDevelop() {
        API.Common.jumpDevelop().then((res)=> {
          location.href = res.result
        })
      },
      search () {        
        window.localStorage.setItem('keyword', this.searchTxt);
        window.localStorage.setItem('dataType', 'api');
        window.open('search.html','_self');
      },
      clickSearch (val) {
        this.searchTxt = val
        this.search()
      },
      switchCity (city) {
        API.Common.switchCity({areaCode: this.city.code}).then((res) => {
          if(res.status == 'OK') {
            location.href = city.url;
          }
        }).catch((res) => {
        })
      },
      showCityStation () {
        this.cityStationVisiable = true
      },
      hideCityStation () {
        this.cityStationVisiable = false
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/less/variables.less";
  .header {
    .header-top {
      width: 100%;
      height: 35px;
      background: #e3e4e5;
      line-height: 35px;
      font-size: 12px;
      .login-area {
        .unlogin-link {
          float: right;
        }
        .user-drop {
          width: 100px;
          float: right;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 20px;
          color: #7b7b7b;
          cursor: pointer;
          background: url("./images/ic_down.png") right 10px no-repeat;
          .drop-menu {
            position: absolute;
            border: 1px solid #eee;
            background: #fff;
            top: 35px;
            right: 0;
            display: none;
            z-index: 1001;
            width: 148px;
            &.active {
              display: block;
            }
            .usercenter{
              background: url("./images/ic_usercenter.png") 12px center no-repeat;
            }
            .logout{
              background: url("./images/ic_logout.png") 12px center no-repeat;
            }
            .develop{
              background: url("./images/ic_develop.png") 12px center no-repeat;
            }
            a {
              display: block;
              color: #888;
              white-space: nowrap;
              font-size: 14px;
              text-align: center;
            }
          }
        }
        .link {
          width: 40px;
          display: inline-block;
          text-align: center;
          color: #7b7b7b;
        }
      }
      /* 新增头部顶栏 */
      .area-picker #city-station {
        position: absolute;
        border: solid 1px #eee;
        background: #fff;
        top: 35px;
        left: 0;
        z-index: 1001;
        width: 300px;
        padding: 0 10px;
          /*-webkit-transition: opacity .3s ease-in-out;
          -moz-transition: opacity .3s ease-in-out;
          -o-transition: opacity .3s ease-in-out;
          transition: opacity .3s ease-in-out;*/
      }
      .area-picker.active #city-station {
          /*opacity: 1;*/
          display: block;
      }
      .area-picker #city-station li {
          width: 50px;
          text-align: center;
          float: left;
          padding: 10px 10px;
      }
      .area-picker #city-station li a {
          display: block;
          height: 30px;
          line-height: 30px;
      }
      .area-picker #city-station li a:hover, .area-picker #city-station li.selected a {
          background: @mainBackground;
          color: #fff;
          border-radius: 10px;
      }
    }
    .header-main {
      width: 100%;
      height: 80px;
      background: -webkit-gradient(linear, 0 0, 0 100%, from(#41aaca), to(#19bac0));
      background: -moz-linear-gradient(top, #41aaca, #19bac0);
      background: -o-linear-gradient(top, #41aaca, #19bac0);
      background: -ms-linear-gradient(#41aaca 0%,#19bac0 100%);
      filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#41aaca',endColorstr='#19bac0',grandientType=1);
      line-height: 80px;
      img {
        vertical-align: middle;
      }
      .channel {
        font-size: 18px;
        overflow: hidden;
        li {
          color: #fff;
          float: left;
          padding: 0 24px;
          &.active {
            list-style-type: square;
            list-style-position: inside;
          }
          a {
            color: #fff;
          }
        }
      }
      .header-search-wrapper {
        display: table;
        height: 80px;
        position: relative;
        .header-seach {
          display: table-cell;
          vertical-align: middle;
          .el-input-group {
            display: table;
          }
        }
        .hot-words {
          color: #fff;
          position: absolute;
          left: 0;
          z-index: 2;
          line-height: 20px;
          height: 20px;
          bottom: 0px;
          font-size: 12px;
          span {
            display: inline-block;
            vertical-align: middle;
          }
          a {
            display: inline-block;
            max-width: 45px;
            margin-left: 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #fff;
            vertical-align: middle;
          }
        }
      }
    }
  }
</style>
