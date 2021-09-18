<template>
  <div class="home">
    <Header msg="头部" />
    <div class="main">
        首页
        <RegisterBox></RegisterBox>
    </div>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import RegisterBox from '@/components/RegisterBox.vue';

export default {
  name: 'Home',
  components: {
    Header,
    RegisterBox,
    Footer
  },
};
</script>
<style lang='less' scoped>
@import '../assets/css/home.less';
.main{
    height: 500px;
    border: 1px solid red;
}
.register-box {
  width: 1200px;
  height: 520px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: flex-end;
}

</style>
