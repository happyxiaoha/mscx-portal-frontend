<template>
  <div>
    <div class="side-nav">
      <a class="wpa-container icon-top" @click="goTop" title="返回顶部">
      </a>
      <a href="/message.html" class="wpa-container icon-message">
      </a>
      <a class="wpa-container icon-code" @mouseenter="showErCode" @mouseleave="hideErCode">
      </a>
      <a class="wpa-container icon-contact" href="/contactUs.html#contact">
      </a>
    </div>
    <div id="erCode" class="er-code" v-show="erCodeVisiable">
      <div></div>
      <p>微信扫一扫</p>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        erCodeVisiable: false
      }
    },
    computed: {
      
    },
    created: function () {
      
    },
    methods: {
      showErCode () {
        this.erCodeVisiable = true
      },
      hideErCode () {
        this.erCodeVisiable = false
      },
      goTop () {
        window.scrollTo(0, 0)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../assets/less/variables.less";
  @import "../../assets/less/mixins.less";
  .side-nav {
    position: fixed;
    right: 10px;
    top: 50%;
    z-index: 200;
    margin-top: -115px;
    width: 40px;
    height: 310px;
    .wpa-container {
      cursor: pointer;
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 2px;
      margin-top: 10px;
      border: 1px solid #dadee7;
      position: relative;
      font-size: 12px;
      text-align: center;
      top: 0;
      &:hover {
        border: 1px solid @linkColorHover;
      }
    }
    .icon-top {
      background: @mainBackground url(./images/top.png) center center no-repeat;
    }
    .icon-message {
      background: #f7f8fc url(./images/message.png) center center no-repeat;
    }
    .icon-code {
      background: #f7f8fc url(./images/code.png) center center no-repeat;
    }
    .icon-contact {
      background: #f7f8fc url(./images/tel.png) center center no-repeat;
    }
  }
  .er-code {
    height: 165px;
    width: 165px;
    padding: 10px;
    position: fixed;
    top: 50%;
    margin-top: -100px;
    z-index: 200;
    right: 55px;
    background: url(./images/codeBg.png) no-repeat;
    p {
      text-indent: 40px;
    }
    div {
      height: 126px;
      width: 126px;
      background: url(./images/qrcode.jpg) no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
