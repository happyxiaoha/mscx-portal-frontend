<template>
  <div class="layout">
    <c-header></c-header>
    <router-view></router-view>
    <c-footer></c-footer>
  </div>
</template>
<script>
  import header from 'components/header/header'
  import footer from 'components/footer/footer'
  export default {
    created() {
    },
    components: {
      'c-header': header,
      'c-footer': footer
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables.less";
  @import "../../../assets/less/mixins.less";
  .layout {
    background: #f7f8fc;
  }
</style>