<template>
  <div class="content grid-l">
    <div class="pay-error-block">
      <h2>支付失败</h2>
      <p>错误信息:</p>
      <p>{{ decodeURIComponent(msg) }}</p>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        msg: ''
      }
    },
    created () {
      this.msg = this.$route.params.msg
    }
  }
</script>
<style scoped lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .content {
    margin-top: 20px;
    overflow: hidden;
    .pay-error-block {
      .box-shadow();
      border: 1px solid #ccc;
      padding: 20px;
      background: #fff;
      margin-top: 20px;
      overflow: hidden;
      h2 {
        margin-bottom: 20px;
      }
    }
  }
</style>