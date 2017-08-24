<template>
  <div class="footer">
    <div class="grid-l">
      <ul>
        <li>
          <a href="/index.html">首页</a>
          <a href="/api/">API</a>
          <a href="/services/">微应用</a>
          <a href="/demand/">需求定制</a>
        </li>
        <li>
          <a href="javascript:;">帮助中心</a>
          <a href="/contactUs.html" target="_blank">关于我们</a>
          <a href="/help.html#guidance" target="_blank">新手指导</a>
          <a href="/help.html#api" target="_blank">API使用</a>
          <a href="/help.html#service" target="_blank">微应用使用</a>
          <a href="/help.html#question" target="_blank">常见问题</a>
        </li>
      </ul>
      <div class="footer-center">
        <p class="">关注我们</p>
        <img class="er-code-img" src="./images/qrcode.jpg" alt="">
      </div>
      <div class="footer-right">
        <div class="cooper">
          <p>商务合作（工作日9:00-18:00）</p>
          <p class="footer-tel">010-61853273</p>
        </div>
        <div class="support">
          <p>技术支持</p>
          <p class="footer-tel">010-82705480</p>
        </div>
      </div>
    </div>
    <div class="copyright">
      ©版权所有  智慧神州（北京）科技有限公司   京ICP备15054427号-2
      <span class="police">
          <img src="./images/icon-police.png">京公网安备 11010802022998号
      </span>
    </div>
  </div>
</template>
<script>
  import API from 'common/api'
  export default {
    props: {
      isLogin: Boolean
    },
    data: function () {
      return {
        logo: '',
        title: ''
      }
    },
    computed: {
      user: function () {
        return this.$store.getters.user
      }
    },
    created: function () {
      
    },
    methods: {
      logout: function () {
        this.$http.get('logout.do').then(function (res) {
          if (res.status === 'OK') {
            this.$router.replace('/login')
          }
        }.bind(this))
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/less/variables.less";
  .footer {
    padding: 45px 0 0;
    margin-top: 50px;
    background: #373d41;
    overflow: hidden;
    .grid-l {
      overflow: hidden;
    }
    ul {
      margin-left: 130px;
      li {
        float: left;
        a {
          width: 155px;
          display: block;
          color: #888;
          font-size: 14px;
          line-height: 30px;
          &:first-child {
            font-size: 16px;
            color: #fff;
            margin-bottom: 20px;
          }
        }
      }
    }
    .footer-center {
      float: left;
      text-align: center;
      p {
        line-height: 30px;
        font-size: 16px;
        color: #fff;
      }
      img {
        margin-top: 26px;
        width: 126px;
      }
    }
    .footer-right {
      margin-left: 130px;
      padding: 33px 0 10px 45px;
      border-left: 1px solid #666;
      font-size: 14px;
      float: left;
      .cooper {
        color: #999;
        padding-left: 60px;
        background: url(./images/footer-help.png) left 8px no-repeat;
      }
      .support {
        color: #999;
        padding-left: 60px;
        margin-top: 40px;
        background: url(./images/footer-tel.png) left 8px no-repeat;
      }
      .footer-tel {
        font-size: 20px;
        color: #fff;
      }
    }
    .copyright {
      background: #f2f2f2;
      border-top: 1px solid #666;
      margin-top: 30px;
      text-align: center;
      line-height: 50px;
      color: #888;
      .police {
        margin-left: 10px;
        img {
          vertical-align: middle;
          margin-right: 5px;
          margin-top: -2px;
        }
      }
    }
  }
</style>
