<template>
  <div class="layout">
    <c-header v-on:loaded="handleHeaderLoaded"></c-header>
    <div class="user-content grid-l" v-if="loadContent">
      <div class="user-content-left">
        <div class="user-avatar">
          <div class="user-avatar-top">
            <!-- <img class="avatar-image" v-if="user.headPortrait && user.headPortrait !== 'null' || avatarUri" :src="avatarUri || user.headPortrait"> -->
            <!-- <img src="../images/avatar.png" > -->
            <c-upload id="fileId" v-on:uploaded="handlePicSuccess" name="photo" :url="serviceIconUrl">
              <el-upload slot="elUpload" id="serviceIcon" name="photo" :action="serviceIconUrl" :on-success="handlePicSuccess" :show-file-list="false">
                <el-tooltip v-if="avatarUri || user.headPortrait" content="点击更换头像" effect="dark" placement="top">
                  <img :src="avatarUri || user.headPortrait" class="picture">
                </el-tooltip>
                <el-tooltip v-else content="点击上传头像" effect="dark" placement="top">
                  <img src="../images/avatar.png">
                </el-tooltip>
              </el-upload>
            </c-upload>
            <a v-if="avatarUri || user.headPortrait" href="javascript:;" @click="removeAvatar" class="btn-remove-avatar">清除头像</a>
            <h1><a href="#/">{{user.account}}</a></h1>
            <p>
              <a href="#user/auth" v-if="authText === '立刻认证'">{{authText}}</a>
              <span v-else>{{authText}}</span>
            </p>
          </div>
          <div class="user-avatar-bottom">
            <div class="user-message">
              <p>消息</p>
              <p><a href="message.html">查看</a></p>
            </div>
          </div>
        </div>
        <div class="user-menu">
          <ul>
            <li :class="[isUserCenterActive ? 'active' : '']">
              <router-link :to="{name: 'centerBasic'}">个人中心</router-link>
            </li>
            <li :class="[isDemandActive ? 'active' : '']">
              <router-link :to="{name: 'demandApi'}">我的需求</router-link>
            </li>
            <li :class="[isApiActive ? 'active' : '']">
              <router-link :to="{name: 'apiPublished'}">我的API</router-link>
            </li>
            <li :class="[isSaasActive ? 'active' : '']">
              <router-link :to="{name: 'saasPublished'}">我的SaaS服务</router-link>
            </li>
            <li :class="[isServiceActive ? 'active' : '']">
              <router-link :to="{name: 'servicePublished'}">我的微应用</router-link>
            </li>
            <li :class="[isPointActive ? 'active' : '']">
              <router-link :to="{name: 'pointList'}">我的积分</router-link>
            </li>
            <li :class="[isOrderActive ? 'active' : '']">
              <router-link :to="{name: 'shopcart'}">订单管理</router-link>
            </li>
            <li v-if="displayRechargeMenu" :class="[isRechargeActive ? 'active' : '']">
              <router-link :to="{name: 'recharge'}">话费充值</router-link>
            </li>
            <li :class="[isAccountActive ? 'active' : '']">
              <router-link :to="{name: 'accountIndex'}">账户管理</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="user-content-right">
        <router-view></router-view>
      </div>
    </div>
    <c-footer></c-footer>
  </div>
</template>
<script>
  import API from 'common/api'
  import header from 'components/header/header'
  import footer from 'components/footer/footer'
  import upload from 'components/upload/upload'
  import _ from 'lodash'
  export default {
    data () {
      return {
        loadContent: false,
        activeIndex: -1,
        routeName: '',
        displayRechargeMenu: false,
        serviceIconUrl: API.UC.uploadAvatarUrl,
        avatarUri: '',
        avatarKey: ''
      }
    },
    watch: {
      $route (to, from) {
        this.routeName = to.name;
      }
    },
    beforeRouteEnter (to, from, next) {
      API.Common.getLoginInfo().then((res) => {
        if(res.result) {
          next(vm => {
            vm.$store.commit('setUser', res.result)
          })
        }else {
          location.href = 'login.html'
        }
      })
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      authText () {
        if(this.user.certificationInfo.status === 'CERTIFICATED_PERSON'|| 
          this.user.certificationInfo.status === 'CERTIFICATED_ENTERPRISE' || 
          this.user.certificationInfo.status === 'CERTIFICATED_PARTNER'){
          return '已认证'
        }else if(this.user.certificationInfo.status === 'P2E_PROCESSING' || 
          this.user.certificationInfo.status === 'ENTERPRISE_PROCESSING'){
          return '认证中'
        }else{
          return '立刻认证'
        }
      },
      isUserCenterActive () {
        return ['centerIndex', 'centerBasic', 'centerAuth', 'centerPassword'].indexOf(this.routeName) > -1 
      },
      isDemandActive () {
        return ['demandIndex', 'demandApi', 'demandService', 'demandFollow', 'demandAccept'].indexOf(this.routeName) > -1 
      },
      isApiActive () {
        return ['apiIndex', 'apiPublished', 'apiOrdered', 'apiFollow'].indexOf(this.routeName) > -1 
      },
      isSaasActive () {
        return ['saasIndex', 'saasPublished', 'saasRecord', 'saasFollow'].indexOf(this.routeName) > -1 
      },
      isServiceActive () {
        return ['serviceIndex', 'servicePublished', 'serviceRecord', 'serviceFollow'].indexOf(this.routeName) > -1 
      },
      isPointActive () {
        return ['pointIndex', 'pointList', 'pointIncome', 'pointOutlay', 'pointRule', 'pointQA'].indexOf(this.routeName) > -1 
      },
      isOrderActive () {
        return ['ordersIndex', 'shopcart', 'orderList', 'orderSales'].indexOf(this.routeName) > -1 
      },
      isRechargeActive () {
        return ['recharge'].indexOf(this.routeName) > -1 
      },
      isAccountActive () {
        return ['accountIndex', 'accountPassword', 'rechargeRecord', 'consumeRecord', 'accountInvoice'].indexOf(this.routeName) > -1 
      }
    },
    created () {
      this.routeName = this.$route.name
      // 是否显示话费充值
      API.Order.getSelfApiList({
        page: 1,
        pageSize: 200010
      }).then((res) => {
        if(res.result.list.length > 0) {
          _.each(res.result.list, (item) => {
            if(item.sourceId == 9569) {
              this.displayRechargeMenu = true
            }
          })
        }
      })

    },
    methods: {
      selectMenu (index) {
        this.activeIndex = index
        switch (index) {
          case 0:
            this.$router.push({name: 'centerIndex'})
            break;
          case 1:
            this.$router.push({name: 'demandIndex'})
            break;
        }
        
      },
      handleHeaderLoaded () {
        this.loadContent = true
      },
      handlePicSuccess (res) {
        this.avatarUri = ''
        this.avatarKey = ''
        if(res.status === 'OK') {
          this.avatarKey = res.result.imageId
          this.avatarUri = res.result.imageUrl
        }else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      },
      removeAvatar () {
        API.UC.removeAvatar().then((res) => {
          if(res.status === 'OK') {
            this.avatarUri = ''
            this.$store.commit('removeUserAvatar')
          }
        })
      }
    },
    components: {
      'c-header': header,
      'c-footer': footer,
      'c-upload': upload,
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .layout {
    background: #f7f8fc;
    .user-content {
      margin-top: 30px;
      overflow: hidden;
      padding: 0 3px;
      .user-content-left {
        width: 20%;
        float: left;
        .user-avatar {
          height: 265px;
          background: #fff;
          p {
            color: #999;
          }
          .box-shadow();
          .user-avatar-top {
            height: 185px;
            text-align: center;
            padding-top: 30px;
            box-sizing: border-box;
            h1 {
              margin-top: 15px;
              a {
                text-decoration: underline;
              }
            }
            .btn-remove-avatar {
              font-size: 12px;
              color: #999;
              text-decoration: underline;
            }
            .avatar-image {
              width: 80px;
              height: 80px;
            }
            .picture-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 80px;
              height: 80px;
              line-height: 80px;
              text-align: center;
            }
            .el-upload {
              border: 1px dashed #d9d9d9;
              border-radius: 6px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              &:hover {
                border-color: #20a0ff;
              }
            }
            .picture {
              width: 80px;
              height: 80px;
              display: block;
            }
          }
          .user-avatar-bottom {
            margin-top: 15px;
            padding: 0 35px;
            box-sizing: border-box;
            text-align: center;
          }
        }
        .user-menu {
          margin-top: 15px;
          padding: 20px 0;
          box-sizing: border-box;
          background: #fff;
          .box-shadow();
          li {
            height: 35px;
            line-height: 35px;
            padding-left: 40px;
            font-size: 16px;
            border-left: 3px solid #fff;
            box-sizing: border-box;
            margin: 10px 0;
            a {
              color: #333;
            }
            &.active {
              border-left: 3px solid @mainBackground;
              a {
                color: @mainBackground
              }
            }
          }
        }
      }
      .user-content-right {
        float: left;
        margin-left: 2%;
        width: 78%;
      }
    }
  }
</style>