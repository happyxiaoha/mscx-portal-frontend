<template>
  <div class="share">
    <ul>
      <li @mouseenter="showQrcode" @mouseleave="hideQrcode">
        <div v-show="qrcodeVisiable" id="qrcode" ref="qrcode" class="qrcode"></div>
        <a href="javascript:;" class="share-weixin"></a>
      </li>
      <li>
        <a href="javascript:;" class="share-qzone" @click="shareQzone"></a>
      </li>
      <li>
        <a href="javascript:;" class="share-weibo" @click="shareWeibo"></a>
      </li>
    </ul>
  </div>
</template>
<script>
  import QrCode from 'common/utils/qrCode'
  export default {
    data () {
      return {
        url: location.href,
        title: '',
        desc: '欢迎使用智慧大厂平台！',
        pic: location.protocol + '//' + location.host + '/logo.png',
        qrcodeVisiable: false
      }
    },
    mounted () {
      var qrcode = new QrCode(this.$refs.qrcode, {
          width : 90,
          height : 90
      });
      qrcode.makeCode(this.url)
      this.title = document.title
    },
    methods: {
      shareQzone () {
        var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ this.url +'&site=' + this.url + '&title=' + this.title + '&desc='+ this.desc + "&pics=" + this.pic;
        this.open(url);
      },
      shareWeibo () {
        var url = 'http://service.weibo.com/share/share.php?url=' + this.url + '&appkey=' + this.sinaAppkey + '&site=' + this.url + '&title=' + this.desc + "&pic=" + this.pic;
        this.open(url)
      },
      open (url) {
        window.open(url, '', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
      },
      showQrcode () {
        this.qrcodeVisiable = true
      },
      hideQrcode () {
        this.qrcodeVisiable = false
      }
    }
  }
</script>
<style lang="less" scoped>
  .share {
    height: 80px;
    line-height: 80px;
    text-align: center;
    ul {
      width: 330px;
      margin: 0 auto;
    }
    li {
      height: 80px;
      display: table-cell;
      vertical-align: middle;
      padding: 0 40px;
      position: relative;
      .share-weixin {
        width: 30px;
        height: 30px;
        display: block;
        background: url(../../assets/images/share-weixin.png) center center no-repeat;
      }
      .share-qzone {
        width: 30px;
        height: 30px;
        display: block;
        background: url(../../assets/images/share-qzone.png) center center no-repeat;
      }
      .share-weibo {
        width: 30px;
        height: 30px;
        display: block;
        background: url(../../assets/images/share-weibo.png) center center no-repeat;
      }
      .qrcode {
        position: absolute;
        top: 0;
        left: -60px;
      }
    }
  }
</style>