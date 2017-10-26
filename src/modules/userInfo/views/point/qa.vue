<template>
  <div class="point-qa">
    <h2>Q1：什么是积分？</h2>
    <hr>
    <p>A: 积分是用户在神州数码智慧校园平台注册、实名认证、发布需求、购买资源等相关活动情况给予的奖励，积分仅可在神州数码智慧校园平台使用，如用户账号暂停使用，则神州数码智慧校园将取消该用户账号内积分相关使用权益。</p>
    <h2>Q2：积分怎么使用？</h2>
    <hr>
    <p>A：用户在购买资源的时候，可以用积分抵付。积分抵用规则是100积分=1元，即100个积分相当于人民币1元。</p>
    <h2>Q3：积分如何获取？</h2>
    <hr>
    <p>A：用户在平台上注册、实名认证、发布需求、购买资源等可以获得积分。具体规则，详见积分规则页面。</p>
  </div>
</template>
<script>
  export default {

  }
</script>
<style lang="less" scoped>
  @import "../../../../assets/less/variables.less";
  @import "../../../../assets/less/mixins.less";
  .point-qa {
    .box-shadow();
    // height: 300px;
    box-sizing: border-box;
    padding: 29px 25px;
    background: #fff;
    p {
      margin-bottom: 20px;
    }
  }
</style>