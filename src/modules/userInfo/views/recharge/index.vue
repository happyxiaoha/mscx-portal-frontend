<template>
  <iframe id="center" name="center" width="100%" height="600px" frameborder="0" scrolling="auto" :src="iframeUrl"></iframe>
</template>
<script>
  export default {
    data () {
      return {
        iframeUrl: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    created () {
      console.log("name:" + this.user.account);
      this.iframeUrl = 'webapp/recharge_index.html?userName='+ this.user.account;
    }
  }
</script>