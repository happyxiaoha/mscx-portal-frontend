<template>
  <div class="login-footer">
    <div class="grid-l footer-content">
      <ul>
        <li>
          <a href="#">关于我们</a>
          <a href="#">联系我们</a>
          <a href="#">新手指导</a>
          <a href="#">API使用</a>
          <a href="#">微应用使用</a>
          <a href="#">常见问题</a>
          <a href="#">商务合作</a>
          <a href="#">技术支持</a>
        </li>
      </ul>
      <p>©版权所有 智慧神州（北京）科技有限公司 京ICP备15054427号-2</p>
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style lang="less">
  .login-footer {
    background: #fafafa;
    border-top: 1px solid #ccc;
    .footer-content {
      text-align: center;
      ul {
        padding: 18px 0 10px 0;
        a {
          padding: 0 10px;
          border-right: 1px solid #ccc;
          color: #666;
          &:last-child {
            border-right: 0;
          }
        }
      }
      p {
        color: #666;
        padding-bottom: 13px;
      }
    }
  }
</style>