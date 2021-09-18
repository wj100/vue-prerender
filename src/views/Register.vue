<template>
  <div class="register">
    <Header/>
    <div class="main">
        注册页面
    </div>
    <Footer/>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Register',
  components: {
    Header,
    Footer
  },
}
</script>
<style lang="less">
@import '../assets/css/register.less';
.main{
    height: 500px;
    border: 1px solid red;
}
</style>
