<template>
  <header class="flex">
    <div class="header-box flex">
      <div class="header__slogan flex">
        <img src="../assets/image/wylogo.png" alt />
        <span>|</span>
        <span>自主域名</span>
        <span>企业专属</span>
      </div>
      <div class="header__buttons flex">
        <a
          href="https://qiye.163.com/login/?from=ym"
          target="_blank"
          class="button-hover"
          id="home_login"
        >登录</a>
        <span>|</span>
        <span data-try-target="顶部导航" class="button-hover">试用专业版</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String,
  },
};
</script>

<style scoped lang='less'>
.flex {
  display: flex;
}
/* 头部样式 */
header {
  // position: absolute;
  z-index: 9;
  width: 100%;
  min-width: 1000px;
  height: 60px;
  left: 0px;
  top: 0px;
  background: #1a1f25;
  mix-blend-mode: normal;
  align-items: center;
  justify-content: space-between;

  & .header-box {
    height: 100%;
    width: 1200px;
    margin: auto;
    align-items: center;
    justify-content: space-between;
  }

  .header__slogan {
    width: 280px;
    color: #ffffff;
    text-indent: 10px;
    display: flex;
    justify-content: space-between;
  }

  .header__buttons {
    a,
    span {
      color: #fff;
      font-size: 14px;
    }

    span:hover {
      cursor: pointer;
    }

    width: 120px;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    [role='customButton'] {
      width: 80px;
      height: 32px;
      font-size: 16px;
    }
  }
}
</style>
