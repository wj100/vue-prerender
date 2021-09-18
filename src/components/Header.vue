<template>
  <header class="header flex-center">
      头部
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
.header{
    color: #fff;
}
</style>
